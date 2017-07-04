define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var Button = (function () {
        function Button(label, fab, colored, accent, rippleEffect) {
            if (fab === void 0) { fab = false; }
            if (colored === void 0) { colored = false; }
            if (accent === void 0) { accent = false; }
            if (rippleEffect === void 0) { rippleEffect = false; }
            this.label = label;
            this.fab = fab;
            this.colored = colored;
            this.accent = accent;
            this.rippleEffect = rippleEffect;
            this.create();
        }
        Button.prototype.create = function () {
            this.container = document.createElement("button");
            this.container.classList.add("mdl-button");
            this.container.classList.add("mdl-js-button");
            if (this.fab) {
                this.container.classList.add("mdl-button--fab");
            }
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
        return Button;
    }());
    exports.Button = Button;
});
/*
<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">add</i>
</button>
 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBSUE7UUFJSSxnQkFDWSxLQUFpQyxFQUNqQyxHQUFvQixFQUNwQixPQUF3QixFQUN4QixNQUF1QixFQUN2QixZQUE2QjtZQUg3QixvQkFBQSxFQUFBLFdBQW9CO1lBQ3BCLHdCQUFBLEVBQUEsZUFBd0I7WUFDeEIsdUJBQUEsRUFBQSxjQUF1QjtZQUN2Qiw2QkFBQSxFQUFBLG9CQUE2QjtZQUo3QixVQUFLLEdBQUwsS0FBSyxDQUE0QjtZQUNqQyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtZQUNwQixZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtZQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7WUFFckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFTyx1QkFBTSxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN6RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXRELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0wsYUFBQztJQUFELENBQUMsQUFuQ0QsSUFtQ0M7SUFuQ1ksd0JBQU07O0FBcUNuQjs7OztHQUlHIn0=