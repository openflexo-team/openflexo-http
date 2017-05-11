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
        valueCode.innerText = source;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBSXFCO0FBRXJCLGlDQUVpQjtBQUdqQixvQkFBb0IsT0FBcUI7SUFDckMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFDO1FBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQsMkJBQTJCLE9BQW9CO0lBQzNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQztRQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVELHFCQUFxQixLQUFpQjtJQUNsQyxJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBYyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsSUFBSSxPQUFPLEdBQWdCLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDbEMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQ25DLENBQUM7SUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQUVELHFCQUFxQixNQUFjO0lBQy9CLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxXQUFTLE1BQU0sQ0FBQyxNQUFNLGNBQVcsQ0FBQztJQUNwRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxrQ0FBa0MsTUFBbUI7SUFDakQsSUFBSSxXQUFXLEdBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsV0FBVyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0lBRWxDLElBQUksQ0FBQyxHQUF1QixRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzQixNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCw2QkFBNkIsTUFBVztJQUNwQyxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxHQUFHLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQztJQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELDJCQUEyQixNQUFXO0lBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxDQUFhLFVBQU0sRUFBTixpQkFBTSxFQUFOLG9CQUFNLEVBQU4sSUFBTTtnQkFBbEIsSUFBSSxJQUFJLGVBQUE7Z0JBQ1QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDMUIsR0FBRyxDQUFDLENBQVksVUFBbUIsRUFBbkIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFuQixjQUFtQixFQUFuQixJQUFtQjtnQkFBOUIsSUFBSSxHQUFHLFNBQUE7Z0JBQ1IsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxDQUFDLFNBQVMsR0FBTSxHQUFHLE9BQUksQ0FBQztnQkFDL0IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzVELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM3QixTQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUM7d0JBQzFDLElBQUksQ0FBQyxHQUFzQixDQUFDLENBQUMsVUFBVSxDQUFDO3dCQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNmLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELENBQUM7Z0JBRUQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1QjtRQUVMLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxTQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUM5QixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3BCLENBQUM7QUFFTCxDQUFDO0FBRUQsZ0JBQWdCLEdBQVc7SUFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBSSxRQUFRLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEUsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDekIsQ0FBQztBQUVELHFCQUFxQixHQUFXO0lBQzVCLElBQUksUUFBUSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLElBQUksTUFBTSxHQUFtQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRTlCLGdCQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsSUFBSTtRQUNYLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUMsRUFDRCxVQUFDLEtBQUs7UUFDRixvQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDM0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRDtJQUNJLElBQUksUUFBUSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUVELDhCQUFrQixDQUFDLFVBQUMsR0FBRztJQUNuQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEMsR0FBRyxDQUFDLENBQVcsVUFBRyxFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUc7UUFBYixJQUFJLEVBQUUsWUFBQTtRQUNQLEdBQUcsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDM0M7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILDJCQUFlLENBQUMsVUFBQyxPQUFPO0lBQ3BCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0QyxHQUFHLENBQUMsQ0FBZSxVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBckIsSUFBSSxNQUFNLGdCQUFBO1FBQ1gsR0FBRyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtLQUMvQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgscUJBQVMsQ0FBQyxVQUFDLFNBQVM7SUFDaEIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLEdBQUcsQ0FBQyxDQUFpQixVQUFTLEVBQVQsdUJBQVMsRUFBVCx1QkFBUyxFQUFULElBQVM7UUFBekIsSUFBSSxRQUFRLGtCQUFBO1FBQ2IsR0FBRyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtLQUNqRDtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBR0gsYUFBYSxFQUFFLENBQUMifQ==