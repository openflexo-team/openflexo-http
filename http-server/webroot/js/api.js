"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var openflexo;
(function (openflexo) {
    var Description = (function () {
        function Description() {
        }
        return Description;
    }());
    openflexo.Description = Description;
    var Center = (function (_super) {
        __extends(Center, _super);
        function Center() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Center;
    }(Description));
    openflexo.Center = Center;
    var ResourceCenter = (function (_super) {
        __extends(ResourceCenter, _super);
        function ResourceCenter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ResourceCenter;
    }(Description));
    openflexo.ResourceCenter = ResourceCenter;
    var TechnologyAdapter = (function (_super) {
        __extends(TechnologyAdapter, _super);
        function TechnologyAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TechnologyAdapter;
    }(Description));
    openflexo.TechnologyAdapter = TechnologyAdapter;
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
    function technologyAdapters(callback) {
        call("http://localhost:8080/ta", callback);
    }
    openflexo.technologyAdapters = technologyAdapters;
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
function getDataUrl(element) {
    var current = element;
    var dataUrl = current.getAttribute("data-url");
    while (dataUrl === null) {
        current = current.parentElement;
        if (!current) {
            break;
        }
        dataUrl = current.getAttribute("data-url");
    }
    return dataUrl;
}
function updateDetails(event) {
    var target = event.target;
    var dataUrl = getDataUrl(target);
    if (dataUrl) {
        console.log("Get info from " + dataUrl);
        openflexo.call(dataUrl, function (result) {
            target.appendChild(createDescriptionElement(result));
        });
    }
    event.preventDefault();
}
function createDescriptionElement(source) {
    var description = document.createElement("div");
    description.setAttribute("data-url", source.url);
    //description.onclick = updateDetails;
    var a = document.createElement("a");
    a.href = source.url;
    a.text = source.name;
    description.appendChild(a);
    return description;
}
openflexo.technologyAdapters(function (tas) {
    var div = document.querySelector("#tas");
    for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
        var ta = tas_1[_i];
        div.appendChild(createDescriptionElement(ta));
    }
});
openflexo.centers(function (centers) {
    var div = document.querySelector("#centers");
    for (var _i = 0, centers_1 = centers; _i < centers_1.length; _i++) {
        var center = centers_1[_i];
        div.appendChild(createDescriptionElement(center));
    }
});
openflexo.resources(function (resources) {
    var div = document.querySelector("#resources");
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        div.appendChild(createDescriptionElement(resource));
    }
});
