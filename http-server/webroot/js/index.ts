import {
    ResourceCenter, ContainedByResourceCenter, Resource,
    call, resourceCenters, Description, technologyAdapters,
    resources
} from "./openflexo";

import {
    spinner, clearElement
} from "./utils";


function getDataUrl(element : HTMLElement) {
    let current = element;
    let dataUrl = current.getAttribute("data-url");
    while (dataUrl === null) {
        current = current.parentElement;
        if (!current) { break; }
        dataUrl = current.getAttribute("data-url");
    }
    return dataUrl;
}

function getDescriptionDiv(element: HTMLElement) {
    let current = element;
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
    let details = <HTMLElement>description.nextSibling;
    if (details.style.display === "block") {
        details.style.display = 'none'
    } else {
        details.style.display = 'block'
    }
    event.preventDefault();
}

function createCount(source : any[]) {
    let count = document.createElement("span")
    count.innerText = `Found ${source.length} elements`;
    return count;
}

function createDescriptionElement(source: Description) {
    let description = <HTMLDivElement> document.createElement("div");
    description.setAttribute("data-url", source.url);
    description.onclick = showDetails;
    
    let a = <HTMLAnchorElement> document.createElement("a");
    a.href = source.url;
    a.text = source.name;
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
        valueCode.innerText = source;
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
    var urlInput = <HTMLInputElement>document.getElementById("url");
    var result = <HTMLDivElement>document.getElementById("result");
    clearElement(result);
    result.appendChild(spinner());

    call(url, (json) => {
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
    urlInput.addEventListener("input", (e) => retreiveUrl(urlInput.value));
}

technologyAdapters((tas) => {
    let div = document.querySelector("#tas");
    div.appendChild(createCount(tas));
    for (let ta of tas) {
        div.appendChild(createDescriptionElement(ta));
        div.appendChild(createHiddenElement(ta))
    }
});

resourceCenters((centers) => {
    let div = document.querySelector("#centers");
    div.appendChild(createCount(centers));
    for (let center of centers) {
        div.appendChild(createDescriptionElement(center));
        div.appendChild(createHiddenElement(center))
    }
});

resources((resources) => {
    let div = document.querySelector("#resources");
    div.appendChild(createCount(resources));
    for (let resource of resources) {
        div.appendChild(createDescriptionElement(resource));
        div.appendChild(createHiddenElement(resource))
    }
});


initializeUrl();