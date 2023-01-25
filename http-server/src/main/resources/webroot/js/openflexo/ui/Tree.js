define(["require", "exports", "./utils", "./Component"], function (require, exports, utils_1, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeItem = exports.Tree = void 0;
    const hiddenClass = "of-tree__hidden";
    const selectedClass = "of-tree__selected";
    const expandedIcon = "indeterminate_check_box";
    const foldedIcon = "add_box";
    const emptyIcon = "stop";
    function createDiv() {
        let div = document.createElement("div");
        return div;
    }
    function createUl() {
        let ul = document.createElement("ul");
        ul.classList.add("of-tree");
        ul.classList.add("mdl-list");
        return ul;
    }
    class Tree extends Component_1.Component {
        constructor() {
            super();
            this.children = [];
            this.selectedItems = new Set();
            (0, utils_1.addCssIfNotAlreadyPresent)("/css/openflexo/ui/Tree.css");
            this.create();
        }
        create() {
            this.container = document.createElement("ul");
            this.container.classList.add("of-tree");
            this.container.classList.add("mdl-list");
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        addChild(child) {
            this.children.push(child);
            this.container.appendChild(child.container);
        }
        removeChild(child) {
            let index = this.children.indexOf(child);
            if (index >= 0) {
                // removes from array
                this.children.splice(index, 1);
                // removes from dom
                this.container.removeChild(child.container);
            }
        }
        select(item, append = false) {
            if (!append)
                this.clearSelection();
            this.selectedItems.add(item);
            item.setSelectionStatus(true);
            if (this.onselect != null) {
                this.onselect(this.selectedItems);
            }
        }
        clearSelection() {
            this.selectedItems.forEach(item => item.setSelectionStatus(false));
            this.selectedItems.clear();
        }
        isSelected(item) {
            return this.selectedItems.has(item);
        }
        selection() {
            return this.selectedItems;
        }
        setEnable(enable) {
            this.children.forEach(child => child.setEnable(enable));
        }
    }
    exports.Tree = Tree;
    class TreeItem extends Component_1.Component {
        constructor(parent, contents, leaf = false) {
            super();
            this.parent = parent;
            this.contents = contents;
            this.leaf = leaf;
            /** List of children items */
            this.children = [];
            /** Item status */
            this.expanded = false;
            /** Enable status */
            this.enable = true;
            /** Call back when expand is queried */
            this.onexpand = null;
            /** Call back when fold is queried */
            this.onfold = null;
            /** Internal data for advanced tree usage, not for user to use */
            this.data = null;
            this.create();
        }
        get tree() {
            return this.parent instanceof Tree ? this.parent : this.parent.tree;
        }
        addChild(child) {
            this.children.push(child);
            this.childrenContainer.appendChild(child.container);
        }
        removeChild(child) {
            let index = this.children.indexOf(child);
            if (index >= 0) {
                // removes from array
                this.children.splice(index, 1);
                // removes from dom
                this.childrenContainer.removeChild(child.container);
            }
        }
        clear() {
            this.children.forEach(item => {
                this.removeChild(item);
            });
        }
        create() {
            this.container = createDiv();
            let li = document.createElement("li");
            li.classList.add("mdl-list__item");
            li.classList.add("of-tree__item");
            this.primaryContent = document.createElement("span");
            this.primaryContent.classList.add("mdl-list__item-primary-content");
            li.appendChild(this.primaryContent);
            this.statusIcon = document.createElement("i");
            this.statusIcon.classList.add("material-icons");
            this.statusIcon.classList.add("mdl-list__item-icon");
            this.statusIcon.innerText = this.leaf ? emptyIcon : foldedIcon;
            this.primaryContent.appendChild(this.statusIcon);
            this.statusIcon.onclick = (event) => {
                if (!this.leaf) {
                    if (this.expanded)
                        this.fold();
                    else
                        this.expand();
                }
            };
            this.itemContent = document.createElement("span");
            this.itemContent.classList.add("of-tree__content");
            this.itemContent.appendChild((0, utils_1.toHTMLElement)(this.contents));
            this.primaryContent.appendChild(this.itemContent);
            this.itemContent.tabIndex = 1;
            this.itemContent.onclick = (event) => {
                this.tree.select(this);
            };
            this.itemContent.onkeyup = (event) => {
                if (!this.enable)
                    return;
                switch (event.code) {
                    case "ArrowUp":
                        this.goToPrevious();
                        break;
                    case "ArrowDown":
                        this.goToNext();
                        break;
                    case "ArrowLeft":
                        this.goToParent();
                        break;
                    case "ArrowRight":
                        this.goToChild();
                        break;
                }
            };
            this.container.appendChild(li);
            this.childrenContainer = createUl();
            this.childrenContainer.classList.add(hiddenClass);
            this.container.appendChild(this.childrenContainer);
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        expand() {
            if (!this.enable)
                return;
            if (!this.expanded) {
                // expands
                if (this.onexpand !== null) {
                    this.onexpand(this);
                }
                this.childrenContainer.classList.remove(hiddenClass);
                this.statusIcon.innerText = expandedIcon;
                this.expanded = true;
            }
        }
        fold() {
            if (!this.enable)
                return;
            if (this.expand) {
                // folds
                if (this.onfold !== null) {
                    this.onfold(this);
                }
                this.childrenContainer.classList.add(hiddenClass);
                this.statusIcon.innerText = foldedIcon;
                this.expanded = false;
            }
        }
        get firstChild() {
            return this.children.length > 0 ? this.children[0] : null;
        }
        get lastChild() {
            let children = this.children;
            return children.length > 0 ? children[children.length - 1] : null;
        }
        get previousSibling() {
            let children = this.parent.children;
            let index = children.indexOf(this);
            return index > 0 ? children[index - 1] : null;
        }
        get nextSibling() {
            let children = this.parent.children;
            let index = children.indexOf(this);
            return index < children.length - 1 ? children[index + 1] : null;
        }
        setSelectionStatus(selected) {
            let classList = this.itemContent.classList;
            let contains = classList.contains(selectedClass);
            if (selected && !contains) {
                classList.add(selectedClass);
                this.itemContent.focus();
            }
            if (!selected && contains) {
                classList.remove(selectedClass);
            }
        }
        goToPrevious() {
            let previous = this.previousSibling;
            if (previous !== null) {
                // finds the last expanded child possible
                let current = previous;
                while (current.expanded && current.lastChild !== null) {
                    current = current.lastChild;
                }
                this.tree.select(current);
            }
            else {
                // selects parent if there is no previous sibling
                if (this.parent instanceof TreeItem) {
                    // selects parent
                    this.tree.select(this.parent);
                }
            }
        }
        goToNext() {
            if (this.expanded) {
                if (this.firstChild !== null) {
                    // if expanded and has a first child, selects it
                    this.tree.select(this.firstChild);
                }
            }
            else {
                if (this.nextSibling != null) {
                    // if there is a next sibling, selects it
                    this.tree.select(this.nextSibling);
                }
                else {
                    var current = this;
                    while (current.parent instanceof TreeItem) {
                        // if there is a parent's next sibling selects it
                        if (current.parent.nextSibling !== null) {
                            this.tree.select(current.parent.nextSibling);
                            break;
                        }
                        current = current.parent;
                    }
                }
            }
        }
        goToParent() {
            if (this.expanded) {
                this.fold();
            }
            else if (this.parent instanceof TreeItem) {
                this.tree.select(this.parent);
            }
        }
        goToChild() {
            // if there is no children, stop here
            if (this.leaf)
                return;
            // expands if not or select the first child
            if (this.expanded) {
                if (this.children.length > 0) {
                    this.tree.select(this.children[0]);
                }
            }
            else {
                this.expand();
            }
        }
        setEnable(enable) {
            this.enable = enable;
            if (this.enable) {
                this.container.classList.remove("of-disabled");
            }
            else {
                this.container.classList.add("of-disabled");
            }
            (0, utils_1.setEnable)(this.contents, enable);
        }
    }
    exports.TreeItem = TreeItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQU9BLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDO0lBQ3RDLE1BQU0sYUFBYSxHQUFHLG1CQUFtQixDQUFDO0lBRTFDLE1BQU0sWUFBWSxHQUFHLHlCQUF5QixDQUFDO0lBQy9DLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM3QixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFFekIsU0FBUyxTQUFTO1FBQ2QsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxTQUFTLFFBQVE7UUFDYixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVELE1BQWEsSUFBSyxTQUFRLHFCQUFTO1FBVS9CO1lBQ0UsS0FBSyxFQUFFLENBQUM7WUFQVixhQUFRLEdBQWUsRUFBRSxDQUFDO1lBRWxCLGtCQUFhLEdBQWtCLElBQUksR0FBRyxFQUFFLENBQUM7WUFNL0MsSUFBQSxpQ0FBeUIsRUFBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUEseUJBQWlCLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxRQUFRLENBQUMsS0FBZTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELFdBQVcsQ0FBQyxLQUFlO1lBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDWixxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFL0IsbUJBQW1CO2dCQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0M7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQWMsRUFBRSxNQUFNLEdBQUcsS0FBSztZQUNqQyxJQUFJLENBQUMsTUFBTTtnQkFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2FBQ3BDO1FBQ0wsQ0FBQztRQUVELGNBQWM7WUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUVELFVBQVUsQ0FBQyxJQUFjO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELFNBQVM7WUFDTCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7S0FDSjtJQWhFRCxvQkFnRUM7SUFFRCxNQUFhLFFBQVMsU0FBUSxxQkFBUztRQStCbkMsWUFDWSxNQUFxQixFQUNyQixRQUFxQyxFQUNyQyxPQUFnQixLQUFLO1lBRTdCLEtBQUssRUFBRSxDQUFDO1lBSkEsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUNyQixhQUFRLEdBQVIsUUFBUSxDQUE2QjtZQUNyQyxTQUFJLEdBQUosSUFBSSxDQUFpQjtZQXBCakMsNkJBQTZCO1lBQzdCLGFBQVEsR0FBZSxFQUFFLENBQUM7WUFFMUIsa0JBQWtCO1lBQ1YsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUVsQyxvQkFBb0I7WUFDWixXQUFNLEdBQVksSUFBSSxDQUFDO1lBRS9CLHVDQUF1QztZQUN2QyxhQUFRLEdBQTRCLElBQUksQ0FBQztZQUN6QyxxQ0FBcUM7WUFDckMsV0FBTSxHQUE0QixJQUFJLENBQUM7WUFFdkMsaUVBQWlFO1lBQ2pFLFNBQUksR0FBUSxJQUFJLENBQUM7WUFRYixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELElBQUksSUFBSTtZQUNKLE9BQU8sSUFBSSxDQUFDLE1BQU0sWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hFLENBQUM7UUFFRCxRQUFRLENBQUMsS0FBZTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsV0FBVyxDQUFDLEtBQWU7WUFDdkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNaLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0wsQ0FBQztRQUVELEtBQUs7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztZQUU3QixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUMvRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1osSUFBSSxJQUFJLENBQUMsUUFBUTt3QkFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O3dCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDdEQ7WUFDTCxDQUFDLENBQUE7WUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBQSxxQkFBYSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFBO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBRXpCLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDaEIsS0FBSyxTQUFTO3dCQUNWLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsTUFBTTtvQkFDVixLQUFLLFdBQVc7d0JBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNoQixNQUFNO29CQUNWLEtBQUssV0FBVzt3QkFDWixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ2xCLE1BQU07b0JBQ1YsS0FBSyxZQUFZO3dCQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDakIsTUFBTTtpQkFDYjtZQUNMLENBQUMsQ0FBQTtZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuRCxJQUFBLHlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixVQUFVO2dCQUNWLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3ZCO2dCQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztRQUVELElBQUk7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUV6QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsUUFBUTtnQkFDUixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQjtnQkFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN6QjtRQUNMLENBQUM7UUFFRCxJQUFJLFVBQVU7WUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzlELENBQUM7UUFFRCxJQUFJLFNBQVM7WUFDVCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdCLE9BQU8sUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDcEUsQ0FBQztRQUVELElBQUksZUFBZTtZQUNmLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEQsQ0FBQztRQUVELElBQUksV0FBVztZQUNYLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsT0FBTyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsRSxDQUFDO1FBRUQsa0JBQWtCLENBQUMsUUFBaUI7WUFDaEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDM0MsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqRCxJQUFJLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUMzQjtZQUNELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO2dCQUN2QixTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ25DO1FBQ0wsQ0FBQztRQUVELFlBQVk7WUFDUixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ3BDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDckIseUNBQXlDO2dCQUN6QyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUM7Z0JBQ3ZCLE9BQU8sT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtvQkFDckQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7aUJBQzdCO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLGlEQUFpRDtnQkFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxZQUFZLFFBQVEsRUFBRTtvQkFDakMsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7UUFDTCxDQUFDO1FBRUQsUUFBUTtZQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDNUIsZ0RBQWdEO29CQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ25DO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRTtvQkFDNUIseUNBQXlDO29CQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNO29CQUNMLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQztvQkFDNUIsT0FBTyxPQUFPLENBQUMsTUFBTSxZQUFZLFFBQVEsRUFBRTt3QkFDekMsaURBQWlEO3dCQUNqRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTs0QkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDN0MsTUFBTTt5QkFDUDt3QkFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztxQkFDMUI7aUJBQ0Y7YUFDRjtRQUNILENBQUM7UUFFRCxVQUFVO1lBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sWUFBWSxRQUFRLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQztRQUNMLENBQUM7UUFFRCxTQUFTO1lBQ0wscUNBQXFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUV0QiwyQ0FBMkM7WUFDM0MsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsSUFBQSxpQkFBUyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUNKO0lBdFFELDRCQXNRQyJ9