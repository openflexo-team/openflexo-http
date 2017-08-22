define(["require", "exports", "../ui/Table"], function (require, exports, Table_1) {
    "use strict";
    var BoundTable = (function () {
        function BoundTable(api, elements, columns, header, selectable) {
            if (header === void 0) { header = true; }
            if (selectable === void 0) { selectable = false; }
            this.api = api;
            this.elements = elements;
            this.columns = columns;
            this.header = header;
            this.selectable = selectable;
            this.lines = [];
            this.create();
        }
        BoundTable.prototype.create = function () {
            var _this = this;
            this.table = new Table_1.Table(this.selectable);
            if (this.header) {
                var header = new Table_1.TableLine();
                for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                    var column = _a[_i];
                    var cell = new Table_1.TableCell(column.name);
                    header.addCell(cell);
                }
                this.table.head.addLine(header);
            }
            this.api.evaluate(this.elements).then(function (elements) { return _this.updateList(elements); });
            this.api.addChangeListener(this.elements, function (event) { return _this.updateList(event.value); });
            this.container = this.table.container;
        };
        BoundTable.prototype.refresh = function () {
            var _this = this;
            this.api.evaluate(this.elements).then(function (elements) { return _this.updateList(elements); });
        };
        BoundTable.prototype.updateList = function (elements) {
            var body = this.table.body;
            var lineCount = 0;
            var elementCount = 0;
            // checks elements with current lines
            while (lineCount < this.lines.length && elementCount < elements.length) {
                var line = this.lines[lineCount];
                var element = elements[elementCount];
                if (line.url !== element.url) {
                    // line if different from current element
                    // removes the line current line
                    this.removeLine(lineCount);
                }
                else {
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
        };
        BoundTable.prototype.addLine = function (element) {
            var line = new Table_1.TableLine();
            for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                var component = column.component(this.api, element);
                var cell = new Table_1.TableCell(component);
                line.addCell(cell);
            }
            this.lines.push(new BoundTableLine(element.url, line));
            this.table.body.addLine(line);
        };
        BoundTable.prototype.removeLine = function (index) {
            var line = this.lines[index];
            this.lines.splice(index, 1);
            this.table.body.removeLine(line.line);
        };
        return BoundTable;
    }());
    exports.BoundTable = BoundTable;
    var BoundColumn = (function () {
        function BoundColumn(name, component) {
            this.name = name;
            this.component = component;
        }
        return BoundColumn;
    }());
    exports.BoundColumn = BoundColumn;
    var BoundTableLine = (function () {
        function BoundTableLine(url, line) {
            this.url = url;
            this.line = line;
        }
        return BoundTableLine;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFRQTtRQVFJLG9CQUNZLEdBQVEsRUFDUixRQUEwQixFQUMxQixPQUFzQixFQUN0QixNQUFzQixFQUN0QixVQUEyQjtZQUQzQix1QkFBQSxFQUFBLGFBQXNCO1lBQ3RCLDJCQUFBLEVBQUEsa0JBQTJCO1lBSjNCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUixhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUMxQixZQUFPLEdBQVAsT0FBTyxDQUFlO1lBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWdCO1lBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWlCO1lBVHZDLFVBQUssR0FBcUIsRUFBRSxDQUFDO1lBV3pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsMkJBQU0sR0FBTjtZQUFBLGlCQWdCQztZQWZHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO2dCQUM3QixHQUFHLENBQUMsQ0FBZSxVQUFZLEVBQVosS0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLGNBQVksRUFBWixJQUFZO29CQUExQixJQUFJLE1BQU0sU0FBQTtvQkFDWCxJQUFJLElBQUksR0FBRyxJQUFJLGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4QjtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUVELElBQUksQ0FBQyxH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