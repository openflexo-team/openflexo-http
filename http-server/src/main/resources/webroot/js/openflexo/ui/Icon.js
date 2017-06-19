define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var Icon = (function () {
        function Icon(icon) {
            this.icon = icon;
            this.create();
        }
        Icon.prototype.create = function () {
            this.container = document.createElement("i");
            this.container.classList.add("material-icons");
            this.container.innerText = this.icon;
            utils_1.mdlUpgradeElement(this.container);
        };
        return Icon;
    }());
    exports.Icon = Icon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFHQTtRQUlJLGNBQ1ksSUFBWTtZQUFaLFNBQUksR0FBSixJQUFJLENBQVE7WUFFcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFTyxxQkFBTSxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0FBQyxBQWhCRCxJQWdCQztJQWhCWSxvQkFBSSJ9