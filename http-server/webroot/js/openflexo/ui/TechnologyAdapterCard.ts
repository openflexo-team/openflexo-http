import { addCssIfNotAlreadyPresent } from "./utils";

import { Component } from "./component";

import { TechnologyAdapter } from "../api";

export class TechnologyAdapterCard implements Component {

    ta: TechnologyAdapter;

    container: HTMLDivElement;

    constructor(ta: TechnologyAdapter) {
        this.ta = ta;

        addCssIfNotAlreadyPresent("/css/openflexo/ui/TechnologyAdapterCard.css");
        this.create();
    }

    private create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("of-technologyadaptercard");
        this.container.classList.add("mdl-card");
        this.container.classList.add("mdl-shadow--2dp");

        let title = document.createElement("div");
        title.classList.add("mdl-card__title");
        
        let titleText = document.createElement("div");
        titleText.classList.add("mdl-card__title-text");
        titleText.innerText = this.ta.name;
        title.appendChild(titleText);
        this.container.appendChild(title);

        let text = document.createElement("div");
        text.classList.add("mdl-card__supporting-text");
        text.innerText = this.ta.name + " description";
        this.container.appendChild(text);
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