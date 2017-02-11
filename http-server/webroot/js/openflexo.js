var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Description = (function () {
        function Description() {
        }
        return Description;
    }());
    exports.Description = Description;
    var ResourceCenter = (function (_super) {
        __extends(ResourceCenter, _super);
        function ResourceCenter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ResourceCenter;
    }(Description));
    exports.ResourceCenter = ResourceCenter;
    var Resource = (function (_super) {
        __extends(Resource, _super);
        function Resource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Resource;
    }(Description));
    exports.Resource = Resource;
    var TechnologyAdapter = (function (_super) {
        __extends(TechnologyAdapter, _super);
        function TechnologyAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TechnologyAdapter;
    }(Description));
    exports.TechnologyAdapter = TechnologyAdapter;
    function error(url) {
        console.log("Error can't access " + url + '", check that it exists and is accessible');
    }
    function resourceCenters(callback) {
        call("http://localhost:8080/rc", callback);
    }
    exports.resourceCenters = resourceCenters;
    function resources(callback) {
        call("http://localhost:8080/resource", callback);
    }
    exports.resources = resources;
    function technologyAdapters(callback) {
        call("http://localhost:8080/ta", callback);
    }
    exports.technologyAdapters = technologyAdapters;
    function call(url, callback) {
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.onload = function (ev) {
            if (request.status >= 200 && request.status < 300) {
                callback(JSON.parse(request.responseText));
            }
        };
        request.onerror = function (ev) {
            error(url);
        };
        request.send();
    }
    exports.call = call;
});
//# sourceMappingURL=openflexo.js.map