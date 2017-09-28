import { Component } from "./Component";
import { FlowCategory } from "./category"
import { mdlUpgradeElement, toHTMLElement, setEnable } from "./utils";

export class Flow extends Component {

    container: HTMLDivElement|HTMLSpanElement;

    private children: FlowCategory[] = [];
    private elements: Node[] = [];

    constructor(
        ...children: FlowCategory[]
    ) {
        super();
        this.create();
        children.forEach(child => this.addChild(child));
    }

    addChild(child: FlowCategory) {
        this.children.push(child);
        let element = toHTMLElement(child);
        this.elements.push(element);
        this.container.appendChild(element);
    }

    removeChild(child: FlowCategory) {
        let index = this.children.indexOf(child);
        if (index >= 0) {
            // removes from array
            this.children.splice(index, 1);

            let element = this.elements[index];
            this.elements.splice(index, 1);
            // removes from dom
            this.container.removeChild(element);
        }
    }

    protected create(): void {
        this.container = document.createElement("span");
    }

    setEnable(enable: boolean) {
      this.children.forEach(child => setEnable(child, enable));
    }
}
