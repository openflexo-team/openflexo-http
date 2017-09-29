import { Description } from "./general"
import { TechnologyAdapter, Resource, ResourceCenter } from "./resource"

export function createBinding(expression: string, context: string) {
    return new BindingId(expression, context);
}

export function createRuntimeBinding(expression: string, context: string, runtime:string = context) {
    return new RuntimeBindingId(createBinding(expression, context), runtime);
}

function mapToJson(map: Map<string, string>) {
    let obj = Object.create(null);
    map.forEach((value, key) => {
        obj[key] = value;
    })
    return JSON.stringify(obj);
}

export class BindingId<T>  {
    constructor(
        public expression: string,
        public contextUrl: string,
        public extensions: Map<string, string> = new Map<string, string>()
    ) { }

    public equals(other: BindingId<T>) {
        return this.expression === other.expression && this.contextUrl === other.contextUrl;
    }

    public toJSON(): string {
        return `
            {
                "expression": ${JSON.stringify(this.expression)},
                "contextUrl": ${JSON.stringify(this.contextUrl)},
                "extensions": ${mapToJson(this.extensions)}
            }
        `;
    }
}

export class RuntimeBindingId<T> {
    constructor(
        public binding: BindingId<T>,
        public runtimeUrl: string,
        public extensions: Map<string, string> = new Map<string, string>()
    ) { }

    public equals(other: RuntimeBindingId<T>) {
        return this.binding.equals(other.binding) && this.runtimeUrl === other.runtimeUrl;
    }

    public toJSON(): string {
        return `
            {
                "binding": ${this.binding.toJSON()},
                "runtimeUrl": ${JSON.stringify(this.runtimeUrl)},
                "extensions": ${mapToJson(this.extensions)}
            }
        `;
    }
}

/**
 * TODO
 */
export class Message {
    constructor(
        public id: number,
        public type: string
    ) { }

    public toJSON():string {
      return "";
    };
}

/**
 * Class used to send evaluation request.
 */
export class EvaluationRequest extends Message {

    constructor(
        public id: number,
        public runtimeBinding: RuntimeBindingId<any>,
        public detailed: boolean
    ) {
        super(id, "EvaluationRequest");
     }

     public toJSON(): string {
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

/**
 * Class used to send listening request.
 */
export class ListeningRequest extends Message {

    constructor(
        public id: number,
        public runtimeBinding: RuntimeBindingId<any>,
        public detailed: boolean
    ) {
        super(id, "ListeningRequest");
        }

    public toJSON(): string {
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

/**
 * Class used to send assignation request.
 */
export class AssignationRequest extends Message {

    constructor(
        public id: number,
        public left: RuntimeBindingId<any>,
        public right: RuntimeBindingId<any>|null,
        public value: string|null,
        public detailed: boolean
    ) {
        super(id, "AssignationRequest");
     }

    public toJSON(): string {
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

/**
 * Class used for received response
 */
export class Response extends Message {

    constructor(
        public id: number,
        public result: string,
        public error: string
    ) {
        super(id, "Response");
    }
}

/**
 * Class used when a binding is changed
 */
export class ChangeEvent extends Message {
    constructor(
        public runtimeBinding: RuntimeBindingId<any>,
        public value: string
    ) {
        super(-1, "ChangeEvent");
     }
}

/**
 * Currently pending evaluations
 */
class PendingEvaluation<T> {
    constructor(
        public fullfilled: (T) => void,
        public rejected: (string) => void,
        public request: Message
    ) { }
}

export type ChangeListener = (any)=>void;

export type LogLevel = "error"|"warning"|"info";

/**
 * Log from the OpenFlexo Api
 */
export class Log {
    constructor(
        public level: LogLevel,
        public message: string,
        public source: Message|null
    ) {
    }
}

export type LogListener = (Log)=>void;

/**
 * The Api class proposes methods to access an OpenFlexo server.
 *
 * It allows:
 *
 * - to receive type object from the REST API.
 * - evaluate binding using a WebSocket connection.
 */
export class Api {

    /** Webocket for connie evaluations */
    private connie: WebSocket|null;

    /** Messages to send throught connie websocket when opened */
    private messageQueue: Message[] = [];

    /** Map of pending evaluation from server */
    private pendingEvaluationQueue: Map<number, PendingEvaluation<any>> = new Map();

    /** Seed of evaluation request ids */
    private evaluationRequestSeed: number = 0;

    /** Registered listeners */
    private bindingListeners: Set<[RuntimeBindingId<any>, ChangeListener]> = new Set();

    /** Api listeners */
    private logListeners: Set<LogListener> = new Set();


    constructor(
        private host: string = ""
    ) {

    }

    public call<T>(path: string, method: string = "get"): Promise<T> {
        const result = new Promise<T>((fullfilled, rejected) => {
            let request = new XMLHttpRequest();
            request.open(method, this.host + path);
            request.onload = (ev) => {
                if (request.status >= 200 && request.status < 300) {
                    var first = request.responseText.charAt(0);
                    if (first === '{' || first === '[' ) {
                        let json = JSON.parse(request.responseText);
                        fullfilled(<T>json);
                        return;
                    }
                    rejected(request.statusText);
                }
            }
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
    private onEvaluationMessage(event: MessageEvent) {
        // event contains a blob that needs reading
        let reader = new FileReader();
        reader.onloadend = (e: ProgressEvent) => {
            if (e.currentTarget != null) {
                // parses the response
                let message = <Message>JSON.parse(e.currentTarget["result"]);
                switch (message.type) {
                    case "Response": {
                        let response = <Response>message;
                        // searches for the evaluation id
                        let pending = this.pendingEvaluationQueue.get(response.id);
                        if (pending) {
                            // found it, now it removes it
                            this.pendingEvaluationQueue.delete(response.id);

                            if (response.error !== null) {
                                // rejects the promise if there is an error
                                this.log("error", response.error, message);
                                pending.rejected(response.error);
                            } else {
                                // fullfilled the promise when it's ok
                                pending.fullfilled(response.result);
                            }

                        }
                        break;
                    }
                    case "ChangeEvent": {
                        let event = <ChangeEvent>message;
                        this.bindingListeners.forEach( (entry) => {
                            if (entry[0].equals(event.runtimeBinding)) {
                                entry[1](event.value);
                            }
                        });
                    }
                }
            }
        }
        reader.readAsText(event.data);
    }

    /**
     * Listens to Webocket open
     * @param event
     */
    public onEvaluationOpen(event: MessageEvent) {
        this.log("info", "Openned " + event.data, null);

        // evaluates pending request
        this.messageQueue.forEach(message => {
            this.readySendMessage(message);
        });
    }

    /**
     * Listens to WebSocket close
     */
    private onEvaluationClose() {
        this.log("warning", "Websocket is closed", null);
        this.connie = null;

        // registers listening messages when the connection resumes
        this.bindingListeners.forEach(e => {
            this.sendMessage(this.createListeningMessage(e[0]));
        })
    }

    /**
     * Internal connie WebSocket
     */
    private initializeConnieEvaluator(): WebSocket {
        if (this.connie == null) {
            let wsHost;
            if (this.host.length > 0) {
                wsHost = this.host.search("https\\://") == 0 ?
                    this.host.replace(new RegExp("https\\://"), "wss://") + "/websocket" :
                    this.host.replace(new RegExp("http\\://"), "ws://") + "/websocket"
            } else {
                wsHost = document.location.protocol === "https:" ?
                    "wss://" + document.location.host + "/websocket" :
                    "ws://" + document.location.host + "/websocket";
            }

            this.connie = new WebSocket(wsHost);
            this.connie.onopen = (e:MessageEvent) => this.onEvaluationOpen(e);
            this.connie.onmessage = (e:MessageEvent) => this.onEvaluationMessage(e);
            this.connie.onclose = () => this.onEvaluationClose();
        }
        return this.connie;
    }

    public sendMessage<T>(message: Message):Promise<T> {
      // connects the WebSocket if not already done
      let connie = this.initializeConnieEvaluator();
      // act depending on the WebSocket status
      if (connie.readyState == 1) {
          // sends the binding now
          this.readySendMessage(message);
      } else {
          // sends when the socket is ready
          this.messageQueue.push(message);
      }

      // prepares the promise's callback for the result
      return new Promise<T>((fullfilled, rejected) => {
          this.pendingEvaluationQueue.set(message.id , new PendingEvaluation(fullfilled, rejected, message));
      });
    }


    /**
     * Internal send evaluation request
     * @param mesage message to send
     */
    private readySendMessage(message: Message) {
        let json = message.toJSON();
        if (this.connie != null) {
            this.connie.send(json);
        }
    }

    private createListeningMessage(binding: RuntimeBindingId<any>): ListeningRequest {
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
    public evaluate<T>(runtimeBinding: RuntimeBindingId<T>, detailed = false): Promise<T> {
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
    public assign<T>(left: RuntimeBindingId<T>, right: RuntimeBindingId<T>|string, detailed: boolean = false): Promise<T> {
        // creates a request for evaluation
        let id = this.evaluationRequestSeed++;
        let request;
        if (right instanceof RuntimeBindingId) {
            request = new AssignationRequest(id, left, right, null, detailed);
        } else {
            request = new AssignationRequest(id, left, null, <string>right, detailed);
        }

        return this.sendMessage(request);
    }

    /**
     * Adds a listener for binding changes. It sends a value the first time it's
     * received.
     * @param binding binding change to listen to
     * @param listener callback
     */
    public addChangeListener(binding: RuntimeBindingId<any>, listener : ChangeListener) {
        this.bindingListeners.add([binding, listener]);
        let promise = this.sendMessage(this.createListeningMessage(binding));
        promise.then(value => listener(value));
    }

    /**
     * Removes a listener for binding changes
     * @param binding binding change to listen to
     * @param listener callback
     */
    public removeChangeListener(binding: RuntimeBindingId<any>, listener : ChangeListener) {
        this.bindingListeners.delete([binding, listener]);
    }

    /**
     * Removes all callbacks for the given binding
     * @param binding binding
     */
    public removeChangeListeners(binding: RuntimeBindingId<any>) {
        this.bindingListeners.forEach(e => {
            if (e[0].equals(binding)) {
                this.bindingListeners.delete(e);
            }
        })
    }

    /**
     * Adds a log listener.
     * @param listener the callback
     */
    public addLogListener(listener: LogListener) {
        this.logListeners.add(listener);
    }

    /**
     * Removes a log listener.
     * @param listener the callback
     */
    public removeLogListener(listener: LogListener) {
        this.logListeners.delete(listener);
    }

    /**
     * Logs a message from the OpenFlexo System
     * @param level
     * @param message
     * @param binding
     */
    public log(level: LogLevel, message: string, source: Message|null = null) {
        let event = new Log(level, message, source);
        this.logListeners.forEach(listener => {
            listener(event);
        })
    }

    /**
     * Gets all registered resource centers
     * @return a Promise for all resource centers
     */
    public resourceCenters(): Promise<ResourceCenter[]> {
        return this.call("/rc");
    }

    /**
     * Gets all resources
     * @return a Promise for all resources
     */
    public resources(): Promise<Resource[]> {
        return this.call("/resource");
    }

    /**
     * Saves given resource
     * @param resource the resource to save an id or a description
     */
    public save(resource: Resource|string): Promise<Resource> {
        let path: string;
        if (typeof resource === "string") {
            path = resource
        } else {
            path = (<Resource> resource).url
        }

        return this.call<Resource>(path, "post");
    }

    /**
     * Gets all registered technology adapters
     * @return a Promise for all technology adapters
     */
    public technologyAdapters(): Promise<TechnologyAdapter[]> {
        return this.call("/ta");
    }

    /**
     * Gets all view points
     * @return a Promise for all view points
     */
    public viewPoints(): Promise<Resource[]> {
        return this.call("/ta/fml/viewpoint");
    }
}
