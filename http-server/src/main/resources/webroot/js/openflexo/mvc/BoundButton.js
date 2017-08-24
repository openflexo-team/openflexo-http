define(["require", "exports", "../api/Api", "../ui/Button"], function (require, exports, Api_1, Button_1) {
    "use strict";
    class BoundButton {
        constructor(api, label, action, runtime = null, enabled = null, type = "raised", colored = false, accent = false, rippleEffect = false) {
            this.api = api;
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
        listenFromServer(event) {
            this.button.setEnable(event.value === "true");
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
        updateRuntime(runtime) {
            if (this.enabledRuntimeBinding !== null) {
                this.api.removeChangeListener(this.enabledRuntimeBinding, this.enabledChangeListener);
            }
            this.enabledRuntimeBinding = null;
            if (runtime !== null) {
                if (this.enabled !== null) {
                    this.enabledRuntimeBinding = new Api_1.RuntimeBindingId(this.enabled, runtime);
                    this.api.evaluate(this.enabledRuntimeBinding).then(value => {
                        this.button.setEnable(value === "true");
                    });
                    this.api.addChangeListener(this.enabledRuntimeBinding, this.enabledChangeListener);
                }
                this.actionRuntimeBinding = new Api_1.RuntimeBindingId(this.action, runtime);
            }
        }
    }
    exports.BoundButton = BoundButton;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BO1FBV0ksWUFDWSxHQUFRLEVBQ1IsS0FBaUMsRUFDakMsTUFBaUIsRUFDekIsVUFBdUIsSUFBSSxFQUNuQixVQUEwQixJQUFJLEVBQzlCLE9BQXlDLFFBQVEsRUFDakQsVUFBbUIsS0FBSyxFQUN4QixTQUFrQixLQUFLLEVBQ3ZCLGVBQXdCLEtBQUs7WUFSN0IsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNSLFVBQUssR0FBTCxLQUFLLENBQTRCO1lBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVc7WUFFakIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7WUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBNkM7WUFDakQsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7WUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWlCO1lBZGpDLDBCQUFxQixHQUEwQixJQUFJLENBQUE7WUFDbkQsMEJBQXFCLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBZXBFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFTyxnQkFBZ0IsQ0FBQyxLQUFrQjtZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFFTyxrQkFBa0IsQ0FBQyxDQUFNO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztvQkFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQzNELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBRUQsYUFBYSxDQUFDLE9BQW9CO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMxRixDQUFDO1lBQ0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxzQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUUsS0FBSzt3QkFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFBO29CQUMzQyxDQUFDLENBQUUsQ0FBQztvQkFDSixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDdkYsQ0FBQztnQkFFRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxzQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDTCxDQUFDO0tBQ0o7SUEvREQsa0NBK0RDIn0=