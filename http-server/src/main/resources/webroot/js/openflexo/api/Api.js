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
        BindingId.prototype.equals = function (other) {
            return this.expression === other.expression && this.contextUrl === other.contextUrl;
        };
        return BindingId;
    }());
    exports.BindingId = BindingId;
    var RuntimeBindingId = (function () {
        function RuntimeBindingId(binding, runtimeUrl) {
            this.binding = binding;
            this.runtimeUrl = runtimeUrl;
        }
        RuntimeBindingId.prototype.equals = function (other) {
            return this.binding.equals(other.binding) && this.runtimeUrl === other.runtimeUrl;
        };
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
     * public final RuntimeBindingId runtimeBinding;
    
        public final String value;
    
     */
    /**
     * Class used when a binding is changed
     */
    var ChangeEvent = (function (_super) {
        __extends(ChangeEvent, _super);
        function ChangeEvent(runtimeBinding, value) {
            var _this = _super.call(this, "ChangeEvent") || this;
            _this.runtimeBinding = runtimeBinding;
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
                            _this.bindingListeners.forEach(function (binding, listener) {
                                if (binding[0].equals(event_1.runtimeBinding)) {
                                    binding[1](event_1);
                                }
                            });
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
        Api.prototype.addChangeListener = function (binding, listener) {
            this.bindingListeners.add([binding, listener]);
        };
        /**
         * Removes a listener for binding changes
         * @param listener callback
         */
        Api.prototype.removeChangeListener = function (binding, listener) {
            this.bindingListeners["delete"]([binding, listener]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQSxpQkFBd0IsVUFBa0IsRUFBRSxPQUFlO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUZELDBCQUVDO0lBRUQsd0JBQStCLFVBQWtCLEVBQUUsT0FBZSxFQUFFLE9BQWM7UUFDOUUsTUFBTSxDQUFDLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRkQsd0NBRUM7SUFFRDtRQUNJLG1CQUNXLFVBQWtCLEVBQ2xCLFVBQWtCO1lBRGxCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN6QixDQUFDO1FBRUUsMEJBQU0sR0FBYixVQUFjLEtBQWdCO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3hGLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFURCxJQVNDO0lBVFksOEJBQVM7SUFXdEI7UUFDSSwwQkFDVyxPQUFrQixFQUNsQixVQUFrQjtZQURsQixZQUFPLEdBQVAsT0FBTyxDQUFXO1lBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDekIsQ0FBQztRQUVFLGlDQUFNLEdBQWIsVUFBYyxLQUF1QjtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN0RixDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBVEQsSUFTQztJQVRZ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