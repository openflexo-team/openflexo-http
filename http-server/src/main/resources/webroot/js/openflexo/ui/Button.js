define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var Button = (function () {
        function Button(label, type, colored, accent, rippleEffect) {
            if (type === void 0) { type = "raised"; }
            if (colored === void 0) { colored = false; }
            if (accent === void 0) { accent = false; }
            if (rippleEffect === void 0) { rippleEffect = false; }
            this.label = label;
            this.type = type;
            this.colored = colored;
            this.accent = accent;
            this.rippleEffect = rippleEffect;
            this.create();
        }
        Button.prototype.create = function () {
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
        };
        Button.prototype.isEnable = function () {
            return !this.container.disabled;
        };
        Button.prototype.setEnable = function (enable) {
            this.container.disabled = !enable;
        };
        return Button;
    }());
    exports.Button = Button;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBSUE7UUFJSSxnQkFDWSxLQUFpQyxFQUNqQyxJQUFpRCxFQUNqRCxPQUF3QixFQUN4QixNQUF1QixFQUN2QixZQUE2QjtZQUg3QixxQkFBQSxFQUFBLGVBQWlEO1lBQ2pELHdCQUFBLEVBQUEsZUFBd0I7WUFDeEIsdUJBQUEsRUFBQSxjQUF1QjtZQUN2Qiw2QkFBQSxFQUFBLG9CQUE2QjtZQUo3QixVQUFLLEdBQUwsS0FBSyxDQUE0QjtZQUNqQyxTQUFJLEdBQUosSUFBSSxDQUE2QztZQUNqRCxZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtZQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7WUFFckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFTyx1QkFBTSxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLHFCQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFdEQseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFTSx5QkFBUSxHQUFmO1lBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDcEMsQ0FBQztRQUVNLDBCQUFTLEdBQWhCLFVBQWlCLE1BQWU7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDdEMsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQUFDLEFBMUNELElBMENDO0lBMUNZLHdCQUFNIn0=