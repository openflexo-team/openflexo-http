
"use strict";

module openflexo {
    
    export class Center {
        name: string;
        id: string;
        uri: string;
        url: string;
    }

    export class ResourceCenter {
        name: string;
        id: string;
        uri: string;
        url: string;
        resourceCenterId: string;
        resourceCenterUrl: string;
    }

    function error(url: string) {
        console.log("Error can't access " + url + '", check that it exists and is accessible');
    }

    export function centers(callback: (centers: Center[]) => void) {
        call("http://localhost:8080/center", callback);
    }

    export function resources(callback: (resources: ResourceCenter[]) => void) {
        call("http://localhost:8080/resource", callback);
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

openflexo.centers((centers) => {
    let div = document.querySelector("#centers");
    for (let center of centers) {
        let child = <HTMLDivElement> document.createElement("div");
        let a = <HTMLAnchorElement> document.createElement("a");
        a.href = center.url;
        a.text = center.name;
        child.appendChild(a);
        div.appendChild(child);
        console.log("center")
    }
});

openflexo.resources((resources) => {
    let div = document.querySelector("#resources");
    for (let resource of resources) {
        let child = <HTMLDivElement> document.createElement("div");
        let a = <HTMLAnchorElement> document.createElement("a");
        a.href = resource.url;
        a.text = resource.name;
        child.appendChild(a);
        div.appendChild(child);
        console.log("resource")
    }
});