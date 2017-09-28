import { addCssIfNotAlreadyPresent, mdlUpgradeElement } from "./utils";

export abstract class Component {

    readonly container : HTMLSpanElement | HTMLDivElement;

    constructor(
    ) {
      addCssIfNotAlreadyPresent("/css/openflexo/ui/Component.css");
    }

    setVisible(visible: boolean) {
      if (visible) {
        this.container.classList.remove("of-hidden")
      } else {
        this.container.classList.add("of-hidden")
      }
    }

    abstract setEnable(enable: boolean);
}

export interface Selectable<T> {

    onselect: ((selection: ReadonlySet<T>)=>void)|null;

}
