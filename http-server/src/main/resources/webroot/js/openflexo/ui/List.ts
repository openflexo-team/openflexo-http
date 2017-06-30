import { addCssIfNotAlreadyPresent, mdlUpgradeElement, toHTMLElement } from "./utils";

import { Component } from "./component";

import { PhrasingCategory, FlowCategory, toElement } from "./category"

export class List implements Component {

    container: HTMLUListElement;

    private items: ListItem[] = [];

    constructor() {
        addCssIfNotAlreadyPresent("/css/openflexo/ui/List.css");
        this.create();
    }

    addItem(item: ListItem) {
        this.items.push(item);
        this.container.appendChild(item.container);
    }

    removeItem(item: ListItem) {
        let index = this.items.indexOf(item);
        if (index >= 0) {
            // removes from array
            this.items.splice(index, 1);

            // removes from dom
            this.container.removeChild(item.container);
        }
    }

    private create(): void {
        this.container = document.createElement("ul");
        this.container.classList.add("of-list");
        this.container.classList.add("mdl-list");
  
        mdlUpgradeElement(this.container);
    }    
}

export class ListItem implements Component {

    container: HTMLLIElement;

    constructor(
        private contents : Component|PhrasingCategory,
        private body: Component|PhrasingCategory|null = null,
        private icon: string|null = null,
        private action: Component|PhrasingCategory|null = null
    ) {
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

        primaryContent.appendChild(toHTMLElement(this.contents));

        if (this.body != null) {
            let bodySpan = document.createElement("span");
            bodySpan.classList.add("mdl-list__item-text-body");
            bodySpan.appendChild(toHTMLElement(this.body));
            primaryContent.appendChild(bodySpan);
        }

        if (this.action != null) {
            let action = document.createElement("span");
            action.classList.add("mdl-list__item-secondary-action");
            action.appendChild(toHTMLElement(this.action));
            primaryContent.appendChild(action);
        }

        mdlUpgradeElement(this.container);
    }
}
