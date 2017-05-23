define(["require", "exports"], function (require, exports) {
    "use strict";
    var Tabs = (function () {
        function Tabs(rippleEffect) {
            if (rippleEffect === void 0) { rippleEffect = false; }
            this.rippleEffect = rippleEffect;
            this.tabs = [];
        }
        Tabs.prototype.addCell = function (tab) {
            this.tabs.push(tab);
            // TODO add container if grid already initialized
        };
        Tabs.prototype.initialize = function () {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-tabs");
            this.container.classList.add("mdl-js-tabs");
            if (!this.rippleEffect) {
                this.container.classList.add("mdl-js-ripple-effect");
            }
            for (var _i = 0, _a = this.tabs; _i < _a.length; _i++) {
                var tab = _a[_i];
                this.container.appendChild(tab.createTab());
            }
        };
        Tabs.prototype.dispose = function () {
        };
        return Tabs;
    }());
    exports.Tabs = Tabs;
    var Tab = (function () {
        function Tab() {
        }
        Tab.prototype.createTab = function () {
            var tab = document.createElement("div");
            return tab;
        };
        return Tab;
    }());
    exports.Tab = Tab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQU1JLGNBQ3FCLFlBQW9CO1lBQXBCLDZCQUFBLEVBQUEsb0JBQW9CO1lBQXBCLGlCQUFZLEdBQVosWUFBWSxDQUFRO1lBSGpDLFNBQUksR0FBVSxFQUFFLENBQUM7UUFLekIsQ0FBQztRQUVELHNCQUFPLEdBQVAsVUFBUSxHQUFRO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFcEIsaURBQWlEO1FBQ3JELENBQUM7UUFFRCx5QkFBVSxHQUFWO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDekQsQ0FBQztZQUVELEdBQUcsQ0FBQyxDQUFZLFVBQVMsRUFBVCxLQUFBLElBQUksQ0FBQyxJQUFJLEVBQVQsY0FBUyxFQUFULElBQVM7Z0JBQXBCLElBQUksR0FBRyxTQUFBO2dCQUNSLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQy9DO1FBQ0wsQ0FBQztRQUVELHNCQUFPLEdBQVA7UUFDQSxDQUFDO1FBQ0wsV0FBQztJQUFELENBQUMsQUFqQ0QsSUFpQ0M7SUFqQ1ksb0JBQUk7SUFtQ2pCO1FBQUE7UUFNQSxDQUFDO1FBTEcsdUJBQVMsR0FBVDtZQUNJLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDTCxVQUFDO0lBQUQsQ0FBQyxBQU5ELElBTUM7SUFOWSxrQkFBRyJ9