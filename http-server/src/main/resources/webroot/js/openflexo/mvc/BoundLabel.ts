import { Api, RuntimeBindingId, ChangeEvent, runtimeBinding } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

export class BoundLabel implements Component {

    container: HTMLSpanElement;

    constructor(
        private api: Api, 
        private binding: RuntimeBindingId,
     ) {
        this.create();
    }

    create(): void {
        this.container = document.createElement("span");

        this.api.evaluate<string>(this.binding, false).then( value => this.container.innerText = value );

        this.api.addChangeListener(this.binding, event => this.container.innerText = event.value );
    }    
}