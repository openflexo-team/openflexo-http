import { Api, RuntimeBindingId, BindingId, ChangeEvent } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"
import { Icon } from "../ui/Icon"

import { BoundComponent } from "./BoundComponent"

export class BoundIcon extends BoundComponent {

    icon: Icon;

    container: HTMLSpanElement;

    private runtimeBinding: RuntimeBindingId<string>|null = null;

    private readonly changelistener = event => this.container.innerText = event.value;

    constructor(
        private api: Api,
        private binding:BindingId<string>,
        runtime: string|null = null,
        public defaultIcon: string = "warning"
     ) {
        super();
        this.create();
        this.updateRuntime(runtime);
    }

    create(): void {
        this.icon = new Icon(this.defaultIcon);
        this.container = this.icon.container;
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
      this.icon.setEnable(enable);
    }
}
