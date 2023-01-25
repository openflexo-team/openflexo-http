define(["require", "exports", "./utils", "./Component"], function (require, exports, utils_1, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItem = exports.List = void 0;
    class List extends Component_1.Component {
        constructor() {
            super();
            this.items = [];
            (0, utils_1.addCssIfNotAlreadyPresent)("/css/openflexo/ui/List.css");
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
            (0, utils_1.mdlUpgradeElement)(this.container);
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
            primaryContent.appendChild((0, utils_1.toHTMLElement)(this.contents));
            if (this.body != null) {
                let bodySpan = document.createElement("span");
                bodySpan.classList.add("mdl-list__item-text-body");
                bodySpan.appendChild((0, utils_1.toHTMLElement)(this.body));
                primaryContent.appendChild(bodySpan);
            }
            if (this.action != null) {
                let action = document.createElement("span");
                action.classList.add("mdl-list__item-secondary-action");
                action.appendChild((0, utils_1.toHTMLElement)(this.action));
                primaryContent.appendChild(action);
            }
            (0, utils_1.mdlUpgradeElement)(this.container);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQU1BLE1BQWEsSUFBSyxTQUFRLHFCQUFTO1FBTS9CO1lBQ0UsS0FBSyxFQUFFLENBQUM7WUFIRixVQUFLLEdBQWUsRUFBRSxDQUFDO1lBSTdCLElBQUEsaUNBQXlCLEVBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUVELE9BQU8sQ0FBQyxJQUFjO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsVUFBVSxDQUFDLElBQWM7WUFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNaLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM5QztRQUNMLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBQSx5QkFBaUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7S0FDSjtJQXRDRCxvQkFzQ0M7SUFFRCxNQUFhLFFBQVMsU0FBUSxxQkFBUztRQUluQyxZQUNZLFFBQXFDLEVBQ3JDLE9BQXdDLElBQUksRUFDNUMsT0FBb0IsSUFBSSxFQUN4QixTQUEwQyxJQUFJO1lBRXRELEtBQUssRUFBRSxDQUFDO1lBTEEsYUFBUSxHQUFSLFFBQVEsQ0FBNkI7WUFDckMsU0FBSSxHQUFKLElBQUksQ0FBd0M7WUFDNUMsU0FBSSxHQUFKLElBQUksQ0FBb0I7WUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBd0M7WUFHdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQzlEO1lBRUQsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTNDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDeEIsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztZQUVELGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBQSxxQkFBYSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRXpELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ25ELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBQSxxQkFBYSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hDO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDckIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLHFCQUFhLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEM7WUFDRCxJQUFBLHlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLHFCQUFTLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxZQUFZLHFCQUFTLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxZQUFZLHFCQUFTLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQztLQUNKO0lBOURELDRCQThEQyJ9