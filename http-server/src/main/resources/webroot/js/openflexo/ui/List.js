define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var List = (function () {
        function List() {
            this.items = [];
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/List.css");
            this.create();
        }
        List.prototype.addItem = function (item) {
            this.items.push(item);
            this.container.appendChild(item.container);
        };
        List.prototype.removeItem = function (item) {
            var index = this.items.indexOf(item);
            if (index >= 0) {
                // removes from array
                this.items.splice(index, 1);
                // removes from dom
                this.container.removeChild(item.container);
            }
        };
        List.prototype.create = function () {
            this.container = document.createElement("ul");
            this.container.classList.add("of-list");
            this.container.classList.add("mdl-list");
            utils_1.mdlUpgradeElement(this.container);
        };
        return List;
    }());
    exports.List = List;
    var ListItem = (function () {
        function ListItem(contents, body, icon, action) {
            if (body === void 0) { body = null; }
            if (icon === void 0) { icon = null; }
            if (action === void 0) { action = null; }
            this.contents = contents;
            this.body = body;
            this.icon = icon;
            this.action = action;
            this.create();
        }
        ListItem.prototype.create = function () {
            this.container = document.createElement("li");
            this.container.classList.add("mdl-list__item");
            if (this.body != null) {
                this.container.classList.add("mdl-list__item--three-line");
            }
            var primaryContent = document.createElement("span");
            primaryContent.classList.add("mdl-list__item-primary-content");
            this.container.appendChild(primaryContent);
            if (this.icon != null) {
                var i = document.createElement("i");
                i.classList.add("material-icons");
                i.classList.add("mdl-list__item-icon");
                i.innerText = this.icon;
                primaryContent.appendChild(i);
            }
            primaryContent.appendChild(utils_1.toHTMLElement(this.contents));
            if (this.body != null) {
                var bodySpan = document.createElement("span");
                bodySpan.classList.add("mdl-list__item-text-body");
                bodySpan.appendChild(utils_1.toHTMLElement(this.body));
                primaryContent.appendChild(bodySpan);
            }
            if (this.action != null) {
                var action = document.createElement("span");
                action.classList.add("mdl-list__item-secondary-action");
                action.appendChild(utils_1.toHTMLElement(this.action));
                primaryContent.appendChild(action);
            }
            utils_1.mdlUpgradeElement(this.container);
        };
        return ListItem;
    }());
    exports.ListItem = ListItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFNQTtRQU1JO1lBRlEsVUFBSyxHQUFlLEVBQUUsQ0FBQztZQUczQixpQ0FBeUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsc0JBQU8sR0FBUCxVQUFRLElBQWM7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCx5QkFBVSxHQUFWLFVBQVcsSUFBYztZQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFNUIsbUJBQW1CO2dCQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNMLENBQUM7UUFFTyxxQkFBTSxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFekMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMs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