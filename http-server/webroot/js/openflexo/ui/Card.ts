import { addCssIfNotAlreadyPresent, mdlUpgradeElement } from "./utils";

import { Component } from "./component";

import { TechnologyAdapter } from "../api";

import { PhrasingCategory, FlowCategory, toElement } from "./category"

export class Card implements Component {

    ta: TechnologyAdapter;

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
/*
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Get Started
    </a>
  </div>
  <div class="mdl-card__menu">
    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
      <i class="material-icons">share</i>
    </button>
  </div>
*/