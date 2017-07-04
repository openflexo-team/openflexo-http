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
                            setContext(a.href);
                            retreiveContext();
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
    function setContext(url) {
        if (url.match(document.location.origin)) {
            url = url.substring(document.location.origin.length);
        }
        var contextInput = document.getElementById("context");
        contextInput.value = url;
    }
    function retreiveContext() {
        var contextInput = document.getElementById("context");
        var result = document.getElementById("result");
        console.log("Retreiving '" + contextInput.value + "'");
        utils_1.clearElement(result);
        result.appendChild(utils_1.spinner());
        var json = api.call(contextInput.value);
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
    function saveResource(resourceId) {
        console.log("Saving resource '" + resourceId + "'");
        var result = document.getElementById("result");
        utils_1.clearElement(result);
        var resource = api.save(resourceId);
        resource.then(function (json) {
            utils_1.clearElement(result);
            result.appendChild(createJsonElement(json));
            window.scrollTo(0, 0);
        })["catch"](function (event) {
            utils_1.clearElement(result);
            result.appendChild(createJsonElement(event));
            window.scrollTo(0, 0);
        });
    }
    function initializeUrl() {
        var contextInput = document.getElementById("context");
        contextInput.oninput = function (e) { return retreiveContext(); };
        var refreshButton = document.getElementById("refresh");
        refreshButton.onclick = function (e) { return retreiveContext(); };
        var saveButton = document.getElementById("save");
        saveButton.onclick = function (e) { return saveResource(contextInput.value); };
    }
    function evaluateBinding(left, right) {
        var contextInput = document.getElementById("context");
        var detailedCheckbox = document.getElementById("detailed");
        var resultDiv = document.getElementById("result");
        utils_1.clearElement(resultDiv);
        resultDiv.appendChild(utils_1.spinner());
        var context = contextInput.value;
        var rightBinding = Api_1.runtimeBinding(right, context, context);
        var leftBinding = left !== null && left.length > 0 ? Api_1.runtimeBinding(left, context, context) : null;
        var result = leftBinding != null ?
            api.assign(leftBinding, rightBinding, detailedCheckbox.value == "true") :
            api.evaluate(rightBinding, detailedCheckbox.value == "true");
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
            var contextInput = document.getElementById("context");
            var context = contextInput.value;
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
                grid.addCell(new Grid_1.GridCell(card, 6));
            }
            var tab = new Tabs_1.Tab("res", "Resources", grid);
            tabs_1.addTab(tab);
        });
    }
    initializeUrl();
    initializeBinding();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFnQkEsSUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztJQUV0QixvQkFBb0IsT0FBcUI7UUFDckMsSUFBSSxPQUFPLEdBQXFCLE9BQU8sQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFBQyxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQkFBMkIsT0FBb0I7UUFDM0MsSUFBSSxPQUFPLEdBQXFCLE9BQU8sQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFBQyxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxxQkFBcUIsTUFBYztRQUMvQixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxD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