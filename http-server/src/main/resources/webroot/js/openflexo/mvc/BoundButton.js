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
            if (this.enabledRuntimeBinding !== null) {
                this.api.removeChangeListener(this.enabledRuntimeBinding, this.enabledChangeListener);
            }
            this.enabledRuntimeBinding = null;
            if (runtime !== null) {
                if (this.enabled !== null) {
                    this.enabled.contextUrl = runtime;
                    this.enabledRuntimeBinding = new Api_1.RuntimeBindingId(this.enabled, runtime, extensions);
                    this.api.evaluate(this.enabledRuntimeBinding).then(value => {
                        this.button.setEnable(value);
                    });
                    this.api.addChangeListener(this.enabledRuntimeBinding, this.enabledChangeListener);
                }
                else {
                    this.setEnable(true);
                }
                this.action.contextUrl = runtime;
                this.actionRuntimeBinding = new Api_1.RuntimeBindingId(this.action, runtime, extensions);
            }
            else {
                this.setEnable(false);
            }
        }
    }
    exports.BoundButton = BoundButton;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BO1FBV0ksWUFDWSxHQUFRLEVBQ1IsS0FBaUMsRUFDbEMsTUFBeUIsRUFDaEMsVUFBdUIsSUFBSSxFQUNuQixVQUFrQyxJQUFJLEVBQ3RDLE9BQXlDLFFBQVEsRUFDakQsVUFBbUIsS0FBSyxFQUN4QixTQUFrQixLQUFLLEVBQ3ZCLGVBQXdCLEtBQUs7WUFSN0IsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNSLFVBQUssR0FBTCxLQUFLLENBQTRCO1lBQ2xDLFdBQU0sR0FBTixNQUFNLENBQW1CO1lBRXhCLFlBQU8sR0FBUCxPQUFPLENBQStCO1lBQ3RDLFNBQUksR0FBSixJQUFJLENBQTZDO1lBQ2pELFlBQU8sR0FBUCxPQUFPLENBQWlCO1lBQ3hCLFdBQU0sR0FBTixNQUFNLENBQWlCO1lBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtZQWRqQywwQkFBcUIsR0FBa0MsSUFBSSxDQUFBO1lBQzNELDBCQUFxQixHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQWVwRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxNQUFNO1lBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMs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