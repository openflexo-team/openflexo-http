define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    class Button {
        constructor(label, type = "raised", colored = false, accent = false, rippleEffect = false) {
            this.label = label;
            this.type = type;
            this.colored = colored;
            this.accent = accent;
            this.rippleEffect = rippleEffect;
            this.create();
        }
        create() {
            this.container = document.createElement("button");
            this.container.classList.add("mdl-button");
            this.container.classList.add("mdl-js-button");
            this.container.classList.add("mdl-button--" + this.type);
            if (this.rippleEffect) {
                this.container.classList.add("mdl-js-ripple-effect");
            }
            if (this.colored) {
                this.container.classList.add("mdl-button--colored");
            }
            if (this.accent) {
                this.container.classList.add("mdl-button--accent");
            }
            this.container.appendChild(utils_1.toHTMLElement(this.label));
            utils_1.mdlUpgradeElement(this.container);
        }
        isEnable() {
            return !this.container.disabled;
        }
        setEnable(enable) {
            this.container.disabled = !enable;
        }
    }
    exports.Button = Button;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBSUE7UUFJSSxZQUNZLEtBQWlDLEVBQ2pDLE9BQXlDLFFBQVEsRUFDakQsVUFBbUIsS0FBSyxFQUN4QixTQUFrQixLQUFLLEVBQ3ZCLGVBQXdCLEtBQUs7WUFKN0IsVUFBSyxHQUFMLEtBQUssQ0FBNEI7WUFDakMsU0FBSSxHQUFKLElBQUksQ0FBNkM7WUFDakQsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7WUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWlCO1lBRXJDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRU8sTUFBTTtZQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXRELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRU0sUUFBUTtZQUNYLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3BDLENBQUM7UUFFTSxTQUFTLENBQUMsTUFBZTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN0QyxDQUFDO0tBQ0o7SUExQ0Qsd0JBMENDIn0=