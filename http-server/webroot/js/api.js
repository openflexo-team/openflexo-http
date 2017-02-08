"use strict";
var openflexo;
(function (openflexo) {
    var Center = (function () {
        function Center() {
        }
        return Center;
    }());
    openflexo.Center = Center;
    var ResourceCenter = (function () {
        function ResourceCenter() {
        }
        return ResourceCenter;
    }());
    openflexo.ResourceCenter = ResourceCenter;
    function error(url) {
        console.log("Error can't access " + url + '", check that it exists and is accessible');
    }
    function centers(callback) {
        call("http://localhost:8080/rc", callback);
    }
    openflexo.centers = centers;
    function resources(callback) {
        call("http://localhost:8080/resource", callback);
    }
    openflexo.resources = resources;
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
    openflexo.call = call;
})(openflexo || (openflexo = {}));
openflexo.centers(function (centers) {
    var div = document.querySelector("#centers");
    for (var _i = 0, centers_1 = centers; _i < centers_1.length; _i++) {
        var center = centers_1[_i];
        var child = document.createElement("div");
        var a = document.createElement("a");
        a.href = center.url;
        a.text = center.name;
        child.appendChild(a);
        div.appendChild(child);
        console.log("center");
    }
});
openflexo.resources(function (resources) {
    var div = document.querySelector("#resources");
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        var child = document.createElement("div");
        var a = document.createElement("a");
        a.href = resource.url;
        a.text = resource.name;
        child.appendChild(a);
        div.appendChild(child);
        console.log("resource");
    }
});
