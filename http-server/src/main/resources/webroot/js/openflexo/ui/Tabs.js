define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
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
            utils_1.mdlUpgradeElement(this.header);
        }
        setEnable(enable) {
            utils_1.setEnable(this.contents, enable);
        }
    }
    exports.Tab = Tab;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFJQSxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUM7SUFFcEMsVUFBa0IsU0FBUSxxQkFBUztRQVEvQixZQUNxQixlQUFlLEtBQUs7WUFFckMsS0FBSyxFQUFFLENBQUM7WUFGUyxpQkFBWSxHQUFaLFlBQVksQ0FBUTtZQUhqQyxTQUFJLEdBQVUsRUFBRSxDQUFDO1lBTXJCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQVE7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhDLDJCQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxHQUFRO1lBQ2QsT0FBTztRQUNYLENBQUM7UUFFRCxTQUFTLENBQUMsR0FBUTtZQUNkLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDO1lBQ3BFLG1CQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdDLEdBQUcs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