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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBU0E7UUFBQTtZQUVXLFFBQUcsR0FBUSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBc0JoQyxDQUFDO1FBcEJVLDJCQUFLLEdBQVo7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsaUNBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyw2Q0FBcUMsRUFBRSxDQUFDO1lBRXhDLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckQsSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUV4QixJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztnQkFDbEMsR0FBRyxDQUFDLENBQVcsVUFBRyxFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUc7b0JBQWIsSUFBSSxFQUFFLFlBQUE7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixJQUFNLElBQUksR0FBRyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2QztnQkFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQXhCRCxJQXdCQztJQXhCWSxrQ0FBVyJ9