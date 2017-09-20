define(["require", "exports"], function (require, exports) {
    "use strict";
    function createBinding(expression, context) {
        return new BindingId(expression, context);
    }
    exports.createBinding = createBinding;
    function createRuntimeBinding(expression, context, runtime = context) {
        return new RuntimeBindingId(createBinding(expression, context), runtime);
    }
    exports.createRuntimeBinding = createRuntimeBinding;
    function mapToJson(map) {
        let obj = Object.create(null);
        map.forEach((value, key) => {
            obj[key] = value;
        });
        return JSON.stringify(obj);
    }
    class BindingId {
        constructor(expression, contextUrl, extensions = new Map()) {
            this.expression = expression;
            this.contextUrl = contextUrl;
            this.extensions = extensions;
        }
        equals(other) {
            return this.expression === other.expression && this.contextUrl === other.contextUrl;
        }
        toJSON() {
            return `
            {
                "expression": ${JSON.stringify(this.expression)},
                "contextUrl": ${JSON.stringify(this.contextUrl)},
                "extensions": ${mapToJson(this.extensions)}
            } 
        `;
        }
    }
    exports.BindingId = BindingId;
    class RuntimeBindingId {
        constructor(binding, runtimeUrl, extensions = new Map()) {
            this.binding = binding;
            this.runtimeUrl = runtimeUrl;
            this.extensions = extensions;
        }
        equals(other) {
            return this.binding.equals(other.binding) && this.runtimeUrl === other.runtimeUrl;
        }
        toJSON() {
            return `
            {
                "binding": ${this.binding.toJSON()},
                "runtimeUrl": ${JSON.stringify(this.runtimeUrl)},
                "extensions": ${mapToJson(this.extensions)}
            } 
        `;
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
        toJSON() {
            return "";
        }
        ;
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
        toJSON() {
            return `
            {
                "type": ${JSON.stringify(this.type)}, 
                "id": ${JSON.stringify(this.id)},
                "runtimeBinding": ${this.runtimeBinding.toJSON()},
                "detailed": ${JSON.stringify(this.detailed)}
            } 
        `;
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
        toJSON() {
            return `
            {
                "type": ${JSON.stringify(this.type)}, 
                "id": ${JSON.stringify(this.id)},
                "runtimeBinding": ${this.runtimeBinding.toJSON()},
                "detailed": ${JSON.stringify(this.detailed)}
            } 
        `;
        }
    }
    exports.ListeningRequest = ListeningRequest;
    /**
     * Class used to send assignation request.
     */
    class AssignationRequest extends Message {
        constructor(id, left, right, value, detailed) {
            super(id, "AssignationRequest");
            this.id = id;
            this.left = left;
            this.right = right;
            this.value = value;
            this.detailed = detailed;
        }
        toJSON() {
            return `
            {
                "type": ${JSON.stringify(this.type)}, 
                "id": ${JSON.stringify(this.id)},
                "left": ${this.left.toJSON()},
                "right": ${this.right !== null ? this.right.toJSON() : null},
                "value": ${JSON.stringify(this.value)},
                "detailed": ${JSON.stringify(this.detailed)}
            } 
        `;
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
                if (e.currentTarget != null) {
                    // parses the response
                    let message = JSON.parse(e.currentTarget["result"]);
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
                let wsHost;
                if (this.host.length > 0) {
                    wsHost = this.host.search("https\\://") == 0 ?
                        this.host.replace(new RegExp("https\\://"), "wss://") + "/websocket" :
                        this.host.replace(new RegExp("http\\://"), "ws://") + "/websocket";
                }
                else {
                    wsHost = document.location.protocol === "https" ?
                        "wss://" + document.location.host + "/websocket" :
                        "ws://" + document.location.host + "/websocket";
                }
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
            let json = message.toJSON();
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
            let request;
            if (right instanceof RuntimeBindingId) {
                request = new AssignationRequest(id, left, right, null, detailed);
            }
            else {
                request = new AssignationRequest(id, left, null, right, detailed);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBR0EsdUJBQThCLFVBQWtCLEVBQUUsT0FBZTtRQUM3RCxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFGRCxzQ0FFQztJQUVELDhCQUFxQyxVQUFrQixFQUFFLE9BQWUsRUFBRSxVQUFpQixPQUFPO1FBQzlGLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUZELG9EQUVDO0lBRUQsbUJBQW1CLEdBQXdCO1FBQ3ZDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHO1lBQ25CLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7UUFDSSxZQUNXLFVBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLGFBQWtDLElBQUksR0FBRyxFQUFrQjtZQUYzRCxlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUQ7UUFDbEUsQ0FBQztRQUVFLE1BQU0sQ0FBQyxLQUFtQjtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN4RixDQUFDO1FBRU0sTUFBTTtZQUNULE1BQU0sQ0FBQzs7Z0NBRWlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQ0FDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dDQUMvQixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7U0FFakQsQ0FBQztRQUNOLENBQUM7S0FDSjtJQXBCRCw4QkFvQkM7SUFFRDtRQUNJLFlBQ1csT0FBcUIsRUFDckIsVUFBa0IsRUFDbEIsYUFBa0MsSUFBSSxHQUFHLEVBQWtCO1lBRjNELFlBQU8sR0FBUCxPQUFPLENBQWM7WUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFpRDtRQUNsRSxDQUFDO1FBRUUsTUFBTSxDQUFDLEtBQTBCO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3RGLENBQUM7UUFFTSxNQUFNO1lBQ1QsTUFBTSxDQUFDOzs2QkFFYyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQ0FDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dDQUMvQixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7U0FFakQsQ0FBQztRQUNOLENBQUM7S0FDSjtJQXBCRCw0Q0FvQkM7SUFFRDs7T0FFRztJQUNIO1FBQ0ksWUFDVyxFQUFVLEVBQ1YsSUFBWTtZQURaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ25CLENBQUM7UUFFRSxNQUFNO1lBQ1gsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNaLENBQUM7UUFBQSxDQUFDO0tBQ0w7SUFURCwwQkFTQztJQUVEOztPQUVHO0lBQ0gsdUJBQStCLFNBQVEsT0FBTztRQUUxQyxZQUNXLEVBQVUsRUFDVixjQUFxQyxFQUNyQyxRQUFpQjtZQUV4QixLQUFLLENBQUMsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFKeEIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtZQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBRzNCLENBQUM7UUFFTSxNQUFNO1lBQ1YsTUFBTSxDQUFDOzswQkFFVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQ0FDWCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTs4QkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztTQUVsRCxDQUFDO1FBQ04sQ0FBQztLQUNKO0lBcEJELDhDQW9CQztJQUVEOztPQUVHO0lBQ0gsc0JBQThCLFNBQVEsT0FBTztRQUV6QyxZQUNXLEVBQVUsRUFDVixjQUFxQyxFQUNyQyxRQUFpQjtZQUV4QixLQUFLLENBQUMsRUFBRSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFKdkIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtZQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBR3hCLENBQUM7UUFFRSxNQUFNO1lBQ1QsTUFBTSxDQUFDOzswQkFFVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQ0FDWCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTs4QkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztTQUVsRCxDQUFDO1FBQ04sQ0FBQztLQUNKO0lBcEJELDRDQW9CQztJQUVEOztPQUVHO0lBQ0gsd0JBQWdDLFNBQVEsT0FBTztRQUUzQyxZQUNXLEVBQVUsRUFDVixJQUEyQixFQUMzQixLQUFpQyxFQUNqQyxLQUFrQixFQUNsQixRQUFpQjtZQUV4QixLQUFLLENBQUMsRUFBRSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFOekIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUksR0FBSixJQUFJLENBQXVCO1lBQzNCLFVBQUssR0FBTCxLQUFLLENBQTRCO1lBQ2pDLFVBQUssR0FBTCxLQUFLLENBQWE7WUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUczQixDQUFDO1FBRUssTUFBTTtZQUNULE1BQU0sQ0FBQzs7MEJBRVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7MEJBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOzJCQUNqQixJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUk7MkJBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs4QkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztTQUVsRCxDQUFDO1FBQ04sQ0FBQztLQUNKO0lBeEJELGdEQXdCQztJQUVEOztPQUVHO0lBQ0gsY0FBc0IsU0FBUSxPQUFPO1FBRWpDLFlBQ1csRUFBVSxFQUNWLE1BQWMsRUFDZCxLQUFhO1lBRXBCLEtBQUssQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFKZixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUNkLFVBQUssR0FBTCxLQUFLLENBQVE7UUFHeEIsQ0FBQztLQUNKO0lBVEQsNEJBU0M7SUFFRDs7T0FFRztJQUNILGlCQUF5QixTQUFRLE9BQU87UUFDcEMsWUFDVyxjQUFxQyxFQUNyQyxLQUFhO1lBRXBCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUhsQixtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7WUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUd2QixDQUFDO0tBQ0w7SUFQRCxrQ0FPQztJQUVEOztPQUVHO0lBQ0g7UUFDSSxZQUNXLFVBQXVCLEVBQ3ZCLFFBQTBCLEVBQzFCLE9BQWdCO1lBRmhCLGVBQVUsR0FBVixVQUFVLENBQWE7WUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7WUFDMUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUN2QixDQUFDO0tBQ1I7SUFNRDs7T0FFRztJQUNIO1FBQ0ksWUFDVyxLQUFlLEVBQ2YsT0FBZSxFQUNmLE1BQW9CO1lBRnBCLFVBQUssR0FBTCxLQUFLLENBQVU7WUFDZixZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUUvQixDQUFDO0tBQ0o7SUFQRCxrQkFPQztJQUlEOzs7Ozs7O09BT0c7SUFDSDtRQXFCSSxZQUNZLE9BQWUsRUFBRTtZQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO1lBakI3Qiw2REFBNkQ7WUFDckQsaUJBQVksR0FBYyxFQUFFLENBQUM7WUFFckMsNENBQTRDO1lBQ3BDLDJCQUFzQixHQUF3QyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWhGLHFDQUFxQztZQUM3QiwwQkFBcUIsR0FBVyxDQUFDLENBQUM7WUFFMUMsMkJBQTJCO1lBQ25CLHFCQUFnQixHQUFpRCxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRW5GLG9CQUFvQjtZQUNaLGlCQUFZLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7UUFPbkQsQ0FBQztRQUVNLElBQUksQ0FBSSxJQUFZLEVBQUUsU0FBaUIsS0FBSztZQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBSSxDQUFDLFVBQVUsRUFBRSxRQUFRO2dCQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBSSxDQUFDLENBQUMsQ0FBQzs0QkFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQzVDLFVBQVUsQ0FBSSxJQUFJLENBQUMsQ0FBQzs0QkFDcEIsTUFBTSxDQUFDO3dCQUNYLENBQUM7d0JBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakMsQ0FBQztnQkFDTCxDQUFDLENBQUE7Z0JBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSyxtQkFBbUIsQ0FBQyxLQUFtQjtZQUMzQywyQ0FBMkM7WUFDM0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBZ0I7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsc0JBQXNCO29CQUN0QixJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDN0QsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ25CLEtBQUssVUFBVSxFQUFFLENBQUM7NEJBQ2QsSUFBSSxRQUFRLEdBQWEsT0FBTyxDQUFDOzRCQUNqQyxpQ0FBaUM7NEJBQ2pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUMzRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dDQUNWLDhCQUE4QjtnQ0FDOUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBRWhELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQ0FDMUIsMkNBQTJDO29DQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29DQUMzQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDckMsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDSixzQ0FBc0M7b0NBQ3RDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN4QyxDQUFDOzRCQUVMLENBQUM7NEJBQ0QsS0FBSyxDQUFDO3dCQUNWLENBQUM7d0JBQ0QsS0FBSyxhQUFhLEVBQUUsQ0FBQzs0QkFDakIsSUFBSSxLQUFLLEdBQWdCLE9BQU8sQ0FBQzs0QkFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBRSxDQUFDLEtBQUs7Z0NBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNwQixDQUFDOzRCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQyxDQUFBO1lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7V0FHRztRQUNJLGdCQUFnQixDQUFDLEtBQW1CO1lBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWhELDRCQUE0QjtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2dCQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7O1dBRUc7UUFDSyxpQkFBaUI7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFbkIsMkRBQTJEO1lBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRDs7V0FFRztRQUNLLHlCQUF5QjtZQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksTUFBTSxDQUFDO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO3dCQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxZQUFZO3dCQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUE7Z0JBQzFFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLE9BQU87d0JBQzNDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxZQUFZO3dCQUNoRCxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUN4RCxDQUFDO2dCQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBYyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFjLEtBQUssSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pELENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBRU0sV0FBVyxDQUFJLE9BQWdCO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsd0NBQXdDO2dCQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5Qix3QkFBd0I7b0JBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixpQ0FBaUM7b0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0wsQ0FBQztZQUVELGlEQUFpRDtZQUNqRCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUTtnQkFDdkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFHLElBQUksaUJBQWlCLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZHLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUdEOzs7V0FHRztRQUNLLGdCQUFnQixDQUFDLE9BQWdCO1lBQ3JDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDTCxDQUFDO1FBRU8sc0JBQXNCLENBQUMsT0FBOEI7WUFDekQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksZ0JBQWdCLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNJLFFBQVEsQ0FBSSxjQUFtQyxFQUFFLFdBQW9CLEtBQUs7WUFDN0UsNkNBQTZDO1lBQzdDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBRWpDLG1DQUFtQztZQUNuQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUdEOzs7Ozs7Ozs7V0FTRztRQUNJLE1BQU0sQ0FBSSxJQUF5QixFQUFFLEtBQWlDLEVBQUUsV0FBb0IsS0FBSztZQUNwRyw2Q0FBNkM7WUFDN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFFOUMsbUNBQW1DO1lBQ25DLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3RDLElBQUksT0FBTyxDQUFDO1lBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBVSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUUsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0ksaUJBQWlCLENBQUMsT0FBOEIsRUFBRSxRQUF5QjtZQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNJLG9CQUFvQixDQUFDLE9BQThCLEVBQUUsUUFBeUI7WUFDakYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFRDs7O1dBR0c7UUFDSSxxQkFBcUIsQ0FBQyxPQUE4QjtZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksY0FBYyxDQUFDLFFBQXFCO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7O1dBR0c7UUFDSSxpQkFBaUIsQ0FBQyxRQUFxQjtZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxHQUFHLENBQUMsS0FBZSxFQUFFLE9BQWUsRUFBRSxTQUF1QixJQUFJO1lBQ3BFLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDOUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVEOzs7V0FHRztRQUNJLGVBQWU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7V0FHRztRQUNJLFNBQVM7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksSUFBSSxDQUFDLFFBQXlCO1lBQ2pDLElBQUksSUFBWSxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksR0FBRyxRQUFRLENBQUE7WUFDbkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksR0FBZSxRQUFTLENBQUMsR0FBRyxDQUFBO1lBQ3BDLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBVyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVEOzs7V0FHRztRQUNJLGtCQUFrQjtZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksVUFBVTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUNKO0lBclZELGtCQXFWQyJ9