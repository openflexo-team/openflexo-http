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
//# sourceMappingURL=openflexo.js.map