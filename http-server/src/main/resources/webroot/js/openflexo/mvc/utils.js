define(["require", "exports", "../api/Api"], function (require, exports, Api_1) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUVBOzs7T0FHRztJQUNILDhCQUNFLEdBQVEsRUFBRSxPQUF1QixFQUNqQyxpQkFBNkMsRUFBRSxjQUE4QixFQUM3RSxPQUFvQixFQUFFLFVBQXFDO1FBRzNELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBQzdCLElBQUksY0FBYyxHQUFHLElBQUksc0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN4RSxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBbEJELG9EQWtCQyJ9