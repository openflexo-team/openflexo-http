var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ResourceCenter = (function () {
        function ResourceCenter(name, id, url, type, uri, resourceUrl) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceUrl = resourceUrl;
        }
        return ResourceCenter;
    }());
    exports.ResourceCenter = ResourceCenter;
    var Resource = (function () {
        function Resource(name, id, url, type, uri, resourceCenterId, resourceCenterUrl, contentUrl, modelUrl, technologyAdapterId, technologyAdapterUrl) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
            this.contentUrl = contentUrl;
            this.modelUrl = modelUrl;
            this.technologyAdapterId = technologyAdapterId;
            this.technologyAdapterUrl = technologyAdapterUrl;
        }
        return Resource;
    }());
    exports.Resource = Resource;
    var Folder = (function () {
        function Folder(name, id, url, type, resourceCenterId, resourceCenterUrl) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
        }
        return Folder;
    }());
    exports.Folder = Folder;
    var TechnologyAdapter = (function () {
        function TechnologyAdapter(name, id, url, type) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
        return TechnologyAdapter;
    }());
    exports.TechnologyAdapter = TechnologyAdapter;
    var FlexoConcept = (function () {
        function FlexoConcept(name, id, url, type, virtualModel, parents, properties) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.virtualModel = virtualModel;
            this.parents = parents;
            this.properties = properties;
        }
        return FlexoConcept;
    }());
    exports.FlexoConcept = FlexoConcept;
    var VirtualModel = (function (_super) {
        __extends(VirtualModel, _super);
        function VirtualModel(name, id, url, type, virtualModel, parents, properties) {
            var _this = _super.call(this, name, id, url, type, virtualModel, parents, parents) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.virtualModel = virtualModel;
            _this.parents = parents;
            _this.properties = properties;
            return _this;
        }
        return VirtualModel;
    }(FlexoConcept));
    exports.VirtualModel = VirtualModel;
    var ViewPoint = (function (_super) {
        __extends(ViewPoint, _super);
        function ViewPoint(name, id, url, type, virtualModel, parents, properties) {
            var _this = _super.call(this, name, id, url, type, virtualModel, parents, parents) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.virtualModel = virtualModel;
            _this.parents = parents;
            _this.properties = properties;
            return _this;
        }
        return ViewPoint;
    }(VirtualModel));
    exports.ViewPoint = ViewPoint;
    var FlexoRole = (function () {
        function FlexoRole(name, id, url, type) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
        return FlexoRole;
    }());
    exports.FlexoRole = FlexoRole;
    var FlexoBehavior = (function () {
        function FlexoBehavior(name, id, url, type) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
        return FlexoBehavior;
    }());
    exports.FlexoBehavior = FlexoBehavior;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFPQTtRQUNJLHdCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixHQUFXLEVBQ1gsV0FBbUI7WUFMbkIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUN6QixDQUFDO1FBQ1YscUJBQUM7SUFBRCxDQUFDLEFBVEQsSUFTQztJQVRZLHdDQUFjO0lBZ0IzQjtRQUNJLGtCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixHQUFXLEVBQ1gsZ0JBQXdCLEVBQ3hCLGlCQUF5QixFQUN6QixVQUFrQixFQUNsQixRQUFnQixFQUNoQixtQkFBMkIsRUFDM0Isb0JBQTRCO1lBVjVCLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtZQUN6QixlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVE7WUFDaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFRO1lBQzNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUTtRQUNsQyxDQUFDO1FBQ1YsZUFBQztJQUFELENBQUMsQUFkRCxJQWNDO0lBZFksNEJBQVE7SUFnQnJCO1FBQ0ksZ0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFD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