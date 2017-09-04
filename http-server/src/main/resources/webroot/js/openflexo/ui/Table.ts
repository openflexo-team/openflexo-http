import { Component } from "./Component";
import { mdlUpgradeElement, toHTMLElement, clearElement} from "./utils";
import { PhrasingCategory } from "./category";

// mdlUpgradeElement(this.container);

export class Table implements Component {

    container: HTMLTableElement;

    public readonly head : TableSection = new TableSection(true)
    public readonly body : TableSection = new TableSection(false)

    constructor(
        private selectable: boolean = false
     ) {
        this.create();
    }

    create(): void {
        this.container = document.createElement("table");
        this.container.classList.add("mdl-data-table");
        this.container.classList.add("mdl-js-data-table");
        if (this.selectable) {
            this.container.classList.add("mdl-data-table--selectable");
        }

        this.container.appendChild(this.head.container);
        this.container.appendChild(this.body.container);

        mdlUpgradeElement(this.container);
    }    

}

class TableSection implements Component {

    container: HTMLTableSectionElement;

    lines: TableLine[] = [];

    constructor(
        private head:boolean = false
    ) {
        this.create();
    }

    addLine(line: TableLine) {
        this.lines.push(line);
        this.container.appendChild(line.container);
    }

    removeLine(line: TableLine) {
        let index = this.lines.indexOf(line);
        if (index >= 0) {
            // removes from array
            this.lines.splice(index, 1);

            // removes from dom
            this.container.removeChild(line.container);
        }
    }

    removeLines() {
        // removes all lines
        this.lines.splice(0, this.lines.length);

        // clears dom
        clearElement(this.container);
    }

    create() {
        this.container = document.createElement(this.head ? "thead" : "tbody");
    }

}

export class TableLine implements Component {
    
    container: HTMLTableRowElement;

    private cells: TableCell[] = [];

    constructor( ) {
        this.create();
    }

    addCell(cell: TableCell) {
        this.cells.push(cell);
        this.container.appendChild(cell.container);
    }

    removeCell(cell: TableCell) {
        let index = this.cells.indexOf(cell);
        if (index >= 0) {
            // removes from array
            this.cells.splice(index, 1);

            // removes from dom
            this.container.removeChild(cell.container);
        }
    }

    create() {
        this.container = document.createElement("tr");
    }

}

export class TableCell implements Component {

    container: HTMLTableDataCellElement;

    constructor(
        private contents : Component|PhrasingCategory,
        private numeric: boolean = true
    ) {
        this.create();
    }

    create() {
        this.container = document.createElement("td");
        if (!this.numeric) this.container.classList.add("mdl-data-table__cell--non-numeric");
        this.container.appendChild(toHTMLElement(this.contents));
    }
    
}
