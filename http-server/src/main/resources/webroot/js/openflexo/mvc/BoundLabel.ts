import { Api, RuntimeBindingId, ChangeEvent } from "../api/Api"
import { BoundComponent } from "./BoundComponent"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"
import { updateBindingRuntime } from "./utils";

export class BoundLabel extends BoundComponent {

    container: HTMLSpanElement;

    private runtimeBinding: RuntimeBindingId<string>|null = null;

    private readonly changelistener = value => this.container.innerText = value;

    constructor(
        api: Api,
        private binding:string,
        runtime: string|null = null
     ) {
        super(api);
        this.create();
        this.updateRuntime(runtime);
    }

    create(): void {
        this.container = document.createElement("span");
    }

    updateRuntime(runtime: string|null,extensions: Map<string, string> = new Map<string, string>()):void {
        super.updateRuntime(runtime, extensions);

        this.runtimeBinding = updateBindingRuntime(
        this.api, this.binding, this.runtimeBinding, this.changelistener,
        runtime, extensions
      )
    }

    setEnable(enable: boolean) {
      // nothing to do
    }
}
