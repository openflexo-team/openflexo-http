define(["require", "exports"], function (require, exports) {
    "use strict";
    var Grid = (function () {
        function Grid(spacing) {
            if (spacing === void 0) { spacing = true; }
            this.spacing = spacing;
            this.cells = [];
            this.create();
        }
        Grid.prototype.addCell = function (cell) {
            this.cells.push(cell);
            this.container.appendChild(cell.container);
        };
        Grid.prototype.removeCell = function (cell) {
            var index = this.cells.indexOf(cell);
            if (index >= 0) {
                // removes from array
                this.cells.splice(index, 1);
                // removes from dom
                this.container.removeChild(cell.container);
            }
        };
        Grid.prototype.create = function () {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-grid");
            if (!this.spacing) {
                this.container.classList.add("mdl-grid--no-spacing");
            }
            for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                var cell = _a[_i];
                this.container.appendChild(cell.container);
            }
        };
        return Grid;
    }());
    exports.Grid = Grid;
    var GridCell = (function () {
        function GridCell(contents, size) {
            if (size === void 0) { size = 4; }
            this.contents = contents;
            this.size = size;
            this.create();
        }
        GridCell.prototype.create = function () {
            this.container = document.createElement("div");
            this.container.classList.add("grid-cell");
            this.container.classList.add("mdl-cell--" + this.size + "-col");
            var contents = this.contents;
            if (contents.container) {
                this.container.appendChild(contents.container);
            }
            else {
                // it's an html element
                this.container.appendChild(contents);
            }
        };
        return GridCell;
    }());
    exports.GridCell = GridCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQU1JLGNBQ3FCLE9BQWM7WUFBZCx3QkFBQSxFQUFBLGNBQWM7WUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1lBSDNCLFVBQUssR0FBZSxFQUFFLENBQUM7WUFLM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxzQkFBTyxHQUFQLFVBQVEsSUFBYztZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELHlCQUFVLEdBQVYsVUFBVyxJQUFjO1lBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUVELHFCQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFFRCxHQUFHLENBQUMsQ0FBYSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVO2dCQUF0QixJQUFJLElBQUksU0FBQTtnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDOUM7UUFDTCxDQUFDO1FBQ0wsV0FBQztJQUFELENBQUMsQUF2Q0QsSUF1Q0M7SUF2Q1ksb0JBQUk7SUF5Q2pCO1FBSUksa0JBQ1ksUUFBZ0MsRUFDaEMsSUFBZ0I7WUFBaEIscUJBQUEsRUFBQSxRQUFnQjtZQURoQixhQUFRLEdBQVIsUUFBUSxDQUF3QjtZQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFZO1lBRXhCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQseUJBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsSUFBSSxHQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQWMsUUFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFjLFFBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBZSxRQUFRLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0wsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBdkJELElBdUJDO0lBdkJZLDRCQUFRIn0=