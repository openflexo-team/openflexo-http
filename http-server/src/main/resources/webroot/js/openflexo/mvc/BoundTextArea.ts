import { Api, RuntimeBindingId, BindingId, ChangeEvent, createRuntimeBinding } from "../api/Api";
import { BoundComponent } from "./BoundComponent";
import { PhrasingCategory } from "../ui/category";
import { mdlUpgradeElement } from "../ui/utils";

import { TextArea } from "../ui/TextArea";
import { updateBindingRuntime } from "./utils";

var idSeed = 0;

export class BoundTextArea extends BoundComponent {

    textArea : TextArea;

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
        private readonly id: string|null = null,
        private readonly rows : number | null
     ) {
        super(api);
        this.create();
        this.updateRuntime(runtime);
    }

    create(): void {
        let actualId = this.id !== null ? this.id : "boundTextField"+idSeed++;
        this.textArea = new TextArea(
            actualId, this.binding.expression, this.label,
            this.floatingLabel, this.invalid, this.rows
        );

        let input = this.textArea.input;
        input.onchange = (e) => this.sendToServer(e);
        input.onblur = (e) => this.sendToServer(e);

        this.container = this.textArea.container;
    }

    private sendToServer(e: any) {
        if (this.runtimeBinding !== null) {
            this.api.assign(this.runtimeBinding, this.textArea.input.value, false).then(value => {
                this.container.classList.remove("is-invalid");
            }).catch(error => {
                this.container.classList.add("is-invalid");
            });
        }
    }

    private updateValue(value: any) {
        this.textArea.input.value = value;
    }

    updateRuntime(runtime: string|null, extensions = new Map<string, string>()):void {
      super.updateRuntime(runtime, extensions);

      this.runtimeBinding = updateBindingRuntime(
        this.api, this.binding, this.runtimeBinding,
        this.changelistener, runtime, extensions
      );
    }

    isEnable(): boolean {
      return this.textArea.isEnable();
    }

    setEnable(enable: boolean) {
        this.textArea.setEnable(enable);
    }
}
