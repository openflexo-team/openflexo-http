import { Api, RuntimeBindingId, ChangeEvent } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { Button } from "../ui/Button"

export class BoundButton implements Component {

    button : Button;

    container: HTMLButtonElement;

    constructor(
        private api: Api, 
        private action: RuntimeBindingId,
        private enabled: RuntimeBindingId|null,
        private label: Component|PhrasingCategory,
        private type: "raised"|"fab"|"mini-fab"|"icon" = "raised",
        private colored: boolean = false,
        private accent: boolean = false,
        private rippleEffect: boolean = false
     ) {
        this.create();
    }

    create(): void {
        this.button = new Button(this.label, this.type, this.colored, this.accent, this.rippleEffect);
        this.container = this.button.container;

        this.container.onclick = (e) => this.sendActionToServer(e);
        
        if (this.enabled != null) { 
            this.api.evaluate<string>(this.enabled).then( value => {
                this.button.setEnable(value === "true")
            });

            this.api.addChangeListener(this.enabled, (e) => this.listenFromServer(e));
        }
    }    

    listenFromServer(event: ChangeEvent) {
        this.button.setEnable(event.value === "true")
    }

    sendActionToServer(e: any) {
        this.api.evaluate(this.action).then(value => {
            this.container.classList.remove("mdl-button--colored");
        }).catch(error => {
            this.container.classList.add("mdl-button--colored");
        });
    }

}