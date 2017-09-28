import { Component } from "./Component";
import { mdlUpgradeElement, toHTMLElement, clearElement, setEnable} from "./utils";
import { PhrasingCategory } from "./category";

export class Table extends Component {

    container: HTMLTableElement;

    public readonly head : TableSection = new TableSection(true)
    public readonly body : TableSection = new TableSection(false)

    constructor(
        private selectable: boolean = false
     ) {
        super();
        this.create();
    }

    protected create(): void {
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

    setEnable(enable: boolean) {
      this.head.setEnable(enable);
      this.body.setEnable(enable);
    }
}

class TableSection extends Component {

    container: HTMLTableSectionElement;

    lines: TableLine[] = [];

    constructor(
        private head:boolean = false
    ) {
        super();
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

    protected create() {
        this.container = document.createElement(this.head ? "thead" : "tbody");
    }

    setEnable(enable: boolean) {
      this.lines.forEach(line => line.setEnable(enable));
    }
}

export class TableLine extends Component {

    container: HTMLTableRowElement;

    private cells: TableCell[] = [];

    constructor() {
      super();
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

    protected create() {
        this.container = document.createElement("tr");
    }

    setEnable(enable: boolean) {
      this.cells.forEach(cell => cell.setEnable(enable));
    }
}

export class TableCell extends Component {

    container: HTMLTableDataCellElement;

    constructor(
        private contents : PhrasingCategory,
        private numeric: boolean = true
    ) {
        super();
        this.create();
    }

    protected create() {
        this.container = document.createElement("td");
        if (!this.numeric) this.container.classList.add("mdl-data-table__cell--non-numeric");
        this.container.appendChild(toHTMLElement(this.contents));
        mdlUpgradeElement(this.container);
    }

    setEnable(enable: boolean) {
      setEnable(this.contents, enable);
    }
}
