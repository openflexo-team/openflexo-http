define(["require", "exports", "../ui/Icon", "./BoundComponent", "./utils"], function (require, exports, Icon_1, BoundComponent_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundIcon extends BoundComponent_1.BoundComponent {
        constructor(api, binding, runtime = null, defaultIcon = "warning") {
            super(api);
            this.binding = binding;
            this.defaultIcon = defaultIcon;
            this.runtimeBinding = null;
            this.changelistener = value => this.container.innerText = value;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.icon = new Icon_1.Icon(this.defaultIcon);
            this.container = this.icon.container;
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            this.runtimeBinding = utils_1.updateBindingRuntime(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
        setEnable(enable) {
            this.icon.setEnable(enable);
        }
    }
    exports.BoundIcon = BoundIcon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRJY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRJY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVNBLGVBQXVCLFNBQVEsK0JBQWM7UUFVekMsWUFDSSxHQUFRLEVBQ0EsT0FBeUIsRUFDakMsVUFBdUIsSUFBSSxFQUNwQixjQUFzQixTQUFTO1lBRXRDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUpILFlBQU8sR0FBUCxPQUFPLENBQWtCO1lBRTFCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtZQVJsQyxtQkFBYyxHQUFrQyxJQUFJLENBQUM7WUFFNUMsbUJBQWMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUUsS0FBSyxDQUFDO1lBU3ZFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxhQUFhLENBQUMsT0FBb0IsRUFBRSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtCO1lBQ3hFLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLElBQUksQ0FBQyxjQUFjLEdBQUcsNEJBQW9CLENBQ3hDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQ2hFLE9BQU8sRUFBRSxVQUFVLENBQ3BCLENBQUE7UUFDSCxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNKO0lBdENELDhCQXNDQyJ9