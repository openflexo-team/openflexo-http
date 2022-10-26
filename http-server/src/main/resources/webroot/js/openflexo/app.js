define(["require", "exports", "./api/Api", "./ui/Grid", "./ui/Tabs", "./ui/Card", "./ui/utils"], function (require, exports, Api_1, Grid_1, Tabs_1, Card_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Application = void 0;
    class Application {
        constructor() {
            this.api = new Api_1.Api();
        }
        start() {
            console.log("Starting OpenFlexo app");
            (0, utils_1.addCssIfNotAlreadyPresent)("css/openflexo.css");
            (0, utils_1.addMdlCssIfNotAlreadyPresent)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFVQSxNQUFhLFdBQVc7UUFBeEI7WUFFVyxRQUFHLEdBQVEsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQXVEaEMsQ0FBQztRQXJEVSxLQUFLO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RDLElBQUEsaUNBQXlCLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxJQUFBLG9DQUE0QixHQUFFLENBQUM7WUFFL0IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLElBQUksRUFBRTtnQkFDTixJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBRXZDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0wsQ0FBQztRQUVPLGlCQUFpQjtZQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksVUFBRyxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRVEsZ0JBQWdCO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksVUFBRyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRU8sa0JBQWtCO1lBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO29CQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLFVBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FDSjtJQXpERCxrQ0F5REMifQ==