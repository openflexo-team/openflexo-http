define(["require", "exports", "./BoundComponent", "../ui/utils", "../ui/Grid", "./utils"], function (require, exports, BoundComponent_1, utils_1, Grid_1, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConcreteBoundComponent extends BoundComponent_1.BoundComponent {
        constructor(api, runtime = null, binding) {
            super(api);
            this.binding = binding;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            //this.container = document.createElement("div");
            this.grid = new Grid_1.Grid();
            this.container = this.grid.container;
            // this.container.appendChild(toHTMLElement(this.grid.container));                
            utils_1.mdlUpgradeElement(this.container);
        }
        setEnable(enable) {
            this.grid.setEnable(enable);
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            this.runtimeBinding = utils_2.updateBindingRuntime(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
    }
    exports.ConcreteBoundComponent = ConcreteBoundComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uY3JldGVCb3VuZENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbmNyZXRlQm91bmRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUEsNEJBQW9DLFNBQVEsK0JBQWM7UUFVdEQsWUFDSSxHQUFRLEVBQ1IsVUFBdUIsSUFBSSxFQUNuQixPQUF5QjtZQUVuQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFGRCxZQUFPLEdBQVAsT0FBTyxDQUFrQjtZQUduQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFUyxNQUFNO1lBQ1osaURBQWlEO1lBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RDLGtGQUFrRjtZQUNqRix5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxhQUFhLENBQUMsT0FBb0IsRUFBQyxhQUFrQyxJQUFJLEdBQUcsRUFBa0I7WUFDMUYsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyw0QkFBb0IsQ0FDbEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQzNDLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FDM0MsQ0FBQztRQUNWLENBQUM7S0FDSjtJQXZDRCx3REF1Q0MifQ==