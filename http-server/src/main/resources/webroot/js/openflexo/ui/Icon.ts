import { Component } from "./Component";
import { mdlUpgradeElement } from "./utils";

export class Icon extends Component {

    container: HTMLSpanElement;

    constructor(
        private icon: string
    ) {
        super();
        this.create();
    }

    protected create(): void {
        this.container = document.createElement("i");
        this.container.classList.add("material-icons");
        this.container.innerText = this.icon;
        mdlUpgradeElement(this.container);
    }

    setEnable(enable: boolean) {
      // nothing to do
    }
}
