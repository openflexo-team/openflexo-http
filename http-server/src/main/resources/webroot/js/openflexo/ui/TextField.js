define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var TextField = (function () {
        function TextField(id, value, label, floatingLabel, multiline, invalid) {
            if (value === void 0) { value = null; }
            if (label === void 0) { label = null; }
            if (floatingLabel === void 0) { floatingLabel = false; }
            if (multiline === void 0) { multiline = false; }
            if (invalid === void 0) { invalid = false; }
            this.id = id;
            this.value = value;
            this.label = label;
            this.floatingLabel = floatingLabel;
            this.multiline = multiline;
            this.invalid = invalid;
            this.create();
        }
        TextField.prototype.create = function () {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-textfield");
            this.container.classList.add("mdl-js-textfield");
            if (this.floatingLabel) {
                this.container.classList.add("mdl-textfield--floating-label");
            }
            if (this.invalid) {
                this.container.classList.add("is-invalid");
            }
            var input = document.createElement("input");
            input.classList.add("mdl-textfield__input");
            input.type = "text";
            input.id = this.id;
            this.container.appendChild(input);
            if (this.value != null) {
                input.value = this.value;
            }
            if (this.label != null) {
                var label = document.createElement("label");
                label.classList.add("mdl-textfield__label");
                label.htmlFor = this.id;
                label.appendChild(utils_1.toHTMLElement(this.label));
                this.container.appendChild(label);
            }
            utils_1.mdlUpgradeElement(this.container);
        };
        return TextField;
    }());
    exports.TextField = TextField;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGV4dEZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBSUE7UUFlSSxtQkFDWSxFQUFVLEVBQ1YsS0FBeUIsRUFDekIsS0FBbUMsRUFDbkMsYUFBOEIsRUFDOUIsU0FBMEIsRUFDMUIsT0FBd0I7WUFKeEIsc0JBQUEsRUFBQSxZQUF5QjtZQUN6QixzQkFBQSxFQUFBLFlBQW1DO1lBQ25DLDhCQUFBLEVBQUEscUJBQThCO1lBQzlCLDBCQUFBLEVBQUEsaUJBQTBCO1lBQzFCLHdCQUFBLEVBQUEsZUFBd0I7WUFMeEIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFVBQUssR0FBTCxLQUFLLENBQW9CO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQThCO1lBQ25DLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtZQUM5QixjQUFTLEdBQVQsU0FBUyxDQUFpQjtZQUMxQixZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUVoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELDBCQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFFRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDNUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDcEIsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzdCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBRUQseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUF6REQsSUF5REM7SUF6RFksOEJBQVMifQ==