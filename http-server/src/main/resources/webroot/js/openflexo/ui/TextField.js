define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    class TextField {
        constructor(id, value = null, label = null, floatingLabel = false, invalid = false) {
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
                label.appendChild(utils_1.toHTMLElement(this.label));
                this.container.appendChild(label);
            }
            utils_1.mdlUpgradeElement(this.container);
        }
    }
    exports.TextField = TextField;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGV4dEZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBSUE7UUFpQkksWUFDWSxFQUFVLEVBQ1YsUUFBcUIsSUFBSSxFQUN6QixRQUErQixJQUFJLEVBQ25DLGdCQUF5QixLQUFLLEVBQzlCLFVBQW1CLEtBQUs7WUFKeEIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFVBQUssR0FBTCxLQUFLLENBQW9CO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQThCO1lBQ25DLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtZQUM5QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUVoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMscUJBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUVELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQ0o7SUExREQsOEJBMERDIn0=