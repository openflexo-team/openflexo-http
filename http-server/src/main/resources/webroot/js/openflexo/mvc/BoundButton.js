define(["require", "exports", "../api/Api", "./BoundComponent", "../ui/Button"], function (require, exports, Api_1, BoundComponent_1, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundButton = void 0;
    class BoundButton extends BoundComponent_1.BoundComponent {
        constructor(api, label, action, runtime = null, enabled = null, type = "raised", colored = false, accent = false, rippleEffect = false) {
            super(api);
            this.label = label;
            this.action = action;
            this.enabled = enabled;
            this.type = type;
            this.colored = colored;
            this.accent = accent;
            this.rippleEffect = rippleEffect;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.button = new Button_1.Button(this.label, this.type, this.colored, this.accent, this.rippleEffect);
            this.container = this.button.container;
            this.container.onclick = (e) => this.sendActionToServer(e);
        }
        setEnable(enable) {
            this.button.setEnable(enable);
        }
        sendActionToServer(e) {
            if (this.actionRuntimeBinding !== null) {
                this.api.evaluate(this.actionRuntimeBinding).then(value => {
                    this.container.classList.remove("mdl-button--colored");
                }).catch(error => {
                    this.container.classList.add("mdl-button--colored");
                });
            }
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            if (runtime !== null) {
                this.actionRuntimeBinding = (0, Api_1.createExtendedRuntimeBinding)(this.action, runtime, extensions);
            }
        }
    }
    exports.BoundButton = BoundButton;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBUUEsTUFBYSxXQUFZLFNBQVEsK0JBQWM7UUFRM0MsWUFDSSxHQUFRLEVBQ0EsS0FBaUMsRUFDbEMsTUFBYyxFQUNyQixVQUF1QixJQUFJLEVBQ25CLFVBQXVCLElBQUksRUFDM0IsT0FBeUMsUUFBUSxFQUNqRCxVQUFtQixLQUFLLEVBQ3hCLFNBQWtCLEtBQUssRUFDdkIsZUFBd0IsS0FBSztZQUV2QyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFURCxVQUFLLEdBQUwsS0FBSyxDQUE0QjtZQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBRWIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7WUFDM0IsU0FBSSxHQUFKLElBQUksQ0FBNkM7WUFDakQsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7WUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWlCO1lBR3ZDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVPLGtCQUFrQixDQUFDLENBQU07WUFDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO1FBRUQsYUFBYSxDQUFDLE9BQW9CLEVBQUMsYUFBa0MsSUFBSSxHQUFHLEVBQWtCO1lBQzFGLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDbEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUEsa0NBQTRCLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDOUY7UUFDTCxDQUFDO0tBQ0o7SUFuREQsa0NBbURDIn0=