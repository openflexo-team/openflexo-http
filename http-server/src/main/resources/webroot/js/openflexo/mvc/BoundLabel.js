define(["require", "exports", "./BoundComponent", "./utils"], function (require, exports, BoundComponent_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundLabel extends BoundComponent_1.BoundComponent {
        constructor(api, binding, runtime = null) {
            super(api);
            this.binding = binding;
            this.runtimeBinding = null;
            this.changelistener = value => this.container.innerText = value;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.container = document.createElement("span");
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            /*if (this.runtimeBinding !== null) {
                this.api.removeChangeListener(this.runtimeBinding, this.changelistener);
            }
            this.runtimeBinding = null;
            if (runtime !== null) {
                this.runtimeBinding = new RuntimeBindingId(this.binding, runtime, extensions);
                this.api.addChangeListener(this.runtimeBinding, this.changelistener);
            }*/
            this.runtimeBinding = utils_1.updateBindingRuntime(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
        setEnable(enable) {
            // nothing to do
        }
    }
    exports.BoundLabel = BoundLabel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRMYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0EsZ0JBQXdCLFNBQVEsK0JBQWM7UUFRMUMsWUFDSSxHQUFRLEVBQ0EsT0FBeUIsRUFDakMsVUFBdUIsSUFBSTtZQUUzQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFISCxZQUFPLEdBQVAsT0FBTyxDQUFrQjtZQU43QixtQkFBYyxHQUFrQyxJQUFJLENBQUM7WUFFNUMsbUJBQWMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBUXhFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFvQixFQUFDLGFBQWtDLElBQUksR0FBRyxFQUFrQjtZQUMxRixLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUV6Qzs7Ozs7OztlQU9HO1lBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyw0QkFBb0IsQ0FDMUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDaEUsT0FBTyxFQUFFLFVBQVUsQ0FDcEIsQ0FBQTtRQUNILENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixnQkFBZ0I7UUFDbEIsQ0FBQztLQUNKO0lBM0NELGdDQTJDQyJ9