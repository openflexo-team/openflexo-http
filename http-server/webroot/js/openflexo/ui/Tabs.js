define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var activeClassName = "is-active";
    var Tabs = (function () {
        function Tabs(rippleEffect) {
            if (rippleEffect === void 0) { rippleEffect = false; }
            this.rippleEffect = rippleEffect;
            this.tabs = [];
            this.create();
        }
        Tabs.prototype.addTab = function (tab) {
            this.tabs.push(tab);
            this.container.appendChild(tab.container);
            this.tabsHeader.appendChild(tab.header);
            utils_1.mdlDowngradeElement(this.container);
            utils_1.mdlUpgradeElement(this.container);
        };
        Tabs.prototype.removeTab = function (tab) {
            // TODO
        };
        Tabs.prototype.selectTab = function (tab) {
            var result = this.container.querySelectorAll("." + activeClassName);
            utils_1.forEachNode(result, function (i, n) {
                n.classList.remove(activeClassName);
            });
            tab.container.classList.add(activeClassName);
            tab.header.classList.add(activeClassName);
        };
        Tabs.prototype.create = function () {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-tabs");
            this.container.classList.add("mdl-js-tabs");
            if (this.rippleEffect) {
                this.container.classList.add("mdl-js-ripple-effect");
            }
            this.tabsHeader = document.createElement("div");
            this.tabsHeader.classList.add("mdl-tabs__tab-bar");
            this.container.appendChild(this.tabsHeader);
            utils_1.mdlUpgradeElement(this.container);
        };
        return Tabs;
    }());
    exports.Tabs = Tabs;
    var Tab = (function () {
        function Tab(id, title, contents) {
            this.id = id;
            this.title = title;
            this.contents = contents;
            this.create();
        }
        Tab.prototype.create = function () {
            this.container = document.createElement("div");
            this.container.id = this.id;
            this.container.classList.add("mdl-tabs__panel");
            var contents = this.contents;
            if (contents.container) {
                this.container.appendChild(contents.container);
            }
            else {
                // it's an html element
                this.container.appendChild(contents);
            }
            this.header = document.createElement("a");
            this.header.classList.add("mdl-tabs__tab");
            this.header.href = "#" + this.id;
            this.header.innerText = this.title;
            utils_1.mdlUpgradeElement(this.container);
            utils_1.mdlUpgradeElement(this.header);
        };
        return Tab;
    }());
    exports.Tab = Tab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFHQSxJQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7SUFFcEM7UUFRSSxjQUNxQixZQUFvQjtZQUFwQiw2QkFBQSxFQUFBLG9CQUFvQjtZQUFwQixpQkFBWSxHQUFaLFlBQVksQ0FBUTtZQUhqQyxTQUFJLEdBQVUsRUFBRSxDQUFDO1lBS3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQscUJBQU0sR0FBTixVQUFPLEdBQVE7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhDLDJCQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELHdCQUFTLEdBQVQsVUFBVSxHQUFRO1lBQ2QsT0FBTztRQUNYLENBQUM7UUFFRCx3QkFBUyxHQUFULFVBQVUsR0FBUTtZQUNkLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDO1lBQ3BFLG1CQUFXLENBQUMsTUFBTSxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdDLEdBQUcs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