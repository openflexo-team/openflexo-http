import { Description } from "../api/general"
import { Api, RuntimeBindingId, ChangeEvent, runtimeBinding } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { BoundLabel } from "../mvc/BoundLabel"
import { BoundTextField } from "../mvc/BoundTextField"
import { BoundButton } from "../mvc/BoundButton"
import { Table, TableLine, TableCell } from "../ui/Table"

export class BoundTable implements Component {

    table : Table;

    container: HTMLTableElement;

    constructor(
        private api: Api, 
        private elements: RuntimeBindingId,
        private columns: BoundColumn[],
        private header: boolean = true,
        private selectable: boolean = false
     ) {
        this.create();
    }

    create(): void {
        this.table = new Table(this.selectable);

        if (this.header) {        
            let header = new TableLine();
            for (let column of this.columns) {
                let cell = new TableCell(column.name);
                header.addCell(cell);
            }
            this.table.head.addLine(header);
        }

        this.api.evaluate<Description<any>[]>(this.elements).then(elements => this.updateList(elements));
        this.api.addChangeListener(this.elements, elements => this.updateList(elements));

        this.container = this.table.container;
    }    

    private updateList(elements: Description<any>[]) {
        let body = this.table.body;
        body.removeLines();

        for (let element of elements) {
            let line = new TableLine();
            for (let column of this.columns) {
                let component = column.component(this.api, element);
                let cell = new TableCell(component);
                line.addCell(cell);
            }
            body.addLine(line);
        }
    }
}


export class BoundColumn {
    
    constructor(
        public name: string,
        public component: (api: Api, element: Description<any>) => Component|PhrasingCategory 
    ) { }

}