define(["require", "exports", "../ui/Button"], function (require, exports, Button_1) {
    "use strict";
    class BoundButton {
        constructor(api, action, enabled, label, type = "raised", colored = false, accent = false, rippleEffect = false) {
            this.api = api;
            this.action = action;
            this.enabled = enabled;
            this.label = label;
            this.type = type;
            this.colored = colored;
            this.accent = accent;
            this.rippleEffect = rippleEffect;
            this.create();
        }
        create() {
            this.button = new Button_1.Button(this.label, this.type, this.colored, this.accent, this.rippleEffect);
            this.container = this.button.container;
            this.container.onclick = (e) => this.sendActionToServer(e);
            if (this.enabled != null) {
                this.api.evaluate(this.enabled).then(value => {
                    this.button.setEnable(value === "true");
                });
                this.api.addChangeListener(this.enabled, (e) => this.listenFromServer(e));
            }
        }
        listenFromServer(event) {
            this.button.setEnable(event.value === "true");
        }
        sendActionToServer(e) {
            this.api.evaluate(this.action).then(value => {
                this.container.classList.remove("mdl-button--colored");
            }).catch(error => {
                this.container.classList.add("mdl-button--colored");
            });
        }
    }
    exports.BoundButton = BoundButton;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BO1FBTUksWUFDWSxHQUFRLEVBQ1IsTUFBd0IsRUFDeEIsT0FBOEIsRUFDOUIsS0FBaUMsRUFDakMsT0FBeUMsUUFBUSxFQUNqRCxVQUFtQixLQUFLLEVBQ3hCLFNBQWtCLEtBQUssRUFDdkIsZUFBd0IsS0FBSztZQVA3QixRQUFHLEdBQUgsR0FBRyxDQUFLO1lBQ1IsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7WUFDeEIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7WUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBNEI7WUFDakMsU0FBSSxHQUFKLElBQUksQ0FBNkM7WUFDakQsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7WUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWlCO1lBRXJDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFFLEtBQUs7b0JBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQTtnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0JBQWdCLENBQUMsS0FBa0I7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBRUQsa0JBQWtCLENBQUMsQ0FBTTtZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUVKO0lBOUNELGtDQThDQyJ9