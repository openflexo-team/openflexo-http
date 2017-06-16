import { Description } from "./general"

export class FlexoConcept extends Description<FlexoConcept> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public virtualModel: Description<VirtualModel>,
        public container: Description<FlexoConcept>|null,
        public childFlexoConcepts: Description<FlexoConcept>[],
        public parents: Description<FlexoConcept>[],
        public properties: FlexoRole[],
        public behaviors: FlexoBehavior[]
    ) {  
        super(name, id, url, type);    
    }
}

export class VirtualModel extends Description<VirtualModel> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public container: Description<FlexoConcept>|null,
        public properties: FlexoRole[],
        public behaviors: FlexoBehavior[],
        public flexoConcepts: Description<FlexoConcept>[],
        public resourceUrl: string
    ) {  
        super(name, id, url, type)
    }
}

export class ViewPoint extends Description<ViewPoint> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public properties: FlexoRole[],
        public behaviors: FlexoBehavior[],
        public virtualModels: Description<VirtualModel>[],
        public resourceUrl: string
    ) {  
        super(name, id, url, type)
    }
}

export class FlexoRole extends Description<FlexoRole> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string
    ) { 
        super(name, id, url, type);   
     }
}

export class FlexoBehavior extends Description<FlexoBehavior> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string
    ) { 
        super(name, id, url, type);   
     }
}
