import { Api, BindingId, RuntimeBindingId, ChangeEvent } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { Button } from "../ui/Button"

export class BoundButton implements Component {

    button : Button;

    container: HTMLButtonElement;

    private enabledRuntimeBinding: RuntimeBindingId<string>|null = null
    private enabledChangeListener = (event) => this.listenFromServer(event);

    private actionRuntimeBinding: RuntimeBindingId<string>|null;

    constructor(
        private api: Api, 
        private label: Component|PhrasingCategory,
        public action: BindingId<string>,
        runtime: string|null = null,
        private enabled: BindingId<string>|null = null,
        private type: "raised"|"fab"|"mini-fab"|"icon" = "raised",
        private colored: boolean = false,
        private accent: boolean = false,
        private rippleEffect: boolean = false
     ) {
        this.create();
        this.updateRuntime(runtime);
    }

    create(): void {
        this.button = new Button(this.label, this.type, this.colored, this.accent, this.rippleEffect);
        this.container = this.button.container;
        this.container.onclick = (e) => this.sendActionToServer(e);
    }    

    setEnable(enable: boolean) {
        this.button.setEnable(enable);
    }

    private listenFromServer(event: ChangeEvent) {
        this.setEnable(event.value === "true")
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
        if (this.enabledRuntimeBinding !== null) {
            this.api.removeChangeListener(this.enabledRuntimeBinding, this.enabledChangeListener);
        }
        this.enabledRuntimeBinding = null;
        if (runtime !== null) {
            if (this.enabled !== null) {
                this.enabled.contextUrl = runtime; 
                this.enabledRuntimeBinding = new RuntimeBindingId(this.enabled, runtime,extensions);
                this.api.evaluate<boolean>(this.enabledRuntimeBinding).then( value => {
                    this.button.setEnable(value)
                } );
                this.api.addChangeListener(this.enabledRuntimeBinding, this.enabledChangeListener);
            } else {
                this.setEnable(true);
            }

            this.action.contextUrl = runtime; 
            this.actionRuntimeBinding = new RuntimeBindingId(this.action, runtime,extensions);
        } else {
            this.setEnable(false);
        }
    }
}