define(["require", "exports"], function (require, exports) {
    "use strict";
    var Grid = (function () {
        function Grid(spacing) {
            if (spacing === void 0) { spacing = true; }
            this.spacing = spacing;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQU1JLGNBQ3FCLE9BQWM7WUFBZCx3QkFBQSxFQUFBLGNBQWM7WUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBRW5DLENBQUM7UUFFRCxzQkFBTyxHQUFQLFVBQVEsSUFBYztZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QixpREFBaUQ7UUFDckQsQ0FBQztRQUVELHlCQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFFRCxHQUFHLENBQUMsQ0FBYSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVO2dCQUF0QixJQUFJLElBQUksU0FBQTtnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzthQUNqRDtRQUNMLENBQUM7UUFFRCxzQkFBTyxHQUFQO1FBQ0EsQ0FBQztRQUNMLFdBQUM7SUFBRCxDQUFDLEFBL0JELElBK0JDO0lBL0JZLG9CQUFJO0lBaUNqQjtRQUVJLGtCQUNZLFFBQWdDLEVBQ2hDLElBQWdCO1lBQWhCLHFCQUFBLEVBQUEsUUFBZ0I7WUFEaEIsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7WUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUU1QixDQUFDO1FBRUQsNkJBQVUsR0FBVjtZQUNJLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxJQUFJLEdBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBYyxRQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsbUJBQW1CO2dCQUNuQixJQUFJLFNBQVMsR0FBZ0IsUUFBUyxDQUFDO2dCQUN2QyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSix1QkFBdUI7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQWUsUUFBUSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUFDLEFBeEJELElBd0JDO0lBeEJZLDRCQUFRIn0=