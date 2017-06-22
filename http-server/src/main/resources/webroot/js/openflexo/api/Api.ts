import { Description } from "./general"
import { TechnologyAdapter, Resource, ResourceCenter } from "./resource"

/**
 * Class used to send evaluation request.
 */
class EvaluationRequest {

    constructor(
        public id: number,
        public binding: string,
        public runtime: string,
        public model: string
    ) { }
}

/**
 * Class used for received evaluation response
 */
class EvaluationResponse {

    constructor(
        public id: number,
        public result: string,
        public error: string
    ) { }
}

/**
 * Currently pending evaluations
 */
class PendingEvaluation<T> {

    constructor(
        public fullfilled: (T) => void,
        public rejected: (string) => void,
        public request: EvaluationRequest
    ) { }
}

/**
 * The Api class proposes methods to access an OpenFlexo server.
 * 
 * It allows:
 * 
 * - to receive type object from the REST API.
 * - evaluate binding using a WebSocket connection.
 */
export class Api {

    private connie: WebSocket;
    private evaluationRequestQueue: EvaluationRequest[] = [];
    private pendingEvaluationQueue: Map<number, PendingEvaluation<any>> = new Map();

    private evaluationRequestSeed: number = 0;

    constructor(
        private host: string = ""
    ) {
        
    }

    error(url: string): void {
        console.log("Error can't access '" + url + '", check that it exists and is accessible');
    }
 
    public call<T>(path: string): Promise<T> {
        const result = new Promise((fullfilled, rejected) => {
            let request = new XMLHttpRequest();
            request.open("get", this.host + path);
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
            if (e.srcElement != null) {
                // parses the response
                let response = <EvaluationResponse>JSON.parse(e.srcElement["result"]);
                if (response.id != null) {
                    // searches for the evaluation id
                    let pending = this.pendingEvaluationQueue.get(response.id);
                    if (pending) {
                        // found it, now it removes it
                        this.pendingEvaluationQueue.delete(response.id);
                    
                        if (response.error !== null) {
                            // rejects the promise if there is an error
                            pending.rejected(response.error);
                        } else {
                            // fullfilled the promise when it's ok
                            pending.fullfilled(response.result);
                        }

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
        console.log("Openned " + event.data);
        console.log(this.evaluationRequestQueue);

        // evaluates pending request
        for (let binding of this.evaluationRequestQueue) {
            console.log("Sending " + binding);
            this.sendEvaluationRequest(binding);
        }
    }

    /**
     * Listens to WebSocket close
     */
    private onEvaluationClose() {
        console.log("Closed " + this.connie);
    }

    /**
     * Internal connie WebSocket
     */
    private initializeConnieEvaluator() {
        var wsHost = this.host.length > 0 ?
            this.host.replace(new RegExp("https?\\://"), "ws://"):
            wsHost = "ws://" + document.location.host;
        
        this.connie = new WebSocket(wsHost);
        this.connie.onopen = (e:MessageEvent) => this.onEvaluationOpen(e);
        this.connie.onmessage = (e:MessageEvent) => this.onEvaluationMessage(e);
        this.connie.onclose = () => this.onEvaluationClose();
    }

    /**
     * Internal send evaluation request
     * @param request request to send
     */
    private sendEvaluationRequest(request: EvaluationRequest) {
        this.connie.send(JSON.stringify(request));
    }

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
    public evaluate<T>(binding: string, runtime: string, model: string): Promise<T> {
        // connects the WebSocket if not already done
        if (this.connie == null) {
            this.initializeConnieEvaluator();
        }
        
        // creates a request for evaluation
        let id = this.evaluationRequestSeed++;
        let request = new EvaluationRequest(id, binding, runtime, model);
        
        // act depending on the WebSocket status
        if (this.connie.readyState == 1) {
            // sends the binding now
            this.sendEvaluationRequest(request);
        } else {
            // sends when the socket is ready
            this.evaluationRequestQueue.push(request);
        }

        // (executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>
        // prepares the promise's callback for the result
        return new Promise((fullfilled, rejected) => {
            this.pendingEvaluationQueue.set(id , new PendingEvaluation(fullfilled, rejected, request));
        });
    }

    /**
     * Gets all registered resource centers
     * @return a Promise for all resource centers
     */
    public resourceCenters(): Promise<ResourceCenter[]> {
        return this.call(this.host + "/rc");
    }

    /**
     * Gets all resources
     * @return a Promise for all resources
     */
    public resources(): Promise<Resource[]> {
        return this.call(this.host + "/resource");
    }

    /**
     * Gets all registered technology adapters
     * @return a Promise for all technology adapters
     */
    public technologyAdapters(): Promise<TechnologyAdapter[]> {
        return this.call(this.host + "/ta");
    }

    /**
     * Gets all view points
     * @return a Promise for all view points
     */
    public viewPoints(): Promise<Resource[]> {
        return this.call(this.host + "/ta/fml/viewpoint");
    }
}