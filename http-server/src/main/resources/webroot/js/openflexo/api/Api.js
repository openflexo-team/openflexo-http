var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * TODO
     */
    var Message = (function () {
        function Message(type) {
            this.type = type;
        }
        return Message;
    }());
    exports.Message = Message;
    /**
     * Class used to send evaluation request.
     */
    var EvaluationRequest = (function (_super) {
        __extends(EvaluationRequest, _super);
        function EvaluationRequest(id, binding, runtime, model, detailed) {
            var _this = _super.call(this, "EvaluationRequest") || this;
            _this.id = id;
            _this.binding = binding;
            _this.runtime = runtime;
            _this.model = model;
            _this.detailed = detailed;
            return _this;
        }
        return EvaluationRequest;
    }(Message));
    exports.EvaluationRequest = EvaluationRequest;
    /**
     * Class used to send assignation request.
     */
    var AssignationRequest = (function (_super) {
        __extends(AssignationRequest, _super);
        function AssignationRequest(id, binding, value, runtime, model, detailed) {
            var _this = _super.call(this, "AssignationRequest") || this;
            _this.id = id;
            _this.binding = binding;
            _this.value = value;
            _this.runtime = runtime;
            _this.model = model;
            _this.detailed = detailed;
            return _this;
        }
        return AssignationRequest;
    }(Message));
    exports.AssignationRequest = AssignationRequest;
    /**
     * Class used for received evaluation response
     */
    var EvaluationResponse = (function (_super) {
        __extends(EvaluationResponse, _super);
        function EvaluationResponse(id, result, error) {
            var _this = _super.call(this, "EvaluationResponse") || this;
            _this.id = id;
            _this.result = result;
            _this.error = error;
            return _this;
        }
        return EvaluationResponse;
    }(Message));
    exports.EvaluationResponse = EvaluationResponse;
    /**
     * Class used when a binding is changed
     */
    var ChangeEvent = (function (_super) {
        __extends(ChangeEvent, _super);
        function ChangeEvent(binding, runtime, model, value) {
            var _this = _super.call(this, "ChangeEvent") || this;
            _this.binding = binding;
            _this.runtime = runtime;
            _this.model = model;
            _this.value = value;
            return _this;
        }
        return ChangeEvent;
    }(Message));
    exports.ChangeEvent = ChangeEvent;
    /**
     * Currently pending evaluations
     */
    var PendingEvaluation = (function () {
        function PendingEvaluation(fullfilled, rejected, request) {
            this.fullfilled = fullfilled;
            this.rejected = rejected;
            this.request = request;
        }
        return PendingEvaluation;
    }());
    exports.PendingEvaluation = PendingEvaluation;
    /**
     * The Api class proposes methods to access an OpenFlexo server.
     *
     * It allows:
     *
     * - to receive type object from the REST API.
     * - evaluate binding using a WebSocket connection.
     */
    var Api = (function () {
        function Api(host) {
            if (host === void 0) { host = ""; }
            this.host = host;
            this.evaluationRequestQueue = [];
            this.pendingEvaluationQueue = new Map();
            this.evaluationRequestSeed = 0;
            this.bindingListeners = new Set();
        }
        Api.prototype.error = function (url) {
            console.log("Error can't access '" + url + '", check that it exists and is accessible');
        };
        Api.prototype.call = function (path, method) {
            var _this = this;
            if (method === void 0) { method = "get"; }
            var result = new Promise(function (fullfilled, rejected) {
                var request = new XMLHttpRequest();
                request.open(method, _this.host + path);
                request.onload = function (ev) {
                    if (request.status >= 200 && request.status < 300) {
                        var first = request.responseText.charAt(0);
                        if (first === '{' || first === '[') {
                            var json = JSON.parse(request.responseText);
                            fullfilled(json);
                            return;
                        }
                        rejected(request.statusText);
                    }
                };
                request.onerror = rejected;
                request.send();
            });
            return result;
        };
        /**
         * Listens to WebSocket messages. Messages can be:
         *
         * - result of EvaluationRequest
         * - <b>Not Supported yet</b> change notifications
         *
         * @param event
         */
        Api.prototype.onEvaluationMessage = function (event) {
            var _this = this;
            // event contains a blob that needs reading
            var reader = new FileReader();
            reader.onloadend = function (e) {
                if (e.srcElement != null) {
                    // parses the response
                    var message = JSON.parse(e.srcElement["result"]);
                    switch (message.type) {
                        case "EvaluationResponse": {
                            var response = message;
                            // searches for the evaluation id
                            var pending = _this.pendingEvaluationQueue.get(response.id);
                            if (pending) {
                                // found it, now it removes it
                                _this.pendingEvaluationQueue["delete"](response.id);
                                if (response.error !== null) {
                                    // rejects the promise if there is an error
                                    pending.rejected(response.error);
                                }
                                else {
                                    // fullfilled the promise when it's ok
                                    pending.fullfilled(response.result);
                                }
                            }
                            break;
                        }
                        case "ChangeEvent": {
                            var event_1 = message;
                            console.log("ChangeEvent for " + event_1.binding);
                            _this.bindingListeners.forEach(function (listener) { return listener(event_1); });
                        }
                    }
                }
            };
            reader.readAsText(event.data);
        };
        /**
         * Listens to Webocket open
         * @param event
         */
        Api.prototype.onEvaluationOpen = function (event) {
            console.log("Openned " + event.data);
            console.log(this.evaluationRequestQueue);
            // evaluates pending request
            for (var _i = 0, _a = this.evaluationRequestQueue; _i < _a.length; _i++) {
                var binding = _a[_i];
                console.log("Sending " + binding);
                this.sendEvaluationRequest(binding);
            }
        };
        /**
         * Listens to WebSocket close
         */
        Api.prototype.onEvaluationClose = function () {
            console.log("Closed " + this.connie);
        };
        /**
         * Internal connie WebSocket
         */
        Api.prototype.initializeConnieEvaluator = function () {
            var _this = this;
            if (this.connie == null) {
                var wsHost = this.host.length > 0 ?
                    this.host.replace(new RegExp("https?\\://"), "ws://") :
                    wsHost = "ws://" + document.location.host;
                this.connie = new WebSocket(wsHost);
                this.connie.onopen = function (e) { return _this.onEvaluationOpen(e); };
                this.connie.onmessage = function (e) { return _this.onEvaluationMessage(e); };
                this.connie.onclose = function () { return _this.onEvaluationClose(); };
            }
        };
        /**
         * Internal send evaluation request
         * @param request request to send
         */
        Api.prototype.sendEvaluationRequest = function (request) {
            this.connie.send(JSON.stringify(request));
        };
        /**
         * Evaluates a binding for a given model on a given runtime. The binding is
         * sent to the server using a WebSocket to be evaluated. While the socket is
         * open, each time the value of the sent binding (with its context) is changed
         * an event is sent from the server. To listen to the changes, add listener
         * using {@link addChangeListener}.
         *
         * <b>Not Supported Yet</b>
         * A cache mechanism allows to store a binding result on the client in
         * cooperation with the server's own cache.
         *
         * @param binding binding to evaluate.
         * @param runtime url of the runtime object to use for context.
         * @param model url of the model object using to compile the binding.
         * @return a Promise for evaluated binding
         */
        Api.prototype.evaluate = function (binding, runtime, model, detailed) {
            var _this = this;
            if (detailed === void 0) { detailed = false; }
            // connects the WebSocket if not already done
            this.initializeConnieEvaluator();
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new EvaluationRequest(id, binding, runtime, model, detailed);
            // act depending on the WebSocket status
            if (this.connie.readyState == 1) {
                // sends the binding now
                this.sendEvaluationRequest(request);
            }
            else {
                // sends when the socket is ready
                this.evaluationRequestQueue.push(request);
            }
            // prepares the promise's callback for the result
            return new Promise(function (fullfilled, rejected) {
                _this.pendingEvaluationQueue.set(id, new PendingEvaluation(fullfilled, rejected, request));
            });
        };
        /**
         * Assigns the given binding to value for a given model on a given runtime.
         * The binding is sent to the server using a WebSocket to be evaluated.
         *
         * No change will be sent for any changes in the given bindings
         *
         * @param left binding to assign.
         * @param right binding of the new value.
         * @param runtime url of the runtime object to use for context.
         * @param model url of the model object using to compile the binding.
         * @return a Promise for evaluated binding
         */
        Api.prototype.assign = function (left, right, runtime, model, detailed) {
            var _this = this;
            if (detailed === void 0) { detailed = false; }
            // connects the WebSocket if not already done
            this.initializeConnieEvaluator();
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new AssignationRequest(id, left, right, runtime, model, detailed);
            // act depending on the WebSocket status
            if (this.connie.readyState == 1) {
                // sends the binding now
                this.sendEvaluationRequest(request);
            }
            else {
                // sends when the socket is ready
                this.evaluationRequestQueue.push(request);
            }
            // prepares the promise's callback for the result
            return new Promise(function (fullfilled, rejected) {
                _this.pendingEvaluationQueue.set(id, new PendingEvaluation(fullfilled, rejected, request));
            });
        };
        /**
         * Adds a listener for binding changes
         * @param listener callback
         */
        Api.prototype.addChangeListener = function (listener) {
            this.bindingListeners.add(listener);
        };
        /**
         * Removes a listener for binding changes
         * @param listener callback
         */
        Api.prototype.removeChangeListener = function (listener) {
            this.bindingListeners["delete"](listener);
        };
        /**
         * Gets all registered resource centers
         * @return a Promise for all resource centers
         */
        Api.prototype.resourceCenters = function () {
            return this.call("/rc");
        };
        /**
         * Gets all resources
         * @return a Promise for all resources
         */
        Api.prototype.resources = function () {
            return this.call("/resource");
        };
        /**
         * Saves given resource
         * @param resource the resource to save an id or a description
         */
        Api.prototype.save = function (resource) {
            var path;
            if (typeof resource === "string") {
                path = resource;
            }
            else {
                path = resource.url;
            }
            return this.call(path, "post");
        };
        /**
         * Gets all registered technology adapters
         * @return a Promise for all technology adapters
         */
        Api.prototype.technologyAdapters = function () {
            return this.call("/ta");
        };
        /**
         * Gets all view points
         * @return a Promise for all view points
         */
        Api.prototype.viewPoints = function () {
            return this.call("/ta/fml/viewpoint");
        };
        return Api;
    }());
    exports.Api = Api;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQTs7T0FFRztJQUNIO1FBQ0ksaUJBQ1csSUFBWTtZQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbkIsQ0FBQztRQUNULGNBQUM7SUFBRCxDQUFDLEFBSkQsSUFJQztJQUpZLDBCQUFPO0lBTXBCOztPQUVHO0lBQ0g7UUFBdUMscUNBQU87UUFFMUMsMkJBQ1csRUFBVSxFQUNWLE9BQWUsRUFDZixPQUFlLEVBQ2YsS0FBYSxFQUNiLFFBQWlCO1lBTDVCLFlBT0ksa0JBQU0sbUJBQW1CLENBQUMsU0FDNUI7WUFQUyxRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsYUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLGFBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixXQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2IsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7UUFHM0IsQ0FBQztRQUNOLHdCQUFDO0lBQUQsQ0FBQyxBQVhELENBQXVDLE9BQU8sR0FXN0M7SUFYWSw4Q0FBaUI7SUFhOUI7O09BRUc7SUFDSDtRQUF3QyxzQ0FBTztRQUUzQyw0QkFDVyxFQUFVLEVBQ1YsT0FBZSxFQUNmLEtBQWEsRUFDYixPQUFlLEVBQ2YsS0FBYSxFQUNiLFFBQWlCO1lBTjVCLFlBUUksa0JBQU0sb0JBQW9CLENBQUMsU0FDN0I7WUFSUyxRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsYUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLFdBQUssR0FBTCxLQUFLLENBQVE7WUFDYixhQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsV0FBSyxHQUFMLEtBQUssQ0FBUTtZQUNiLGNBQVEsR0FBUixRQUFRLENBQVM7O1FBRzNCLENBQUM7UUFDTix5QkFBQztJQUFELENBQUMsQUFaRCxDQUF3QyxPQUFPLEdBWTlDO0lBWlksZ0RBQWtCO0lBYy9COztPQUVHO0lBQ0g7UUFBd0Msc0NBQU87UUFF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