import { Description } from "./general"
import { FlexoConcept, VirtualModel, ViewPoint } from "./fml"

export class FlexoConceptInstance extends Description<FlexoConceptInstance> {
    constructor(
        public id: string,
        public url: string,
        public type: string,
        public flexoConcept: Description<FlexoConcept>,
        public virtualModelInstance: Description<VirtualModelInstance>,
        public view: Description<View>,
        public container: Description<FlexoConceptInstance>|null,
        public embeddedFlexoConceptInstance: Description<FlexoConceptInstance>[],
        public actors: FlexoActor[],
    ) {  
        super(id, url, type);    
    }
}

export class VirtualModelInstance extends Description<VirtualModelInstance> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public virtualModel: Description<VirtualModel>,
        public view: Description<View>,
        public actors: FlexoActor[],
        public flexoConceptInstances: Description<FlexoConceptInstance>[],
        public resourceUrl: string
    ) {  
        super(id, url, type)
    }
}

export class View extends Description<View> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public viewPoint: Description<ViewPoint>,
        public container: Description<FlexoConceptInstance>|null,
        public actors: FlexoActor[],
        public flexoConceptInstances: Description<FlexoConceptInstance>[],
        public resourceUrl: string
    ) {  
        super(id, url, type)
    }
}

export class FlexoActor extends Description<FlexoActor> {
    constructor(
        public name: string,
        public id: string,
        public url: string,
        public type: string,
        public value: string
    ) { 
        super(id, url, type);   
     }
}
