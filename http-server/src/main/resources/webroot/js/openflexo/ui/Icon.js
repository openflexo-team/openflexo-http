define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Icon = void 0;
    class Icon extends Component_1.Component {
        constructor(icon) {
            super();
            this.icon = icon;
            this.create();
        }
        create() {
            this.container = document.createElement("i");
            this.container.classList.add("material-icons");
            this.container.innerText = this.icon;
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        setEnable(enable) {
            // nothing to do
        }
    }
    exports.Icon = Icon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUdBLE1BQWEsSUFBSyxTQUFRLHFCQUFTO1FBSS9CLFlBQ1ksSUFBWTtZQUVwQixLQUFLLEVBQUUsQ0FBQztZQUZBLFNBQUksR0FBSixJQUFJLENBQVE7WUFHcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBQSx5QkFBaUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLGdCQUFnQjtRQUNsQixDQUFDO0tBQ0o7SUFyQkQsb0JBcUJDIn0=