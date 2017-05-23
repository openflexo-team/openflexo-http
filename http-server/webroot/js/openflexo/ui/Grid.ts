import { Component } from "./Component";

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

        for (let cell of this.cells) {
            this.container.appendChild(cell.container);
        }
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
        this.container.classList.add("grid-cell");
        this.container.classList.add("mdl-cell--"+ this.size +"-col");
        let contents = this.contents;
        if ((<Component> contents).container) {
            this.container.appendChild((<Component> contents).container);
        } else {
            // it's an html element
            this.container.appendChild(<HTMLElement> contents);
        }
    }
}