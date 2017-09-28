import { Description } from "../api/general"
import { Api, RuntimeBindingId, ChangeEvent } from "../api/Api"
import { Component } from "../ui/Component"
import { BoundComponent } from "./BoundComponent"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { Table, TableLine, TableCell } from "../ui/Table"

export class BoundTable extends BoundComponent {

    table : Table;

    lines: BoundTableLine[] = [];

    container: HTMLTableElement;

    constructor(
        api: Api,
        private elements: RuntimeBindingId<Description<any>[]>,
        private columns: BoundColumn[],
        private header: boolean = true,
        private selectable: boolean = false
     ) {
        super(api);
        this.create();
    }

    create(): void {
        this.table = new Table(this.selectable);

        if (this.header) {
            let header = new TableLine();
            this.columns.forEach( column => {
                let cell = new TableCell(column.name);
                header.addCell(cell);
            });
            this.table.head.addLine(header);
        }

        this.api.evaluate<Description<any>[]>(this.elements).then(elements => this.updateList(elements));
        this.api.addChangeListener(this.elements, event => this.updateList(event.value));

        this.container = this.table.container;
    }

    refresh() {
        this.api.evaluate<Description<any>[]>(this.elements).then(elements => this.updateList(elements));
    }

    private updateList(elements: Description<any>[]) {
        let body = this.table.body;

        let lineCount = 0;
        let elementCount = 0;

        // checks elements with current lines
        while (lineCount < this.lines.length && elementCount < elements.length) {
            let line = this.lines[lineCount];
            let element = elements[elementCount];

            if (line.url !== element.url) {
                // line if different from current element
                // removes the line current line
                this.removeLine(lineCount);
            } else {
                // line is the same checks next
                lineCount += 1;
                elementCount += 1;
            }
        }

        // removes the rest of the lines if any
        while (lineCount < this.lines.length) {
            this.removeLine(lineCount);
        }

        // adds the rest of elements if any
        while (elementCount < elements.length) {
            this.addLine(elements[elementCount]);
            elementCount += 1;
        }
    }

    private addLine(element: Description<any>) {
        let line = new TableLine();
        this.columns.forEach( column => {
            let component = column.component(this.api, element);
            let cell = new TableCell(component);
            line.addCell(cell);
        })

        this.lines.push(new BoundTableLine(element.url, line));
        this.table.body.addLine(line);
    }

    private removeLine(index: number) {
        let line = this.lines[index];
        this.lines.splice(index, 1);
        this.table.body.removeLine(line.line);
    }

    setEnable(enable: boolean) {
      this.table.setEnable(false);
    }
}


export class BoundColumn {
    constructor(
        public name: string,
        public component: (api: Api, element: Description<any>) => Component|PhrasingCategory
    ) { }
}

class BoundTableLine {
    constructor(
        public url: string,
        public line: TableLine
    ) { }
}
