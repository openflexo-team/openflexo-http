define(["require", "exports", "./BoundComponent", "./utils"], function (require, exports, BoundComponent_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundLabel = void 0;
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
            this.runtimeBinding = (0, utils_1.updateBindingRuntime)(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
        setEnable(enable) {
            // nothing to do
        }
    }
    exports.BoundLabel = BoundLabel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRMYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQU9BLE1BQWEsVUFBVyxTQUFRLCtCQUFjO1FBUTFDLFlBQ0ksR0FBUSxFQUNBLE9BQWMsRUFDdEIsVUFBdUIsSUFBSTtZQUUzQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFISCxZQUFPLEdBQVAsT0FBTyxDQUFPO1lBTmxCLG1CQUFjLEdBQWtDLElBQUksQ0FBQztZQUU1QyxtQkFBYyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBUXhFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFvQixFQUFDLGFBQWtDLElBQUksR0FBRyxFQUFrQjtZQUMxRixLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUV6QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUEsNEJBQW9CLEVBQzFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQ2hFLE9BQU8sRUFBRSxVQUFVLENBQ3BCLENBQUE7UUFDSCxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsZ0JBQWdCO1FBQ2xCLENBQUM7S0FDSjtJQWxDRCxnQ0FrQ0MifQ==