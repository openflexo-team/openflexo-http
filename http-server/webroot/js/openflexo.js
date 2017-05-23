define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.host = "";
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
        function Resource(name, id, url, type, uri, resourceCenterId, resourceCenterUrl, contentUrl, technologyAdapterId, technologyAdapterUrl) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
            this.contentUrl = contentUrl;
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
    function error(url) {
        console.log("Error can't access " + url + '", check that it exists and is accessible');
    }
    function resourceCenters(callback) {
        call(exports.host + "/rc", callback);
    }
    exports.resourceCenters = resourceCenters;
    function resources(callback) {
        call(exports.host + "/resource", callback);
    }
    exports.resources = resources;
    function technologyAdapters(callback) {
        call(exports.host + "/ta", callback);
    }
    exports.technologyAdapters = technologyAdapters;
    function call(path, callback, errorCallback) {
        if (errorCallback === void 0) { errorCallback = function (ev) { error(path); }; }
        var request = new XMLHttpRequest();
        request.open("get", exports.host + path);
        request.onload = function (ev) {
            if (request.status >= 200 && request.status < 300) {
                var first = request.responseText.charAt(0);
                if (first === '{' || first === '[') {
                    var json = JSON.parse(request.responseText);
                    callback(json);
                }
            }
            else {
                errorCallback(ev);
            }
        };
        request.onerror = errorCallback;
        request.send();
    }
    exports.call = call;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmZsZXhvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3BlbmZsZXhvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQVcsUUFBQSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBU3JCO1FBQ0ksd0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxXQUFtQjtZQUxuQixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ3pCLENBQUM7UUFDVixxQkFBQztJQUFELENBQUMsQUFURCxJQVNDO0lBVFksd0NBQWM7SUFnQjNCO1FBQ0ksa0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxnQkFBd0IsRUFDeEIsaUJBQXlCLEVBQ3pCLFVBQWtCLEVBQ2xCLG1CQUEyQixFQUMzQixvQkFBNEI7WUFUNUIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7WUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1lBQ3pCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFRO1lBQzNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUTtRQUNsQyxDQUFDO1FBQ1YsZUFBQztJQUFELENBQUMsQUFiRCxJQWFDO0lBYlksNEJBQVE7SUFlckI7UUFDSSxnQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNW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