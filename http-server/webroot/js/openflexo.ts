export let host = "";

export interface Description {
    name: string;
    id: string;
    url: string;
    type: string;
}

export class ResourceCenter implements Description {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public uri: string,
        public resourceUrl: string
    ) {  }
}

export interface ContainedByResourceCenter extends Description {
    resourceCenterId: string;
    resourceCenterUrl: string;
}

export class Resource implements ContainedByResourceCenter {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public uri: string,
        public resourceCenterId: string,
        public resourceCenterUrl: string,
        public contentUrl: string,
        public technologyAdapterId: string,
        public technologyAdapterUrl: string
    ) {  }
}

export class Folder implements ContainedByResourceCenter {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public resourceCenterId: string,
        public resourceCenterUrl: string
    ) {  }
}

export class TechnologyAdapter implements Description {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string
    ) {  }

}

function error(url: string) {
    console.log("Error can't access " + url + '", check that it exists and is accessible');
}

export function resourceCenters(callback: (centers: ResourceCenter[]) => void) {
    call(host + "/rc", callback);
}

export function resources(callback: (resources: Resource[]) => void) {
    call(host + "/resource", callback);
}

export function technologyAdapters(callback: (tas: TechnologyAdapter[]) => void) {
    call(host + "/ta", callback);
}

export function call<T>(path: string, callback: (result: T) => void) {
    let request = new XMLHttpRequest();
    request.open("get", host + path);
    request.onload = (ev) => {
        if (request.status >= 200 && request.status < 300) {
            let json = JSON.parse(request.responseText);
            callback(<T>json);
        }
    }
    request.onerror = (ev) => {
        error(path);
    };
    request.send();
}

