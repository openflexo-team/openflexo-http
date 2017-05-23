define(["require", "exports"], function (require, exports) {
    "use strict";
    var Grid = (function () {
        function Grid(spacing) {
            if (spacing === void 0) { spacing = true; }
            this.spacing = spacing;
            this.cells = [];
        }
        Grid.prototype.addCell = function (cell) {
            this.cells.push(cell);
            // TODO add container if grid already initialized
        };
        Grid.prototype.initialize = function () {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-grid");
            if (!this.spacing) {
                this.container.classList.add("mdl-grid--no-spacing");
            }
            for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                var cell = _a[_i];
                this.container.appendChild(cell.createCell());
            }
        };
        Grid.prototype.dispose = function () {
        };
        return Grid;
    }());
    exports.Grid = Grid;
    var GridCell = (function () {
        function GridCell(contents, size) {
            if (size === void 0) { size = 4; }
            this.contents = contents;
            this.size = size;
        }
        GridCell.prototype.createCell = function () {
            var cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.classList.add("mdl-cell--" + this.size + "-col");
            var contents = this.contents;
            if (contents.initialize) {
                // it's a component
                var component = contents;
                component.initialize();
                cell.appendChild(component.container);
            }
            else {
                // it's an html element
                cell.appendChild(contents);
            }
            return cell;
        };
        return GridCell;
    }());
    exports.GridCell = GridCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQU1JLGNBQ3FCLE9BQWM7WUFBZCx3QkFBQSxFQUFBLGNBQWM7WUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1lBSDNCLFVBQUssR0FBZSxFQUFFLENBQUM7UUFLL0IsQ0FBQztRQUVELHNCQUFPLEdBQVAsVUFBUSxJQUFjO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRCLGlEQUFpRDtRQUNyRCxDQUFDO1FBRUQseUJBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELEdBQUcsQ0FBQyxDQUFhLFVBQVUsRUFBVixLQUFBLElBQUksQ0FBQyxLQUFLLEVBQVYsY0FBVSxFQUFWLElBQVU7Z0JBQXRCLElBQUksSUFBSSxTQUFBO2dCQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQztRQUVELHNCQUFPLEdBQVA7UUFDQSxDQUFDO1FBQ0wsV0FBQztJQUFELENBQUMsQUEvQkQsSUErQkM7SUEvQlksb0JBQUk7SUFpQ2pCO1FBRUksa0JBQ1ksUUFBZ0MsRUFDaEMsSUFBZ0I7WUFBaEIscUJBQUEsRUFBQSxRQUFnQjtZQURoQixhQUFRLEdBQVIsUUFBUSxDQUF3QjtZQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBRTVCLENBQUM7UUFFRCw2QkFBVSxHQUFWO1lBQ0ksSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUUsSUFBSSxDQUFDLElBQUksR0FBRSxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFjLFFBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxtQkFBbUI7Z0JBQ25CLElBQUksU0FBUyxHQUFnQixRQUFTLENBQUM7Z0JBQ3ZDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBZSxRQUFRLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUF4QkQsSUF3QkM7SUF4QlksNEJBQVEifQ==