import { Api, BindingId, RuntimeBindingId, ChangeEvent } from "../api/Api"
import { BoundComponent } from "./BoundComponent"
import {Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement ,toHTMLElement} from "../ui/utils"

import { updateBindingRuntime } from "./utils";

export class BoundWrapper extends BoundComponent {

    wrappedElement : PhrasingCategory;

    container: HTMLElement;

    constructor(
        api: Api,
        runtime: string|null = null,
        wrappedElement : PhrasingCategory
     ) {
      super(api);
      this.wrappedElement = wrappedElement;
      this.create();
      this.updateRuntime(runtime);
    }

    protected create(): void {
        this.container = <HTMLElement> toHTMLElement(this.wrappedElement);
    }

    setEnable(enable: boolean) {
        if( this.wrappedElement instanceof Component ){
            this.wrappedElement.setEnable(enable);
        }
    }
}
