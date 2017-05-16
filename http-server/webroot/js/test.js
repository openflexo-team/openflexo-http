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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUlxQjtBQUVyQixpQ0FFaUI7QUFHakIsb0JBQW9CLE9BQXFCO0lBQ3JDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQztRQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVELDJCQUEyQixPQUFvQjtJQUMzQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUM7UUFBQyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRCxxQkFBcUIsS0FBaUI7SUFDbEMsSUFBSSxXQUFXLEdBQUcsaUJBQWlCLENBQWMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELElBQUksT0FB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