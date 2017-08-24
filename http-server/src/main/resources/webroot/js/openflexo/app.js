define(["require", "exports", "./api/Api", "./ui/Grid", "./ui/Tabs", "./ui/Card", "./ui/utils"], function (require, exports, Api_1, Grid_1, Tabs_1, Card_1, utils_1) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBVUE7UUFBQTtZQUVXLFFBQUcsR0FBUSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBdURoQyxDQUFDO1FBckRVLEtBQUs7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsaUNBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxvQ0FBNEIsRUFBRSxDQUFDO1lBRS9CLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBRXZDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDTCxDQUFDO1FBRU8saUJBQWlCO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNsQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxVQUFHLENBQUMsVUFBVSxFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFUSxnQkFBZ0I7WUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUMvQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxVQUFHLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFTyxrQkFBa0I7WUFDdEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUMvQixTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVE7b0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO29CQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksVUFBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUNKO0lBekRELGtDQXlEQyJ9