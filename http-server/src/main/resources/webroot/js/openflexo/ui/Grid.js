define(["require", "exports", "./utils"], function (require, exports, utils_1) {
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
            utils_1.mdlUpgradeElement(this.container);
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
            this.container.classList.add("mdl-cell");
            this.container.classList.add("mdl-cell--" + this.size + "-col");
            this.container.appendChild(utils_1.toHTMLElement(this.contents));
            utils_1.mdlUpgradeElement(this.container);
        };
        return GridCell;
    }());
    exports.GridCell = GridCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFHQTtRQU1JLGNBQ3FCLE9BQWM7WUFBZCx3QkFBQSxFQUFBLGNBQWM7WUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1lBSDNCLFVBQUssR0FBZSxFQUFFLENBQUM7WUFLM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxzQkFBTyxHQUFQLFVBQVEsSUFBYztZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELHlCQUFVLEdBQVYsVUFBVyxJQUFjO1lBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUVELHFCQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFFRCxHQUFHLENBQUMsQ0FBYSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVO2dCQUF0QixJQUFJLElBQUksU0FBQTtnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDOUM7WUFFRCx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNMLFdBQUM7SUFBRCxDQUFDLEFBekNELElBeUNDO0lBekNZLG9CQUFJO0lBMkNqQjtRQUlJLGtCQUNZLFFBQWdDLEVBQ2hDLElBQWdCO1lBQWhCLHFCQUFBLEVBQUEsUUFBZ0I7WUFEaEIsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7WUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUV4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELHlCQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUUsSUFBSSxDQUFDLElBQUksR0FBRSxNQUFNLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3pELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0wsZUFBQztJQUFELENBQUMsQUFsQkQsSUFrQkM7SUFsQlksNEJBQVEifQ==