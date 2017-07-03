define(["require", "exports", "./openflexo/api/Api", "./utils", "./openflexo/ui/Icon", "./openflexo/ui/Grid", "./openflexo/ui/Card", "./openflexo/ui/Tabs"], function (require, exports, Api_1, utils_1, Icon_1, Grid_1, Card_1, Tabs_1) {
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
    function createCount(source) {
        var count = document.createElement("span");
        count.innerText = "Found " + source.length + " elements";
        return count;
    }
    function createDescriptionElement(iconName, source) {
        var description = document.createElement("div");
        description.setAttribute("data-url", source.url);
        var icon = new Icon_1.Icon(iconName);
        description.appendChild(icon.container);
        var a = document.createElement("a");
        a.href = source.url;
        a.text = source["name"];
        description.appendChild(a);
        return description;
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
    function evaluateBinding(binding, value) {
        console.log("Evaluating '" + binding + "'");
        var urlInput = document.getElementById("url");
        var detailedCheckbox = document.getElementById("detailed");
        var resultDiv = document.getElementById("result");
        utils_1.clearElement(resultDiv);
        resultDiv.appendChild(utils_1.spinner());
        var result = binding != null && binding.length > 0 ?
            api.assign(binding, value, urlInput.value, urlInput.value, detailedCheckbox.value == "true") :
            api.evaluate(value, urlInput.value, urlInput.value, detailedCheckbox.value == "true");
        result.then(function (value) {
            utils_1.clearElement(resultDiv);
            resultDiv.appendChild(createJsonElement(value));
        })["catch"](function (error) {
            utils_1.clearElement(resultDiv);
            var div = document.createElement("div");
            div.className = "details";
            div.innerText = "Error : " + error;
            resultDiv.appendChild(div);
        });
    }
    function initializeBinding() {
        var bindingInput = document.getElementById("left");
        bindingInput.oninput = function (e) { return evaluateBinding(bindingInput.value, valueInput.value); };
        var valueInput = document.getElementById("right");
        valueInput.oninput = function (e) { return evaluateBinding(bindingInput.value, valueInput.value); };
        var evaluateButton = document.getElementById("evaluate");
        evaluateButton.onclick = function (e) { return evaluateBinding(bindingInput.value, valueInput.value); };
        api.addChangeListener(function (event) {
            var urlInput = document.getElementById("url");
            var context = urlInput.value;
            var value = valueInput.value;
            if (context === event.model && context === event.runtime && value === event.binding) {
                console.log("Update value from event:");
                console.log(event);
                var result = document.getElementById("result");
                utils_1.clearElement(result);
                var div = document.createElement("div");
                div.className = "details";
                div.innerText = JSON.stringify(event.value);
                result.appendChild(div);
            }
        });
    }
    var dataDiv = document.querySelector("#data");
    if (dataDiv != null) {
        var tabs_1 = new Tabs_1.Tabs();
        dataDiv.appendChild(tabs_1.container);
        api.technologyAdapters().then(function (tas) {
            var grid = new Grid_1.Grid();
            for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                var ta = tas_1[_i];
                var card = new Card_1.Card(createDescriptionElement("gps_fixed", ta), createJsonElement(ta));
                grid.addCell(new Grid_1.GridCell(card));
            }
            var tab = new Tabs_1.Tab("tas", "Technology Adapters", grid);
            tabs_1.addTab(tab);
            tabs_1.selectTab(tab);
        });
        api.resourceCenters().then(function (centers) {
            var grid = new Grid_1.Grid();
            for (var _i = 0, centers_1 = centers; _i < centers_1.length; _i++) {
                var center = centers_1[_i];
                var card = new Card_1.Card(createDescriptionElement("folder", center), createJsonElement(center));
                grid.addCell(new Grid_1.GridCell(card, 12));
            }
            var tab = new Tabs_1.Tab("rc", "Resource Centers", grid);
            tabs_1.addTab(tab);
        });
        api.resources().then(function (resources) {
            var grid = new Grid_1.Grid();
            for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                var resource = resources_1[_i];
                var card = new Card_1.Card(createDescriptionElement("storage", resource), createJsonElement(resource));
                grid.addCell(new Grid_1.GridCell(card, 12));
            }
            var tab = new Tabs_1.Tab("res", "Resources", grid);
            tabs_1.addTab(tab);
        });
    }
    initializeUrl();
    initializeBinding();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFnQkEsSUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztJQUV0QixvQkFBb0IsT0FBcUI7UUFDckMsSUFBSSxPQUFPLEdBQXFCLE9BQU8sQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFBQyxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQkFBMkIsT0FBb0I7UUFDM0MsSUFBSSxPQUFPLEdBQXFCLE9BQU8sQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFBQyxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxxQkFBcUIsTUFBYztRQUMvQixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxD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