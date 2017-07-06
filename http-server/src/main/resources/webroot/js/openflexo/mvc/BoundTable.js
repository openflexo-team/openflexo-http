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
            this.api.evaluate(this.elements, false).then(function (elements) { return _this.updateList(elements); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFXQTtRQU1JLG9CQUNZLEdBQVEsRUFDUixRQUEwQixFQUMxQixPQUFzQixFQUN0QixNQUFzQixFQUN0QixVQUEyQjtZQUQzQix1QkFBQSxFQUFBLGFBQXNCO1lBQ3RCLDJCQUFBLEVBQUEsa0JBQTJCO1lBSjNCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUixhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUMxQixZQUFPLEdBQVAsT0FBTyxDQUFlO1lBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWdCO1lBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWlCO1lBRW5DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsMkJBQU0sR0FBTjtZQUFBLGlCQWdCQztZQWZHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO2dCQUM3QixHQUFHLENBQUMsQ0FBZSxVQUFZLEVBQVosS0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLGNBQVksRUFBWixJQUFZO29CQUExQixJQUFJLE1BQU0sU0FBQTtvQkFDWCxJQUFJLElBQUksR0FBRyxJQUFJLGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4QjtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFxQixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztZQUN4RyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7WUFFakYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMxQyxDQUFDO1FBRU8sK0JBQVUsR0FBbEIsVUFBbUIsUUFBNEI7WUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5CLEdBQUcsQ0FBQyxDQUFnQixVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVE7Z0JBQXZCLElBQUksT0FBTyxpQkFBQTtnQkFDWixJQUFJLElBQUksR0FBRyxJQUFJLGlCQUFTLEVBQUUsQ0FBQztnQkFDM0IsR0FBRyxDQUFDLENBQWUsVUFBWSxFQUFaLEtBQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixjQUFZLEVBQVosSUFBWTtvQkFBMUIsSUFBSSxNQUFNLFNBQUE7b0JBQ1gsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNwRCxJQUFJLElBQUksR0FBRyxJQUFJLGlCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RCO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBaERELElBZ0RDO0lBaERZLGdDQUFVO0lBbUR2QjtRQUVJLHFCQUNXLElBQVksRUFDWixTQUE4RTtZQUQ5RSxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osY0FBUyxHQUFULFNBQVMsQ0FBcUU7UUFDckYsQ0FBQztRQUVULGtCQUFDO0lBQUQsQ0FBQyxBQVBELElBT0M7SUFQWSxrQ0FBVyJ9