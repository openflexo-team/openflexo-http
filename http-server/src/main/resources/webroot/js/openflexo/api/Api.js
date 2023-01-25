define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Api = exports.Log = exports.ChangeEvent = exports.Response = exports.AssignationRequest = exports.ListeningRequest = exports.EvaluationRequest = exports.Message = exports.RuntimeBindingId = exports.BindingId = exports.createExtendedRuntimeBinding = exports.createRuntimeBinding = exports.createBinding = void 0;
    function createBinding(expression, context, extensions = new Map()) {
        return new BindingId(expression, context, extensions);
    }
    exports.createBinding = createBinding;
    function createRuntimeBinding(expression, context, runtime = context) {
        return new RuntimeBindingId(createBinding(expression, context), runtime);
    }
    exports.createRuntimeBinding = createRuntimeBinding;
    function createExtendedRuntimeBinding(expression, context, extensions = new Map()) {
        return new RuntimeBindingId(createBinding(expression, context, extensions), context, extensions);
    }
    exports.createExtendedRuntimeBinding = createExtendedRuntimeBinding;
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
            /* Commented, it creates huge memory footprint and problems when the server restarts
                We need to find a solution for this.
            this.bindingListeners.forEach(e => {
                this.sendMessage(this.createListeningMessage(e[0]));
            })
            */
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
            promise.then(value => listener(value)).catch(error => this.log("info", error));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFHQSxTQUFnQixhQUFhLENBQUMsVUFBa0IsRUFBRSxPQUFlLEVBQUUsYUFBa0MsSUFBSSxHQUFHLEVBQWtCO1FBQzFILE9BQU8sSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRkQsc0NBRUM7SUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFrQixFQUFFLE9BQWUsRUFBRSxVQUFrQixPQUFPO1FBQy9GLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFGRCxvREFFQztJQUVELFNBQWdCLDRCQUE0QixDQUFDLFVBQWtCLEVBQUUsT0FBZSxFQUFFLGFBQWtDLElBQUksR0FBRyxFQUFrQjtRQUN6SSxPQUFPLElBQUksZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFGRCxvRUFFQztJQUVELFNBQVMsU0FBUyxDQUFDLEdBQXdCO1FBQ3ZDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFhLFNBQVM7UUFDbEIsWUFDVyxVQUFrQixFQUNsQixVQUFrQixFQUNsQixhQUFrQyxJQUFJLEdB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