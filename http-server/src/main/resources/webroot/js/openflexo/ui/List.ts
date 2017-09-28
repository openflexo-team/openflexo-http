import { addCssIfNotAlreadyPresent, mdlUpgradeElement, toHTMLElement } from "./utils";

import { Component } from "./Component";

import { PhrasingCategory, FlowCategory } from "./category"

export class List extends Component {

    container: HTMLUListElement;

    private items: ListItem[] = [];

    constructor() {
      super();
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

    protected create(): void {
        this.container = document.createElement("ul");
        this.container.classList.add("of-list");
        this.container.classList.add("mdl-list");
        mdlUpgradeElement(this.container);
    }

    setEnable(enable: boolean) {
      this.items.forEach(item => item.setEnable(enable));
    }
}

export class ListItem extends Component {

    container: HTMLLIElement;

    constructor(
        private contents : Component|PhrasingCategory,
        private body: Component|PhrasingCategory|null = null,
        private icon: string|null = null,
        private action: Component|PhrasingCategory|null = null
    ) {
        super();
        this.create();
    }

    protected create() {
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

    setEnable(enable: boolean) {
      if (this.contents instanceof Component) {
        this.contents.setEnable(enable);
      }
      if (this.body instanceof Component) {
        this.body.setEnable(enable);
      }
      if (this.action instanceof Component) {
        this.action.setEnable(enable);
      }
    }
}
