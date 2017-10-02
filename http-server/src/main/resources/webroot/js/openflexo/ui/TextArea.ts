import { Component } from "./Component";
import { mdlDowngradeElement, mdlUpgradeElement, toHTMLElement, setEnable } from "./utils";
import { PhrasingCategory } from "./category";

export class TextArea extends Component {

/*
// TODO adds pattern for validation
<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
    <label class="mdl-textfield__label" for="sample4">Number...</label>
    <span class="mdl-textfield__error">Input is not a number!</span>
  </div>
*/
    container: HTMLDivElement;

    input: HTMLTextAreaElement;

    constructor(
        private readonly id: string,
        private value: string|null = null,
        private label: PhrasingCategory|null = null,
        private readonly floatingLabel: boolean = false,
        private readonly invalid: boolean = false,
        private readonly rows : number | null,
        private readonly max_rows : number | null = null,
     ) {
        super();
        this.create();
    }

    protected create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-textfield");
        this.container.classList.add("mdl-js-textfield");
        if (this.floatingLabel) {
            this.container.classList.add("mdl-textfield--floating-label");
        }
        if (this.invalid) {
            this.container.classList.add("is-invalid");
        }

        this.input = document.createElement("textarea");
        this.input.classList.add("mdl-textfield__input");
        this.input.id = this.id;

        if(this.rows){
            this.input.rows = this.rows;
        }

        if(this.max_rows){
            this.input.cols = this.max_rows;
        }

        this.container.appendChild(this.input);

        if (this.value != null) {
            this.input.value = this.value;
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

    isEnable(): boolean {
      return !this.input.disabled;
    }

    setEnable(enable: boolean) {
      setEnable(this.label, enable);
      this.input.disabled = !enable;
    }
}
