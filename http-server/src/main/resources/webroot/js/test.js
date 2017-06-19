define(["require", "exports", "./openflexo/api/Api", "./utils"], function (require, exports, Api_1, utils_1) {
    "use strict";
    var api = new Api_1.Api();
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
        if (description) {
            var details = description.nextSibling;
            if (details.style.display === "block") {
                details.style.display = 'none';
            }
            else {
                details.style.display = 'block';
            }
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
        console.log("Retreiving '" + url + "'");
        var urlInput = document.getElementById("url");
        var result = document.getElementById("result");
        utils_1.clearElement(result);
        result.appendChild(utils_1.spinner());
        var json = api.call(url);
        json.then(function (json) {
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
        urlInput.oninput = function (e) { return retreiveUrl(urlInput.value); };
        var refreshButton = document.getElementById("refresh");
        refreshButton.onclick = function (e) { return retreiveUrl(urlInput.value); };
    }
    var technologyAdapters = api.technologyAdapters();
    technologyAdapters.then(function (tas) {
        var div = document.querySelector("#tas");
        if (div) {
            div.appendChild(createCount(tas));
            for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                var ta = tas_1[_i];
                div.appendChild(createDescriptionElement(ta));
                div.appendChild(createHiddenElement(ta));
            }
        }
    });
    api.resourceCenters().then(function (centers) {
        var div = document.querySelector("#centers");
        if (div) {
            div.appendChild(createCount(centers));
            for (var _i = 0, centers_1 = centers; _i < centers_1.length; _i++) {
                var center = centers_1[_i];
                div.appendChild(createDescriptionElement(center));
                div.appendChild(createHiddenElement(center));
            }
        }
    });
    api.resources().then(function (resources) {
        var div = document.querySelector("#resources");
        if (div) {
            div.appendChild(createCount(resources));
            for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                var resource = resources_1[_i];
                div.appendChild(createDescriptionElement(resource));
                div.appendChild(createHiddenElement(resource));
            }
        }
    });
    initializeUrl();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFVQSxJQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO0lBRXRCLG9CQUFvQixPQUFxQjtRQUNyQyxJQUFJLE9BQU8sR0FBcUIsT0FBTyxDQUFDO1FBQ3hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUFDLENBQUM7WUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUEyQixPQUFvQjtRQUMzQyxJQUFJLE9BQU8sR0FBcUIsT0FBTyxDQUFDO1FBQ3hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUFDLENBQUM7WUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELHFCQUFxQixLQUFpQjtRQUNsQyxJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBYyxLQUFLLENBQUMsTUFBTSxDQUFD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