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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFnQkEsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztJQUV0QixJQUFJLFdBQVcsR0FBK0IsSUFBSSxDQUFDO0lBQ25ELElBQUksWUFBWSxHQUErQixJQUFJLENBQUM7SUFFcEQsb0JBQW9CLE9BQXFCO1FBQ3JDLElBQUksT0FBTyxHQUFxQixPQUFPLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsMkJBQTJCLE9BQW9CO1FBQzNDLElBQUksT0FBTyxHQUFxQixPQUFPLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQs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