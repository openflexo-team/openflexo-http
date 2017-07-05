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
     * Class used for received evaluation response
     */
    var EvaluationResponse = (function (_super) {
        __extends(EvaluationResponse, _super);
        function EvaluationResponse(id, result, error) {
            var _this = _super.call(this, id, "EvaluationResponse") || this;
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
            this.messageQueue = [];
            this.pendingEvaluationQueue = new Map();
            this.evaluationRequestSeed = 0;
            this.bindingListeners = new Set();
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
                        case "EvaluationResponse": {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFHQSxpQkFBd0IsVUFBa0IsRUFBRSxPQUFlO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUZELDBCQUVDO0lBRUQsd0JBQStCLFVBQWtCLEVBQUUsT0FBZSxFQUFFLE9BQWM7UUFDOUUsTUFBTSxDQUFDLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRkQsd0NBRUM7SUFFRDtRQUNJLG1CQUNXLFVBQWtCLEVBQ2xCLFVBQWtCO1lBRGxCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN6QixDQUFDO1FBRUUsMEJBQU0sR0FBYixVQUFjLEtBQWdCO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3hGLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFURCxJQVNDO0lBVFksOEJBQVM7SUFXdEI7UUFDSSwwQkFDVyxPQUFrQixFQUNsQixVQUFrQjtZQURsQixZQUFPLEdBQVAsT0FBTyxDQUFXO1lBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDekIsQ0FBQztRQUVFLGlDQUFNLEdBQWIsVUFBYyxLQUF1QjtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN0RixDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQUFDLEFBVEQsSUFTQztJQVRZLDRDQUFnQjtJQVc3Qjs7T0FFRztJQUNIO1FBQ0ksaUJBQ1csRUFBVSxFQUNWLElBQVk7WUFEWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNuQixDQUFDO1FBQ1QsY0FBQztJQUFELENBQUMsQUFMRCxJQUtDO0lBTFksMEJBQU87SUFPcEI7O09BRUc7SUFDSDtRQUF1QyxxQ0FBTztRQUUxQywyQkFDVyxFQUFVLEVBQ1YsY0FBZ0MsRUFDaEMsUUFBaUI7WUFINUIsWUFLSSxrQkFBTSxFQUFFLEVBQUUsbUJBQW1CLENBQUMsU0FDaEM7WUFMUyxRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1Ysb0JBQWMsR0FBZCxjQUFjLENBQWtCO1lBQ2hDLGNBQVEsR0FBUixRQUFRLENBQVM7O1FBRzNCLENBQUM7UUFDTix3QkFBQztJQUFELENBQUMsQUFURCxDQUF1QyxPQUFPLEdBUzdDO0lBVFksOENBQWlCO0lBVzlCOztPQUVHO0lBQ0g7UUFBd0Msc0NBQU87UUFFM0MsNEJBQ1csRUFBVSxFQUNWLElBQXNCLEVBQ3RCLEtBQXVCLEVBQ3ZCLFFBQWlCO1lBSjVCLFlBTUksa0JBQU0sRUFBRSxFQUFFLG9CQUFvQixDQUFDLFNBQ2pDO1lBTlMsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFVBQUksR0FBSixJQUFJLENBQWtCO1lBQ3RCLFdBQUssR0FBTCxLQUFLLENBQWtCO1lBQ3ZCLGNBQVEsR0FBUixRQUFRLENBQVM7O1FBRzNCLENBQUM7UUFDTix5QkFBQztJQUFELENBQUMsQUFWRCxDQUF3QyxPQUFPLEdBVTlDO0lBVlksZ0RBQWtCO0lBWS9COztPQUVHO0lBQ0g7UUFBd0Msc0NBQU87UUFFM0MsNEJBQ1csRUFBVSxFQUNWLE1BQWMsRUFDZCxLQUFhO1lBSHhCLFlBS0ksa0JBQU0sRUFBRSxFQUFFLG9CQUFvQixDQUFDLFNBQ2xDO1lBTFUsUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFlBQU0sR0FBTixNQUFNLENBQVE7WUFDZCxXQUFLLEdBQUwsS0FBSyxDQUFROztRQUd4QixDQUFDO1FBQ0wseUJBQUM7SUFBRCxDQUFDLEFBVEQsQ0FBd0MsT0FBTyxHQVM5QztJQVRZLGdEQUFrQjtJQVcvQjs7T0FFRztJQUNIO1FBQWlDLCtCQUFPO1FBQ3BDLHFCQUNXLGNBQWdDLEVBQ2hDLEtBQWE7WUFGeEIsWUFJSSxrQkFBTSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsU0FDMUI7WUFKUyxvQkFBYyxHQUFkLGNBQWMsQ0FBa0I7WUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTs7UUFHdkIsQ0FBQztRQUNOLGtCQUFDO0lBQUQsQ0FBQyxBQVBELENBQWlDLE9BQU8sR0FPdkM7SUFQWSxrQ0FBVztJQVN4Qjs7T0FFRztJQUNIO1FBQ0ksMkJBQ1csVUFBdUIsRUFDdkIsUUFBMEIsRUFDMUIsT0FBZ0I7WUFGaEIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtZQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUMxQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ3ZCLENBQUM7UUFDVCx3QkFBQztJQUFELENBQUMsQUFORCxJQU1DO0lBTUQ7O09BRUc7SUFDSDtRQUNJLGFBQ1csS0FBZSxFQUNmLE9BQWUsRUFDZixNQUFvQjtZQUZwQixVQUFLLEdBQUwsS0FBSyxDQUFVO1lBQ2YsWUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLFdBQU0sR0FBTixNQUFNLENBQWM7UUFFL0IsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQUFDLEFBUEQsSUFPQztJQVBZLGtCQUFHO0lBV2hCOzs7Ozs7O09BT0c7SUFDSDtRQVlJLGFBQ1ksSUFBaUI7WUFBakIscUJBQUEsRUFBQSxTQUFpQjtZQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO1lBVnJCLGlCQUFZLEdBQWMsRUFBRSxDQUFDO1lBQzdCLDJCQUFzQixHQUF3QyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRXhFLDBCQUFxQixHQUFXLENBQUMsQ0FBQztZQUVsQyxxQkFBZ0IsR0FBNEMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUV0RSxpQkFBWSxHQUFxQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBTW5ELENBQUM7UUFFTSxrQkFBSSxHQUFYLFVBQWUsSUFBWSxFQUFFLE1BQXNCO1lBQW5ELGlCQW1CQztZQW5CNEIsdUJBQUEsRUFBQSxjQUFzQjtZQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLFVBQVUsRUFBRSxRQUFRO2dCQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLENBQUMsTUFBTSxHQUFHLFVBQUMsRUFBRTtvQkFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBSSxDQUFDLENBQUMsQ0FBQzs0QkFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQzVDLFVBQVUsQ0FBSSxJQUFJLENBQUMsQ0FBQzs0QkFDcEIsTUFBTSxDQUFDO3dCQUNYLENBQUM7d0JBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakMsQ0FBQztnQkFDTCxDQUFDLENBQUE7Z0JBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxpQ0FBbUIsR0FBM0IsVUFBNEIsS0FBbUI7WUFBL0MsaUJBeUNDO1lBeENHLDJDQUEyQztZQUMzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBQyxDQUFnQjtnQkFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2QixzQkFBc0I7b0JBQ3RCLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsS0FBSyxvQkFBb0IsRUFBRSxDQUFDOzRCQUN4QixJQUFJLFFBQVEsR0FBdUIsT0FBTyxDQUFDOzRCQUMzQyxpQ0FBaUM7NEJBQ2pDLElBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUMzRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dDQUNWLDhCQUE4QjtnQ0FDOUIsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFFBQU0sQ0FBQSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FFaEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29DQUMxQiwyQ0FBMkM7b0NBQzNDLEtBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7b0NBQzNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNyQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLHNDQUFzQztvQ0FDdEMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29DQUN0QyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDeEMsQ0FBQzs0QkFFTCxDQUFDOzRCQUNELEtBQUssQ0FBQzt3QkFDVixDQUFDO3dCQUNELEtBQUssYUFBYSxFQUFFLENBQUM7NEJBQ2pCLElBQUksT0FBSyxHQUFnQixPQUFPLENBQUM7NEJBQ2pDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUUsVUFBQyxPQUFPLEVBQUUsUUFBUTtnQ0FDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUMxQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFDLENBQUM7Z0NBQ3RCLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksOEJBQWdCLEdBQXZCLFVBQXdCLEtBQW1CO1lBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWhELDRCQUE0QjtZQUM1QixHQUFHLENBQUMsQ0FBZ0IsVUFBaUIsRUFBakIsS0FBQSxJQUFJLENBQUMsWUFBWSxFQUFqQixjQUFpQixFQUFqQixJQUFpQjtnQkFBaEMsSUFBSSxPQUFPLFNBQUE7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFFRDs7V0FFRztRQUNLLCtCQUFpQixHQUF6QjtZQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7V0FFRztRQUNLLHVDQUF5QixHQUFqQztZQUFBLGlCQVlDO1lBWEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLENBQUM7b0JBQ3JELE1BQU0sR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBRTlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQUMsQ0FBYyxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUF4QixDQUF3QixDQUFDO2dCQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFDLENBQWMsSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUF4QixDQUF3QixDQUFDO1lBQ3pELENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBRU0seUJBQVcsR0FBbEIsVUFBc0IsT0FBZ0I7WUFBdEMsaUJBZ0JDO1lBZkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0Qix3Q0FBd0M7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLHdCQUF3QjtvQkFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLGlDQUFpQztvQkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7WUFDTCxDQUFDO1lBRUQsaURBQWlEO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBSSxVQUFDLFVBQVUsRUFBRSxRQUFRO2dCQUN2QyxLQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUcsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkcsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0Q7OztXQUdHO1FBQ0ssOEJBQWdCLEdBQXhCLFVBQXlCLE9BQWdCO1lBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSSxzQkFBUSxHQUFmLFVBQW1CLGNBQWdDLEVBQUUsUUFBeUI7WUFBekIseUJBQUEsRUFBQSxnQkFBeUI7WUFDMUUsNkNBQTZDO1lBQzdDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBRWpDLG1DQUFtQztZQUNuQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUdEOzs7Ozs7Ozs7V0FTRztRQUNJLG9CQUFNLEdBQWIsVUFBaUIsSUFBc0IsRUFBRSxLQUF1QixFQUFFLFFBQXlCO1lBQXpCLHlCQUFBLEVBQUEsZ0JBQXlCO1lBQ3ZGLDZDQUE2QztZQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUU5QyxtQ0FBbUM7WUFDbkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLCtCQUFpQixHQUF4QixVQUF5QixPQUF5QixFQUFFLFFBQXlCO1lBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGtDQUFvQixHQUEzQixVQUE0QixPQUF5QixFQUFFLFFBQXlCO1lBQzVFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFNLENBQUEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFRDs7O1dBR0c7UUFDSSxtQ0FBcUIsR0FBNUIsVUFBNkIsT0FBeUI7WUFBdEQsaUJBTUM7WUFMRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFNLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVEOzs7V0FHRztRQUNJLDRCQUFjLEdBQXJCLFVBQXNCLFFBQXFCO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7O1dBR0c7UUFDSSwrQkFBaUIsR0FBeEIsVUFBeUIsUUFBcUI7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFNLENBQUEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxpQkFBRyxHQUFWLFVBQVcsS0FBZSxFQUFFLE9BQWUsRUFBRSxNQUFvQjtZQUM3RCxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDOUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVEOzs7V0FHRztRQUNJLDZCQUFlLEdBQXRCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7V0FHRztRQUNJLHVCQUFTLEdBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7V0FHRztRQUNJLGtCQUFJLEdBQVgsVUFBWSxRQUF5QjtZQUNqQyxJQUFJLElBQVksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLEdBQUcsUUFBUSxDQUFBO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQWUsUUFBUyxDQUFDLEdBQUcsQ0FBQTtZQUNwQyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRDs7O1dBR0c7UUFDSSxnQ0FBa0IsR0FBekI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksd0JBQVUsR0FBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDTCxVQUFDO0lBQUQsQ0FBQyxBQXhURCxJQXdUQztJQXhUWSxrQkFBRyJ9