define(["require", "exports", "./BoundComponent", "./utils", "../ui/Table"], function (require, exports, BoundComponent_1, utils_1, Table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundTable extends BoundComponent_1.BoundComponent {
        constructor(api, elements, columns, runtime = null, header = true, selectable = false) {
            super(api);
            this.elements = elements;
            this.columns = columns;
            this.header = header;
            this.selectable = selectable;
            this.lines = [];
            this.elementsRuntimeBinding = null;
            this.elementsChangelistener = (elements) => this.updateList(elements);
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.table = new Table_1.Table(this.selectable);
            if (this.header) {
                let header = new Table_1.TableLine();
                this.columns.forEach(column => {
                    let cell = new Table_1.TableCell(column.name);
                    header.addCell(cell);
                });
                this.table.head.addLine(header);
            }
            this.container = this.table.container;
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            this.elementsRuntimeBinding = utils_1.updateBindingRuntime(this.api, this.elements, this.elementsRuntimeBinding, this.elementsChangelistener, runtime, extensions);
        }
        updateList(elements) {
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
        }
        addLine(element) {
            let line = new Table_1.TableLine();
            this.columns.forEach(column => {
                let component = column.component(this.api, element);
                let cell = new Table_1.TableCell(component);
                line.addCell(cell);
            });
            this.lines.push(new BoundTableLine(element.url, line));
            this.table.body.addLine(line);
        }
        removeLine(index) {
            let line = this.lines[index];
            this.lines.splice(index, 1);
            this.table.body.removeLine(line.line);
        }
        setEnable(enable) {
            this.table.setEnable(false);
        }
    }
    exports.BoundTable = BoundTable;
    class BoundColumn {
        constructor(name, component) {
            this.name = name;
            this.component = component;
        }
    }
    exports.BoundColumn = BoundColumn;
    class BoundTableLine {
        constructor(url, line) {
            this.url = url;
            this.line = line;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0EsZ0JBQXdCLFNBQVEsK0JBQWM7UUFZMUMsWUFDSSxHQUFRLEVBQ0EsUUFBdUMsRUFDdkMsT0FBc0IsRUFDOUIsVUFBd0IsSUFBSSxFQUNwQixTQUFrQixJQUFJLEVBQ3RCLGFBQXNCLEtBQUs7WUFFbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBTkgsYUFBUSxHQUFSLFFBQVEsQ0FBK0I7WUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBZTtZQUV0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtZQWR2QyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztZQUlyQiwyQkFBc0IsR0FBOEMsSUFBSSxDQUFDO1lBRWhFLDJCQUFzQixHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFXOUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxNQUFNO29CQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQztn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