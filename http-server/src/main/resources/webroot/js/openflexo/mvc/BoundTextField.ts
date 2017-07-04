import { Api, RuntimeBindingId, ChangeEvent, runtimeBinding } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { TextField } from "../ui/TextField"

var idSeed = 0;

export class BoundTextField implements Component {

    textField : TextField;

    container: HTMLDivElement;

    valueBinding: RuntimeBindingId;

    constructor(
        private api: Api, 
        private binding: RuntimeBindingId,
        private label: PhrasingCategory|null = null,
        private floatingLabel: boolean = false,
        private invalid: boolean = false,
        private id: string|null = null
     ) {
        this.create();
    }

    create(): void {
        let actualId = this.id !== null ? this.id : "boundTextField"+idSeed++;
        this.textField = new TextField(
            actualId, this.binding.binding.expression, this.label, 
            this.floatingLabel, this.invalid
        );

        let input = this.textField.input;
        input.onchange = (e) => this.sendToServer(e);
        input.onblur = (e) => this.sendToServer(e);

        this.valueBinding = runtimeBinding("", this.binding.binding.contextUrl, this.binding.runtimeUrl);
        this.api.evaluate<string>(this.binding, false).then( value => {
            input.value = value;
        });

        this.api.addChangeListener(this.binding, (e) => this.listenFromServer(e));

        this.container = this.textField.container;
    }    

    listenFromServer(event: ChangeEvent) {
        this.textField.input.value = event.value;
    }

    sendToServer(e: any) {
        // TODO update binding
        console.log("Update textfield " + this.textField.input.id);
        this.valueBinding.binding.expression = "'" + this.textField.input.value + "'";
        this.api.assign(this.binding, this.valueBinding, false).then(value => {
            this.container.classList.remove("is-invalid");
        }).catch(error => {
            this.container.classList.add("is-invalid");
        });
    }

}