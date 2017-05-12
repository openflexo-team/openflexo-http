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
        return all;
    }
    else {
        var valueCode = document.createElement("code");
        valueCode.innerText = source + " ";
        return valueCode;
    }
}
function setUrl(url) {
    if (url.match(document.location.origin)) {
        url = url.substring(document.location.origin.length);
    }
    var urlInput = document.getElementById("url");
    urlInput.value = url;
}
function retreiveUrl(url) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBSXFCO0FBRXJCLGlDQUVpQjtBQUdqQixvQkFBb0IsT0FBcUI7SUFDckMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFDO1FBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQsMkJBQTJCLE9BQW9CO0lBQzNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQztRQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVELHFCQUFxQixLQUFpQjtJQUNsQyxJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBYyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsSUFBSSxP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