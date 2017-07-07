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
            this.api.addChangeListener(this.elements, function (elements) { return _this.updateList(elements); });
            this.container = this.table.container;
        };
        BoundTable.prototype.updateList = function (elements) {
            var body = this.table.body;
            body.removeLines();
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element = elements_1[_i];
                var line = new Table_1.TableLine();
                for (var _a = 0, _b = this.columns; _a < _b.length; _a++) {
                    var column = _b[_a];
                    var component = column.component(this.api, element);
                    var cell = new Table_1.TableCell(component);
                    line.addCell(cell);
                }
                body.addLine(line);
            }
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFXQTtRQU1JLG9CQUNZLEdBQVEsRUFDUixRQUEwQixFQUMxQixPQUFzQixFQUN0QixNQUFzQixFQUN0QixVQUEyQjtZQUQzQix1QkFBQSxFQUFBLGFBQXNCO1lBQ3RCLDJCQUFBLEVBQUEsa0JBQTJCO1lBSjNCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUixhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUMxQixZQUFPLEdBQVAsT0FBTyxDQUFlO1lBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWdCO1lBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWlCO1lBRW5DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsMkJBQU0sR0FBTjtZQUFBLGlCQWdCQztZQWZHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO2dCQUM3QixHQUFHLENBQUMsQ0FBZSxVQUFZLEVBQVosS0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLGNBQVksRUFBWixJQUFZO29CQUExQixJQUFJLE1BQU0sU0FBQTtvQkFDWCxJQUFJLElBQUksR0FBRyxJQUFJLGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4QjtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFxQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1lBQ2pHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztZQUVqRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzFDLENBQUM7UUFFTywrQkFBVSxHQUFsQixVQUFtQixRQUE0QjtZQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbkIsR0FBRyxDQUFDLENBQWdCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUTtnQkFBdkIsSUFBSSxPQUFPLGlCQUFBO2dCQUNaLElBQUksSUFBSSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO2dCQUMzQixHQUFHLENBQUMsQ0FBZSxVQUFZLEVBQVosS0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLGNBQVksRUFBWixJQUFZO29CQUExQixJQUFJLE1BQU0sU0FBQTtvQkFDWCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3BELElBQUksSUFBSSxHQUFHLElBQUksaUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEI7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QjtRQUNMLENBQUM7UUFDTCxpQkFBQztJQUFELENBQUMsQUFoREQsSUFnREM7SUFoRFksZ0NBQVU7SUFtRHZCO1FBRUkscUJBQ1csSUFBWSxFQUNaLFNBQThFO1lBRDlFLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixjQUFTLEdBQVQsU0FBUyxDQUFxRTtRQUNyRixDQUFDO1FBRVQsa0JBQUM7SUFBRCxDQUFDLEFBUEQsSUFPQztJQVBZLGtDQUFXIn0=