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
        if (runtime === void 0) { runtime = context; }
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
        function Message(id, type) {
            this.id = id;
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
            var _this = _super.call(this, id, "EvaluationRequest") || this;
            _this.id = id;
            _this.runtimeBinding = runtimeBinding;
            _this.detailed = detailed;
            return _this;
        }
        return EvaluationRequest;
    }(Message));
    exports.EvaluationRequest = EvaluationRequest;
    /**
     * Class used to send listening request.
     */
    var ListeningRequest = (function (_super) {
        __extends(ListeningRequest, _super);
        function ListeningRequest(id, runtimeBinding, detailed) {
            var _this = _super.call(this, id, "ListeningRequest") || this;
            _this.id = id;
            _this.runtimeBinding = runtimeBinding;
            _this.detailed = detailed;
            return _this;
        }
        return ListeningRequest;
    }(Message));
    exports.ListeningRequest = ListeningRequest;
    /**
     * Class used to send assignation request.
     */
    var AssignationRequest = (function (_super) {
        __extends(AssignationRequest, _super);
        function AssignationRequest(id, left, right, detailed) {
            var _this = _super.call(this, id, "AssignationRequest") || this;
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
     * Class used for received response
     */
    var Response = (function (_super) {
        __extends(Response, _super);
        function Response(id, result, error) {
            var _this = _super.call(this, id, "Response") || this;
            _this.id = id;
            _this.result = result;
            _this.error = error;
            return _this;
        }
        return Response;
    }(Message));
    exports.Response = Response;
    /**
     * Class used when a binding is changed
     */
    var ChangeEvent = (function (_super) {
        __extends(ChangeEvent, _super);
        function ChangeEvent(runtimeBinding, value) {
            var _this = _super.call(this, -1, "ChangeEvent") || this;
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
    /**
     * Log from the OpenFlexo Api
     */
    var Log = (function () {
        function Log(level, message, source) {
            this.level = level;
            this.message = message;
            this.source = source;
        }
        return Log;
    }());
    exports.Log = Log;
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
            /** Messages to send throught connie websocket when opened */
            this.messageQueue = [];
            /** Map of pending evaluation from server */
            this.pendingEvaluationQueue = new Map();
            /** Seed of evaluation request ids */
            this.evaluationRequestSeed = 0;
            /** Registered listeners */
            this.bindingListeners = new Set();
            /** Api listeners */
            this.logListeners = new Set();
        }
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
                        case "Response": {
                            var response = message;
                            // searches for the evaluation id
                            var pending = _this.pendingEvaluationQueue.get(response.id);
                            if (pending) {
                                // found it, now it removes it
                                _this.pendingEvaluationQueue["delete"](response.id);
                                if (response.error !== null) {
                                    // rejects the promise if there is an error
                                    _this.log("error", response.error, message);
                                    pending.rejected(response.error);
                                }
                                else {
                                    // fullfilled the promise when it's ok
                                    _this.log("info", "Received", message);
                                    pending.fullfilled(response.result);
                                }
                            }
                            break;
                        }
                        case "ChangeEvent": {
                            var event_1 = message;
                            _this.bindingListeners.forEach(function (entry) {
                                if (entry[0].equals(event_1.runtimeBinding)) {
                                    entry[1](event_1);
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
            this.log("info", "Openned " + event.data, null);
            // evaluates pending request
            for (var _i = 0, _a = this.messageQueue; _i < _a.length; _i++) {
                var message = _a[_i];
                this.log("info", "Sending message", message);
                this.readySendMessage(message);
            }
        };
        /**
         * Listens to WebSocket close
         */
        Api.prototype.onEvaluationClose = function () {
            this.log("warning", "Websocket is closed", null);
            this.connie = null;
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
            return this.connie;
        };
        Api.prototype.sendMessage = function (message) {
            var _this = this;
            if (this.connie != null) {
                // act depending on the WebSocket status
                if (this.connie.readyState == 1) {
                    // sends the binding now
                    this.readySendMessage(message);
                }
                else {
                    // sends when the socket is ready
                    this.messageQueue.push(message);
                }
            }
            // prepares the promise's callback for the result
            return new Promise(function (fullfilled, rejected) {
                _this.pendingEvaluationQueue.set(message.id, new PendingEvaluation(fullfilled, rejected, message));
            });
        };
        /**
         * Internal send evaluation request
         * @param mesage message to send
         */
        Api.prototype.readySendMessage = function (message) {
            var json = JSON.stringify(message);
            this.log("info", "Sending message", message);
            if (this.connie != null) {
                this.connie.send(json);
            }
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
            if (detailed === void 0) { detailed = false; }
            // connects the WebSocket if not already done
            this.initializeConnieEvaluator();
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new EvaluationRequest(id, runtimeBinding, detailed);
            return this.sendMessage(request);
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
            if (detailed === void 0) { detailed = false; }
            // connects the WebSocket if not already done
            var connie = this.initializeConnieEvaluator();
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new AssignationRequest(id, left, right, detailed);
            return this.sendMessage(request);
        };
        /**
         * Adds a listener for binding changes
         * @param binding binding change to listen to
         * @param listener callback
         */
        Api.prototype.addChangeListener = function (binding, listener) {
            this.bindingListeners.add([binding, listener]);
            var id = this.evaluationRequestSeed++;
            var message = new ListeningRequest(id, binding, true);
            this.log("info", "Sending listener", message);
            this.sendMessage(message);
        };
        /**
         * Removes a listener for binding changes
         * @param binding binding change to listen to
         * @param listener callback
         */
        Api.prototype.removeChangeListener = function (binding, listener) {
            this.bindingListeners["delete"]([binding, listener]);
        };
        /**
         * Removes all callbacks for the given binding
         * @param binding binding
         */
        Api.prototype.removeChangeListeners = function (binding) {
            var _this = this;
            this.bindingListeners.forEach(function (e) {
                if (e[0].equals(binding)) {
                    _this.bindingListeners["delete"](e);
                }
            });
        };
        /**
         * Adds a log listener.
         * @param listener the callback
         */
        Api.prototype.addLogListener = function (listener) {
            this.logListeners.add(listener);
        };
        /**
         * Removes a log listener.
         * @param listener the callback
         */
        Api.prototype.removeLogListener = function (listener) {
            this.logListeners["delete"](listener);
        };
        /**
         * Logs a message from the OpenFlexo System
         * @param level
         * @param message
         * @param binding
         */
        Api.prototype.log = function (level, message, source) {
            var event = new Log(level, message, source);
            this.logListeners.forEach(function (listener) {
                listener(event);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQSxpQkFBd0IsVUFBa0IsRUFBRSxPQUFlO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUZELDBCQUVDO0lBRUQsd0JBQStCLFVBQWtCLEVBQUUsT0FBZSxFQUFFLE9BQXdCO1FBQXhCLHdCQUFBLEVBQUEsaUJBQXdCO1FBQ3hGLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUZELHdDQUVDO0lBRUQ7UUFDSSxtQkFDVyxVQUFrQixFQUNsQixVQUFrQjtZQURsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDekIsQ0FBQztRQUVFLDBCQUFNLEdBQWIsVUFBYyxLQUFnQjtZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN4RixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBVEQsSUFTQztJQVRZLDhCQUFTO0lBV3RCO1FBQ0ksMEJBQ1csT0FBa0IsRUFDbEIsVUFBa0I7WUFEbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztZQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3pCLENBQUM7UUFFRSxpQ0FBTSxHQUFiLFVBQWMsS0FBdUI7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDdEYsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FBQyxBQVRELElBU0M7SUFUWSw0Q0FBZ0I7SUFXN0I7O09BRUc7SUFDSDtRQUNJLGlCQUNXLEVBQVUsRUFDVixJQUFZO1lBRFosT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbkIsQ0FBQztRQUNULGNBQUM7SUFBRCxDQUFDLEFBTEQsSUFLQztJQUxZLDBCQUFPO0lBT3BCOztPQUVHO0lBQ0g7UUFBdUMscUNBQU87UUFFMUMsMkJBQ1csRUFBVSxFQUNWLGNBQWdDLEVBQ2hDLFFBQWlCO1lBSDVCLFlBS0ksa0JBQU0sRUFBRSxFQUFFLG1CQUFtQixDQUFDLFNBQ2hDO1lBTFMsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLG9CQUFjLEdBQWQsY0FBYyxDQUFrQjtZQUNoQyxjQUFRLEdBQVIsUUFBUSxDQUFTOztRQUczQixDQUFDO1FBQ04sd0JBQUM7SUFBRCxDQUFDLEFBVEQsQ0FBdUMsT0FBTyxHQVM3QztJQVRZLDhDQUFpQjtJQVc5Qjs7T0FFRztJQUNIO1FBQXNDLG9DQUFPO1FBRXJDLDBCQUNXLEVBQVUsRUFDVixjQUFnQyxFQUNoQyxRQUFpQjtZQUg1QixZQUtJLGtCQUFNLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxTQUMvQjtZQUxTLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixvQkFBYyxHQUFkLGNBQWMsQ0FBa0I7WUFDaEMsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7UUFHM0IsQ0FBQztRQUNOLHVCQUFDO0lBQUQsQ0FBQyxBQVRMLENBQXNDLE9BQU8sR0FTeEM7SUFUUSw0Q0FBZ0I7SUFXN0I7O09BRUc7SUFDSDtRQUF3QyxzQ0FBTztRQUUzQyw0QkFDVyxFQUFVLEVBQ1YsSUFBc0IsRUFDdEIsS0FBdUIsRUFDdkIsUUFBaUI7WUFKNUIsWUFNSSxrQkFBTSxFQUFFLEVBQUUsb0JBQW9CLENBQUMsU0FDakM7WUFOUyxRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsVUFBSSxHQUFKLElBQUksQ0FBa0I7WUFDdEIsV0FBSyxHQUFMLEtBQUssQ0FBa0I7WUFDdkIsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7UUFHM0IsQ0FBQztRQUNOLHlCQUFDO0lBQUQsQ0FBQyxBQVZELENBQXdDLE9BQU8sR0FVOUM7SUFWWSxnREFBa0I7SUFZL0I7O09BRUc7SUFDSDtRQUE4Qiw0QkFBTztRQUVqQyxrQkFDVyxFQUFVLEVBQ1YsTUFBYyxFQUNkLEtBQWE7WUFIeEIsWUFLSSxrQkFBTSxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQ3hCO1lBTFUsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFlBQU0sR0FBTixNQUFNLENBQVE7WUFDZCxXQUFLLEdBQUwsS0FBSyxDQUFROztRQUd4QixDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUFURCxDQUE4QixPQUFPLEdBU3BDO0lBVFksNEJBQVE7SUFXckI7O09BRUc7SUFDSDtRQUFpQywrQkFBTztRQUNwQyxxQkFDVyxjQUFnQyxFQUNoQyxLQUFhO1lBRnhCLFlBSUksa0JBQU0sQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLFNBQzFCO1lBSlMsb0JBQWMsR0FBZCxjQUFjLENBQWtCO1lBQ2hDLFdBQUssR0FBTCxLQUFLLENBQVE7O1FBR3ZCLENBQUM7UUFDTixrQkFBQztJQUFELENBQUMsQUFQRCxDQUFpQyxPQUFPLEdBT3ZDO0lBUFksa0NBQVc7SUFTeEI7O09BRUc7SUFDSDtRQUNJLDJCQUNXLFVBQXVCLEVBQ3ZCLFFBQTBCLEVBQzFCLE9BQWdCO1lBRmhCLGVBQVUsR0FBVixVQUFVLENBQWE7WUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7WUFDMUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUN2QixDQUFDO1FBQ1Qsd0JBQUM7SUFBRCxDQUFDLEFBTkQsSUFNQztJQU1EOztPQUVHO0lBQ0g7UUFDSSxhQUNXLEtBQWUsRUFDZixPQUFlLEVBQ2YsTUFBb0I7WUFGcEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtZQUNmLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBRS9CLENBQUM7UUFDTCxVQUFDO0lBQUQsQ0FBQyxBQVBELElBT0M7SUFQWSxrQkFBRztJQVdoQjs7Ozs7OztPQU9HO0lBQ0g7UUFxQkksYUFDWSxJQUFpQjtZQUFqQixxQkFBQSxFQUFBLFNBQWlCO1lBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7WUFqQjdCLDZEQUE2RDtZQUNyRCxpQkFBWSxHQUFjLEVBQUUsQ0FBQztZQUVyQyw0Q0FBNEM7WUFDcEMsMkJBQXNCLEdBQXdDLElBQUksR0FBRyxFQUFFLENBQUM7WUFFaEYscUNBQXFDO1lBQzdCLDBCQUFxQixHQUFXLENBQUMsQ0FBQztZQUUxQywyQkFBMkI7WUFDbkIscUJBQWdCLEdBQTRDLElBQUksR0FBRyxFQUFFLENBQUM7WUFFOUUsb0JBQW9CO1lBQ1osaUJBQVksR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU9uRCxDQUFDO1FBRU0sa0JBQUksR0FBWCxVQUFlLElBQVksRUFBRSxNQUFzQjtZQUFuRCxpQkFtQkM7WUFuQjRCLHVCQUFBLEVBQUEsY0FBc0I7WUFDL0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUksVUFBQyxVQUFVLEVBQUUsUUFBUTtnQkFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFDLEVBQUU7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDaEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUM1QyxVQUFVLENBQUksSUFBSSxDQUFDLENBQUM7NEJBQ3BCLE1BQU0sQ0FBQzt3QkFDWCxDQUFDO3dCQUNELFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFBO2dCQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0ssaUNBQW1CLEdBQTNCLFVBQTRCLEtBQW1CO1lBQS9DLGlCQXlDQztZQXhDRywyQ0FBMkM7WUFDM0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsU0FBUyxHQUFHLFVBQUMsQ0FBZ0I7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsc0JBQXNCO29CQUN0QixJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ25CLEtBQUssVUFBVSxFQUFFLENBQUM7NEJBQ2QsSUFBSSxRQUFRLEdBQWEsT0FBTyxDQUFDOzRCQUNqQyxpQ0FBaUM7NEJBQ2pDLElBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUMzRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dDQUNWLDhCQUE4QjtnQ0FDOUIsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFFBQU0sQ0FBQSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FFaEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29DQUMxQiwyQ0FBMkM7b0NBQzNDLEtBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7b0NBQzNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNyQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLHNDQUFzQztvQ0FDdEMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29DQUN0QyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDeEMsQ0FBQzs0QkFFTCxDQUFDOzRCQUNELEtBQUssQ0FBQzt3QkFDVixDQUFDO3dCQUNELEtBQUssYUFBYSxFQUFFLENBQUM7NEJBQ2pCLElBQUksT0FBSyxHQUFnQixPQUFPLENBQUM7NEJBQ2pDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUUsVUFBQyxLQUFLO2dDQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3hDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUMsQ0FBQztnQ0FDcEIsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsQ0FBQTtZQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRDs7O1dBR0c7UUFDSSw4QkFBZ0IsR0FBdkIsVUFBd0IsS0FBbUI7WUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFaEQsNEJBQTRCO1lBQzVCLEdBQUcsQ0FBQyxDQUFnQixVQUFpQixFQUFqQixLQUFBLElBQUksQ0FBQyxZQUFZLEVBQWpCLGNBQWlCLEVBQWpCLElBQWlCO2dCQUFoQyxJQUFJLE9BQU8sU0FBQTtnQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUVEOztXQUVHO1FBQ0ssK0JBQWlCLEdBQXpCO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUVEOztXQUVHO1FBQ0ssdUNBQXlCLEdBQWpDO1lBQUEsaUJBWUM7WUFYRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sQ0FBQztvQkFDckQsTUFBTSxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFFOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQyxDQUFjLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQXhCLENBQXdCLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFVBQUMsQ0FBYyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUEzQixDQUEyQixDQUFDO2dCQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixFQUFFLEVBQXhCLENBQXdCLENBQUM7WUFDekQsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7UUFFTSx5QkFBVyxHQUFsQixVQUFzQixPQUFnQjtZQUF0QyxpQkFnQkM7WUFmRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLHdDQUF3QztnQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsd0JBQXdCO29CQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osaUNBQWlDO29CQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztZQUNMLENBQUM7WUFFRCxpREFBaUQ7WUFDakQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFJLFVBQUMsVUFBVSxFQUFFLFFBQVE7Z0JBQ3ZDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2RyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFHRDs7O1dBR0c7UUFDSyw4QkFBZ0IsR0FBeEIsVUFBeUIsT0FBZ0I7WUFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNJLHNCQUFRLEdBQWYsVUFBbUIsY0FBZ0MsRUFBRSxRQUF5QjtZQUF6Qix5QkFBQSxFQUFBLGdCQUF5QjtZQUMxRSw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFFakMsbUNBQW1DO1lBQ25DLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBR0Q7Ozs7Ozs7OztXQVNHO1FBQ0ksb0JBQU0sR0FBYixVQUFpQixJQUFzQixFQUFFLEtBQXVCLEVBQUUsUUFBeUI7WUFBekIseUJBQUEsRUFBQSxnQkFBeUI7WUFDdkYsNkNBQTZDO1lBQzdDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBRTlDLG1DQUFtQztZQUNuQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksK0JBQWlCLEdBQXhCLFVBQXlCLE9BQXlCLEVBQUUsUUFBeUI7WUFDekUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRS9DLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksa0NBQW9CLEdBQTNCLFVBQTRCLE9BQXlCLEVBQUUsUUFBeUI7WUFDNUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQU0sQ0FBQSxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVEOzs7V0FHRztRQUNJLG1DQUFxQixHQUE1QixVQUE2QixPQUF5QjtZQUF0RCxpQkFNQztZQUxHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQU0sQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksNEJBQWMsR0FBckIsVUFBc0IsUUFBcUI7WUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVEOzs7V0FHRztRQUNJLCtCQUFpQixHQUF4QixVQUF5QixRQUFxQjtZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQU0sQ0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNJLGlCQUFHLEdBQVYsVUFBVyxLQUFlLEVBQUUsT0FBZSxFQUFFLE1BQW9CO1lBQzdELElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUM5QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksNkJBQWUsR0FBdEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksdUJBQVMsR0FBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksa0JBQUksR0FBWCxVQUFZLFFBQXlCO1lBQ2pDLElBQUksSUFBWSxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksR0FBRyxRQUFRLENBQUE7WUFDbkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksR0FBZSxRQUFTLENBQUMsR0FBRyxDQUFBO1lBQ3BDLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBVyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVEOzs7V0FHRztRQUNJLGdDQUFrQixHQUF6QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRDs7O1dBR0c7UUFDSSx3QkFBVSxHQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQUFDLEFBdFVELElBc1VDO0lBdFVZLGtCQUFHIn0=