define(["require", "exports", "./api", "./ui/Grid", "./ui/TechnologyAdapterCard", "./ui/utils"], function (require, exports, api_1, Grid_1, TechnologyAdapterCard_1, utils_1) {
    "use strict";
    var Application = (function () {
        function Application() {
            this.api = new api_1.Api();
        }
        Application.prototype.start = function () {
            console.log("Starting OpenFlexo app");
            utils_1.addCssIfNotAlreadyPresent("css/openflexo.css");
            utils_1.addMdlScriptAndCssIfNotAlreadyPresent();
            var adapters = document.querySelector("#adapters");
            if (adapters) {
                var grid_1 = new Grid_1.Grid();
                this.api.technologyAdapters().then(function (tas) {
                    for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                        var ta = tas_1[_i];
                        console.log("TA " + ta.name);
                        var taUI = new TechnologyAdapterCard_1.TechnologyAdapterCard(ta);
                        grid_1.addCell(new Grid_1.GridCell(taUI, 4));
                    }
                    adapters.appendChild(grid_1.container);
                });
            }
        };
        return Application;
    }());
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBU0E7UUFBQTtZQUVXLFFBQUcsR0FBUSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBdUJoQyxDQUFDO1FBckJVLDJCQUFLLEdBQVo7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsaUNBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyw2Q0FBcUMsRUFBRSxDQUFDO1lBRXhDLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFckQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFNLE1BQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztvQkFDbEMsR0FBRyxDQUFDLENBQVcsVUFBRyxFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUc7d0JBQWIsSUFBSSxFQUFFLFlBQUE7d0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM5QixJQUFNLElBQUksR0FBRyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMzQyxNQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN2QztvQkFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBRUwsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQXpCRCxJQXlCQztJQXpCWSxrQ0FBVyJ9