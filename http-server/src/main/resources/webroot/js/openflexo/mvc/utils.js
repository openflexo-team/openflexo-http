define(["require", "exports", "../api/Api"], function (require, exports, Api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateBindingRuntime = void 0;
    /**
     * Updates a binding runtime's by listening to the change of the given url.
     * It clears old listeners and creates a new RuntimeBindingId.
     */
    function updateBindingRuntime(api, binding, oldRuntimeBinding, changelistener, runtime, extensions) {
        if (oldRuntimeBinding !== null) {
            api.removeChangeListener(oldRuntimeBinding, changelistener);
        }
        if (runtime !== null && extensions !== null) {
            let runtimeBinding = (0, Api_1.createExtendedRuntimeBinding)(binding, runtime, extensions);
            api.addChangeListener(runtimeBinding, changelistener);
            return runtimeBinding;
        }
        else {
            return null;
        }
    }
    exports.updateBindingRuntime = updateBindingRuntime;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBRUE7OztPQUdHO0lBQ0gsU0FBZ0Isb0JBQW9CLENBQ2xDLEdBQVEsRUFBRSxPQUFlLEVBQ3pCLGlCQUE2QyxFQUFFLGNBQThCLEVBQzdFLE9BQW9CLEVBQUUsVUFBcUM7UUFHM0QsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7WUFDOUIsR0FBRyxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDM0MsSUFBSSxjQUFjLEdBQUcsSUFBQSxrQ0FBNEIsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDdEQsT0FBTyxjQUFjLENBQUM7U0FDdkI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBakJELG9EQWlCQyJ9