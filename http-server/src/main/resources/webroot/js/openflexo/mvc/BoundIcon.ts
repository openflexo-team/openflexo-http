import { Api, RuntimeBindingId, ChangeEvent } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"
import { Icon } from "../ui/Icon"

import { BoundComponent } from "./BoundComponent";
import { updateBindingRuntime } from "./utils";

export class BoundIcon extends BoundComponent {

    icon: Icon;

    container: HTMLSpanElement;

    private runtimeBinding: RuntimeBindingId<string>|null = null;

    private readonly changelistener = value => this.container.innerText =value;

    constructor(
        api: Api,
        private binding:string,
        runtime: string|null = null,
        public defaultIcon: string = "warning"
     ) {
        super(api);
        this.create();
        this.updateRuntime(runtime);
    }

    create(): void {
        this.icon = new Icon(this.defaultIcon);
        this.container = this.icon.container;
    }

    updateRuntime(runtime: string|null, extensions = new Map<string, string>()):void {
      super.updateRuntime(runtime, extensions);

      this.runtimeBinding = updateBindingRuntime(
        this.api, this.binding, this.runtimeBinding, this.changelistener,
        runtime, extensions
      )
    }

    setEnable(enable: boolean) {
      this.icon.setEnable(enable);
    }
}
