define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    class Button extends Component_1.Component {
        constructor(label, type = "raised", colored = false, accent = false, rippleEffect = false) {
            super();
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
            this.container.appendChild((0, utils_1.toHTMLElement)(this.label));
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        setEnable(enable) {
            this.container.disabled = !enable;
        }
    }
    exports.Button = Button;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFJQSxNQUFhLE1BQU8sU0FBUSxxQkFBUztRQUlqQyxZQUNZLEtBQXVCLEVBQ3ZCLE9BQXlDLFFBQVEsRUFDakQsVUFBbUIsS0FBSyxFQUN4QixTQUFrQixLQUFLLEVBQ3ZCLGVBQXdCLEtBQUs7WUFFckMsS0FBSyxFQUFFLENBQUM7WUFOQSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtZQUN2QixTQUFJLEdBQUosSUFBSSxDQUE2QztZQUNqRCxZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtZQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7WUFHckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUN4RDtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUN0RDtZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUEscUJBQWEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFBLHlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRU0sU0FBUyxDQUFDLE1BQWU7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDdEMsQ0FBQztLQUNKO0lBdENELHdCQXNDQyJ9