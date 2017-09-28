import { addCssIfNotAlreadyPresent, mdlUpgradeElement, toHTMLElement, setEnable } from "./utils";
import { Component } from "./Component";
import { PhrasingCategory, FlowCategory } from "./category"

export class Card extends Component {

    container: HTMLDivElement;

    constructor(
        private title: PhrasingCategory,
        private description: FlowCategory,
    ) {
        super();
        addCssIfNotAlreadyPresent("/css/openflexo/ui/Card.css");
        this.create();
    }

    protected create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("of-card");
        this.container.classList.add("mdl-card");
        this.container.classList.add("mdl-shadow--2dp");

        let title = document.createElement("div");
        title.classList.add("mdl-card__title");

        let titleText = document.createElement("div");
        titleText.classList.add("mdl-card__title-text");
        title.appendChild(toHTMLElement(this.title));
        title.appendChild(titleText);
        this.container.appendChild(title);

        let text = document.createElement("div");
        text.classList.add("mdl-card__supporting-text");
        text.appendChild(toHTMLElement(this.description));
        this.container.appendChild(text);
    }

    setEnable(enable: boolean) {
      setEnable(this.title, enable);
      setEnable(this.description, enable);
    }
}
