define(["require", "exports", "./openflexo/api/Api", "./utils", "./openflexo/ui/Icon", "./openflexo/ui/Grid", "./openflexo/ui/Card", "./openflexo/ui/Tabs"], function (require, exports, Api_1, utils_1, Icon_1, Grid_1, Card_1, Tabs_1) {
    "use strict";
    var api = new Api_1.Api();
    var leftBinding = null;
    var rightBinding = null;
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
        leftBinding = null;
        if (rightBinding !== null) {
            api.removeChangeListeners(rightBinding);
            rightBinding = null;
        }
        var context = contextInput.value;
        rightBinding = Api_1.runtimeBinding(right, context, context);
        leftBinding = left !== null && left.length > 0 ? Api_1.runtimeBinding(left, context, context) : null;
        var result = leftBinding != null ?
            api.assign(leftBinding, rightBinding, detailedCheckbox.value == "true") :
            api.evaluate(rightBinding, detailedCheckbox.value == "true");
        api.addChangeListener(rightBinding, function (event) {
            var contextInput = document.getElementById("context");
            var context = contextInput.value;
            var rightInput = document.getElementById("right");
            var rightValue = rightInput.value;
            console.log("Update value from event:");
            console.log(event);
            var result = document.getElementById("result");
            utils_1.clearElement(result);
            var div = document.createElement("div");
            div.className = "details";
            div.innerText = JSON.stringify(event.value);
            result.appendChild(div);
        });
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
        var leftInput = document.getElementById("left");
        leftInput.oninput = function (e) { return evaluateBinding(leftInput.value, rightInput.value); };
        var rightInput = document.getElementById("right");
        rightInput.oninput = function (e) { return evaluateBinding(leftInput.value, rightInput.value); };
        var evaluateButton = document.getElementById("evaluate");
        evaluateButton.onclick = function (e) { return evaluateBinding(leftInput.value, rightInput.value); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFnQkEsSUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztJQUV0QixJQUFJLFdBQVcsR0FBMEIsSUFBSSxDQUFDO0lBQzlDLElBQUksWUFBWSxHQUEwQixJQUFJLENBQUM7SUFFL0Msb0JBQW9CLE9BQXFCO1FBQ3JDLElBQUksT0FBTyxHQUFxQixPQUFPLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsMkJBQTJCLE9BQW9CO1FBQzNDLElBQUksT0FBTyxHQUFxQixPQUFPLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQs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