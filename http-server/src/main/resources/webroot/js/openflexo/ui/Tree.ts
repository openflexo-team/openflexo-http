import { addCssIfNotAlreadyPresent, mdlUpgradeElement, toHTMLElement } from "./utils";

import { Component } from "./component";
import { Icon } from "./icon";

import { PhrasingCategory, FlowCategory, toElement } from "./category"

const hiddenClass = "of-tree__hidden";
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

export class Tree implements Component {

    container: HTMLUListElement;

    children: TreeItem[] = [];
    
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
}

export class TreeItem implements Component {

    container: HTMLDivElement;

    private childrenContainer: HTMLUListElement;
    private statusIcon: HTMLElement;

    children: TreeItem[] = [];
    
    private expanded: boolean = false;

    expandCallback: ((TreeItem)=>void)|null = null;
    foldCallback: ((TreeItem)=>void)|null = null;
    
    /** Internal data for advanced tree usage, not for user to use */
    data: any = null;

    constructor(
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
        for (let item of this.children) {
            this.removeChild(item);
        }
    }
    
    create() {
        this.container = createDiv();
        
        let li = document.createElement("li");     
        li.classList.add("mdl-list__item");
        li.classList.add("of-tree__item");
        
        let primaryContent = document.createElement("span");
        primaryContent.classList.add("mdl-list__item-primary-content");
        li.appendChild(primaryContent);
    
        this.statusIcon = document.createElement("i");
        this.statusIcon.classList.add("material-icons");
        this.statusIcon.classList.add("mdl-list__item-icon");
        this.statusIcon.innerText = this.noChildren ? emptyIcon : foldedIcon;
        primaryContent.appendChild(this.statusIcon);
    
        this.statusIcon.onclick = (event) => {
            if (!this.noChildren) {
                if (this.expanded) this.fold(); else this.expand();
            }
        }
        
        primaryContent.appendChild(toHTMLElement(this.contents));
    
        this.container.appendChild(li);
        
        this.childrenContainer = createUl();
        this.childrenContainer.classList.add(hiddenClass);
        this.container.appendChild(this.childrenContainer);

        mdlUpgradeElement(this.container);
    }

    expand() {
        if (!this.expanded) {
            // expands
            if (this.expandCallback !== null) {
                this.expandCallback(this);
            }

            this.childrenContainer.classList.remove(hiddenClass);
            this.statusIcon.innerText = expandedIcon;
            this.expanded = true;
        }
    }

    fold() {
        if (this.expand) {
            // folds
            if (this.foldCallback !== null) {
                this.foldCallback(this);
            }

            this.childrenContainer.classList.add(hiddenClass);
            this.statusIcon.innerText = foldedIcon;
            this.expanded = false;
        }
    }
}
