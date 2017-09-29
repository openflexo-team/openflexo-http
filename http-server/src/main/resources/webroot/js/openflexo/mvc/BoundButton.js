define(["require", "exports", "../api/Api", "./BoundComponent", "../ui/Button"], function (require, exports, Api_1, BoundComponent_1, Button_1) {
    "use strict";
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
                this.action.contextUrl = runtime;
                this.actionRuntimeBinding = new Api_1.RuntimeBindingId(this.action, runtime, extensions);
            }
        }
    }
    exports.BoundButton = BoundButton;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQVFBLGlCQUF5QixTQUFRLCtCQUFjO1FBUTNDLFlBQ0ksR0FBUSxFQUNBLEtBQWlDLEVBQ2xDLE1BQXlCLEVBQ2hDLFVBQXVCLElBQUksRUFDbkIsVUFBa0MsSUFBSSxFQUN0QyxPQUF5QyxRQUFRLEVBQ2pELFVBQW1CLEtBQUssRUFDeEIsU0FBa0IsS0FBSyxFQUN2QixlQUF3QixLQUFLO1lBRXZDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQVRELFVBQUssR0FBTCxLQUFLLENBQTRCO1lBQ2xDLFdBQU0sR0FBTixNQUFNLENBQW1CO1lBRXhCLFlBQU8sR0FBUCxPQUFPLENBQStCO1lBQ3RDLFNBQUksR0FBSixJQUFJLENBQTZDO1lBQ2pELFlBQU8sR0FBUCxPQUFPLENBQWlCO1lBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWlCO1lBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtZQUd2QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVPLGtCQUFrQixDQUFDLENBQU07WUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDM0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUs7b0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFFRCxhQUFhLENBQUMsT0FBb0IsRUFBQyxhQUFrQyxJQUFJLEdBQUcsRUFBa0I7WUFDMUYsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDakMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksc0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEYsQ0FBQztRQUNMLENBQUM7S0FDSjtJQXBERCxrQ0FvREMifQ==