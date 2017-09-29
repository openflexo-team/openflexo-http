import { Api, RuntimeBindingId, BindingId, ChangeEvent, createRuntimeBinding } from "../api/Api";
import { BoundComponent } from "./BoundComponent";
import { PhrasingCategory } from "../ui/category";
import { mdlUpgradeElement } from "../ui/utils";

import { TextField } from "../ui/TextField";
import { updateBindingRuntime } from "./utils";

var idSeed = 0;

export class BoundTextField extends BoundComponent {

    textField : TextField;

    container: HTMLDivElement;

    private runtimeBinding: RuntimeBindingId<string>|null = null;

    private readonly changelistener = (value) => this.updateValue(value);

    constructor(
        api: Api,
        private binding: BindingId<string>,
        private readonly label: PhrasingCategory|null = null,
        private runtime: string|null = null,
        private readonly floatingLabel: boolean = false,
        private readonly invalid: boolean = false,
        private readonly id: string|null = null
     ) {
        super(api);
        this.create();
        this.updateRuntime(runtime);
    }

    create(): void {
        let actualId = this.id !== null ? this.id : "boundTextField"+idSeed++;
        this.textField = new TextField(
            actualId, this.binding.expression, this.label,
            this.floatingLabel, this.invalid
        );

        let input = this.textField.input;
        input.onchange = (e) => this.sendToServer(e);
        input.onblur = (e) => this.sendToServer(e);

        this.container = this.textField.container;
    }

    private sendToServer(e: any) {
        if (this.runtimeBinding !== null) {
            this.api.assign(this.runtimeBinding, this.textField.input.value, false).then(value => {
                this.container.classList.remove("is-invalid");
            }).catch(error => {
                this.container.classList.add("is-invalid");
            });
        }
    }

    private updateValue(value: any) {
        this.textField.input.value = value;
    }

    updateRuntime(runtime: string|null, extensions = new Map<string, string>()):void {
      super.updateRuntime(runtime, extensions);

      this.runtimeBinding = updateBindingRuntime(
        this.api, this.binding, this.runtimeBinding,
        this.changelistener, runtime, extensions
      );
    }

    isEnable(): boolean {
      return this.textField.isEnable();
    }

    setEnable(enable: boolean) {
        this.textField.setEnable(enable);
    }
}
