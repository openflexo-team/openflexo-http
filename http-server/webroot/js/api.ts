
"use strict";

module openflexo {
    
    export class Description {
        name: string;
        id: string;
        url: string;
        type: string;
    }

    export class ResourceCenter extends Description {
        uri: string;
    }

    export class Resource extends Description{
        uri: string;
        resourceCenterId: string;
        resourceCenterUrl: string;
    }

    export class TechnologyAdapter extends Description {
    }

    function error(url: string) {
        console.log("Error can't access " + url + '", check that it exists and is accessible');
    }

    export function resourceCenters(callback: (centers: ResourceCenter[]) => void) {
        call("http://localhost:8080/rc", callback);
    }

    export function resources(callback: (resources: Resource[]) => void) {
        call("http://localhost:8080/resource", callback);
    }

    export function technologyAdapters(callback: (tas: TechnologyAdapter[]) => void) {
        call("http://localhost:8080/ta", callback);
    }

    export function call<T>(url: string, callback: (result: T) => void) {
        let request = new XMLHttpRequest();
        request.open("get", url);
        request.onload = (ev) => {
            if (request.status >= 200 && request.status < 300) {
                callback(<T>JSON.parse(request.responseText));
            }
		}
        request.onerror = (ev) => {
            error(url);
		};
        request.send();
    }
}

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

function updateDetails(event: MouseEvent) {
    let target = <HTMLElement>event.target;
    let dataUrl = getDataUrl(target);
    if (dataUrl) {
        console.log("Get info from " + dataUrl);
        openflexo.call(dataUrl, (result: openflexo.Description) => {
            target.appendChild(createDescriptionElement(result));
        });
    }
    event.preventDefault();
}

function createDescriptionElement(source: openflexo.Description) {
    let description = <HTMLDivElement> document.createElement("div");
    description.setAttribute("data-url", source.url);
    //description.onclick = updateDetails;
    
    let a = <HTMLAnchorElement> document.createElement("a");
    a.href = source.url;
    a.text = source.name;
    description.appendChild(a);

    let type = <HTMLSpanElement> document.createElement("span");
    type.className = 'type';
    type.innerText = ` (${source.type})`;
    description.appendChild(type);

    return description;
}

openflexo.technologyAdapters((tas) => {
    let div = document.querySelector("#tas");
    for (let ta of tas) {
        div.appendChild(createDescriptionElement(ta));
    }
});

openflexo.resourceCenters((centers) => {
    let div = document.querySelector("#centers");
    for (let center of centers) {
        div.appendChild(createDescriptionElement(center));
    }
});

openflexo.resources((resources) => {
    let div = document.querySelector("#resources");
    for (let resource of resources) {
        div.appendChild(createDescriptionElement(resource));
    }
});