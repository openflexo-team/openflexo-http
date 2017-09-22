define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const activeClassName = "is-active";
    class Tabs {
        constructor(rippleEffect = false) {
            this.rippleEffect = rippleEffect;
            this.tabs = [];
            this.create();
        }
        addTab(tab) {
            this.tabs.push(tab);
            this.container.appendChild(tab.container);
            this.tabsHeader.appendChild(tab.header);
            utils_1.mdlDowngradeElement(this.container);
            utils_1.mdlUpgradeElement(this.container);
        }
        removeTab(tab) {
            // TODO
        }
        selectTab(tab) {
            let result = this.container.querySelectorAll("." + activeClassName);
            utils_1.forEachNode(result, (i, n) => {
                n.classList.remove(activeClassName);
            });
            tab.container.classList.add(activeClassName);
            tab.header.classList.add(activeClassName);
        }
        create() {
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
        }
    }
    exports.Tabs = Tabs;
    class Tab {
        constructor(id, title, contents) {
            this.id = id;
            this.title = title;
            this.contents = contents;
            this.create();
        }
        create() {
            this.container = document.createElement("div");
            this.container.id = this.id;
            this.container.classList.add("mdl-tabs__panel");
            let contents = this.contents;
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
        }
    }
    exports.Tab = Tab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDO0lBRXBDO1FBUUksWUFDcUIsZUFBZSxLQUFLO1lBQXBCLGlCQUFZLEdBQVosWUFBWSxDQUFRO1lBSGpDLFNBQUksR0FBVSxFQUFFLENBQUM7WUFLckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBUTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEMsMkJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLEdBQVE7WUFDZCxPQUFPO1FBQ1gsQ0FBQztRQUVELFNBQVMsQ0FBQyxHQUFRO1lBQ2QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUM7WUFDcEUsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVB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