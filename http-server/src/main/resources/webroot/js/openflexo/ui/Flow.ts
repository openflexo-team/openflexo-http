import { Component } from "./Component";
import { mdlUpgradeElement, toHTMLElement } from "./utils";

export class Flow implements Component {

    container: HTMLDivElement|HTMLSpanElement;

    private children: Component[] = [];

    constructor(
        ...children: Component[]
    ) {
        this.create();
        children.forEach(child => this.addChild(child));
    }

    addChild(child: Component) {
        this.children.push(child);
        this.container.appendChild(child.container);
    }

    removeChild(child: Component) {
        let index = this.children.indexOf(child);
        if (index >= 0) {
            // removes from array
            this.children.splice(index, 1);

            // removes from dom
            this.container.removeChild(child.container);
        }
    }

    create(): void {
        this.container = document.createElement("span");
        mdlUpgradeElement(this.container);
    }    
}
