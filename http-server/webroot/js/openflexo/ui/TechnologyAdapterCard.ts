import { Component } from "./component";

import { TechnologyAdapter } from "../api";

export class TechnologyAdapterCard implements Component {

    ta: TechnologyAdapter;

    container: HTMLDivElement;

    constructor(ta: TechnologyAdapter) {
        this.ta = ta;
    }

    initialize(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-card");
        this.container.classList.add("mdl-shadow--2dp");

        let title = document.createElement("div");
        title.classList.add("mdl-card__title");
        
        let titleText = document.createElement("div");
        titleText.classList.add("mdl-card__title-text");
        titleText.innerText = this.ta.name;
        title.appendChild(titleText);

        this.container.appendChild(title);
    }    

    dispose(): void {
        
    }
}