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
        Api.prototype.call = function (path) {
            var _this = this;
            var result = new Promise(function (fullfilled, rejected) {
                var request = new XMLHttpRequest();
                request.open("get", _this.host + path);
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
         * @param binding binding to assign.
         * @param value binding of the new value.
         * @param runtime url of the runtime object to use for context.
         * @param model url of the model object using to compile the binding.
         * @return a Promise for evaluated binding
         */
        Api.prototype.assign = function (binding, value, runtime, model, detailed) {
            var _this = this;
            if (detailed === void 0) { detailed = false; }
            // connects the WebSocket if not already done
            this.initializeConnieEvaluator();
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new AssignationRequest(id, binding, value, runtime, model, detailed);
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
            return this.call(this.host + "/rc");
        };
        /**
         * Gets all resources
         * @return a Promise for all resources
         */
        Api.prototype.resources = function () {
            return this.call(this.host + "/resource");
        };
        /**
         * Gets all registered technology adapters
         * @return a Promise for all technology adapters
         */
        Api.prototype.technologyAdapters = function () {
            return this.call(this.host + "/ta");
        };
        /**
         * Gets all view points
         * @return a Promise for all view points
         */
        Api.prototype.viewPoints = function () {
            return this.call(this.host + "/ta/fml/viewpoint");
        };
        return Api;
    }());
    exports.Api = Api;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQTs7T0FFRztJQUNIO1FBQ0ksaUJBQ1csSUFBWTtZQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbkIsQ0FBQztRQUNULGNBQUM7SUFBRCxDQUFDLEFBSkQsSUFJQztJQUpZLDBCQUFPO0lBTXBCOztPQUVHO0lBQ0g7UUFBdUMscUNBQU87UUFFMUMsMkJBQ1csRUFBVSxFQUNWLE9BQWUsRUFDZixPQUFlLEVBQ2YsS0FBYSxFQUNiLFFBQWlCO1lBTDVCLFlBT0ksa0JBQU0sbUJBQW1CLENBQUMsU0FDNUI7WUFQUyxRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsYUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLGFBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixXQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ2IsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7UUFHM0IsQ0FBQztRQUNOLHdCQUFDO0lBQUQsQ0FBQyxBQVhELENBQXVDLE9BQU8sR0FXN0M7SUFYWSw4Q0FBaUI7SUFhOUI7O09BRUc7SUFDSDtRQUF3QyxzQ0FBTztRQUUzQyw0QkFDVyxFQUFVLEVBQ1YsT0FBZSxFQUNmLEtBQWEsRUFDYixPQUFlLEVBQ2YsS0FBYSxFQUNiLFFBQWlCO1lBTjVCLFlBUUksa0JBQU0sb0JBQW9CLENBQUMsU0FDN0I7WUFSUyxRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsYUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLFdBQUssR0FBTCxLQUFLLENBQVE7WUFDYixhQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsV0FBSyxHQUFMLEtBQUssQ0FBUTtZQUNiLGNBQVEsR0FBUixRQUFRLENBQVM7O1FBRzNCLENBQUM7UUFDTix5QkFBQztJQUFELENBQUMsQUFaRCxDQUF3QyxPQUFPLEdBWTlDO0lBWlksZ0RBQWtCO0lBYy9COztPQUVHO0lBQ0g7UUFBd0Msc0NBQU87UUFF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