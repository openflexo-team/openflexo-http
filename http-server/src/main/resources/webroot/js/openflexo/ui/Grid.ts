import { Component } from "./Component";
import { mdlUpgradeElement, toHTMLElement } from "./utils";

export class Grid implements Component {

    container: HTMLDivElement;

    private cells: GridCell[] = [];

    constructor(
        private readonly spacing = true
    ) {
        this.create();
    }

    addCell(cell: GridCell) {
        this.cells.push(cell);
        this.container.appendChild(cell.container);
    }

    removeCell(cell: GridCell) {
        let index = this.cells.indexOf(cell);
        if (index >= 0) {
            // removes from array
            this.cells.splice(index, 1);

            // removes from dom
            this.container.removeChild(cell.container);
        }
    }

    create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-grid");
        if (!this.spacing) {
            this.container.classList.add("mdl-grid--no-spacing");
        }

        this.cells.forEach(cell => {
            this.container.appendChild(cell.container);
        });

        mdlUpgradeElement(this.container);
    }    
}

export class GridCell implements Component {

    container: HTMLDivElement;

    constructor(
        private contents : Component|HTMLElement,
        private size: number = 4
    ) {
        this.create();
    }

    create() {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-cell");
        this.container.classList.add("mdl-cell--"+ this.size +"-col");
        this.container.appendChild(toHTMLElement(this.contents));
        mdlUpgradeElement(this.container);
    }
}