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

