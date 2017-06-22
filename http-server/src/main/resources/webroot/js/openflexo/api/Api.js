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
        function EvaluationRequest(id, binding, runtime, model) {
            var _this = _super.call(this, "EvaluationRequest") || this;
            _this.id = id;
            _this.binding = binding;
            _this.runtime = runtime;
            _this.model = model;
            return _this;
        }
        return EvaluationRequest;
    }(Message));
    exports.EvaluationRequest = EvaluationRequest;
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
            var wsHost = this.host.length > 0 ?
                this.host.replace(new RegExp("https?\\://"), "ws://") :
                wsHost = "ws://" + document.location.host;
            this.connie = new WebSocket(wsHost);
            this.connie.onopen = function (e) { return _this.onEvaluationOpen(e); };
            this.connie.onmessage = function (e) { return _this.onEvaluationMessage(e); };
            this.connie.onclose = function () { return _this.onEvaluationClose(); };
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
         * sent to the server using a WebSocket to be evaluated.
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
        Api.prototype.evaluate = function (binding, runtime, model) {
            var _this = this;
            // connects the WebSocket if not already done
            if (this.connie == null) {
                this.initializeConnieEvaluator();
            }
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new EvaluationRequest(id, binding, runtime, model);
            // act depending on the WebSocket status
            if (this.connie.readyState == 1) {
                // sends the binding now
                this.sendEvaluationRequest(request);
            }
            else {
                // sends when the socket is ready
                this.evaluationRequestQueue.push(request);
            }
            // (executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQTs7T0FFRztJQUNIO1FBQ0ksaUJBQ1csSUFBWTtZQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbkIsQ0FBQztRQUNULGNBQUM7SUFBRCxDQUFDLEFBSkQsSUFJQztJQUpZLDBCQUFPO0lBTXBCOztPQUVHO0lBQ0g7UUFBdUMscUNBQU87UUFFMUMsMkJBQ1csRUFBVSxFQUNWLE9BQWUsRUFDZixPQUFlLEVBQ2YsS0FBYTtZQUp4QixZQU1JLGtCQUFNLG1CQUFtQixDQUFDLFNBQzVCO1lBTlMsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLGFBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixhQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsV0FBSyxHQUFMLEtBQUssQ0FBUTs7UUFHdkIsQ0FBQztRQUNOLHdCQUFDO0lBQUQsQ0FBQyxBQVZELENBQXVDLE9BQU8sR0FVN0M7SUFWWSw4Q0FBaUI7SUFZOUI7O09BRUc7SUFDSDtRQUF3QyxzQ0FBTztRQUUzQyw0QkFDVyxFQUFVLEVBQ1YsTUFBYyxFQUNkLEtBQWE7WUFIeEIsWUFLSSxrQkFBTSxvQkFBb0IsQ0FBQyxTQUM5QjtZQUxVLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixZQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsV0FBSyxHQUFMLEtBQUssQ0FBUTs7UUFHeEIsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0FBQyxBQVRELENBQXdDLE9BQU8sR0FTOUM7SUFUWSxnREFBa0I7SUFXL0I7O09BRUc7SUFDSDtRQUFpQywrQkFBTztRQUNwQyxxQkFDVyxPQUFlLEVBQ2YsT0FBZSxFQUNmLEtBQWEsRUFDYixLQUFhO1lBSnhCLFlBTUksa0JBQU0sYUFBYSxDQUFDLFNBQ3RCO1lBTlMsYUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLGFBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixXQUFLLEdBQUws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