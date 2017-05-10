"use strict";
var openflexo_1 = require("./openflexo");
var utils_1 = require("./utils");
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
function createHiddenElement(source) {
    var all = createJsonElement(source);
    all.className += ' hidden';
    return all;
}
function createJsonElement(source) {
    if (source !== null && typeof source === "object") {
        var all = document.createElement("div");
        if (source["length"] != null) {
            for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
                var item = source_1[_i];
                all.appendChild(createJsonElement(item));
            }
        }
        else {
            all.className = 'details';
            for (var _a = 0, _b = Object.keys(source); _a < _b.length; _a++) {
                var key = _b[_a];
                var element = document.createElement("div");
                var keySpan = document.createElement("b");
                keySpan.innerText = key + ": ";
                element.appendChild(keySpan);
                if (key.length >= 3 && key.substr(-3).toLowerCase() === "url") {
                    var valueCode = document.createElement("a");
                    valueCode.href = source[key];
                    valueCode.innerText = source[key];
                    valueCode.addEventListener("click", function (e) {
                        var a = e.srcElement;
                        setUrl(a.href);
                        retreiveUrl(a.href);
                        e.preventDefault();
                    });
                    element.appendChild(valueCode);
                }
                else {
                    element.appendChild(createJsonElement(source[key]));
                }
                all.appendChild(element);
            }
        }
    }
    return all;
}
{
    var valueCode = document.createElement("code");
    valueCode.innerText = source;
    return valueCode;
}
function setUrl(url) {
    if (url.match("^http://localhost:8080")) {
        url = url.substring("http://localhost:8080".length);
    }
    var urlInput = document.getElementById("url");
    urlInput.value = url;
}
function retreiveUrl(url) {
    console.log("Url is " + url);
    var urlInput = document.getElementById("url");
    var result = document.getElementById("result");
    utils_1.clearElement(result);
    result.appendChild(utils_1.spinner());
    openflexo_1.call(url, function (json) {
        utils_1.clearElement(result);
        result.appendChild(createJsonElement(json));
        window.scrollTo(0, 0);
    }, function (event) {
        utils_1.clearElement(result);
        var error = document.createElement("div");
        error.className = "details";
        error.innerText = "Error : " + event.srcElement.statusText;
        result.appendChild(error);
        window.scrollTo(0, 0);
    });
}
function initializeUrl() {
    var urlInput = document.getElementById("url");
    urlInput.addEventListener("input", function (e) { return retreiveUrl(urlInput.value); });
}
openflexo_1.technologyAdapters(function (tas) {
    var div = document.querySelector("#tas");
    div.appendChild(createCount(tas));
    for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
        var ta = tas_1[_i];
        div.appendChild(createDescriptionElement(ta));
        div.appendChild(createHiddenElement(ta));
    }
});
openflexo_1.resourceCenters(function (centers) {
    var div = document.querySelector("#centers");
    div.appendChild(createCount(centers));
    for (var _i = 0, centers_1 = centers; _i < centers_1.length; _i++) {
        var center = centers_1[_i];
        div.appendChild(createDescriptionElement(center));
        div.appendChild(createHiddenElement(center));
    }
});
openflexo_1.resources(function (resources) {
    var div = document.querySelector("#resources");
    div.appendChild(createCount(resources));
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        div.appendChild(createDescriptionElement(resource));
        div.appendChild(createHiddenElement(resource));
    }
});
initializeUrl();
//# sourceMappingURL=index.js.map