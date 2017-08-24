define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    class List {
        constructor() {
            this.items = [];
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/List.css");
            this.create();
        }
        addItem(item) {
            this.items.push(item);
            this.container.appendChild(item.container);
        }
        removeItem(item) {
            let index = this.items.indexOf(item);
            if (index >= 0) {
                // removes from array
                this.items.splice(index, 1);
                // removes from dom
                this.container.removeChild(item.container);
            }
        }
        create() {
            this.container = document.createElement("ul");
            this.container.classList.add("of-list");
            this.container.classList.add("mdl-list");
            utils_1.mdlUpgradeElement(this.container);
        }
    }
    exports.List = List;
    class ListItem {
        constructor(contents, body = null, icon = null, action = null) {
            this.contents = contents;
            this.body = body;
            this.icon = icon;
            this.action = action;
            this.create();
        }
        create() {
            this.container = document.createElement("li");
            this.container.classList.add("mdl-list__item");
            if (this.body != null) {
                this.container.classList.add("mdl-list__item--three-line");
            }
            let primaryContent = document.createElement("span");
            primaryContent.classList.add("mdl-list__item-primary-content");
            this.container.appendChild(primaryContent);
            if (this.icon != null) {
                let i = document.createElement("i");
                i.classList.add("material-icons");
                i.classList.add("mdl-list__item-icon");
                i.innerText = this.icon;
                primaryContent.appendChild(i);
            }
            primaryContent.appendChild(utils_1.toHTMLElement(this.contents));
            if (this.body != null) {
                let bodySpan = document.createElement("span");
                bodySpan.classList.add("mdl-list__item-text-body");
                bodySpan.appendChild(utils_1.toHTMLElement(this.body));
                primaryContent.appendChild(bodySpan);
            }
            if (this.action != null) {
                let action = document.createElement("span");
                action.classList.add("mdl-list__item-secondary-action");
                action.appendChild(utils_1.toHTMLElement(this.action));
                primaryContent.appendChild(action);
            }
            utils_1.mdlUpgradeElement(this.container);
        }
    }
    exports.ListItem = ListItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFNQTtRQU1JO1lBRlEsVUFBSyxHQUFlLEVBQUUsQ0FBQztZQUczQixpQ0FBeUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsT0FBTyxDQUFDLElBQWM7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCxVQUFVLENBQUMsSUFBYztZQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFNUIsbUJBQW1CO2dCQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNMLENBQUM7UUFFTyxNQUFNO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFekMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENB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