define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    class Icon {
        constructor(icon) {
            this.icon = icon;
            this.create();
        }
        create() {
            this.container = document.createElement("i");
            this.container.classList.add("material-icons");
            this.container.innerText = this.icon;
            utils_1.mdlUpgradeElement(this.container);
        }
    }
    exports.Icon = Icon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFHQTtRQUlJLFlBQ1ksSUFBWTtZQUFaLFNBQUksR0FBSixJQUFJLENBQVE7WUFFcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFTyxNQUFNO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FDSjtJQWhCRCxvQkFnQkMifQ==