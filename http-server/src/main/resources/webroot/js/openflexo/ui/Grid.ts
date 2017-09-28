import { Component } from "./Component";
import { mdlUpgradeElement, toHTMLElement, setEnable } from "./utils";
import { FlowCategory } from "./category";

export class Grid extends Component {

    container: HTMLDivElement;

    private cells: GridCell[] = [];

    constructor(
        private readonly spacing = true
    ) {
        super();
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

    protected create(): void {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-grid");
        if (!this.spacing) {
            this.container.classList.add("mdl-grid--no-spacing");
        }
        mdlUpgradeElement(this.container);
    }

    setEnable(enable: boolean) {
      this.cells.forEach(cell => cell.setEnable(enable));
    }
}

export class GridCell extends Component {

    container: HTMLDivElement;

    constructor(
        private contents : FlowCategory,
        private size: number = 4
    ) {
        super();
        this.create();
    }

    create() {
        this.container = document.createElement("div");
        this.container.classList.add("mdl-cell");
        this.container.classList.add("mdl-cell--"+ this.size +"-col");
        this.container.appendChild(toHTMLElement(this.contents));
        mdlUpgradeElement(this.container);
    }
    
    setEnable(enable: boolean) {
      setEnable(this.contents, enable);
    }
}
