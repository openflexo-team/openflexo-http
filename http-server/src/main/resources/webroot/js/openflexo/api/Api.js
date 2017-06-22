define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Class used to send evaluation request.
     */
    var EvaluationRequest = (function () {
        function EvaluationRequest(id, binding, runtime, model) {
            this.id = id;
            this.binding = binding;
            this.runtime = runtime;
            this.model = model;
        }
        return EvaluationRequest;
    }());
    /**
     * Class used for received evaluation response
     */
    var EvaluationResponse = (function () {
        function EvaluationResponse(id, result, error) {
            this.id = id;
            this.result = result;
            this.error = error;
        }
        return EvaluationResponse;
    }());
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
            this.evaluationRequestQueue = [];
            this.pendingEvaluationQueue = new Map();
            this.evaluationRequestSeed = 0;
        }
        Api.prototype.error = function (url) {
            console.log("Error can't access '" + url + '", check that it exists and is accessible');
        };
        Api.prototype.call = function (path) {
            var _this = this;
            var result = new Promise(function (fullfilled, rejected) {
                var request = new XMLHttpRequest();
                request.open("get", _this.host + path);
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
                    var response = JSON.parse(e.srcElement["result"]);
                    if (response.id != null) {
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
            console.log(this.evaluationRequestQueue);
            // evaluates pending request
            for (var _i = 0, _a = this.evaluationRequestQueue; _i < _a.length; _i++) {
                var binding = _a[_i];
                console.log("Sending " + binding);
                this.sendEvaluationRequest(binding);
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
            var wsHost = this.host.length > 0 ?
                this.host.replace(new RegExp("https?\\://"), "ws://") :
                wsHost = "ws://" + document.location.host;
            this.connie = new WebSocket(wsHost);
            this.connie.onopen = function (e) { return _this.onEvaluationOpen(e); };
            this.connie.onmessage = function (e) { return _this.onEvaluationMessage(e); };
            this.connie.onclose = function () { return _this.onEvaluationClose(); };
        };
        /**
         * Internal send evaluation request
         * @param request request to send
         */
        Api.prototype.sendEvaluationRequest = function (request) {
            this.connie.send(JSON.stringify(request));
        };
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
        Api.prototype.evaluate = function (binding, runtime, model) {
            var _this = this;
            // connects the WebSocket if not already done
            if (this.connie == null) {
                this.initializeConnieEvaluator();
            }
            // creates a request for evaluation
            var id = this.evaluationRequestSeed++;
            var request = new EvaluationRequest(id, binding, runtime, model);
            // act depending on the WebSocket status
            if (this.connie.readyState == 1) {
                // sends the binding now
                this.sendEvaluationRequest(request);
            }
            else {
                // sends when the socket is ready
                this.evaluationRequestQueue.push(request);
            }
            // (executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>
            // prepares the promise's callback for the result
            return new Promise(function (fullfilled, rejected) {
                _this.pendingEvaluationQueue.set(id, new PendingEvaluation(fullfilled, rejected, request));
            });
        };
        /**
         * Gets all registered resource centers
         * @return a Promise for all resource centers
         */
        Api.prototype.resourceCenters = function () {
            return this.call(this.host + "/rc");
        };
        /**
         * Gets all resources
         * @return a Promise for all resources
         */
        Api.prototype.resources = function () {
            return this.call(this.host + "/resource");
        };
        /**
         * Gets all registered technology adapters
         * @return a Promise for all technology adapters
         */
        Api.prototype.technologyAdapters = function () {
            return this.call(this.host + "/ta");
        };
        /**
         * Gets all view points
         * @return a Promise for all view points
         */
        Api.prototype.viewPoints = function () {
            return this.call(this.host + "/ta/fml/viewpoint");
        };
        return Api;
    }());
    exports.Api = Api;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBR0E7O09BRUc7SUFDSDtRQUVJLDJCQUNXLEVBQVUsRUFDVixPQUFlLEVBQ2YsT0FBZSxFQUNmLEtBQWE7WUFIYixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLFlBQU8sR0FBUCxPQUFPLENBQVE7WUFDZixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ3BCLENBQUM7UUFDVCx3QkFBQztJQUFELENBQUMsQUFSRCxJQVFDO0lBRUQ7O09BRUc7SUFDSDtRQUVJLDRCQUNXLEVBQVUsRUFDVixNQUFjLEVBQ2QsS0FBYTtZQUZiLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNwQixDQUFDO1FBQ1QseUJBQUM7SUFBRCxDQUFDLEFBUEQsSUFPQztJQUVEOztPQUVHO0lBQ0g7UUFFSSwyQkFDVyxVQUF1QixFQUN2QixRQUEwQixFQUMxQixPQUEwQjtZQUYxQixlQUFVLEdBQVYsVUFBVSxDQUFhO1lBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQWtCO1lBQzFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ2pDLENBQUM7UUFDVCx3QkFBQztJQUFELENBQUMsQUFQRCxJQU9DO0lBRUQ7Ozs7Ozs7T0FPRztJQUNIO1FBUUksYUFDWSxJQUFpQjtZQUFqQixxQkFBQSxFQUFBLFNBQWlCO1lBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7WUFOckIsMkJBQXNCLEdBQXdCLEVBQUUsQ0FBQztZQUNqRCwyQkFBc0IsR0FBd0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUV4RSwwQkFBcUIsR0FBVyxDQUFDLENBQUM7UUFNMUMsQ0FBQztRQUVELG1CQUFLLEdBQUwsVUFBTSxHQUFXO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxH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