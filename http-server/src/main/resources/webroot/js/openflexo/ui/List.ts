import { addCssIfNotAlreadyPresent, mdlUpgradeElement, toHTMLElement } from "./utils";

import { Component } from "./component";

import { TechnologyAdapter } from "../api";

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
        private icon: string|null = null,
        private action: Component|PhrasingCategory|null = null
    ) {
        this.create();
    }

    create() {
        this.container = document.createElement("li");
        this.container.classList.add("mdl-list__item");

        if (this.icon != null) {
            let i = document.createElement("i");
            i.classList.add("material-icons");
            i.classList.add("mdl-list__item-icon");
            i.innerText = this.icon;
            this.container.appendChild(i);
        }

        this.container.appendChild(toHTMLElement(this.contents));

        if (this.action != null) {
            let action = document.createElement("span");
            action.classList.add("mdl-list__item-secondary-action");
            action.appendChild(toHTMLElement(this.action));
            this.container.appendChild(action);
        }

        mdlUpgradeElement(this.container);
    }
}
