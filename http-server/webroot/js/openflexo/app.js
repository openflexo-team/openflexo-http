define(["require", "exports", "./api", "./ui/Grid", "./ui/TechnologyAdapterCard"], function (require, exports, api_1, Grid_1, TechnologyAdapterCard_1) {
    "use strict";
    var Application = (function () {
        function Application() {
            this.api = new api_1.Api();
        }
        Application.prototype.start = function () {
            console.log("Starting OpenFlexo app");
            var adapters = document.querySelector("#adapters");
            var grid = new Grid_1.Grid();
            this.api.technologyAdapters().then(function (tas) {
                for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                    var ta = tas_1[_i];
                    console.log("TA " + ta.name);
                    var taUI = new TechnologyAdapterCard_1.TechnologyAdapterCard(ta);
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                }
                grid.initialize();
                adapters.appendChild(grid.container);
            });
        };
        return Application;
    }());
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBUUE7UUFBQTtZQUVXLFFBQUcsR0FBUSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBb0JoQyxDQUFDO1FBbEJVLDJCQUFLLEdBQVo7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFdEMsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRCxJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRXhCLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUNsQyxHQUFHLENBQUMsQ0FBVyxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztvQkFBYixJQUFJLEVBQUUsWUFBQTtvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksNkNBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO2dCQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQUFDLEFBdEJELElBc0JDO0lBdEJZLGtDQUFXIn0=