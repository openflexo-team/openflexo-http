define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextField = void 0;
    class TextField extends Component_1.Component {
        constructor(id, value = null, label = null, floatingLabel = false, invalid = false) {
            super();
            this.id = id;
            this.value = value;
            this.label = label;
            this.floatingLabel = floatingLabel;
            this.invalid = invalid;
            this.create();
        }
        create() {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-textfield");
            this.container.classList.add("mdl-js-textfield");
            if (this.floatingLabel) {
                this.container.classList.add("mdl-textfield--floating-label");
            }
            if (this.invalid) {
                this.container.classList.add("is-invalid");
            }
            this.input = document.createElement("input");
            this.input.classList.add("mdl-textfield__input");
            this.input.type = "text";
            this.input.id = this.id;
            this.container.appendChild(this.input);
            if (this.value != null) {
                this.input.value = this.value;
            }
            if (this.label != null) {
                let label = document.createElement("label");
                label.classList.add("mdl-textfield__label");
                label.htmlFor = this.id;
                label.appendChild((0, utils_1.toHTMLElement)(this.label));
                this.container.appendChild(label);
            }
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        isEnable() {
            return !this.input.disabled;
        }
        setEnable(enable) {
            (0, utils_1.setEnable)(this.label, enable);
            this.input.disabled = !enable;
        }
    }
    exports.TextField = TextField;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGV4dEZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFJQSxNQUFhLFNBQVUsU0FBUSxxQkFBUztRQWNwQyxZQUNxQixFQUFVLEVBQ25CLFFBQXFCLElBQUksRUFDekIsUUFBK0IsSUFBSSxFQUMxQixnQkFBeUIsS0FBSyxFQUM5QixVQUFtQixLQUFLO1lBRXpDLEtBQUssRUFBRSxDQUFDO1lBTlMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFvQjtZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUE4QjtZQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFHekMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNqRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QztZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNqQztZQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFBLHFCQUFhLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsSUFBQSx5QkFBaUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFFBQVE7WUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDOUIsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLElBQUEsaUJBQVMsRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2hDLENBQUM7S0FDSjtJQWhFRCw4QkFnRUMifQ==