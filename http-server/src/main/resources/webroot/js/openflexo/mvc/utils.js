define(["require", "exports", "../api/Api"], function (require, exports, Api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Updates a binding runtime's by listening to the change of the given url.
     * It clears old listeners and creates a new RuntimeBindingId.
     */
    function updateBindingRuntime(api, binding, oldRuntimeBinding, changelistener, runtime, extensions) {
        if (oldRuntimeBinding !== null) {
            api.removeChangeListener(oldRuntimeBinding, changelistener);
        }
        if (runtime !== null && extensions !== null) {
            binding.contextUrl = runtime;
            let runtimeBinding = new Api_1.RuntimeBindingId(binding, runtime, extensions);
            api.addChangeListener(runtimeBinding, changelistener);
            return runtimeBinding;
        }
        else {
            return null;
        }
    }
    exports.updateBindingRuntime = updateBindingRuntime;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTs7O09BR0c7SUFDSCw4QkFDRSxHQUFRLEVBQUUsT0FBdUIsRUFDakMsaUJBQTZDLEVBQUUsY0FBOEIsRUFDN0UsT0FBb0IsRUFBRSxVQUFxQztRQUczRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLGNBQWMsR0FBRyxJQUFJLHNCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDeEUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQWxCRCxvREFrQkMifQ==