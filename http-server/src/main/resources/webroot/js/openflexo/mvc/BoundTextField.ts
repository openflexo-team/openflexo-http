import { Api, RuntimeBindingId, BindingId, ChangeEvent, createRuntimeBinding } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { TextField } from "../ui/TextField"

var idSeed = 0;

export class BoundTextField implements Component {

    textField : TextField;

    container: HTMLDivElement;

    private runtimeBinding: RuntimeBindingId|null = null;

    private readonly changelistener = (event) => this.updateValue(event.value);
    
    constructor(
        private api: Api, 
        private binding: BindingId,
        private label: PhrasingCategory|null = null,
        private runtime: string|null = null,
        private floatingLabel: boolean = false,
        private invalid: boolean = false,
        private id: string|null = null
     ) {
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

    updateRuntime(runtime: string|null):void {
        if (this.runtimeBinding !== null) {
            this.api.removeChangeListener(this.runtimeBinding, this.changelistener);
        }
        this.runtimeBinding = null;
        if (runtime !== null) {
            this.runtimeBinding = new RuntimeBindingId(this.binding, runtime);
            this.api.evaluate<string>(this.runtimeBinding).then( value => this.updateValue(value));
            this.api.addChangeListener(this.runtimeBinding, this.changelistener);
        }
    }
}