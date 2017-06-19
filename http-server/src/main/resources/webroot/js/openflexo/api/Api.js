define(["require", "exports"], function (require, exports) {
    "use strict";
    var Api = (function () {
        function Api(host) {
            if (host === void 0) { host = ""; }
            this.host = host;
        }
        Api.prototype.error = function (url) {
            console.log("Error can't access " + url + '", check that it exists and is accessible');
        };
        Api.prototype.call = function (path) {
            var _this = this;
            var result = new Promise(function (fullfilled, rejected) {
                var request = new XMLHttpRequest();
                request.open("get", _this.host + path);
                request.onload = function (ev) {
                    if (request.status >= 200 && request.status < 300) {
                        var first = request.responseText.charAt(0);
                        if (first === '{' || first === '[') {
                            var json = JSON.parse(request.responseText);
                            fullfilled(json);
                            return;
                        }
                        rejected(request.statusText);
                    }
                };
                request.onerror = rejected;
                request.send();
            });
            return result;
        };
        Api.prototype.resourceCenters = function () {
            return this.call(this.host + "/rc");
        };
        Api.prototype.resources = function () {
            return this.call(this.host + "/resource");
        };
        Api.prototype.technologyAdapters = function () {
            return this.call(this.host + "/ta");
        };
        Api.prototype.viewPoints = function () {
            return this.call(this.host + "/ta/fml/viewpoint");
        };
        return Api;
    }());
    exports.Api = Api;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBR0E7UUFFSSxhQUNZLElBQWlCO1lBQWpCLHFCQUFBLEVBQUEsU0FBaUI7WUFBakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUc3QixDQUFDO1FBRUQsbUJBQUssR0FBTCxVQUFNLEdBQVc7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLEdBQUcsR0FBRywyQ0FBMkMsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFFTSxrQkFBSSxHQUFYLFVBQWUsSUFBWTtZQUEzQixpQkFvQkM7WUFuQkcsSUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxVQUFVLEVBQUUsUUFBUTtnQkFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFDLEVBQUU7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDaEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUM1QyxVQUFVLENBQUksSUFBSSxDQUFDLENBQUM7NEJBQ3BCLE1BQU0sQ0FBQzt3QkFDWCxDQUFDO3dCQUNELFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pDLENBQUM7Z0JBRUwsQ0FBQyxDQUFBO2dCQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFTSw2QkFBZSxHQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVNLHVCQUFTLEdBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRU0sZ0NBQWtCLEdBQXpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRU0sd0JBQVUsR0FBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQUFDLEFBakRELElBaURDO0lBakRZLGtCQUFHIn0=