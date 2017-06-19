import { Component } from "./component";
import { mdlUpgradeElement } from "./utils";

export class Icon implements Component {

    container: HTMLSpanElement;

    constructor(
        private icon: string
    ) {
        this.create();
    }

    private create(): void {
        this.container = document.createElement("i");
        this.container.classList.add("material-icons");
        this.container.innerText = this.icon;
        mdlUpgradeElement(this.container);
    }    
}