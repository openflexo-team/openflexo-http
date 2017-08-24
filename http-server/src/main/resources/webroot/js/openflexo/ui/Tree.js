define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
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
    class Tree {
        constructor() {
            this.children = [];
            this.selectedItems = new Set();
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/Tree.css");
            this.create();
        }
        create() {
            this.container = document.createElement("ul");
            this.container.classList.add("of-tree");
            this.container.classList.add("mdl-list");
            utils_1.mdlUpgradeElement(this.container);
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
    }
    exports.Tree = Tree;
    class TreeItem {
        constructor(tree, contents, noChildren = false) {
            this.tree = tree;
            this.contents = contents;
            this.noChildren = noChildren;
            this.children = [];
            this.expanded = false;
            this.onexpand = null;
            this.onfold = null;
            /** Internal data for advanced tree usage, not for user to use */
            this.data = null;
            this.create();
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
            this.statusIcon.innerText = this.noChildren ? emptyIcon : foldedIcon;
            this.primaryContent.appendChild(this.statusIcon);
            this.statusIcon.onclick = (event) => {
                if (!this.noChildren) {
                    if (this.expanded)
                        this.fold();
                    else
                        this.expand();
                }
            };
            this.itemContent = document.createElement("span");
            this.itemContent.classList.add("of-tree__content");
            this.itemContent.appendChild(utils_1.toHTMLElement(this.contents));
            this.primaryContent.appendChild(this.itemContent);
            this.itemContent.onclick = (event) => {
                this.tree.select(this);
            };
            this.container.appendChild(li);
            this.childrenContainer = createUl();
            this.childrenContainer.classList.add(hiddenClass);
            this.container.appendChild(this.childrenContainer);
            utils_1.mdlUpgradeElement(this.container);
        }
        expand() {
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
        setSelectionStatus(selected) {
            let classList = this.itemContent.classList;
            let contains = classList.contains(selectedClass);
            if (selected && !contains) {
                classList.add(selectedClass);
            }
            if (!selected && contains) {
                classList.remove(selectedClass);
            }
        }
    }
    exports.TreeItem = TreeItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFPQSxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztJQUN0QyxNQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQztJQUUxQyxNQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztJQUMvQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBRXpCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEO1FBQ0ksSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVEO1FBVUk7WUFOQSxhQUFRLEdBQWUsRUFBRSxDQUFDO1lBRWxCLGtCQUFhLEdBQWtCLElBQUksR0FBRyxFQUFFLENBQUM7WUFLN0MsaUNBQXlCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVPLE1BQU07WUFDVixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV6Qyx5QkFB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