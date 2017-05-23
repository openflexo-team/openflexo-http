import { Component } from "./Component";

export class Grid implements Component {

    container: HTMLDivElement;

    private cells: GridCell[] = [];

    constructor(
        private readonly spacing = true
    ) {
    }

    addCell(cell: GridCell) {
        this.cells.push(cell);

        // TODO add container if grid already initialized
    }

    initialize(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-grid");
        if (!this.spacing) {
            this.container.classList.add("mdl-grid--no-spacing");
        }

        for (let cell of this.cells) {
            this.container.appendChild(cell.createCell());
        }
    }    

    dispose(): void {
    }
}

export class GridCell {

    constructor(
        private contents : Component|HTMLElement,
        private size: number = 4
    ) {
    }

    createCell(): HTMLDivElement {
        let cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.classList.add("mdl-cell--"+ this.size +"-col");
        let contents = this.contents;
        if ((<Component> contents).initialize) {
            // it's a component
            let component = (<Component> contents);
            component.initialize();
            cell.appendChild(component.container);
        } else {
            // it's an html element
            cell.appendChild(<HTMLElement> contents);
        }
        return cell;
    }
}