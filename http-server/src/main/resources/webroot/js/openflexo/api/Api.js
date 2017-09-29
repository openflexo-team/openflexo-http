define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                                    entry[1](event.value);
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
                    wsHost = document.location.protocol === "https:" ?
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
            // connects the WebSocket if not already done
            let connie = this.initializeConnieEvaluator();
            // act depending on the WebSocket status
            if (connie.readyState == 1) {
                // sends the binding now
                this.readySendMessage(message);
            }
            else {
                // sends when the socket is ready
                this.messageQueue.push(message);
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
         * @param detalied if true presents detailed results.
         * @return a Promise for evaluated binding.
         */
        evaluate(runtimeBinding, detailed = false) {
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
         * Adds a listener for binding changes. It sends a value the first time it's
         * received.
         * @param binding binding change to listen to
         * @param listener callback
         */
        addChangeListener(binding, listener) {
            this.bindingListeners.add([binding, listener]);
            let promise = this.sendMessage(this.createListeningMessage(binding));
            promise.then(value => listener(value));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBLHVCQUE4QixVQUFrQixFQUFFLE9BQWU7UUFDN0QsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRkQsc0NBRUM7SUFFRCw4QkFBcUMsVUFBa0IsRUFBRSxPQUFlLEVBQUUsVUFBaUIsT0FBTztRQUM5RixNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFGRCxvREFFQztJQUVELG1CQUFtQixHQUF3QjtRQUN2QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRztZQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEO1FBQ0ksWUFDVyxVQUFrQixFQUNsQixVQUFrQixFQUNsQixhQUFrQyxJQUFJLEdBQUcsRUFBa0I7WUFGM0QsZUFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlEO1FBQ2xFLENBQUM7UUFFRSxNQUFNLENBQUMsS0FBbUI7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDeEYsQ0FBQztRQUVNLE1BQU07WUFDVCxNQUFNLENBQUM7O2dDQUVp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