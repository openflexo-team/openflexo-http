define(["require", "exports", "./openflexo/api/Api", "./utils", "./openflexo/ui/Icon", "./openflexo/ui/Grid", "./openflexo/ui/Card", "./openflexo/ui/Tabs"], function (require, exports, Api_1, utils_1, Icon_1, Grid_1, Card_1, Tabs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const api = new Api_1.Api();
    var leftBinding = null;
    var rightBinding = null;
    function getDataUrl(element) {
        let current = element;
        let dataUrl = current.getAttribute("data-url");
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
        let current = element;
        let dataUrl = current.getAttribute("data-url");
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
        let count = document.createElement("span");
        count.innerText = `Found ${source.length} elements`;
        return count;
    }
    function createDescriptionElement(iconName, source) {
        let description = document.createElement("div");
        description.setAttribute("data-url", source.url);
        let icon = new Icon_1.Icon(iconName);
        description.appendChild(icon.container);
        let a = document.createElement("a");
        a.href = source.url;
        a.text = source["name"];
        description.appendChild(a);
        return description;
    }
    function createJsonElement(source) {
        if (source !== null && typeof source === "object") {
            var all = document.createElement("div");
            if (source["length"] != null) {
                for (let item of source) {
                    all.appendChild(createJsonElement(item));
                }
            }
            else {
                all.className = 'details';
                Object.keys(source).forEach(key => {
                    let element = document.createElement("div");
                    let keySpan = document.createElement("b");
                    keySpan.innerText = `${key}: `;
                    element.appendChild(keySpan);
                    if (key.length >= 3 && key.substr(-3).toLowerCase() === "url") {
                        let valueCode = document.createElement("a");
                        valueCode.href = source[key];
                        valueCode.innerText = source[key];
                        valueCode.onclick = function (e) {
                            var a = e.currentTarget;
                            setContext(a.href);
                            retreiveContext();
                            e.preventDefault();
                            return false;
                        };
                        element.appendChild(valueCode);
                    }
                    else {
                        element.appendChild(createJsonElement(source[key]));
                    }
                    all.appendChild(element);
                });
            }
            return all;
        }
        else {
            let valueCode = document.createElement("code");
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
        let json = api.call(contextInput.value);
        json.then(json => {
            utils_1.clearElement(result);
            result.appendChild(createJsonElement(json));
            window.scrollTo(0, 0);
        }, (event) => {
            utils_1.clearElement(result);
            var error = document.createElement("div");
            error.className = "details";
            error.innerText = "Error : " + event.currentTarget.statusText;
            result.appendChild(error);
            window.scrollTo(0, 0);
        });
    }
    function saveResource(resourceId) {
        console.log("Saving resource '" + resourceId + "'");
        var result = document.getElementById("result");
        utils_1.clearElement(result);
        let resource = api.save(resourceId);
        resource.then(json => {
            utils_1.clearElement(result);
            result.appendChild(createJsonElement(json));
            window.scrollTo(0, 0);
        }).catch(event => {
            utils_1.clearElement(result);
            result.appendChild(createJsonElement(event));
            window.scrollTo(0, 0);
        });
    }
    function initializeUrl() {
        var contextInput = document.getElementById("context");
        contextInput.oninput = (e) => retreiveContext();
        var refreshButton = document.getElementById("refresh");
        refreshButton.onclick = (e) => retreiveContext();
        var saveButton = document.getElementById("save");
        saveButton.onclick = (e) => saveResource(contextInput.value);
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
        let context = contextInput.value;
        rightBinding = Api_1.createRuntimeBinding(right, context, context);
        leftBinding = left !== null && left.length > 0 ? Api_1.createRuntimeBinding(left, context, context) : null;
        let result = leftBinding != null ?
            api.assign(leftBinding, rightBinding, detailedCheckbox.value == "true") :
            api.evaluate(rightBinding, detailedCheckbox.value == "true");
        api.addChangeListener(rightBinding, (event) => {
            var contextInput = document.getElementById("context");
            let context = contextInput.value;
            var rightInput = document.getElementById("right");
            let rightValue = rightInput.value;
            console.log("Update value from event:");
            console.log(event);
            var result = document.getElementById("result");
            utils_1.clearElement(result);
            var div = document.createElement("div");
            div.className = "details";
            div.innerText = JSON.stringify(event.value);
            result.appendChild(div);
        });
        result.then(value => {
            utils_1.clearElement(resultDiv);
            resultDiv.appendChild(createJsonElement(value));
        }).catch((error) => {
            utils_1.clearElement(resultDiv);
            var div = document.createElement("div");
            div.className = "details";
            div.innerText = "Error : " + error;
            resultDiv.appendChild(div);
        });
    }
    function initializeBinding() {
        var leftInput = document.getElementById("left");
        leftInput.oninput = (e) => evaluateBinding(leftInput.value, rightInput.value);
        var rightInput = document.getElementById("right");
        rightInput.oninput = (e) => evaluateBinding(leftInput.value, rightInput.value);
        var evaluateButton = document.getElementById("evaluate");
        evaluateButton.onclick = (e) => evaluateBinding(leftInput.value, rightInput.value);
    }
    let dataDiv = document.querySelector("#data");
    if (dataDiv != null) {
        let tabs = new Tabs_1.Tabs();
        dataDiv.appendChild(tabs.container);
        api.technologyAdapters().then(tas => {
            const grid = new Grid_1.Grid();
            tas.forEach(ta => {
                let card = new Card_1.Card(createDescriptionElement("gps_fixed", ta), createJsonElement(ta));
                grid.addCell(new Grid_1.GridCell(card, 4));
            });
            let tab = new Tabs_1.Tab("tas", "Technology Adapters", grid);
            tabs.addTab(tab);
            tabs.selectTab(tab);
        });
        api.resourceCenters().then(centers => {
            const grid = new Grid_1.Grid();
            centers.forEach(center => {
                let card = new Card_1.Card(createDescriptionElement("folder", center), createJsonElement(center));
                grid.addCell(new Grid_1.GridCell(card, 12));
            });
            let tab = new Tabs_1.Tab("rc", "Resource Centers", grid);
            tabs.addTab(tab);
        });
        api.resources().then(resources => {
            let grid = new Grid_1.Grid();
            resources.forEach(resource => {
                let card = new Card_1.Card(createDescriptionElement("storage", resource), createJsonElement(resource));
                grid.addCell(new Grid_1.GridCell(card, 6));
            });
            let tab = new Tabs_1.Tab("res", "Resources", grid);
            tabs.addTab(tab);
        });
    }
    initializeUrl();
    initializeBinding();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0JBLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7SUFFdEIsSUFBSSxXQUFXLEdBQStCLElBQUksQ0FBQztJQUNuRCxJQUFJLFlBQVksR0FBK0IsSUFBSSxDQUFDO0lBRXBELG9CQUFvQixPQUFxQjtRQUNyQyxJQUFJLE9BQU8sR0FBcUIsT0FBTyxDQUFDO1FBQ3hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUFDLENBQUM7WUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELDJCQUEyQixPQUFvQjtRQUMzQyxJQUFJLE9BQU8sR0FBcUIsT0FBTyxDQUFDO1FBQ3hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUFDLENBQUM7WUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVE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