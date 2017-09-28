define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    class Grid extends Component_1.Component {
        constructor(spacing = true) {
            super();
            this.spacing = spacing;
            this.cells = [];
            this.create();
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
            utils_1.mdlUpgradeElement(this.container);
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
            this.container.appendChild(utils_1.toHTMLElement(this.contents));
            utils_1.mdlUpgradeElement(this.container);
        }
        setEnable(enable) {
            utils_1.setEnable(this.contents, enable);
        }
    }
    exports.GridCell = GridCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFJQSxVQUFrQixTQUFRLHFCQUFTO1FBTS9CLFlBQ3FCLFVBQVUsSUFBSTtZQUUvQixLQUFLLEVBQUUsQ0FBQztZQUZTLFlBQU8sR0FBUCxPQUFPLENBQU87WUFIM0IsVUFBSyxHQUFlLEVBQUUsQ0FBQztZQU0zQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE9BQU8sQ0FBQyxJQUFjO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsVUFBVSxDQUFDLElBQWM7WUFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IscUJBQXFCO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTVCLG1CQUFtQjtnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDekQsQ0FBQztZQUNELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQ0o7SUF6Q0Qsb0JBeUNDO0lBRUQsY0FBc0IsU0FBUSxxQkFBUztRQUluQyxZQUNZLFFBQXVCLEVBQ3ZCLE9BQWUsQ0FBQztZQUV4QixLQUFLLEVBQUUsQ0FBQztZQUhBLGFBQVEsR0FBUixRQUFRLENBQWU7WUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUd4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUUsSUFBSSxDQUFDLElBQUksR0FBRSxNQUFNLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3pELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsaUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FDSjtJQXZCRCw0QkF1QkMifQ==