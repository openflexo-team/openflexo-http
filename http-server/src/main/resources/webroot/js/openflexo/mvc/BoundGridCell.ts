import { Api, BindingId, RuntimeBindingId, ChangeEvent } from "../api/Api"
import { BoundComponent } from "./BoundComponent"
import {Component } from "../ui/Component"
import {AbstractGridCell } from "../ui/Grid"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement ,toHTMLElement} from "../ui/utils"

import { Grid } from "../ui/Grid"
import { GridCell } from "../ui/Grid"
import { updateBindingRuntime } from "./utils";

export class BoundGridCell extends BoundComponent implements AbstractGridCell {

    wrappedElement : Component ;

    container: HTMLDivElement;

   // private readonly changelistener;// = value => this.container.innerText = value;

   // private runtimeBinding: RuntimeBindingId<string>|null;

    constructor(
        api: Api,
        runtime: string|null = null,
        wrappedElement : Component,
        private size: number = 4
        //private binding:BindingId<string>
     ) {
      super(api);
      this.wrappedElement = new GridCell(wrappedElement, size);
      this.create();
      this.updateRuntime(runtime);
    }

    protected create(): void {
        this.container = <HTMLDivElement> toHTMLElement(this.wrappedElement);
        //this.container.appendChild(toHTMLElement(this.wrappedElement));                
        //mdlUpgradeElement(this.container);
    }

    setEnable(enable: boolean) {
        if( this.wrappedElement instanceof Component ){
            this.wrappedElement.setEnable(enable);
        }

    }
}
