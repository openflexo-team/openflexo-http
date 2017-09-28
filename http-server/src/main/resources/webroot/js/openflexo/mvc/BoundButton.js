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
            this.enabledRuntimeBinding = null;
            this.enabledChangeListener = (event) => this.listenFromServer(event);
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
        listenFromServer(event) {
            this.setEnable(event.value === "true");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQVFBLGlCQUF5QixTQUFRLCtCQUFjO1FBVzNDLFlBQ0ksR0FBUSxFQUNBLEtBQWlDLEVBQ2xDLE1BQXlCLEVBQ2hDLFVBQXVCLElBQUksRUFDbkIsVUFBa0MsSUFBSSxFQUN0QyxPQUF5QyxRQUFRLEVBQ2pELFVBQW1CLEtBQUssRUFDeEIsU0FBa0IsS0FBSyxFQUN2QixlQUF3QixLQUFLO1lBRXZDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQVRELFVBQUssR0FBTCxLQUFLLENBQTRCO1lBQ2xDLFdBQU0sR0FBTixNQUFNLENBQW1CO1lBRXhCLFlBQU8sR0FBUCxPQUFPLENBQStCO1lBQ3RDLFNBQUksR0FBSixJQUFJLENBQTZDO1lBQ2pELFlBQU8sR0FBUCxPQUFPLENBQWlCO1lBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWlCO1lBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtZQWRqQywwQkFBcUIsR0FBa0MsSUFBSSxDQUFBO1lBQzNELDBCQUFxQixHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQWdCdEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFTyxnQkFBZ0IsQ0FBQyxLQUFrQjtZQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUE7UUFDMUMsQ0FBQztRQUVPLGtCQUFrQixDQUFDLENBQU07WUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDM0QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUs7b0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFFRCxhQUFhLENBQUMsT0FBb0IsRUFBQyxhQUFrQyxJQUFJLEdBQUcsRUFBa0I7WUFDMUYsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDakMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksc0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEYsQ0FBQztRQUNMLENBQUM7S0FDSjtJQTNERCxrQ0EyREMifQ==