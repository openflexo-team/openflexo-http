import { Description } from "./general"

export class FlexoConcept implements Description {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public virtualModel: Description,
        public parents: Description[],
        public properties: FlexoRole[]
    ) {  }
}

export class VirtualModel extends FlexoConcept {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public virtualModel: Description,
        public parents: Description[],
        public properties: FlexoRole[]
    ) {  
        super(name, id, url, type, virtualModel, parents, parents)
    }
}

export class ViewPoint extends VirtualModel {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public virtualModel: Description,
        public parents: Description[],
        public properties: FlexoRole[]
    ) {  
        super(name, id, url, type, virtualModel, parents, parents)
    }
}

export class FlexoRole implements Description {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string
    ) {  }
}


export class FlexoBehavior implements Description {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string
    ) {  }
}
