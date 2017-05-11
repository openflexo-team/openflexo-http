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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmZsZXhvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3BlbmZsZXhvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBVyxRQUFBLElBQUksR0FBRyxFQUFFLENBQUM7QUFTckI7SUFDSSx3QkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLFdBQW1CO1FBTG5CLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQ1gsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFDekIsQ0FBQztJQUNWLHFCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSx3Q0FBYztBQWdCM0I7SUFDSSxrQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBa0IsRUFDbEIsbUJBQTJCLEVBQzNCLG9CQUE0QjtRQVQ1QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFDekIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVE7UUFDM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFRO0lBQ2xDLENBQUM7SUFDVixlQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSw0QkFBUTtBQWVyQjtJQUNJLGdCQUNXLElBQVksRUFDWixFQUFVLEVBQ1Ys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