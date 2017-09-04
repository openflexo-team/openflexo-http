import { addCssIfNotAlreadyPresent, mdlUpgradeElement, toHTMLElement } from "./utils";
import { Component } from "./Component";
import { PhrasingCategory, FlowCategory, toElement } from "./category"

export class Card implements Component {

    container: HTMLDivElement;

    constructor(
        private title: PhrasingCategory,
        private description: FlowCategory,
    ) {
        addCssIfNotAlreadyPresent("/css/openflexo/ui/Card.css");
        this.create();
    }

    private create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("of-card");
        this.container.classList.add("mdl-card");
        this.container.classList.add("mdl-shadow--2dp");

        let title = document.createElement("div");
        title.classList.add("mdl-card__title");
        
        let titleText = document.createElement("div");
        titleText.classList.add("mdl-card__title-text");
        title.appendChild(toElement(this.title));
        title.appendChild(titleText);
        this.container.appendChild(title);

        let text = document.createElement("div");
        text.classList.add("mdl-card__supporting-text");
        text.appendChild(toElement(this.description));
        this.container.appendChild(text);

        mdlUpgradeElement(this.container);
    }    
}

export class GridCell implements Component {

    container: HTMLDivElement;

    constructor(
        private contents : Component|FlowCategory,
        private size: number = 4
    ) {
        this.create();
    }

    create() {
        this.container = document.createElement("div");
        this.container.classList.add("grid-cell");
        this.container.classList.add("mdl-cell--"+ this.size +"-col");
        let contents = this.contents;
        this.container.appendChild(toHTMLElement(contents))
        mdlUpgradeElement(this.container);
    }
}