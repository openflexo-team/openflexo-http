define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    // mdlUpgradeElement(this.container);
    var Table = (function () {
        function Table(selectable) {
            if (selectable === void 0) { selectable = false; }
            this.selectable = selectable;
            this.head = new TableSection(true);
            this.body = new TableSection(false);
            this.create();
        }
        Table.prototype.create = function () {
            this.container = document.createElement("table");
            this.container.classList.add("mdl-data-table");
            this.container.classList.add("mdl-js-data-table");
            if (this.selectable) {
                this.container.classList.add("mdl-data-table--selectable");
            }
            this.container.appendChild(this.head.container);
            this.container.appendChild(this.body.container);
            utils_1.mdlUpgradeElement(this.container);
        };
        return Table;
    }());
    exports.Table = Table;
    var TableSection = (function () {
        function TableSection(head) {
            if (head === void 0) { head = false; }
            this.head = head;
            this.lines = [];
            this.create();
        }
        TableSection.prototype.addLine = function (line) {
            this.lines.push(line);
            this.container.appendChild(line.container);
        };
        TableSection.prototype.removeLine = function (line) {
            var index = this.lines.indexOf(line);
            if (index >= 0) {
                // removes from array
                this.lines.splice(index, 1);
                // removes from dom
                this.container.removeChild(line.container);
            }
        };
        TableSection.prototype.removeLines = function () {
            this.lines.splice(0, this.lines.length);
        };
        TableSection.prototype.create = function () {
            this.container = document.createElement(this.head ? "thead" : "tbody");
        };
        return TableSection;
    }());
    var TableLine = (function () {
        function TableLine() {
            this.cells = [];
            this.create();
        }
        TableLine.prototype.addCell = function (cell) {
            this.cells.push(cell);
            this.container.appendChild(cell.container);
        };
        TableLine.prototype.removeCell = function (cell) {
            var index = this.cells.indexOf(cell);
            if (index >= 0) {
                // removes from array
                this.cells.splice(index, 1);
                // removes from dom
                this.container.removeChild(cell.container);
            }
        };
        TableLine.prototype.create = function () {
            this.container = document.createElement("tr");
        };
        return TableLine;
    }());
    exports.TableLine = TableLine;
    var TableCell = (function () {
        function TableCell(contents, numeric) {
            if (numeric === void 0) { numeric = true; }
            this.contents = contents;
            this.numeric = numeric;
            this.create();
        }
        TableCell.prototype.create = function () {
            this.container = document.createElement("td");
            if (!this.numeric)
                this.container.classList.add("mdl-data-table__cell--non-numeric");
            this.container.appendChild(utils_1.toHTMLElement(this.contents));
        };
        return TableCell;
    }());
    exports.TableCell = TableCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUlBLHFDQUFxQztJQUVyQztRQU9JLGVBQ1ksVUFBMkI7WUFBM0IsMkJBQUEsRUFBQSxrQkFBMkI7WUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7WUFKdkIsU0FBSSxHQUFrQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QyxTQUFJLEdBQWtCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBS3pELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsc0JBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDL0QsQ0FBQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoRCx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVMLFlBQUM7SUFBRCxDQUFDLEFBM0JELElBMkJDO0lBM0JZLHNCQUFLO0lBNkJsQjtRQU1JLHNCQUNZ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