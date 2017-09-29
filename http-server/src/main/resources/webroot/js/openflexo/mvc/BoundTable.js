define(["require", "exports", "./BoundComponent", "./utils", "../ui/Table"], function (require, exports, BoundComponent_1, utils_1, Table_1) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFTQSxnQkFBd0IsU0FBUSwrQkFBYztRQVkxQyxZQUNJLEdBQVEsRUFDQSxRQUF1QyxFQUN2QyxPQUFzQixFQUM5QixVQUF3QixJQUFJLEVBQ3BCLFNBQWtCLElBQUksRUFDdEIsYUFBc0IsS0FBSztZQUVuQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFOSCxhQUFRLEdBQVIsUUFBUSxDQUErQjtZQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUFlO1lBRXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO1lBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWlCO1lBZHZDLFVBQUssR0FBcUIsRUFBRSxDQUFDO1lBSXJCLDJCQUFzQixHQUE4QyxJQUFJLENBQUM7WUFFaEUsMkJBQXNCLEdBQUcsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQVc5RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFLE1BQU07b0JBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksaUJBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO2dC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