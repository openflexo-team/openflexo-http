import { Api, RuntimeBindingId, BindingId, ChangeEvent } from "../api/Api"
import { BoundComponent } from "./BoundComponent"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

export class BoundLabel extends BoundComponent {

    container: HTMLSpanElement;

    private runtimeBinding: RuntimeBindingId<string>|null = null;

    private readonly changelistener = event => this.container.innerText = event.value;

    constructor(
        private api: Api,
        private binding:BindingId<string>,
        runtime: string|null = null
     ) {
        super();
        this.create();
        this.updateRuntime(runtime);
    }

    create(): void {
        this.container = document.createElement("span");
    }

    updateRuntime(runtime: string|null):void {
        if (this.runtimeBinding !== null) {
            this.api.removeChangeListener(this.runtimeBinding, this.changelistener);
        }
        this.runtimeBinding = null;
        if (runtime !== null) {
            this.runtimeBinding = new RuntimeBindingId(this.binding, runtime);
            this.api.evaluate<string>(this.runtimeBinding).then( value => this.container.innerText = value );
            this.api.addChangeListener(this.runtimeBinding, this.changelistener);
        }
    }

    setEnable(enable: boolean) {
      // nothing to do
    }
}
