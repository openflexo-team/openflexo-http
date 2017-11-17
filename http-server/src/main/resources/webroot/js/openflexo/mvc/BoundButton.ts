import { Api, RuntimeBindingId, createExtendedRuntimeBinding, ChangeEvent } from "../api/Api"
import { BoundComponent } from "./BoundComponent"
import {Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { Button } from "../ui/Button"

export class BoundButton extends BoundComponent {

    button : Button;

    container: HTMLButtonElement;

    private actionRuntimeBinding: RuntimeBindingId<string>|null;

    constructor(
        api: Api,
        private label: Component|PhrasingCategory,
        public action: string,
        runtime: string|null = null,
        private enabled: string|null = null,
        private type: "raised"|"fab"|"mini-fab"|"icon" = "raised",
        private colored: boolean = false,
        private accent: boolean = false,
        private rippleEffect: boolean = false
     ) {
      super(api);
      this.create();
      this.updateRuntime(runtime);
    }

    protected create(): void {
        this.button = new Button(this.label, this.type, this.colored, this.accent, this.rippleEffect);
        this.container = this.button.container;
        this.container.onclick = (e) => this.sendActionToServer(e);
    }

    setEnable(enable: boolean) {
        this.button.setEnable(enable);
    }

    private sendActionToServer(e: any) {
        if (this.actionRuntimeBinding !== null) {
            this.api.evaluate(this.actionRuntimeBinding).then(value => {
                this.container.classList.remove("mdl-button--colored");
            }).catch(error => {
                this.container.classList.add("mdl-button--colored");
            });
        }
    }

    updateRuntime(runtime: string|null,extensions: Map<string, string> = new Map<string, string>() ):void {
        super.updateRuntime(runtime, extensions);

        if (runtime !== null) {
            this.actionRuntimeBinding = createExtendedRuntimeBinding(this.action, runtime, extensions);
        }
    }
}
