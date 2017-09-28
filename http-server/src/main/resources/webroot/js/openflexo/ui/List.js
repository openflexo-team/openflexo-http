define(["require", "exports", "./utils", "./Component"], function (require, exports, utils_1, Component_1) {
    "use strict";
    class List extends Component_1.Component {
        constructor() {
            super();
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
        setEnable(enable) {
            this.items.forEach(item => item.setEnable(enable));
        }
    }
    exports.List = List;
    class ListItem extends Component_1.Component {
        constructor(contents, body = null, icon = null, action = null) {
            super();
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
        setEnable(enable) {
            if (this.contents instanceof Component_1.Component) {
                this.contents.setEnable(enable);
            }
            if (this.body instanceof Component_1.Component) {
                this.body.setEnable(enable);
            }
            if (this.action instanceof Component_1.Component) {
                this.action.setEnable(enable);
            }
        }
    }
    exports.ListItem = ListItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFNQSxVQUFrQixTQUFRLHFCQUFTO1FBTS9CO1lBQ0UsS0FBSyxFQUFFLENBQUM7WUFIRixVQUFLLEdBQWUsRUFBRSxDQUFDO1lBSTdCLGlDQUF5QixDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxPQUFPLENBQUMsSUFBYztZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELFVBQVUsQ0FBQyxJQUFjO1lBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6Qyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUNKO0lBdENELG9CQXNDQztJQUVELGNBQXNCLFNBQVEscUJBQVM7UUFJbkMsWUFDWSxRQUFxQyxFQUNyQyxPQUF3QyxJQUFJLEVBQzVDLE9BQW9CLElBQUksRUFDeEIsU0FBMEMsSUFBSTtZQUV0RCxLQUFLLEVBQUUsQ0FBQztZQUxBLGFBQVEsR0FBUixRQUFRLENBQTZCO1lBQ3JDLFNBQUksR0FBSixJQUFJLENBQXdDO1lBQzVDLFNBQUksR0FBSixJQUFJLENBQW9CO1lBQ3hCLFdBQU0sR0FBTixNQUFNLENBQXdDO1lBR3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQy9ELENBQUM7WUFFRCxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUVELGNBQWMsQ0FBQyxXQUFXLENBQUMscUJBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUV6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ25ELFFBQVEsQ0FBQyxXQUFXLENBQUMscUJBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsV0FBVyxDQUFDLHFCQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUNELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsWUFBWSxxQkFBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVkscUJBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZLHFCQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztLQUNKO0lBOURELDRCQThEQyJ9