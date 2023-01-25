define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridCell = exports.Grid = void 0;
    class Grid extends Component_1.Component {
        constructor(spacing = true) {
            super();
            this.spacing = spacing;
            this.cells = [];
            this.create();
        }
        getCells() {
            return this.cells;
        }
        addCell(cell) {
            this.cells.push(cell);
            this.container.appendChild(cell.container);
        }
        removeCell(cell) {
            let index = this.cells.indexOf(cell);
            if (index >= 0) {
                // removes from array
                this.cells.splice(index, 1);
                // removes from dom
                this.container.removeChild(cell.container);
            }
        }
        create() {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-grid");
            if (!this.spacing) {
                this.container.classList.add("mdl-grid--no-spacing");
            }
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        setEnable(enable) {
            this.cells.forEach(cell => cell.setEnable(enable));
        }
    }
    exports.Grid = Grid;
    class GridCell extends Component_1.Component {
        constructor(contents, size = 4) {
            super();
            this.contents = contents;
            this.size = size;
            this.create();
        }
        create() {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-cell");
            this.container.classList.add("mdl-cell--" + this.size + "-col");
            this.container.appendChild((0, utils_1.toHTMLElement)(this.contents));
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        setEnable(enable) {
            (0, utils_1.setEnable)(this.contents, enable);
        }
    }
    exports.GridCell = GridCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUlBLE1BQWEsSUFBSyxTQUFRLHFCQUFTO1FBTS9CLFlBQ3FCLFVBQVUsSUFBSTtZQUUvQixLQUFLLEVBQUUsQ0FBQztZQUZTLFlBQU8sR0FBUCxPQUFPLENBQU87WUFIM0IsVUFBSyxHQUF1QixFQUFFLENBQUM7WUFNbkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxPQUFPLENBQUMsSUFBc0I7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCxVQUFVLENBQUMsSUFBc0I7WUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNaLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM5QztRQUNMLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUN4RDtZQUNELElBQUEseUJBQWlCLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQ0o7SUE3Q0Qsb0JBNkNDO0lBT0QsTUFBYSxRQUFTLFNBQVEscUJBQVM7UUFHbkMsWUFDWSxRQUEyQixFQUMzQixPQUFlLENBQUM7WUFFeEIsS0FBSyxFQUFFLENBQUM7WUFIQSxhQUFRLEdBQVIsUUFBUSxDQUFtQjtZQUMzQixTQUFJLEdBQUosSUFBSSxDQUFZO1lBR3hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsSUFBSSxHQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUEscUJBQWEsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFBLHlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsSUFBQSxpQkFBUyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUNKO0lBdEJELDRCQXNCQyJ9