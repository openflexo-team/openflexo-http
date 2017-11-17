define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsVUFBa0IsU0FBUSxxQkFBUztRQUkvQixZQUNZLElBQVk7WUFFcEIsS0FBSyxFQUFFLENBQUM7WUFGQSxTQUFJLEdBQUosSUFBSSxDQUFRO1lBR3BCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JDLHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsZ0JBQWdCO1FBQ2xCLENBQUM7S0FDSjtJQXJCRCxvQkFxQkMifQ==