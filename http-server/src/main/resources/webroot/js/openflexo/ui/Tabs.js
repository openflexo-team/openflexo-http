define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFHQSxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7SUFFcEM7UUFRSSxZQUNxQixlQUFlLEtBQUs7WUFBcEIsaUJBQVksR0FBWixZQUFZLENBQVE7WUFIakMsU0FBSSxHQUFVLEVBQUUsQ0FBQztZQUtyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFRO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4QywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxTQUFTLENBQUMsR0FBUTtZQUNkLE9BQU87UUFDWCxDQUFDO1FBRUQsU0FBUyxDQUFDLEdBQVE7WUFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQztZQUNwRSxtQkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNyQixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFB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