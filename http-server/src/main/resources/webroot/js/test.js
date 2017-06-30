define(["require", "exports", "./openflexo/api/Api", "./utils", "./openflexo/ui/Icon", "./openflexo/ui/Grid", "./openflexo/ui/Card"], function (require, exports, Api_1, utils_1, Icon_1, Grid_1, Card_1) {
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
            var binding = valueInput.value;
            if (context === event.model && context === event.runtime && binding === event.binding) {
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
    var technologyAdapters = api.technologyAdapters();
    technologyAdapters.then(function (tas) {
        var div = document.querySelector("#tas");
        if (div) {
            div.appendChild(createCount(tas));
            var grid = new Grid_1.Grid();
            for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
                var ta = tas_1[_i];
                var card = new Card_1.Card(createDescriptionElement("gps_fixed", ta), createJsonElement(ta));
                grid.addCell(new Grid_1.GridCell(card));
            }
            div.appendChild(grid.container);
        }
    });
    api.resourceCenters().then(function (centers) {
        var div = document.querySelector("#centers");
        if (div) {
            div.appendChild(createCount(centers));
            var grid = new Grid_1.Grid();
            for (var _i = 0, centers_1 = centers; _i < centers_1.length; _i++) {
                var center = centers_1[_i];
                var card = new Card_1.Card(createDescriptionElement("folder", center), createJsonElement(center));
                grid.addCell(new Grid_1.GridCell(card, 12));
            }
            div.appendChild(grid.container);
        }
    });
    api.resources().then(function (resources) {
        var div = document.querySelector("#resources");
        if (div) {
            div.appendChild(createCount(resources));
            var grid = new Grid_1.Grid();
            for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                var resource = resources_1[_i];
                var card = new Card_1.Card(createDescriptionElement("storage", resource), createJsonElement(resource));
                grid.addCell(new Grid_1.GridCell(card, 12));
            }
            div.appendChild(grid.container);
        }
    });
    initializeUrl();
    initializeBinding();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFlQSxJQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO0lBRXRCLG9CQUFvQixPQUFxQjtRQUNyQyxJQUFJLE9BQU8sR0FBcUIsT0FBTyxDQUFDO1FBQ3hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUFDLENBQUM7WUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUEyQixPQUFvQjtRQUMzQyxJQUFJLE9BQU8sR0FBcUIsT0FBTyxDQUFDO1FBQ3hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUFDLENBQUM7WUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELHFCQUFxQixNQUFjO1FBQy9CLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENB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