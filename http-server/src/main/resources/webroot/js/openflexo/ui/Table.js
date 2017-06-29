define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var Table = (function () {
        function Table(selectable) {
            if (selectable === void 0) { selectable = true; }
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
        TableSection.prototype.create = function () {
            this.container = document.createElement(this.head ? "thead" : "tbody");
            utils_1.mdlUpgradeElement(this.container);
        };
        return TableSection;
    }());
    var TableLine = (function () {
        function TableLine() {
            this.cells = [];
            this.create();
        }
        TableLine.prototype.addCell = function (line) {
            this.cells.push(line);
            this.container.appendChild(line.container);
        };
        TableLine.prototype.removeCell = function (line) {
            var index = this.cells.indexOf(line);
            if (index >= 0) {
                // removes from array
                this.cells.splice(index, 1);
                // removes from dom
                this.container.removeChild(line.container);
            }
        };
        TableLine.prototype.create = function () {
            this.container = document.createElement("tr");
            utils_1.mdlUpgradeElement(this.container);
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
            utils_1.mdlUpgradeElement(this.container);
        };
        return TableCell;
    }());
    exports.TableCell = TableCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBO1FBT0ksZUFDWSxVQUEwQjtZQUExQiwyQkFBQSxFQUFBLGlCQUEwQjtZQUExQixlQUFVLEdBQVYsVUFBVSxDQUFnQjtZQUp0QixTQUFJLEdBQWtCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVDLFNBQUksR0FBa0IsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7WUFLekQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxzQkFBTSxHQUFOO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQ0QseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDTCxZQUFDO0lBQUQsQ0FBQyxBQXRCRCxJQXNCQztJQXRCWSxzQkFBSztJQXdCbEI7UUFNSSxzQkFDWSxJQUFvQjtZQUFwQixxQkFBQSxFQUFBLFlBQW9CO1lBQXBCLFNBQUksR0FBSixJQUFJLENBQWdCO1lBSHhCLFVBQUssR0FBZ0IsRUFBRSxDQUFDO1lBSzVCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsOEJBQU8sR0FBUCxVQUFRLElBQWU7WUFD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