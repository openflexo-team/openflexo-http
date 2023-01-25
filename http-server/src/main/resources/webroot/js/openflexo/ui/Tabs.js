define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tab = exports.Tabs = void 0;
    const activeClassName = "is-active";
    class Tabs extends Component_1.Component {
        constructor(rippleEffect = false) {
            super();
            this.rippleEffect = rippleEffect;
            this.tabs = [];
            this.create();
        }
        addTab(tab) {
            this.tabs.push(tab);
            this.container.appendChild(tab.container);
            this.tabsHeader.appendChild(tab.header);
            (0, utils_1.mdlDowngradeElement)(this.container);
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        removeTab(tab) {
            // TODO
        }
        selectTab(tab) {
            let result = this.container.querySelectorAll("." + activeClassName);
            (0, utils_1.forEachNode)(result, (i, n) => {
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
            (0, utils_1.mdlUpgradeElement)(this.container);
        }
        setEnable(enable) {
            this.tabs.forEach(tab => tab.setEnable(enable));
        }
    }
    exports.Tabs = Tabs;
    class Tab extends Component_1.Component {
        constructor(id, title, contents) {
            super();
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
            (0, utils_1.mdlUpgradeElement)(this.header);
        }
        setEnable(enable) {
            (0, utils_1.setEnable)(this.contents, enable);
        }
    }
    exports.Tab = Tab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUlBLE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQztJQUVwQyxNQUFhLElBQUssU0FBUSxxQkFBUztRQVEvQixZQUNxQixlQUFlLEtBQUs7WUFFckMsS0FBSyxFQUFFLENBQUM7WUFGUyxpQkFBWSxHQUFaLFlBQVksQ0FBUTtZQUhqQyxTQUFJLEdBQVUsRUFBRSxDQUFDO1lBTXJCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQVE7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhDLElBQUEsMkJBQW1CLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLElBQUEseUJBQWlCLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxTQUFTLENBQUMsR0FBUTtZQUNkLE9BQU87UUFDWCxDQUFDO1FBRUQsU0FBUyxDQUFDLEdBQVE7WUFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQztZQUNwRSxJQUFBLG1CQUFXLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDN0MsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUc1QyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQ3hEO1lBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxJQUFBLHlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUNKO0lBekRELG9CQXlEQztJQUVELE1BQWEsR0FBSSxTQUFRLHFCQUFTO1FBTTlCLFlBQ1csRUFBVSxFQUNWLEtBQWEsRUFDWixRQUF1QjtZQUUvQixLQUFLLEVBQUUsQ0FBQztZQUpELE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ1osYUFBUSxHQUFSLFFBQVEsQ0FBZTtZQUcvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdCLElBQWlCLFFBQVMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFjLFFBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoRTtpQkFBTTtnQkFDSCx1QkFBdUI7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFlLFFBQVEsQ0FBQyxDQUFDO2FBQ3REO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRW5DLElBQUEseUJBQWlCLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixJQUFBLGlCQUFTLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQ0o7SUF0Q0Qsa0JBc0NDIn0=