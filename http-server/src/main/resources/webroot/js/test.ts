import { Description } from "./openflexo/api/general";
import { Api, ChangeEvent } from "./openflexo/api/Api";
import {
    ResourceCenter, ContainedByResourceCenter, Resource
} from "./openflexo/api/resource";

import {
    spinner, clearElement
} from "./utils";

import { Icon } from "./openflexo/ui/Icon";
import { Grid, GridCell } from "./openflexo/ui/Grid";
import { List, ListItem } from "./openflexo/ui/List";
import { Card } from "./openflexo/ui/Card";
import { Tabs, Tab } from "./openflexo/ui/Tabs";

const api = new Api();

function getDataUrl(element : HTMLElement) {
    let current: HTMLElement|null = element;
    let dataUrl = current.getAttribute("data-url");
    while (dataUrl === null) {
        current = current.parentElement;
        if (!current) { break; }
        dataUrl = current.getAttribute("data-url");
    }
    return dataUrl;
}

function getDescriptionDiv(element: HTMLElement) {
    let current: HTMLElement|null = element;
    let dataUrl = current.getAttribute("data-url");
    while (dataUrl === null) {
        current = current.parentElement;
        if (!current) { break; }
        dataUrl = current.getAttribute("data-url");
    }
    return current;   
}

function createCount(source : any[]) {
    let count = document.createElement("span")
    count.innerText = `Found ${source.length} elements`;
    return count;
}

function createDescriptionElement(iconName: string, source: Description<any>) {
    let description = <HTMLDivElement> document.createElement("div");
    description.setAttribute("data-url", source.url);
    
    let icon = new Icon(iconName);
    description.appendChild(icon.container);

    let a = <HTMLAnchorElement> document.createElement("a");
    a.href = source.url;
    a.text = source["name"];
    description.appendChild(a);

    return description;
}

function createJsonElement(source: any): HTMLElement {
    if (source !== null && typeof source === "object") {
        var all = document.createElement("div");
        if (source["length"] != null) {
            for (let item of source) {
                all.appendChild(createJsonElement(item));    
            }
        } else {
            all.className = 'details';
            for (let key of Object.keys(source)) {
                let element = document.createElement("div");
                
                let keySpan = document.createElement("b");
                keySpan.innerText = `${key}: `;
                element.appendChild(keySpan);

                if (key.length >= 3 && key.substr(-3).toLowerCase() === "url") {
                    let valueCode = document.createElement("a");
                    valueCode.href = source[key];
                    valueCode.innerText = source[key];
                    valueCode.addEventListener("click", function(e) {
                        var a = <HTMLAnchorElement>e.srcElement;
                        setUrl(a.href);
                        retreiveUrl(a.href);
                        e.preventDefault();
                    });
                    element.appendChild(valueCode);
                } else {
                    element.appendChild(createJsonElement(source[key]));
                }

                all.appendChild(element);
            }
            
        }
        return all;
    } else {
        let valueCode = document.createElement("code");
        valueCode.innerText = source + " ";
       return valueCode;
    }
    
}

function setUrl(url: string) { 
    if (url.match(document.location.origin)) {
        url = url.substring(document.location.origin.length);
    }

    var urlInput = <HTMLInputElement>document.getElementById("url");
    urlInput.value = url;
}

function retreiveUrl(url: string) {
    console.log("Retreiving '"+ url +"'");
    var urlInput = <HTMLInputElement>document.getElementById("url");
    var result = <HTMLDivElement>document.getElementById("result");
    clearElement(result);
    result.appendChild(spinner());

    let json = api.call(url);
    json.then(json => {
        clearElement(result);       
        result.appendChild(createJsonElement(json));
        window.scrollTo(0, 0);
    },
    (event) => {
        clearElement(result);     
        var error = document.createElement("div");
        error.className = "details";  
        error.innerText = "Error : " + event.srcElement.statusText;
        result.appendChild(error);
        window.scrollTo(0, 0);
    });
}

function initializeUrl() {
    var urlInput = <HTMLInputElement>document.getElementById("url");
    urlInput.oninput = (e) => retreiveUrl(urlInput.value);

    var refreshButton = <HTMLButtonElement>document.getElementById("refresh");
    refreshButton.onclick = (e) => retreiveUrl(urlInput.value);
}

function evaluateBinding(binding: string, value: string) {
    console.log("Evaluating '"+ binding +"'");
    var urlInput = <HTMLInputElement>document.getElementById("url");
    var detailedCheckbox = <HTMLInputElement>document.getElementById("detailed");
    var resultDiv = <HTMLDivElement>document.getElementById("result");
    
    clearElement(resultDiv);

    resultDiv.appendChild(spinner());

    let result = 
        binding != null && binding.length > 0 ?
        api.assign(binding, value,  urlInput.value, urlInput.value, detailedCheckbox.value == "true") :
        api.evaluate(value, urlInput.value, urlInput.value, detailedCheckbox.value == "true");
        
    result.then(value => {
        clearElement(resultDiv);
        resultDiv.appendChild(createJsonElement(value));

    }).catch((error) => {
        clearElement(resultDiv);     
        var div = document.createElement("div");
        div.className = "details";  
        div.innerText = "Error : " + error;
        resultDiv.appendChild(div);
    });
}


function initializeBinding() {
    var bindingInput = <HTMLInputElement>document.getElementById("left");
    bindingInput.oninput = (e) => evaluateBinding(bindingInput.value, valueInput.value);

    var valueInput = <HTMLInputElement>document.getElementById("right");
    valueInput.oninput = (e) => evaluateBinding(bindingInput.value, valueInput.value);

    var evaluateButton = <HTMLButtonElement>document.getElementById("evaluate");
    evaluateButton.onclick = (e) => evaluateBinding(bindingInput.value, valueInput.value);

    api.addChangeListener((event:ChangeEvent) => {
        var urlInput = <HTMLInputElement>document.getElementById("url");
        let context = urlInput.value;
        let value = valueInput.value;

        if (context === event.model && context === event.runtime && value === event.binding) {
            console.log("Update value from event:");
            console.log(event);

            var result = <HTMLDivElement>document.getElementById("result");
            clearElement(result);
            var div = document.createElement("div");
            div.className = "details";  
            div.innerText = JSON.stringify(event.value);
            result.appendChild(div);   
        }
    });
}

let dataDiv = document.querySelector("#data");
if (dataDiv != null) {
    let tabs = new Tabs();
    dataDiv.appendChild(tabs.container);

    api.technologyAdapters().then(tas => {
        let grid = new Grid();
        for (let ta of tas) {
            let card = new Card(
                createDescriptionElement("gps_fixed",ta),
                createJsonElement(ta)
            );
            grid.addCell(new GridCell(card));
        }

        let tab = new Tab("tas", "Technology Adapters", grid);
        tabs.addTab(tab);
        tabs.selectTab(tab);
        
    });

    api.resourceCenters().then(centers => {
        let grid = new Grid();
        for (let center of centers) {
            let card = new Card(
                createDescriptionElement("folder",center),
                createJsonElement(center)
            );
            grid.addCell(new GridCell(card, 12));
        }

        let tab = new Tab("rc", "Resource Centers", grid);
        tabs.addTab(tab);
    });

    api.resources().then(resources => {
        let grid = new Grid();
        for (let resource of resources) {
            let card = new Card(
                createDescriptionElement("storage",resource),
                createJsonElement(resource)
            );
            grid.addCell(new GridCell(card, 12));
        }
         
        let tab = new Tab("res", "Resources", grid);
        tabs.addTab(tab);
    });

}

initializeUrl();
initializeBinding();