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

export class Api {

    constructor(
        private host: string = ""
    ) {
        
    }

    error(url: string): void {
        console.log("Error can't access " + url + '", check that it exists and is accessible');
    }

    public call<T>(path: string): Promise<T> {
        const result = new Promise((fullfilled, rejected) => {
            let request = new XMLHttpRequest();
            request.open("get", this.host + path);
            request.onload = (ev) => {
                if (request.status >= 200 && request.status < 300) {
                    var first = request.responseText.charAt(0);
                    if (first === '{' || first === '[' ) {
                        let json = JSON.parse(request.responseText);
                        fullfilled(<T>json);
                        return;
                    }
                    rejected(request.statusText); 
                } 
                
            }
            request.onerror = rejected;
            request.send();
        });
        return result;
    }

    public resourceCenters(): Promise<ResourceCenter[]> {
        return this.call(this.host + "/rc");
    }

    public resources(): Promise<Resource[]> {
        return this.call(this.host + "/resource");
    }

    public technologyAdapters(): Promise<TechnologyAdapter[]> {
        return this.call(this.host + "/ta");
    }
}