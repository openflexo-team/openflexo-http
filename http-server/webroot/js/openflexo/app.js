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
                var tab = new Tabs_1.Tab("adapters", "Technology Adapters", this.createTAGrid());
                tabs.addTab(tab);
                tabs.selectTab(tab);
                root.appendChild(tabs.container);
            }
        };
        Application.prototype.createTAGrid = function () {
            var grid = new Grid_1.Grid();
            this.api.technologyAdapters().then(function (tas) {
                for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                    var ta = tas_1[_i];
                    console.log("TA " + ta.name);
                    var taUI = new Card_1.Card(ta.name, ta.name + " description");
                    grid.addCell(new Grid_1.GridCell(taUI, 4));
                }
            });
            return grid;
        };
        return Application;
    }());
    exports.Application = Application;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBVUE7UUFBQTtZQUVXLFFBQUcsR0FBUSxJQUFJLFNBQUcsRUFBRSxDQUFDO1FBOEJoQyxDQUFDO1FBNUJVLDJCQUFLLEdBQVo7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsaUNBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxvQ0FBNEIsRUFBRSxDQUFDO1lBRS9CLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxJQUFJLFVBQUcsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXBCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDTCxDQUFDO1FBRU8sa0NBQVksR0FBcEI7WUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUNsQyxHQUFHLENBQUMsQ0FBVyxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztvQkFBYixJQUFJLEVBQUUsWUFBQTtvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQztvQkFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FBQyxBQWhDRCxJQWdDQztJQWhDWSxrQ0FBVyJ9