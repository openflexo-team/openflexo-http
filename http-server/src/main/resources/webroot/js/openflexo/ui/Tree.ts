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

    container: HTMLDivElement;

    private primaryContent: HTMLSpanElement;
    private itemContent: HTMLSpanElement;
    private childrenContainer: HTMLUListElement;
    private statusIcon: HTMLElement;

    children: TreeItem[] = [];
    
    private expanded: boolean = false;

    onexpand: ((TreeItem)=>void)|null = null;
    onfold: ((TreeItem)=>void)|null = null;
    
    /** Internal data for advanced tree usage, not for user to use */
    data: any = null;

    constructor(
        private tree: Tree,
        private contents : Component|PhrasingCategory,
        private noChildren: boolean = false
    ) {
        this.create();
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
        this.statusIcon.innerText = this.noChildren ? emptyIcon : foldedIcon;
        this.primaryContent.appendChild(this.statusIcon);
    
        this.statusIcon.onclick = (event) => {
            if (!this.noChildren) {
                if (this.expanded) this.fold(); else this.expand();
            }
        }
        
        this.itemContent = document.createElement("span");
        this.itemContent.classList.add("of-tree__content");
        this.itemContent.appendChild(toHTMLElement(this.contents));
        this.primaryContent.appendChild(this.itemContent);

        this.itemContent.onclick = (event) => {
            this.tree.select(this);
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

    setSelectionStatus(selected: boolean) {
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
