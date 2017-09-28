define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
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
            utils_1.mdlUpgradeElement(this.container);
        }
        setEnable(enable) {
            // nothing to do
        }
    }
    exports.Icon = Icon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFHQSxVQUFrQixTQUFRLHFCQUFTO1FBSS9CLFlBQ1ksSUFBWTtZQUVwQixLQUFLLEVBQUUsQ0FBQztZQUZBLFNBQUksR0FBSixJQUFJLENBQVE7WUFHcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixnQkFBZ0I7UUFDbEIsQ0FBQztLQUNKO0lBckJELG9CQXFCQyJ9