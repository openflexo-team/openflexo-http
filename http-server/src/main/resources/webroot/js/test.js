define(["require", "exports", "./openflexo/api/Api", "./utils", "./openflexo/ui/Icon", "./openflexo/ui/Grid", "./openflexo/ui/Card", "./openflexo/ui/Tabs"], function (require, exports, Api_1, utils_1, Icon_1, Grid_1, Card_1, Tabs_1) {
    "use strict";
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
            error.innerText = "Error : " + event.srcElement.statusText;
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
        rightBinding = Api_1.runtimeBinding(right, context, context);
        leftBinding = left !== null && left.length > 0 ? Api_1.runtimeBinding(left, context, context) : null;
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
                grid.addCell(new Grid_1.GridCell(card));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFnQkEsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztJQUV0QixJQUFJLFdBQVcsR0FBMEIsSUFBSSxDQUFDO0lBQzlDLElBQUksWUFBWSxHQUEwQixJQUFJLENBQUM7SUFFL0Msb0JBQW9CLE9BQXFCO1FBQ3JDLElBQUksT0FBTyxHQUFxQixPQUFPLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsMkJBQTJCLE9BQW9CO1FBQzNDLElBQUksT0FBTyxHQUFxQixPQUFPLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQs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