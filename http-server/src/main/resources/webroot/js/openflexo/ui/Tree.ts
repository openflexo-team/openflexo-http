import { addCssIfNotAlreadyPresent, mdlUpgradeElement, toHTMLElement } from "./utils";

import { Component, Selectable } from "./Component";
import { Icon } from "./Icon";

import { PhrasingCategory, FlowCategory, toElement } from "./category"

const hiddenClass = "of-tree__hidden";
const selectedClass = "of-tree__selected";

const expandedIcon = "indeterminate_check_box";
const foldedIcon = "add_box";
const emptyIcon = "stop";

function createDiv(): HTMLDivElement {
    let div = document.createElement("div");
    return div;
}

function createUl(): HTMLUListElement {
    let ul = document.createElement("ul");
    ul.classList.add("of-tree");
    ul.classList.add("mdl-list");
    return ul
}

export class Tree implements Component, Selectable<TreeItem> {

    container: HTMLUListElement;

    children: TreeItem[] = [];

    private selectedItems: Set<TreeItem> = new Set();

    onselect: ((selection: ReadonlySet<TreeItem>)=>void)|null;

    constructor() {
        addCssIfNotAlreadyPresent("/css/openflexo/ui/Tree.css");
        this.create();
    }

    private create(): void {
        this.container = document.createElement("ul");
        this.container.classList.add("of-tree");
        this.container.classList.add("mdl-list");

        mdlUpgradeElement(this.container);
    }

    addChild(child: TreeItem) {
        this.children.push(child);
        this.container.appendChild(child.container);
    }

    removeChild(child: TreeItem) {
        let index = this.children.indexOf(child);
        if (index >= 0) {
            // removes from array
            this.children.splice(index, 1);

            // removes from dom
            this.container.removeChild(child.container);
        }
    }

    select(item: TreeItem, append = false) {
        if (!append) this.clearSelection();
        this.selectedItems.add(item);
        item.setSelectionStatus(true);
        if (this.onselect != null) {
            this.onselect(this.selectedItems)
        }
    }

    clearSelection() {
        this.selectedItems.forEach(item => item.setSelectionStatus(false));
        this.selectedItems.clear();
    }

    isSelected(item: TreeItem) {
        return this.selectedItems.has(item);
    }

    selection(): ReadonlySet<TreeItem> {
        return this.selectedItems;
    }
}

export class TreeItem implements Component {

    /** Widget primary container */
    container: HTMLDivElement;

    /** MDL list primary content  */
    private primaryContent: HTMLSpanElement;
    /** Item content. It's the selectable part of the item */
    private itemContent: HTMLSpanElement;
    /** The children list element */
    private childrenContainer: HTMLUListElement;
    /** The status icon in front of the content show if the item is open/close/leaf */
    private statusIcon: HTMLElement;

    /** List of children items */
    children: TreeItem[] = [];

    /** Item status */
    private expanded: boolean = false;

    /** Call back when expand is queried */
    onexpand: ((TreeItem)=>void)|null = null;
    /** Call back when fold is queried */
    onfold: ((TreeItem)=>void)|null = null;

    /** Internal data for advanced tree usage, not for user to use */
    data: any = null;

    constructor(
        private parent: Tree|TreeItem,
        private contents : Component|PhrasingCategory,
        private leaf: boolean = false
    ) {
        this.create();
    }

    get tree(): Tree {
        return this.parent instanceof Tree ? this.parent : this.parent.tree;
    }

    addChild(child: TreeItem) {
        this.children.push(child);
        this.childrenContainer.appendChild(child.container);
    }

    removeChild(child: TreeItem) {
        let index = this.children.indexOf(child);
        if (index >= 0) {
            // removes from array
            this.children.splice(index, 1);

            // removes from dom
            this.childrenContainer.removeChild(child.container);
        }
    }

    clear() {
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
                if (this.expanded) this.fold(); else this.expand();
            }
        }

        this.itemContent = document.createElement("span");
        this.itemContent.classList.add("of-tree__content");
        this.itemContent.appendChild(toHTMLElement(this.contents));
        this.primaryContent.appendChild(this.itemContent);

        this.itemContent.tabIndex = 1;
        this.itemContent.onclick = (event) => {
            this.tree.select(this);
        }

        this.itemContent.onkeyup = (event) => {
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
        }

        this.container.appendChild(li);

        this.childrenContainer = createUl();
        this.childrenContainer.classList.add(hiddenClass);
        this.container.appendChild(this.childrenContainer);

        mdlUpgradeElement(this.container);
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

    get firstChild(): TreeItem|null {
        return this.children.length > 0 ? this.children[0] : null;
    }

    get lastChild(): TreeItem|null {
        let children = this.children;
        return children.length > 0 ? children[children.length-1] : null;
    }

    get previousSibling(): TreeItem|null {
        let children = this.parent.children;
        let index = children.indexOf(this);
        return index > 0 ? children[index-1] : null;
    }

    get nextSibling(): TreeItem|null {
        let children = this.parent.children;
        let index = children.indexOf(this);
        return index < children.length - 1 ? children[index+1] : null;
    }

    setSelectionStatus(selected: boolean) {
        let classList = this.itemContent.classList;
        let contains = classList.contains(selectedClass);
        if (selected && !contains) {
            classList.add(selectedClass);
            this.itemContent.focus()
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
        } else {
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
      } else {
        if (this.nextSibling != null) {
          // if there is a next sibling, selects it
          this.tree.select(this.nextSibling);
        } else {
          var current:TreeItem = this;
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
        } else if (this.parent instanceof TreeItem) {
            this.tree.select(this.parent);
        }
    }

    goToChild() {
        // if there is no children, stop here
        if (this.leaf) return;

        // expands if not or select the first child
        if (this.expanded) {
            if (this.children.length > 0) {
                this.tree.select(this.children[0]);
            }
        } else {
            this.expand();
        }
    }
}
