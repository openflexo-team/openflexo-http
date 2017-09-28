import { Component } from "./Component";
import { mdlUpgradeElement, toHTMLElement } from "./utils";
import { PhrasingCategory } from "./category";

export class Button extends Component {

    container: HTMLButtonElement;

    constructor(
        private label: PhrasingCategory,
        private type: "raised"|"fab"|"mini-fab"|"icon" = "raised",
        private colored: boolean = false,
        private accent: boolean = false,
        private rippleEffect: boolean = false
    ) {
        super();
        this.create();
    }

    protected create(): void {
        this.container = document.createElement("button");
        this.container.classList.add("mdl-button");
        this.container.classList.add("mdl-js-button");
        this.container.classList.add("mdl-button--" + this.type);

        if (this.rippleEffect) {
            this.container.classList.add("mdl-js-ripple-effect");
        }
        if (this.colored) {
            this.container.classList.add("mdl-button--colored");
        }
        if (this.accent) {
            this.container.classList.add("mdl-button--accent");
        }

        this.container.appendChild(toHTMLElement(this.label));
        mdlUpgradeElement(this.container);
    }

    public setEnable(enable: boolean) {
        this.container.disabled = !enable;
    }
}
