define(["require", "exports", "./api", "./ui/Grid", "./ui/Tabs", "./ui/Card", "./ui/utils"], function (require, exports, api_1, Grid_1, Tabs_1, Card_1, utils_1) {
    "use strict";
    var Application = (function () {
        function Application() {
            this.api = new api_1.Api();
        }
        Application.prototype.start = function () {
            console.log("Starting OpenFlexo app");
            utils_1.addCssIfNotAlreadyPresent("css/openflexo.css");
            utils_1.addMdlCssIfNotAlreadyPresent();
            var root = document.querySelector("#root");
            if (root) {
                var tabs = new Tabs_1.Tabs();
                var selected = this.createAdaptersTab();
                tabs.addTab(selected);
                tabs.addTab(this.createCentersTab());
                tabs.addTab(this.createResourcesTab());
                tabs.selectTab(selected);
                root.appendChild(tabs.container);
            }
        };
        Application.prototype.createAdaptersTab = function () {
            var grid = new Grid_1.Grid();
            this.api.technologyAdapters().then(function (tas) {
                for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                    var ta = tas_1[_i];
                    console.log("TA " + ta.name);
                    var taUI = new Card_1.Card(ta.name, ta.name + " description");
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                }
            });
            return new Tabs_1.Tab("adapters", "Technology Adapters", grid);
        };
        Application.prototype.createCentersTab = function () {
            var grid = new Grid_1.Grid();
            this.api.resourceCenters().then(function (rcs) {
                for (var _i = 0, rcs_1 = rcs; _i < rcs_1.length; _i++) {
                    var rc = rcs_1[_i];
                    console.log("RC " + rc.name);
                    var taUI = new Card_1.Card(rc.name, rc.name + " description");
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                }
            });
            return new Tabs_1.Tab("centers", "Resource Centers", grid);
        };
        Application.prototype.createResourcesTab = function () {
            var grid = new Grid_1.Grid();
            this.api.resources().then(function (resources) {
                for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                    var resource = resources_1[_i];
                    console.log("RC " + resource.name);
                    var taUI = new Card_1.Card(resource.name, resource.name + " description");
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                }
            });
            return new Tabs_1.Tab("resources", "Resources", grid);
        };
        return Application;
    }());
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBVUE7UUFBQTtZQUVXLFFBQUcsR0FBUSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBd0RoQyxDQUFDO1FBdERVLDJCQUFLLEdBQVo7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsaUNBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxvQ0FBNEIsRUFBRSxDQUFDO1lBRS9CLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBRXZDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDTCxDQUFDO1FBRU8sdUNBQWlCLEdBQXpCO1lBQ0ksSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztnQkFDbEMsR0FBRyxDQUFDLENBQVcsVUFBRyxFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUc7b0JBQWIsSUFBSSxFQUFFLFlBQUE7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxVQUFHLENBQUMsVUFBVSxFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFUSxzQ0FBZ0IsR0FBeEI7WUFDRyxJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztnQkFDL0IsR0FBRyxDQUFDLENBQVcsVUFBRyxFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUc7b0JBQWIsSUFBSSxFQUFFLFlBQUE7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxVQUFHLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFTyx3Q0FBa0IsR0FBMUI7WUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztnQkFDL0IsR0FBRyxDQUFDLENBQWlCLFVBQVMsRUFBVCx1QkFBUyxFQUFULHVCQUFTLEVBQVQsSUFBUztvQkFBekIsSUFBSSxRQUFRLGtCQUFBO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO29CQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2QztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksVUFBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQTFERCxJQTBEQztJQTFEWSxrQ0FBVyJ9