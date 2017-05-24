import { Component } from "./Component";
import { mdlDowngradeElement, mdlUpgradeElement, forEachNode } from "./utils";

const activeClassName = "is-active";

export class Tabs implements Component {

    container: HTMLDivElement;

    tabsHeader: HTMLDivElement;

    private tabs: Tab[] = [];

    constructor(
        private readonly rippleEffect = false
    ) {
        this.create();
    }

    addTab(tab: Tab) {
        this.tabs.push(tab);
        this.container.appendChild(tab.container);
        this.tabsHeader.appendChild(tab.header);

        mdlDowngradeElement(this.container);
        mdlUpgradeElement(this.container);
    }

    removeTab(tab: Tab) {
        // TODO
    }

    selectTab(tab: Tab) {
        let result = this.container.querySelectorAll("." + activeClassName);
        forEachNode(result, (i, n) => {
            n.classList.remove(activeClassName);
        });

        tab.container.classList.add(activeClassName);
        tab.header.classList.add(activeClassName)
    }

    create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-tabs");
        this.container.classList.add("mdl-js-tabs");
        
        
        if (this.rippleEffect) {
            this.container.classList.add("mdl-js-ripple-effect");
        }

        this.tabsHeader = document.createElement("div");
        this.tabsHeader.classList.add("mdl-tabs__tab-bar");
        this.container.appendChild(this.tabsHeader);    

        mdlUpgradeElement(this.container);
    }    
}

export class Tab implements Component {

    container: HTMLDivElement;

    header: HTMLAnchorElement;

    constructor(
        public id: string,
        public title: string,
        private contents : Component|HTMLElement
    ) {
        this.create();
    }

    create() {
        this.container = document.createElement("div");
        this.container.id = this.id;
        this.container.classList.add("mdl-tabs__panel");
        let contents = this.contents;
        if ((<Component> contents).container) {
            this.container.appendChild((<Component> contents).container);
        } else {
            // it's an html element
            this.container.appendChild(<HTMLElement> contents);
        }

        this.header = document.createElement("a");
        this.header.classList.add("mdl-tabs__tab");
        this.header.href = "#" + this.id;
        this.header.innerText = this.title;

        mdlUpgradeElement(this.container);
        mdlUpgradeElement(this.header);
    }
}