import { Component } from "./Component";
import { mdlDowngradeElement, mdlUpgradeElement, toHTMLElement } from "./utils";
import { PhrasingCategory } from "./category";

export class TextField implements Component {

    // TODO adds pattern for validation

/*

<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
    <label class="mdl-textfield__label" for="sample4">Number...</label>
    <span class="mdl-textfield__error">Input is not a number!</span>
  </div>

*/
    container: HTMLDivElement;

    constructor(
        private id: string,
        private value: string|null = null,
        private label: PhrasingCategory|null = null,
        private floatingLabel: boolean = false,
        private multiline: boolean = false,
        private invalid: boolean = false
     ) {
        this.create();
    }

    create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-textfield");
        this.container.classList.add("mdl-js-textfield");
        if (this.floatingLabel) {
            this.container.classList.add("mdl-textfield--floating-label");
        }
        if (this.invalid) {
            this.container.classList.add("is-invalid");
        }

        let input = document.createElement("input");
        input.classList.add("mdl-textfield__input");
        input.type = "text";
        input.id = this.id;
        this.container.appendChild(input);

        if (this.value != null) {
            input.value = this.value;
        }

        if (this.label != null) {
            let label = document.createElement("label");
            label.classList.add("mdl-textfield__label");
            label.htmlFor = this.id;
            label.appendChild(toHTMLElement(this.label));
            this.container.appendChild(label);
        }

        mdlUpgradeElement(this.container);
    }    
}