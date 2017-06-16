import { Description } from "./general";

export class ResourceCenter extends Description<ResourceCenter> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public uri: string,
        public resourceUrl: string
    ) {  
        super(name, id, url, type);    
    }
}

export class ContainedByResourceCenter extends Description<ContainedByResourceCenter> {

    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public uri: string,
        public resourceUrl: string,
        public resourceCenterId: string,
        public resourceCenterUrl: string
    ) {  
        super(name, id, url, type);    
    }
    
}

export class Resource extends ContainedByResourceCenter {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public uri: string,
        public resourceCenterId: string,
        public resourceCenterUrl: string,
        public contentUrl: string,
        public modelUrl: string,
        public technologyAdapterId: string,
        public technologyAdapterUrl: string
    ) { 
        super(name, id, url, type, uri, url, resourceCenterId, resourceCenterUrl);
     }
}

export class Folder extends ContainedByResourceCenter {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public resourceCenterId: string,
        public resourceCenterUrl: string
    ) {
        super(name, id, url, type, url, url, resourceCenterId, resourceCenterUrl);
      }
}

export class TechnologyAdapter extends Description<TechnologyAdapter> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string
    ) { 
        super(name, id, url, type);
     }

}