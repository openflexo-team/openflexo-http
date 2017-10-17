define(["require", "exports", "./api/Api", "./ui/Grid", "./ui/Tabs", "./ui/Card", "./ui/utils"], function (require, exports, Api_1, Grid_1, Tabs_1, Card_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Application {
        constructor() {
            this.api = new Api_1.Api();
        }
        start() {
            console.log("Starting OpenFlexo app");
            utils_1.addCssIfNotAlreadyPresent("css/openflexo.css");
            utils_1.addMdlCssIfNotAlreadyPresent();
            const root = document.querySelector("#root");
            if (root) {
                let tabs = new Tabs_1.Tabs();
                let selected = this.createAdaptersTab();
                tabs.addTab(selected);
                tabs.addTab(this.createCentersTab());
                tabs.addTab(this.createResourcesTab());
                tabs.selectTab(selected);
                root.appendChild(tabs.container);
            }
        }
        createAdaptersTab() {
            const grid = new Grid_1.Grid();
            this.api.technologyAdapters().then(tas => {
                tas.forEach(ta => {
                    console.log("TA " + ta.name);
                    const taUI = new Card_1.Card(ta.name, ta.name + " description");
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                });
            });
            return new Tabs_1.Tab("adapters", "Technology Adapters", grid);
        }
        createCentersTab() {
            const grid = new Grid_1.Grid();
            this.api.resourceCenters().then(rcs => {
                rcs.forEach(rc => {
                    console.log("RC " + rc.name);
                    const taUI = new Card_1.Card(rc.name, rc.name + " description");
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                });
            });
            return new Tabs_1.Tab("centers", "Resource Centers", grid);
        }
        createResourcesTab() {
            const grid = new Grid_1.Grid();
            this.api.resources().then(resources => {
                resources.forEach(resource => {
                    console.log("RC " + resource.name);
                    const taUI = new Card_1.Card(resource.name, resource.name + " description");
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                });
            });
            return new Tabs_1.Tab("resources", "Resources", grid);
        }
    }
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBO1FBQUE7WUFFVyxRQUFHLEdBQVEsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQXVEaEMsQ0FBQztRQXJEVSxLQUFLO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RDLGlDQUF5QixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDL0Msb0NBQTRCLEVBQUUsQ0FBQztZQUUvQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztRQUVPLGlCQUFpQjtZQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDbEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksVUFBRyxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRVEsZ0JBQWdCO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksVUFBRyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRU8sa0JBQWtCO1lBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUztnQkFDL0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQztvQkFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLFVBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FDSjtJQXpERCxrQ0F5REMifQ==