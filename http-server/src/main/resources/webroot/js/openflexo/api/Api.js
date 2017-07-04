var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    function binding(expression, context) {
        return new BindingId(expression, context);
    }
    exports.binding = binding;
    function runtimeBinding(expression, context, runtime) {
        return new RuntimeBindingId(binding(expression, context), runtime);
    }
    exports.runtimeBinding = runtimeBinding;
    var BindingId = (function () {
        function BindingId(expression, contextUrl) {
            this.expression = expression;
            this.contextUrl = contextUrl;
        }
        return BindingId;
    }());
    exports.BindingId = BindingId;
    var RuntimeBindingId = (function () {
        function RuntimeBindingId(binding, runtimeUrl) {
            this.binding = binding;
            this.runtimeUrl = runtimeUrl;
        }
        return RuntimeBindingId;
    }());
    exports.RuntimeBindingId = RuntimeBindingId;
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
        function EvaluationRequest(id, runtimeBinding, detailed) {
            var _this = _super.call(this, "EvaluationRequest") || this;
            _this.id = id;
            _this.runtimeBinding = runtimeBinding;
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
        function AssignationRequest(id, left, right, detailed) {
            var _this = _super.call(this, "AssignationRequest") || this;
            _this.id = id;
            _this.left = left;
            _this.right = right;
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
            this.messageQueue = [];
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
            console.log(this.messageQueue);
            // evaluates pending request
            for (var _i = 0, _a = this.messageQueue; _i < _a.length; _i++) {
                var binding_1 = _a[_i];
                console.log("Sending " + binding_1);
                this.sendMessage(binding_1);
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
         * @param mesage message to send
         */
        Api.prototype.sendMessage = function (message) {
            this.connie.send(JSON.stringify(message));
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
         * @param runtimeBinding binding  to evaluate.
         * @return a Promise for evaluated binding
         */
        Api.prototype.evaluate = function (runtimeBinding, detailed) {
            var _this = this;
            if (detailed === void 0) { detailed = false; }
            // connects the WebSocket if not already done
            this.initializeConnieEvaluator();
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new EvaluationRequest(id, runtimeBinding, detailed);
            // act depending on the WebSocket status
            if (this.connie.readyState == 1) {
                // sends the binding now
                this.sendMessage(request);
            }
            else {
                // sends when the socket is ready
                this.messageQueue.push(request);
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
         * @return a Promise for evaluated binding
         */
        Api.prototype.assign = function (left, right, detailed) {
            var _this = this;
            if (detailed === void 0) { detailed = false; }
            // connects the WebSocket if not already done
            this.initializeConnieEvaluator();
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new AssignationRequest(id, left, right, detailed);
            // act depending on the WebSocket status
            if (this.connie.readyState == 1) {
                // sends the binding now
                this.sendMessage(request);
            }
            else {
                // sends when the socket is ready
                this.messageQueue.push(request);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQSxpQkFBd0IsVUFBa0IsRUFBRSxPQUFlO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUZELDBCQUVDO0lBRUQsd0JBQStCLFVBQWtCLEVBQUUsT0FBZSxFQUFFLE9BQWM7UUFDOUUsTUFBTSxDQUFDLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRkQsd0NBRUM7SUFFRDtRQUNJLG1CQUNXLFVBQWtCLEVBQ2xCLFVBQWtCO1lBRGxCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN6QixDQUFDO1FBQ1QsZ0JBQUM7SUFBRCxDQUFDLEFBTEQsSUFLQztJQUxZLDhCQUFTO0lBT3RCO1FBQ0ksMEJBQ1csT0FBa0IsRUFDbEIsVUFBa0I7WUFEbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztZQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3pCLENBQUM7UUFDVCx1QkFBQztJQUFELENBQUMsQUFMRCxJQUtDO0lBTFksNENBQWdCO0lBTzdCOztPQUVHO0lBQ0g7UUFDSSxpQkFDVyxJQUFZO1lBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNuQixDQUFDO1FBQ1QsY0FBQztJQUFELENBQUMsQUFKRCxJQUlDO0lBSlksMEJBQU87SUFNcEI7O09BRUc7SUFDSDtRQUF1QyxxQ0FBTztRQUUxQywyQkFDVyxFQUFVLEVBQ1YsY0FBZ0MsRUFDaEMsUUFBaUI7WUFINUIsWUFLSSxrQkFBTSxtQkFBbUIsQ0FBQyxTQUM1QjtZQUxTLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixvQkFBYyxHQUFkLGNBQWMsQ0FBa0I7WUFDaEMsY0FB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