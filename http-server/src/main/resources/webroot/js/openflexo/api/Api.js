define(["require", "exports"], function (require, exports) {
    "use strict";
    function binding(expression, context) {
        return new BindingId(expression, context);
    }
    exports.binding = binding;
    function runtimeBinding(expression, context, runtime = context) {
        return new RuntimeBindingId(binding(expression, context), runtime);
    }
    exports.runtimeBinding = runtimeBinding;
    class BindingId {
        constructor(expression, contextUrl) {
            this.expression = expression;
            this.contextUrl = contextUrl;
        }
        equals(other) {
            return this.expression === other.expression && this.contextUrl === other.contextUrl;
        }
    }
    exports.BindingId = BindingId;
    class RuntimeBindingId {
        constructor(binding, runtimeUrl) {
            this.binding = binding;
            this.runtimeUrl = runtimeUrl;
        }
        equals(other) {
            return this.binding.equals(other.binding) && this.runtimeUrl === other.runtimeUrl;
        }
    }
    exports.RuntimeBindingId = RuntimeBindingId;
    /**
     * TODO
     */
    class Message {
        constructor(id, type) {
            this.id = id;
            this.type = type;
        }
    }
    exports.Message = Message;
    /**
     * Class used to send evaluation request.
     */
    class EvaluationRequest extends Message {
        constructor(id, runtimeBinding, detailed) {
            super(id, "EvaluationRequest");
            this.id = id;
            this.runtimeBinding = runtimeBinding;
            this.detailed = detailed;
        }
    }
    exports.EvaluationRequest = EvaluationRequest;
    /**
     * Class used to send listening request.
     */
    class ListeningRequest extends Message {
        constructor(id, runtimeBinding, detailed) {
            super(id, "ListeningRequest");
            this.id = id;
            this.runtimeBinding = runtimeBinding;
            this.detailed = detailed;
        }
    }
    exports.ListeningRequest = ListeningRequest;
    /**
     * Class used to send assignation request.
     */
    class AssignationRequest extends Message {
        constructor(id, left, right, detailed) {
            super(id, "AssignationRequest");
            this.id = id;
            this.left = left;
            this.right = right;
            this.detailed = detailed;
        }
    }
    exports.AssignationRequest = AssignationRequest;
    /**
     * Class used for received response
     */
    class Response extends Message {
        constructor(id, result, error) {
            super(id, "Response");
            this.id = id;
            this.result = result;
            this.error = error;
        }
    }
    exports.Response = Response;
    /**
     * Class used when a binding is changed
     */
    class ChangeEvent extends Message {
        constructor(runtimeBinding, value) {
            super(-1, "ChangeEvent");
            this.runtimeBinding = runtimeBinding;
            this.value = value;
        }
    }
    exports.ChangeEvent = ChangeEvent;
    /**
     * Currently pending evaluations
     */
    class PendingEvaluation {
        constructor(fullfilled, rejected, request) {
            this.fullfilled = fullfilled;
            this.rejected = rejected;
            this.request = request;
        }
    }
    /**
     * Log from the OpenFlexo Api
     */
    class Log {
        constructor(level, message, source) {
            this.level = level;
            this.message = message;
            this.source = source;
        }
    }
    exports.Log = Log;
    /**
     * The Api class proposes methods to access an OpenFlexo server.
     *
     * It allows:
     *
     * - to receive type object from the REST API.
     * - evaluate binding using a WebSocket connection.
     */
    class Api {
        constructor(host = "") {
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
        call(path, method = "get") {
            const result = new Promise((fullfilled, rejected) => {
                let request = new XMLHttpRequest();
                request.open(method, this.host + path);
                request.onload = (ev) => {
                    if (request.status >= 200 && request.status < 300) {
                        var first = request.responseText.charAt(0);
                        if (first === '{' || first === '[') {
                            let json = JSON.parse(request.responseText);
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
        }
        /**
         * Listens to WebSocket messages. Messages can be:
         *
         * - result of EvaluationRequest
         * - <b>Not Supported yet</b> change notifications
         *
         * @param event
         */
        onEvaluationMessage(event) {
            // event contains a blob that needs reading
            let reader = new FileReader();
            reader.onloadend = (e) => {
                if (e.srcElement != null) {
                    // parses the response
                    let message = JSON.parse(e.srcElement["result"]);
                    switch (message.type) {
                        case "Response": {
                            let response = message;
                            // searches for the evaluation id
                            let pending = this.pendingEvaluationQueue.get(response.id);
                            if (pending) {
                                // found it, now it removes it
                                this.pendingEvaluationQueue.delete(response.id);
                                if (response.error !== null) {
                                    // rejects the promise if there is an error
                                    this.log("error", response.error, message);
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
                            let event = message;
                            this.bindingListeners.forEach((entry) => {
                                if (entry[0].equals(event.runtimeBinding)) {
                                    entry[1](event);
                                }
                            });
                        }
                    }
                }
            };
            reader.readAsText(event.data);
        }
        /**
         * Listens to Webocket open
         * @param event
         */
        onEvaluationOpen(event) {
            this.log("info", "Openned " + event.data, null);
            // evaluates pending request
            this.messageQueue.forEach(message => {
                this.readySendMessage(message);
            });
        }
        /**
         * Listens to WebSocket close
         */
        onEvaluationClose() {
            this.log("warning", "Websocket is closed", null);
            this.connie = null;
            // registers listening messages when the connection resumes
            this.bindingListeners.forEach(e => {
                this.sendMessage(this.createListeningMessage(e[0]));
            });
        }
        /**
         * Internal connie WebSocket
         */
        initializeConnieEvaluator() {
            if (this.connie == null) {
                var wsHost = this.host.length > 0 ?
                    this.host.replace(new RegExp("https?\\://"), "ws://") :
                    wsHost = "ws://" + document.location.host;
                this.connie = new WebSocket(wsHost);
                this.connie.onopen = (e) => this.onEvaluationOpen(e);
                this.connie.onmessage = (e) => this.onEvaluationMessage(e);
                this.connie.onclose = () => this.onEvaluationClose();
            }
            return this.connie;
        }
        sendMessage(message) {
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
            return new Promise((fullfilled, rejected) => {
                this.pendingEvaluationQueue.set(message.id, new PendingEvaluation(fullfilled, rejected, message));
            });
        }
        /**
         * Internal send evaluation request
         * @param mesage message to send
         */
        readySendMessage(message) {
            let json = JSON.stringify(message);
            if (this.connie != null) {
                this.connie.send(json);
            }
        }
        createListeningMessage(binding) {
            let id = this.evaluationRequestSeed++;
            return new ListeningRequest(id, binding, true);
        }
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
        evaluate(runtimeBinding, detailed = false) {
            // connects the WebSocket if not already done
            this.initializeConnieEvaluator();
            // creates a request for evaluation
            let id = this.evaluationRequestSeed++;
            let request = new EvaluationRequest(id, runtimeBinding, detailed);
            return this.sendMessage(request);
        }
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
        assign(left, right, detailed = false) {
            // connects the WebSocket if not already done
            let connie = this.initializeConnieEvaluator();
            // creates a request for evaluation
            let id = this.evaluationRequestSeed++;
            let request = new AssignationRequest(id, left, right, detailed);
            return this.sendMessage(request);
        }
        /**
         * Adds a listener for binding changes
         * @param binding binding change to listen to
         * @param listener callback
         */
        addChangeListener(binding, listener) {
            this.bindingListeners.add([binding, listener]);
            this.sendMessage(this.createListeningMessage(binding));
        }
        /**
         * Removes a listener for binding changes
         * @param binding binding change to listen to
         * @param listener callback
         */
        removeChangeListener(binding, listener) {
            this.bindingListeners.delete([binding, listener]);
        }
        /**
         * Removes all callbacks for the given binding
         * @param binding binding
         */
        removeChangeListeners(binding) {
            this.bindingListeners.forEach(e => {
                if (e[0].equals(binding)) {
                    this.bindingListeners.delete(e);
                }
            });
        }
        /**
         * Adds a log listener.
         * @param listener the callback
         */
        addLogListener(listener) {
            this.logListeners.add(listener);
        }
        /**
         * Removes a log listener.
         * @param listener the callback
         */
        removeLogListener(listener) {
            this.logListeners.delete(listener);
        }
        /**
         * Logs a message from the OpenFlexo System
         * @param level
         * @param message
         * @param binding
         */
        log(level, message, source = null) {
            let event = new Log(level, message, source);
            this.logListeners.forEach(listener => {
                listener(event);
            });
        }
        /**
         * Gets all registered resource centers
         * @return a Promise for all resource centers
         */
        resourceCenters() {
            return this.call("/rc");
        }
        /**
         * Gets all resources
         * @return a Promise for all resources
         */
        resources() {
            return this.call("/resource");
        }
        /**
         * Saves given resource
         * @param resource the resource to save an id or a description
         */
        save(resource) {
            let path;
            if (typeof resource === "string") {
                path = resource;
            }
            else {
                path = resource.url;
            }
            return this.call(path, "post");
        }
        /**
         * Gets all registered technology adapters
         * @return a Promise for all technology adapters
         */
        technologyAdapters() {
            return this.call("/ta");
        }
        /**
         * Gets all view points
         * @return a Promise for all view points
         */
        viewPoints() {
            return this.call("/ta/fml/viewpoint");
        }
    }
    exports.Api = Api;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBR0EsaUJBQXdCLFVBQWtCLEVBQUUsT0FBZTtRQUN2RCxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFGRCwwQkFFQztJQUVELHdCQUErQixVQUFrQixFQUFFLE9BQWUsRUFBRSxVQUFpQixPQUFPO1FBQ3hGLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUZELHdDQUVDO0lBRUQ7UUFDSSxZQUNXLFVBQWtCLEVBQ2xCLFVBQWtCO1lBRGxCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN6QixDQUFDO1FBRUUsTUFBTSxDQUFDLEtBQWdCO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3hGLENBQUM7S0FDSjtJQVRELDhCQVNDO0lBRUQ7UUFDSSxZQUNXLE9BQWtCLEVBQ2xCLFVBQWtCO1lBRGxCLFlBQU8sR0FBUCxPQUFPLENBQVc7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN6QixDQUFDO1FBRUUsTUFBTSxDQUFDLEtBQXVCO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3RGLENBQUM7S0FDSjtJQVRELDRDQVNDO0lBRUQ7O09BRUc7SUFDSDtRQUNJLFlBQ1csRUFBVSxFQUNWLElBQVk7WUFEWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNuQixDQUFDO0tBQ1I7SUFMRCwwQkFLQztJQUVEOztPQUVHO0lBQ0gsdUJBQStCLFNBQVEsT0FBTztRQUUxQyxZQUNXLEVBQVUsRUFDVixjQUFnQyxFQUNoQyxRQUFpQjtZQUV4QixLQUFLLENBQUMsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFKeEIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtZQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBRzNCLENBQUM7S0FDTDtJQVRELDhDQVNDO0lBRUQ7O09BRUc7SUFDSCxzQkFBOEIsU0FBUSxPQUFPO1FBRXJDLFlBQ1csRUFBVSxFQUNWLGNBQWdDLEVBQ2hDLFFBQWlCO1lBRXhCLEtBQUssQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUp2QixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1lBQ2hDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFHM0IsQ0FBQztLQUNMO0lBVEwsNENBU0s7SUFFTDs7T0FFRztJQUNILHdCQUFnQyxTQUFRLE9BQU87UUFFM0MsWUFDVyxFQUFVLEVBQ1YsSUFBc0IsRUFDdEIsS0FBdUIsRUFDdkIsUUFBaUI7WUFFeEIsS0FBSyxDQUFDLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBTHpCLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFJLEdBQUosSUFBSSxDQUFrQjtZQUN0QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtZQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBRzNCLENBQUM7S0FDTDtJQVZELGdEQVVDO0lBRUQ7O09BRUc7SUFDSCxjQUFzQixTQUFRLE9BQU87UUFFakMsWUFDVyxFQUFVLEVBQ1YsTUFBYyxFQUNkLEtBQWE7WUFFcEIsS0FBSyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUpmLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUd4QixDQUFDO0tBQ0o7SUFURCw0QkFTQztJQUVEOztPQUVHO0lBQ0gsaUJBQXlCLFNBQVEsT0FBTztRQUNwQyxZQUNXLGNBQWdDLEVBQ2hDLEtBQWE7WUFFcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBSGxCLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtZQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBR3ZCLENBQUM7S0FDTDtJQVBELGtDQU9DO0lBRUQ7O09BRUc7SUFDSDtRQUNJLFlBQ1csVUFBdUIsRUFDdkIsUUFBMEIsRUFDMUIsT0FBZ0I7WUFGaEIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtZQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUMxQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ3ZCLENBQUM7S0FDUjtJQU1EOztPQUVHO0lBQ0g7UUFDSSxZQUNXLEtBQWUsRUFDZixPQUFlLEVBQ2YsTUFBb0I7WUFGcEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtZQUNmLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBRS9CLENBQUM7S0FDSjtJQVBELGtCQU9DO0lBSUQ7Ozs7Ozs7T0FPRztJQUNIO1FBcUJJLFlBQ1ksT0FBZSxFQUFFO1lBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7WUFqQjdCLDZEQUE2RDtZQUNyRCxpQkFBWSxHQUFjLEVBQUUsQ0FBQztZQUVyQyw0Q0FBNEM7WUFDcEMsMkJBQXNCLEdBQXdDLElBQUksR0FBRyxFQUFFLENBQUM7WUFFaEYscUNBQXFDO1lBQzdCLDBCQUFxQixHQUFXLENBQUMsQ0FBQztZQUUxQywyQkFBMkI7WUFDbkIscUJBQWdCLEdBQTRDLElBQUksR0FBRyxFQUFFLENBQUM7WUFFOUUsb0JBQW9CO1lBQ1osaUJBQVksR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU9uRCxDQUFDO1FBRU0sSUFBSSxDQUFJLElBQVksRUFBRSxTQUFpQixLQUFLO1lBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxDQUFJLENBQUMsVUFBVSxFQUFFLFFBQVE7Z0JBQy9DLElBQUksT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDNUMsVUFBVSxDQUFJLElBQUksQ0FBQyxDQUFDOzRCQUNwQixNQUFNLENBQUM7d0JBQ1gsQ0FBQzt3QkFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqQyxDQUFDO2dCQUNMLENBQUMsQ0FBQTtnQkFDRCxPQUFPLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLG1CQUFtQixDQUFDLEtBQW1CO1lBQzNDLDJDQUEyQztZQUMzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFnQjtnQkFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2QixzQkFBc0I7b0JBQ3RCLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsS0FBSyxVQUFVLEVBQUUsQ0FBQzs0QkFDZCxJQUFJLFFBQVEsR0FBYSxPQUFPLENBQUM7NEJBQ2pDLGlDQUFpQzs0QkFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQzNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0NBQ1YsOEJBQThCO2dDQUM5QixJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FFaEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29DQUMxQiwyQ0FBMkM7b0NBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7b0NBQzNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNyQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLHNDQUFzQztvQ0FDdEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ3hDLENBQUM7NEJBRUwsQ0FBQzs0QkFDRCxLQUFLLENBQUM7d0JBQ1YsQ0FBQzt3QkFDRCxLQUFLLGFBQWEsRUFBRSxDQUFDOzRCQUNqQixJQUFJLEtBQUssR0FBZ0IsT0FBTyxDQUFDOzRCQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFFLENBQUMsS0FBSztnQ0FDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ3BCLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDLENBQUE7WUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksZ0JBQWdCLENBQUMsS0FBbUI7WUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFaEQsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRDs7V0FFRztRQUNLLGlCQUFpQjtZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUVuQiwyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVEOztXQUVHO1FBQ0sseUJBQXlCO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxDQUFDO29CQUNyRCxNQUFNLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUU5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQWMsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBYyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVNLFdBQVcsQ0FBSSxPQUFnQjtZQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLHdDQUF3QztnQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsd0JBQXdCO29CQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osaUNBQWlDO29CQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztZQUNMLENBQUM7WUFFRCxpREFBaUQ7WUFDakQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFJLENBQUMsVUFBVSxFQUFFLFFBQVE7Z0JBQ3ZDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2RyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFHRDs7O1dBR0c7UUFDSyxnQkFBZ0IsQ0FBQyxPQUFnQjtZQUNyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUM7UUFFTyxzQkFBc0IsQ0FBQyxPQUF5QjtZQUNwRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0ksUUFBUSxDQUFJLGNBQWdDLEVBQUUsV0FBb0IsS0FBSztZQUMxRSw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFFakMsbUNBQW1DO1lBQ25DLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBR0Q7Ozs7Ozs7OztXQVNHO1FBQ0ksTUFBTSxDQUFJLElBQXNCLEVBQUUsS0FBdUIsRUFBRSxXQUFvQixLQUFLO1lBQ3ZGLDZDQUE2QztZQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUU5QyxtQ0FBbUM7WUFDbkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLGlCQUFpQixDQUFDLE9BQXlCLEVBQUUsUUFBeUI7WUFDekUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSxvQkFBb0IsQ0FBQyxPQUF5QixFQUFFLFFBQXlCO1lBQzVFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQ7OztXQUdHO1FBQ0kscUJBQXFCLENBQUMsT0FBeUI7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVEOzs7V0FHRztRQUNJLGNBQWMsQ0FBQyxRQUFxQjtZQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksaUJBQWlCLENBQUMsUUFBcUI7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ksR0FBRyxDQUFDLEtBQWUsRUFBRSxPQUFlLEVBQUUsU0FBdUIsSUFBSTtZQUNwRSxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVE7Z0JBQzlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRDs7O1dBR0c7UUFDSSxlQUFlO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRDs7O1dBR0c7UUFDSSxTQUFTO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7V0FHRztRQUNJLElBQUksQ0FBQyxRQUF5QjtZQUNqQyxJQUFJLElBQVksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLEdBQUcsUUFBUSxDQUFBO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQWUsUUFBUyxDQUFDLEdBQUcsQ0FBQTtZQUNwQyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRDs7O1dBR0c7UUFDSSxrQkFBa0I7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7V0FHRztRQUNJLFVBQVU7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FDSjtJQXpVRCxrQkF5VUMifQ==