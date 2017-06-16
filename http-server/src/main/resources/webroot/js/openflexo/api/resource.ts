import { Description } from "./general";

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
        public modelUrl: string,
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