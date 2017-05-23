import { Component } from "./Component";

export class Tabs implements Component {

    container: HTMLDivElement;

    private tabs: Tab[] = [];

    constructor(
        private readonly rippleEffect = false
    ) {
    }

    addCell(tab: Tab) {
        this.tabs.push(tab);

        // TODO add container if grid already initialized
    }

    initialize(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-tabs");
        this.container.classList.add("mdl-js-tabs");
        
        if (!this.rippleEffect) {
            this.container.classList.add("mdl-js-ripple-effect");
        }

        for (let tab of this.tabs) {
            this.container.appendChild(tab.createTab());
        }
    }    

    dispose(): void {
    }
}

export class Tab {
    createTab(): HTMLDivElement {
        let tab = document.createElement("div");
        
        return tab;
    }
}