define(["require", "exports", "./api", "./ui/Grid", "./ui/Tabs", "./ui/TechnologyAdapterCard", "./ui/utils"], function (require, exports, api_1, Grid_1, Tabs_1, TechnologyAdapterCard_1, utils_1) {
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
                for (var i = 0; i < 5; i++) {
                    var tab = new Tabs_1.Tab("adapters" + i, "Technology Adapters", this.createTAGrid());
                    tabs.addTab(tab);
                    tabs.selectTab(tab);
                }
                //componentHandler.upgradeElements(tabs.container);
                root.appendChild(tabs.container);
            }
        };
        Application.prototype.createTAGrid = function () {
            var grid = new Grid_1.Grid();
            this.api.technologyAdapters().then(function (tas) {
                for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                    var ta = tas_1[_i];
                    console.log("TA " + ta.name);
                    var taUI = new TechnologyAdapterCard_1.TechnologyAdapterCard(ta);
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                }
            });
            return grid;
        };
        return Application;
    }());
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBVUE7UUFBQTtZQUVXLFFBQUcsR0FBUSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBb0NoQyxDQUFDO1FBbENVLDJCQUFLLEdBQVo7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsaUNBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxvQ0FBNEIsRUFBRSxDQUFDO1lBRS9CLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUV0QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNwQixJQUFJLEdBQUcsR0FBRyxJQUFJLFVBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO29CQUU5RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2dCQUVELG1EQUFtRDtnQkFFbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNMLENBQUM7UUFFTyxrQ0FBWSxHQUFwQjtZQUNJLElBQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7Z0JBQ2xDLEdBQUcsQ0FBQyxDQUFXLFVBQUcsRUFBSCxXQUFHLEVBQUgsaUJBQUcsRUFBSCxJQUFHO29CQUFiLElBQUksRUFBRSxZQUFBO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsSUFBTSxJQUFJLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQXRDRCxJQXNDQztJQXRDWSxrQ0FBVyJ9