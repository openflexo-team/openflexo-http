import { Description } from "./openflexo/api/general";
import { Api, ChangeEvent } from "./openflexo/api/Api";
import {
    ResourceCenter, ContainedByResourceCenter, Resource
} from "./openflexo/api/resource";

import {
    spinner, clearElement
} from "./utils";

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

function showDetails(event: MouseEvent) {
    let description = getDescriptionDiv(<HTMLElement>event.target);
    if (description) {
        let details = <HTMLElement>description.nextSibling;
        if (details.style.display === "block") {
            details.style.display = 'none'
        } else {
            details.style.display = 'block'
        }
    }
    event.preventDefault();
}

function createCount(source : any[]) {
    let count = document.createElement("span")
    count.innerText = `Found ${source.length} elements`;
    return count;
}

function createDescriptionElement(source: Description<any>) {
    let description = <HTMLDivElement> document.createElement("div");
    description.setAttribute("data-url", source.url);
    description.onclick = showDetails;
    
    let a = <HTMLAnchorElement> document.createElement("a");
    a.href = source.url;
    a.text = source["name"];
    description.appendChild(a);

    return description;
}

function createHiddenElement(source: any) {
    var all = createJsonElement(source);
    all.className += ' hidden';
    return all;
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

function evaluateBinding(binding: string) {
    console.log("Evaluating '"+ binding +"'");
    var urlInput = <HTMLInputElement>document.getElementById("url");
    var evaluation = <HTMLDivElement>document.getElementById("evaluation");
    clearElement(evaluation);

    evaluation.appendChild(spinner());

    let result = api.evaluate(binding, urlInput.value, urlInput.value);
    result.then(value => {
        clearElement(evaluation);
        var div = document.createElement("div");
        div.className = "details";  
        div.innerText = JSON.stringify(value);
        evaluation.appendChild(div);   
    }).catch((error) => {
        clearElement(evaluation);     
        var div = document.createElement("div");
        div.className = "details";  
        div.innerText = "Error : " + error;
        evaluation.appendChild(div);
    });
}


function initializeBinding() {
    var bindingInput = <HTMLInputElement>document.getElementById("binding");
    bindingInput.oninput = (e) => evaluateBinding(bindingInput.value);

    var evaluateButton = <HTMLButtonElement>document.getElementById("evaluate");
    evaluateButton.onclick = (e) => evaluateBinding(bindingInput.value);

    api.addChangeListener((event:ChangeEvent) => {
        var urlInput = <HTMLInputElement>document.getElementById("url");
        let context = urlInput.value;
        let binding = bindingInput.value;

        if (context === event.model && context === event.runtime && binding === event.binding) {
            console.log("Update value from event:");
            console.log(event);

            var evaluation = <HTMLDivElement>document.getElementById("evaluation");
            clearElement(evaluation);
            var div = document.createElement("div");
            div.className = "details";  
            div.innerText = JSON.stringify(event.value);
            evaluation.appendChild(div);   
            //evaluateBinding(bindingInput.value);
        }
    });
}

let technologyAdapters = api.technologyAdapters();
technologyAdapters.then(tas => {
    let div = document.querySelector("#tas");
    if (div) {
        div.appendChild(createCount(tas));
        for (let ta of tas) {
            div.appendChild(createDescriptionElement(ta));
            div.appendChild(createHiddenElement(ta))
        }
    }
});

api.resourceCenters().then(centers => {
    let div = document.querySelector("#centers");
    if (div) {
        div.appendChild(createCount(centers));
        for (let center of centers) {
            div.appendChild(createDescriptionElement(center));
            div.appendChild(createHiddenElement(center))
        }
    }
});

api.resources().then(resources => {
    let div = document.querySelector("#resources");
    if (div) {
        div.appendChild(createCount(resources));
        for (let resource of resources) {
            div.appendChild(createDescriptionElement(resource));
            div.appendChild(createHiddenElement(resource))
        }
    }
});

initializeUrl();
initializeBinding();