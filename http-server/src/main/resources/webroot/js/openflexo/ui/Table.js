define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TableCell = exports.TableLine = exports.Table = void 0;
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
            (0, utils_1.mdlUpgradeElement)(this.container);
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
            (0, utils_1.clearElement)(this.container);
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
            this.container.appendChild((0, utils_1.toHTMLElement)(this.contents));
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        setEnable(enable) {
            (0, utils_1.setEnable)(this.contents, enable);
        }
    }
    exports.TableCell = TableCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBSUEsTUFBYSxLQUFNLFNBQVEscUJBQVM7UUFPaEMsWUFDWSxhQUFzQixLQUFLO1lBRW5DLEtBQUssRUFBRSxDQUFDO1lBRkEsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7WUFKdkIsU0FBSSxHQUFrQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QyxTQUFJLEdBQWtCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBTXpELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNsRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQzlEO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELElBQUEseUJBQWlCLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1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