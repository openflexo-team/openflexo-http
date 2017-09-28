define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    class Table extends Component_1.Component {
        constructor(selectable = false) {
            super();
            this.selectable = selectable;
            this.head = new TableSection(true);
            this.body = new TableSection(false);
            this.create();
        }
        create() {
            this.container = document.createElement("table");
            this.container.classList.add("mdl-data-table");
            this.container.classList.add("mdl-js-data-table");
            if (this.selectable) {
                this.container.classList.add("mdl-data-table--selectable");
            }
            this.container.appendChild(this.head.container);
            this.container.appendChild(this.body.container);
            utils_1.mdlUpgradeElement(this.container);
        }
        setEnable(enable) {
            this.head.setEnable(enable);
            this.body.setEnable(enable);
        }
    }
    exports.Table = Table;
    class TableSection extends Component_1.Component {
        constructor(head = false) {
            super();
            this.head = head;
            this.lines = [];
            this.create();
        }
        addLine(line) {
            this.lines.push(line);
            this.container.appendChild(line.container);
        }
        removeLine(line) {
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
            utils_1.clearElement(this.container);
        }
        create() {
            this.container = document.createElement(this.head ? "thead" : "tbody");
        }
        setEnable(enable) {
            this.lines.forEach(line => line.setEnable(enable));
        }
    }
    class TableLine extends Component_1.Component {
        constructor() {
            super();
            this.cells = [];
            this.create();
        }
        addCell(cell) {
            this.cells.push(cell);
            this.container.appendChild(cell.container);
        }
        removeCell(cell) {
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
        setEnable(enable) {
            this.cells.forEach(cell => cell.setEnable(enable));
        }
    }
    exports.TableLine = TableLine;
    class TableCell extends Component_1.Component {
        constructor(contents, numeric = true) {
            super();
            this.contents = contents;
            this.numeric = numeric;
            this.create();
        }
        create() {
            this.container = document.createElement("td");
            if (!this.numeric)
                this.container.classList.add("mdl-data-table__cell--non-numeric");
            this.container.appendChild(utils_1.toHTMLElement(this.contents));
            utils_1.mdlUpgradeElement(this.container);
        }
        setEnable(enable) {
            utils_1.setEnable(this.contents, enable);
        }
    }
    exports.TableCell = TableCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUlBLFdBQW1CLFNBQVEscUJBQVM7UUFPaEMsWUFDWSxhQUFzQixLQUFLO1lBRW5DLEtBQUssRUFBRSxDQUFDO1lBRkEsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7WUFKdkIsU0FBSSxHQUFrQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QyxTQUFJLEdBQWtCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBTXpELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDL0QsQ0FBQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoRCx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0s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