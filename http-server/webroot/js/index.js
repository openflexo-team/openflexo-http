"use strict";
var openflexo = require("./openflexo");
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
function getDescriptionDiv(element) {
    var current = element;
    var dataUrl = current.getAttribute("data-url");
    while (dataUrl === null) {
        current = current.parentElement;
        if (!current) {
            break;
        }
        dataUrl = current.getAttribute("data-url");
    }
    return current;
}
function showDetails(event) {
    var description = getDescriptionDiv(event.target);
    var details = description.nextSibling;
    if (details.style.display === "block") {
        details.style.display = 'none';
    }
    else {
        details.style.display = 'block';
    }
    event.preventDefault();
}
function createCount(source) {
    var count = document.createElement("span");
    count.innerText = "Found " + source.length + " elements";
    return count;
}
function createDescriptionElement(source) {
    var description = document.createElement("div");
    description.setAttribute("data-url", source.url);
    description.onclick = showDetails;
    var a = document.createElement("a");
    a.href = source.url;
    a.text = source.name;
    description.appendChild(a);
    return description;
}
function createPreElement(source) {
    var all = document.createElement("div");
    all.className = 'details';
    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
        var key = _a[_i];
        var element = document.createElement("div");
        var keySpan = document.createElement("b");
        keySpan.innerText = key + ": ";
        element.appendChild(keySpan);
        if (key.length >= 3 && key.substr(-3).toLowerCase() === "url") {
            var valueCode = document.createElement("a");
            valueCode.href = source[key];
            valueCode.innerText = source[key];
            element.appendChild(valueCode);
        }
        else {
            var valueCode = document.createElement("code");
            valueCode.innerText = source[key];
            element.appendChild(valueCode);
        }
        all.appendChild(element);
    }
    return all;
}
openflexo.technologyAdapters(function (tas) {
    var div = document.querySelector("#tas");
    div.appendChild(createCount(tas));
    for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
        var ta = tas_1[_i];
        div.appendChild(createDescriptionElement(ta));
        div.appendChild(createPreElement(ta));
    }
});
openflexo.resourceCenters(function (centers) {
    var div = document.querySelector("#centers");
    div.appendChild(createCount(centers));
    for (var _i = 0, centers_1 = centers; _i < centers_1.length; _i++) {
        var center = centers_1[_i];
        div.appendChild(createDescriptionElement(center));
        div.appendChild(createPreElement(center));
    }
});
openflexo.resources(function (resources) {
    var div = document.querySelector("#resources");
    div.appendChild(createCount(resources));
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        div.appendChild(createDescriptionElement(resource));
        div.appendChild(createPreElement(resource));
    }
});
