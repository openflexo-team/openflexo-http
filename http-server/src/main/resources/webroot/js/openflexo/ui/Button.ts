import { Component } from "./component";
import { mdlUpgradeElement, toHTMLElement } from "./utils";
import { PhrasingCategory } from "./category";

export class Button implements Component {

    container: HTMLButtonElement;

    constructor(
        private label: Component|PhrasingCategory,
        private fab: boolean = false,
        private colored: boolean = false,
        private accent: boolean = false,
        private rippleEffect: boolean = false
    ) {
        this.create();
    }

    private create(): void {
        this.container = document.createElement("button");
        this.container.classList.add("mdl-button");
        this.container.classList.add("mdl-js-button");
        if (this.fab !== null) {
            this.container.classList.add("mdl-button--fab");
        } 
        if (this.rippleEffect !== null) {
            this.container.classList.add("mdl-js-ripple-effect");
        } 
        if (this.colored !== null) {
            this.container.classList.add("mdl-button--colored");
        } 
        if (this.accent !== null) {
            this.container.classList.add("mdl-button--accent");
        }
        
        this.container.appendChild(toHTMLElement(this.label));

        mdlUpgradeElement(this.container);
    }    
}

/*
<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">add</i>
</button>
 */