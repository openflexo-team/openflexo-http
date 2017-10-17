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
            this.runtimeBinding = utils_1.updateBindingRuntime(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
        setEnable(enable) {
            // nothing to do
        }
    }
    exports.BoundLabel = BoundLabel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRMYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0EsZ0JBQXdCLFNBQVEsK0JBQWM7UUFRMUMsWUFDSSxHQUFRLEVBQ0EsT0FBYyxFQUN0QixVQUF1QixJQUFJO1lBRTNCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUhILFlBQU8sR0FBUCxPQUFPLENBQU87WUFObEIsbUJBQWMsR0FBa0MsSUFBSSxDQUFDO1lBRTVDLG1CQUFjLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQVF4RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxNQUFNO1lBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxhQUFhLENBQUMsT0FBb0IsRUFBQyxhQUFrQyxJQUFJLEdBQUcsRUFBa0I7WUFDMUYsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLGNBQWMsR0FBRyw0QkFBb0IsQ0FDMUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDaEUsT0FBTyxFQUFFLFVBQVUsQ0FDcEIsQ0FBQTtRQUNILENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixnQkFBZ0I7UUFDbEIsQ0FBQztLQUNKO0lBbENELGdDQWtDQyJ9