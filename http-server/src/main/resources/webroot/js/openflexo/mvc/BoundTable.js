define(["require", "exports", "./BoundComponent", "./utils", "../ui/Table"], function (require, exports, BoundComponent_1, utils_1, Table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundColumn = exports.BoundTable = void 0;
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
            this.elementsRuntimeBinding = (0, utils_1.updateBindingRuntime)(this.api, this.elements, this.elementsRuntimeBinding, this.elementsChangelistener, runtime, extensions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVNBLE1BQWEsVUFBVyxTQUFRLCtCQUFjO1FBWTFDLFlBQ0ksR0FBUSxFQUNBLFFBQWdCLEVBQ2hCLE9BQXNCLEVBQzlCLFVBQXdCLElBQUksRUFDcEIsU0FBa0IsSUFBSSxFQUN0QixhQUFzQixLQUFLO1lBRW5DLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQU5ILGFBQVEsR0FBUixRQUFRLENBQVE7WUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtZQUV0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtZQWR2QyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztZQUlyQiwyQkFBc0IsR0FBOEMsSUFBSSxDQUFDO1lBRWhFLDJCQUFzQixHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBVzlFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsSUFBSSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFLE1BQU0sQ0FBQyxFQUFFO29CQUMzQixJQUFJLElBQUksR0FBRyxJQUFJLGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FB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