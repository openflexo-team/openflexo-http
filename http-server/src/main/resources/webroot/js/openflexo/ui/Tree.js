define(["require", "exports", "./utils", "./Component"], function (require, exports, utils_1, Component_1) {
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
    class Tree extends Component_1.Component {
        constructor() {
            super();
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
            this.itemContent.appendChild(utils_1.toHTMLElement(this.contents));
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
            utils_1.mdlUpgradeElement(this.container);
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
            utils_1.setEnable(this.contents, enable);
        }
    }
    exports.TreeItem = TreeItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFPQSxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztJQUN0QyxNQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQztJQUUxQyxNQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztJQUMvQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBRXpCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEO1FBQ0ksSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVELFVBQWtCLFNBQVEscUJBQVM7UUFVL0I7WUFDRSxLQUFLLEVBQUUsQ0FBQztZQVBWLGFBQVEsR0FBZSxFQUFFLENBQUM7WUFFbEIsa0JBQWEsR0FBa0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQU0vQyxpQ0FBeUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENB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