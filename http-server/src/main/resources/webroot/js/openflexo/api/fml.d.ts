import { Description } from "./general";
import { Resource as FlexoResource } from "./resource";

export interface ConditionalAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly kind: "ConditionalAction";
	readonly condition: string;
	readonly elseControlGraph: FMLControlGraph;
	readonly thenControlGraph: FMLControlGraph;
}

export interface MatchCondition extends FlexoConceptObject {
	readonly kind: "MatchCondition";
	readonly condition: string;
	readonly action: InitiateMatching;
}

export interface ResourceData extends Description<ResourceData> {
	readonly kind: "VirtualModel"|"VirtualModelInstance"|"FMLRTVirtualModelInstance";
	readonly flexoResource: FlexoResource;
}

export interface DeleteFlexoConceptInstance extends DeleteAction {
	readonly kind: "DeleteFlexoConceptInstance";
	readonly deletionSchemeURI: string;
	readonly parameters: Array<DeleteFlexoConceptInstanceParameter>;
}

export interface CreationScheme extends AbstractCreationScheme {
	readonly kind: "CreationScheme";
}

export interface AbstractAddFlexoConceptInstance extends FMLRTAction {
	readonly kind: "AddVirtualModelInstance"|"FireEventAction"|"AddFlexoConceptInstance";
	readonly container: string;
	readonly creationSchemeURI: string;
	readonly parameters: Array<AddFlexoConceptInstanceParameter>;
}

export interface AbstractProperty extends FlexoProperty {
	readonly kind: "AbstractProperty";
	readonly readOnly: boolean;
	readonly type: string;
}

export interface AddToListAction extends AssignableAction, FMLControlGraphOwner {
	readonly kind: "AddToListAction";
	readonly list: string;
	readonly value: string;
	readonly assignableAction: AssignableAction;
}

export interface FreeModelSlot extends ModelSlot {
}

export interface GetSetProperty extends GetProperty {
	readonly kind: "GetSetProperty";
	readonly setControlGraph: FMLControlGraph;
	readonly valueVariableName: string;
}

export interface FetchRequest extends TechnologySpecificAction {
	readonly kind: "SelectFlexoConceptInstance";
	readonly conditions: Array<Condition>;
}

export interface AssignableAction extends EditionAction {
	readonly kind: "DeleteFlexoConceptInstance"|"AbstractAddFlexoConceptInstance"|"AddToListAction"|"FetchRequest"|"AssignationAction"|"SelectFlexoConceptInstance"|"ExpressionAction"|"AbstractAssignationAction"|"ReturnStatement"|"AddVirtualModelInstance"|"TechnologySpecificAction"|"FireEventAction"|"AddClassInstance"|"FMLRTAction"|"InitiateMatching"|"AddFlexoConceptInstance"|"MatchFlexoConceptInstance"|"RemoveFromListAction"|"DeclarationAction"|"DeleteAction";
	readonly variableName: string;
	readonly assignation: string;
}

export interface AddFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "AddFlexoConceptInstanceParameter";
	readonly action: AbstractAddFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface DeleteFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "DeleteFlexoConceptInstanceParameter";
	readonly action: DeleteFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface AssignationAction extends AbstractAssignationAction {
	readonly kind: "AssignationAction";
	readonly assign: string;
	readonly value: string;
}

export interface SelectFlexoConceptInstance extends FetchRequest {
	readonly kind: "SelectFlexoConceptInstance";
	readonly container: string;
	readonly flexoConceptTypeURI: string;
}

export interface ModelObjectActorReference extends ActorReference {
	readonly kind: "ModelObjectActorReference";
	readonly objectReference: string;
}

export interface PrimitiveActorReference extends ActorReference {
	readonly kind: "PrimitiveActorReference";
	readonly valueAsString: string;
}

export interface TypeAwareModelSlot extends ModelSlot {
	readonly metaModelURI: string;
}

export interface ExecuteBehaviourParameter extends FlexoBehaviourObject {
	readonly kind: "ExecuteBehaviourParameter";
	readonly action: FinalizeMatching;
	readonly paramName: string;
	readonly value: string;
}

export interface AbstractIterationAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly kind: "IncrementalIterationAction"|"IterationAction";
	readonly controlGraph: FMLControlGraph;
	readonly iteratorName: string;
}

export interface IncrementalIterationAction extends AbstractIterationAction {
	readonly kind: "IncrementalIterationAction";
	readonly exclusiveEndValue: string;
	readonly increment: string;
	readonly startValue: string;
}

export interface EmptyControlGraph extends FMLControlGraph {
	readonly kind: "EmptyControlGraph";
}

export interface EditionAction extends FMLControlGraph {
	readonly kind: "ConditionalAction"|"DeleteFlexoConceptInstance"|"AbstractAddFlexoConceptInstance"|"AddToListAction"|"FetchRequest"|"AssignableAction"|"AssignationAction"|"SelectFlexoConceptInstance"|"AbstractIterationAction"|"IncrementalIterationAction"|"ExpressionAction"|"NotifyPropertyChangedAction"|"AbstractAssignationAction"|"ReturnStatement"|"LogAction"|"AddVirtualModelInstance"|"IterationAction"|"FinalizeMatching"|"TechnologySpecificAction"|"WhileAction"|"FireEventAction"|"AddClassInstance"|"FMLRTAction"|"InitiateMatching"|"AddFlexoConceptInstance"|"MatchFlexoConceptInstance"|"RemoveFromListAction"|"ControlStructureAction"|"DeclarationAction"|"DeleteAction";
}

export interface Inspector extends FlexoConceptObject {
	readonly kind: "Inspector";
	readonly entries: Array<InspectorEntry>;
	readonly renderer: string;
	readonly flexo_concept: FlexoConcept;
	readonly inspectorTitle: string;
}

export interface TypeAwareModelSlotInstance extends ModelSlotInstance {
	readonly kind: "TypeAwareModelSlotInstance";
	readonly modelURI: string;
}

export interface CloningScheme extends AbstractCreationScheme {
	readonly kind: "CloningScheme";
}

export interface FMLControlGraphOwner extends FlexoConceptObject {
	readonly kind: "ConditionalAction"|"CreationScheme"|"AddToListAction"|"GetSetProperty"|"AssignationAction"|"AbstractIterationAction"|"IncrementalIterationAction"|"CloningScheme"|"AbstractCreationScheme"|"DeletionScheme"|"NavigationScheme"|"GetProperty"|"AbstractAssignationAction"|"Sequence"|"FlexoBehaviour"|"ReturnStatement"|"DefaultFMLControlGraphOwner"|"IterationAction"|"AbstractActionScheme"|"WhileAction"|"EventListener"|"DeclarationAction"|"ActionScheme"|"SynchronizationScheme";
}

export interface VirtualModel extends FlexoConcept, VirtualModelObject, ResourceData {
	readonly kind: "VirtualModel";
	readonly localizedDictionary: FMLLocalizedDictionary;
	readonly resource: Description<FlexoResource>;
	readonly flexoConcepts: Array<FlexoConcept>;
	readonly modelVersion: string;
	readonly containerVirtualModel: VirtualModel;
	readonly uri: string;
	readonly version: string;
	readonly useDeclarations: Array<UseModelSlotDeclaration>;
	readonly virtualModels: Array<VirtualModel>;
}

export interface VirtualModelModelSlotInstance extends ModelSlotInstance {
	readonly kind: "VirtualModelModelSlotInstance";
	readonly virtualModelInstanceURI: string;
}

export interface AbstractCreationScheme extends FlexoBehaviour {
	readonly kind: "CreationScheme"|"CloningScheme";
}

export interface FlexoProperty extends FlexoConceptObject {
	readonly kind: "AbstractProperty"|"FreeModelSlot"|"GetSetProperty"|"TypeAwareModelSlot"|"GetProperty"|"FlexoRole"|"PrimitiveRole"|"FMLRTModelSlot"|"ModelSlot"|"ExpressionProperty"|"FlexoConceptInstanceRole"|"FMLRTVirtualModelInstanceModelSlot";
	readonly propertyName: string;
	readonly flexoConcept: Description<FlexoConcept>;
}

export interface DeletionScheme extends AbstractActionScheme {
	readonly kind: "DeletionScheme";
}

export interface ActorReference extends VirtualModelInstanceObject {
	readonly kind: "ModelObjectActorReference"|"PrimitiveActorReference"|"TypeAwareModelSlotInstance"|"VirtualModelModelSlotInstance"|"FreeModelSlotInstance"|"ModelSlotInstance";
	readonly modellingElement: any;
	readonly flexoConceptInstance: Description<FlexoConceptInstance>;
	readonly roleName: string;
}

export interface FlexoBehaviourObject extends FlexoConceptObject {
	readonly kind: "CreationScheme"|"AddFlexoConceptInstanceParameter"|"DeleteFlexoConceptInstanceParameter"|"ExecuteBehaviourParameter"|"CloningScheme"|"AbstractCreationScheme"|"DeletionScheme"|"NavigationScheme"|"CreateFlexoConceptInstanceParameter"|"FlexoBehaviour"|"GenericBehaviourParameter"|"AbstractActionScheme"|"EventListener"|"ActionScheme"|"SynchronizationScheme";
}

export interface NavigationScheme extends AbstractActionScheme {
	readonly kind: "NavigationScheme";
	readonly targetObject: string;
}

export interface GetProperty extends FlexoProperty, FMLControlGraphOwner {
	readonly kind: "GetSetProperty"|"GetProperty";
	readonly getControlGraph: FMLControlGraph;
}

export interface FMLObject extends FlexoObject {
	readonly kind: "ConditionalAction"|"MatchCondition"|"DeleteFlexoConceptInstance"|"CreationScheme"|"AbstractAddFlexoConceptInstance"|"AbstractProperty"|"AddToListAction"|"FreeModelSlot"|"GetSetProperty"|"FetchRequest"|"AssignableAction"|"AddFlexoConceptInstanceParameter"|"DeleteFlexoConceptInstanceParameter"|"AssignationAction"|"SelectFlexoConceptInstance"|"TypeAwareModelSlot"|"ExecuteBehaviourParameter"|"AbstractIterationAction"|"IncrementalIterationAction"|"EmptyControlGraph"|"EditionAction"|"Inspector"|"CloningScheme"|"FMLControlGraphOwner"|"VirtualModel"|"AbstractCreationScheme"|"FlexoProperty"|"DeletionScheme"|"FlexoBehaviourObject"|"NavigationScheme"|"GetProperty"|"InnerConceptsFacet"|"ExpressionAction"|"FlexoRole"|"NotifyPropertyChangedAction"|"MatchingCriteria"|"VirtualModelObject"|"PrimitiveRole"|"CreateFlexoConceptInstanceParameter"|"FMLLocalizedDictionary"|"AbstractAssignationAction"|"Sequence"|"FlexoConceptBehaviouralFacet"|"InspectorEntry"|"FlexoConcept"|"FlexoBehaviour"|"FMLRTModelSlot"|"ReturnStatement"|"ModelSlot"|"LogAction"|"AddVirtualModelInstance"|"GenericBehaviourParameter"|"DefaultFMLControlGraphOwner"|"FlexoEvent"|"IterationAction"|"FinalizeMatching"|"TechnologySpecificAction"|"AbstractActionScheme"|"WhileAction"|"ExpressionProperty"|"FlexoConceptInstanceRole"|"Constraint"|"FlexoConceptStructuralFacet"|"FireEventAction"|"AddClassInstance"|"FMLRTAction"|"FMLRTVirtualModelInstanceModelSlot"|"InitiateMatching"|"AddFlexoConceptInstance"|"Localized"|"ModelSlotObject"|"MatchFlexoConceptInstance"|"RemoveFromListAction"|"EventListener"|"ControlStructureAction"|"DeclarationAction"|"ActionScheme"|"FMLControlGraph"|"SynchronizationScheme"|"Condition"|"DeleteAction"|"FlexoConceptObject";
	readonly author: string;
	readonly description: string;
}

export interface InnerConceptsFacet extends FlexoConceptObject {
	readonly kind: "InnerConceptsFacet";
}

export interface ExpressionAction extends AssignableAction {
	readonly kind: "ExpressionAction";
	readonly expression: string;
}

export interface FlexoRole extends FlexoProperty {
	readonly kind: "FreeModelSlot"|"TypeAwareModelSlot"|"PrimitiveRole"|"FMLRTModelSlot"|"ModelSlot"|"FlexoConceptInstanceRole"|"FMLRTVirtualModelInstanceModelSlot";
	readonly container: string;
	readonly modelSlot: ModelSlot;
	readonly isRequired: boolean;
	readonly cloningStrategy: "Clone" | "Reference" | "Ignore" | "Factory";
	readonly defaultValue: string;
	readonly roleName: string;
	readonly cardinality: "ZeroOne" | "One" | "ZeroMany" | "OneMany";
}

export interface NotifyPropertyChangedAction extends EditionAction {
	readonly kind: "NotifyPropertyChangedAction";
	readonly propertyName: string;
	readonly object: string;
}

export interface MatchingCriteria extends FlexoConceptObject {
	readonly kind: "MatchingCriteria";
	readonly patternRoleName: string;
	readonly action: MatchFlexoConceptInstance;
	readonly value: string;
}

export interface VirtualModelInstance extends FlexoConceptInstance, ResourceData {
	readonly kind: "FMLRTVirtualModelInstance";
	readonly flexoConceptInstances: Array<FlexoConceptInstance>;
	readonly containerVirtualModelInstance: VirtualModelInstance;
	readonly virtualModelURI: string;
	readonly virtualModelInstances: Array<VirtualModelInstance>;
	readonly modelVersion: string;
	readonly title: string;
	readonly version: string;
}

export interface VirtualModelObject extends FlexoConceptObject {
	readonly kind: "FreeModelSlot"|"TypeAwareModelSlot"|"VirtualModel"|"FlexoConcept"|"FMLRTModelSlot"|"ModelSlot"|"FlexoEvent"|"FMLRTVirtualModelInstanceModelSlot"|"ModelSlotObject";
}

export interface PrimitiveRole extends FlexoRole {
	readonly kind: "PrimitiveRole";
	readonly primitiveType: "Boolean" | "String" | "Integer" | "Float" | "Double";
}

export interface CreateFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "CreateFlexoConceptInstanceParameter";
	readonly action: MatchFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface FMLLocalizedDictionary extends FMLObject {
	readonly kind: "FMLLocalizedDictionary";
	readonly owner: VirtualModel;
	readonly localizedEntries: Array<Localized>;
}

export interface AbstractAssignationAction extends AssignableAction, FMLControlGraphOwner {
	readonly kind: "AssignationAction"|"ReturnStatement"|"DeclarationAction";
	readonly assignableAction: AssignableAction;
}

export interface Sequence extends FMLControlGraph, FMLControlGraphOwner {
	readonly kind: "Sequence";
	readonly controlGraph2: FMLControlGraph;
	readonly controlGraph1: FMLControlGraph;
}

export interface FlexoConceptBehaviouralFacet extends FlexoConceptObject {
	readonly kind: "FlexoConceptBehaviouralFacet";
}

export interface InspectorEntry extends FlexoConceptObject {
	readonly kind: "InspectorEntry";
	readonly container: string;
	readonly readOnly: boolean;
	readonly widget: "TEXT_FIELD" | "TEXT_AREA" | "URI" | "LOCALIZED_TEXT_FIELD" | "INTEGER" | "FLOAT" | "CHECKBOX" | "DROPDOWN" | "RADIO_BUTTON" | "CUSTOM_WIDGET";
	readonly data: string;
	readonly inspector: Inspector;
	readonly label: string;
	readonly type: string;
	readonly list: string;
}

export interface FlexoConcept extends FlexoConceptObject, VirtualModelObject {
	readonly kind: "VirtualModel"|"FlexoEvent"|"FlexoConcept";
	readonly owner: Description<VirtualModel>;
	readonly childFlexoConcepts: Array<FlexoConcept>;
	readonly keyProperties: Array<FlexoProperty>;
	readonly parentFlexoConcepts: Array<FlexoConcept>;
	readonly Inspector: Inspector;
	readonly isAbstract: boolean;
	readonly containerFlexoConcept: Description<FlexoConcept>;
	readonly embeddedFlexoConcepts: Array<FlexoConcept>;
	readonly flexoProperties: Array<FlexoProperty>;
	readonly flexoBehaviours: Array<FlexoBehaviour>;
	readonly parentFlexoConceptsList: string;
	readonly flexoConceptConstraints: Array<Constraint>;
}

export interface FMLRTVirtualModelInstance extends VirtualModelInstance {
	readonly kind: "FMLRTVirtualModelInstance";
}

export interface FlexoBehaviour extends FlexoBehaviourObject, FMLControlGraphOwner {
	readonly kind: "CreationScheme"|"CloningScheme"|"AbstractCreationScheme"|"DeletionScheme"|"NavigationScheme"|"AbstractActionScheme"|"EventListener"|"ActionScheme"|"SynchronizationScheme";
	readonly controlGraph: FMLControlGraph;
	readonly skipConfirmationPanel: boolean;
	readonly visibility: "Default" | "Public" | "Protected" | "Private";
	readonly width: number;
	readonly flexoConcept: Description<FlexoConcept>;
	readonly label: string;
	readonly parameters: Array<GenericBehaviourParameter>;
	readonly definePopupDefaultSize: boolean;
	readonly height: number;
}

export interface FMLRTModelSlot extends ModelSlot {
	readonly kind: "FMLRTVirtualModelInstanceModelSlot";
	readonly virtualModelURI: string;
}

export interface ReturnStatement extends AbstractAssignationAction {
	readonly kind: "ReturnStatement";
}

export interface ModelSlot extends FlexoRole, ModelSlotObject, VirtualModelObject {
	readonly kind: "FreeModelSlot"|"TypeAwareModelSlot"|"FMLRTModelSlot"|"FMLRTVirtualModelInstanceModelSlot";
	readonly isRequired: boolean;
	readonly isReadOnly: boolean;
}

export interface LogAction extends EditionAction {
	readonly kind: "LogAction";
	readonly logLevel: "SEVERE" | "WARNING" | "INFO" | "FINE" | "FINER" | "FINEST" | "DEBUG";
	readonly logString: string;
}

export interface AddVirtualModelInstance extends AbstractAddFlexoConceptInstance {
	readonly kind: "AddVirtualModelInstance";
	readonly virtualModelInstanceTitle: string;
	readonly virtualModelInstanceName: string;
}

export interface GenericBehaviourParameter extends FlexoBehaviourObject {
	readonly kind: "GenericBehaviourParameter";
	readonly container: string;
	readonly isRequired: boolean;
	readonly widget: "TEXT_FIELD" | "TEXT_AREA" | "URI" | "LOCALIZED_TEXT_FIELD" | "INTEGER" | "FLOAT" | "CHECKBOX" | "DROPDOWN" | "RADIO_BUTTON" | "CUSTOM_WIDGET";
	readonly defaultValue: string;
	readonly flexoBehaviour: Description<FlexoBehaviour>;
	readonly type: string;
	readonly list: string;
}

export interface DefaultFMLControlGraphOwner extends FMLControlGraphOwner {
	readonly kind: "DefaultFMLControlGraphOwner";
	readonly controlGraph: Description<FMLControlGraph>;
	readonly conceptObject: Description<FlexoConceptObject>;
}

export interface FlexoEvent extends FlexoConcept {
	readonly kind: "FlexoEvent";
}

export interface IterationAction extends AbstractIterationAction {
	readonly kind: "IterationAction";
	readonly iteratorName: string;
	readonly iterationControlGraph: AssignableAction;
	readonly iteration: string;
}

export interface FinalizeMatching extends EditionAction {
	readonly kind: "FinalizeMatching";
	readonly container: string;
	readonly flexoBehaviourURI: string;
	readonly matchingSet: string;
	readonly flexoConceptTypeURI: string;
	readonly parameters: Array<ExecuteBehaviourParameter>;
}

export interface TechnologySpecificAction extends AssignableAction {
	readonly kind: "AbstractAddFlexoConceptInstance"|"FetchRequest"|"SelectFlexoConceptInstance"|"AddVirtualModelInstance"|"FireEventAction"|"FMLRTAction"|"AddFlexoConceptInstance"|"MatchFlexoConceptInstance";
	readonly modelSlot: ModelSlot;
	readonly receiver: string;
}

export interface AbstractActionScheme extends FlexoBehaviour {
	readonly kind: "DeletionScheme"|"NavigationScheme"|"EventListener"|"ActionScheme"|"SynchronizationScheme";
	readonly conditional: string;
}

export interface WhileAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly kind: "WhileAction";
	readonly controlGraph: FMLControlGraph;
	readonly evaluateConditionAfterCycle: boolean;
	readonly condition: string;
}

export interface FreeModelSlotInstance extends ModelSlotInstance {
	readonly kind: "FreeModelSlotInstance";
	readonly resourceURI: string;
}

export interface ExpressionProperty extends FlexoProperty {
	readonly kind: "ExpressionProperty";
	readonly expression: string;
}

export interface FlexoConceptInstanceRole extends FlexoRole {
	readonly kind: "FlexoConceptInstanceRole";
	readonly creationSchemeURI: string;
	readonly virtualModelInstance: string;
	readonly flexoConceptTypeURI: string;
}

export interface ModelSlotInstance extends ActorReference {
	readonly kind: "TypeAwareModelSlotInstance"|"VirtualModelModelSlotInstance"|"FreeModelSlotInstance";
	readonly modelSlotName: string;
	readonly resource: FlexoResource;
	readonly accessedResourceData: ResourceData;
}

export interface FlexoObject extends Description<FlexoObject> {
	readonly kind: "ConditionalAction"|"MatchCondition"|"DeleteFlexoConceptInstance"|"CreationScheme"|"AbstractAddFlexoConceptInstance"|"AbstractProperty"|"AddToListAction"|"FreeModelSlot"|"GetSetProperty"|"FetchRequest"|"AssignableAction"|"AddFlexoConceptInstanceParameter"|"DeleteFlexoConceptInstanceParameter"|"AssignationAction"|"SelectFlexoConceptInstance"|"ModelObjectActorReference"|"PrimitiveActorReference"|"TypeAwareModelSlot"|"ExecuteBehaviourParameter"|"AbstractIterationAction"|"IncrementalIterationAction"|"EmptyControlGraph"|"EditionAction"|"Inspector"|"TypeAwareModelSlotInstance"|"CloningScheme"|"FMLControlGraphOwner"|"VirtualModel"|"VirtualModelModelSlotInstance"|"AbstractCreationScheme"|"FlexoProperty"|"DeletionScheme"|"ActorReference"|"FlexoBehaviourObject"|"NavigationScheme"|"GetProperty"|"FMLObject"|"InnerConceptsFacet"|"ExpressionAction"|"FlexoRole"|"NotifyPropertyChangedAction"|"MatchingCriteria"|"VirtualModelInstance"|"VirtualModelObject"|"PrimitiveRole"|"CreateFlexoConceptInstanceParameter"|"FMLLocalizedDictionary"|"AbstractAssignationAction"|"Sequence"|"FlexoConceptBehaviouralFacet"|"InspectorEntry"|"FlexoConcept"|"FMLRTVirtualModelInstance"|"FlexoBehaviour"|"FMLRTModelSlot"|"ReturnStatement"|"ModelSlot"|"LogAction"|"AddVirtualModelInstance"|"GenericBehaviourParameter"|"DefaultFMLControlGraphOwner"|"FlexoEvent"|"IterationAction"|"FinalizeMatching"|"TechnologySpecificAction"|"AbstractActionScheme"|"WhileAction"|"FreeModelSlotInstance"|"ExpressionProperty"|"FlexoConceptInstanceRole"|"ModelSlotInstance"|"Constraint"|"FlexoConceptStructuralFacet"|"FlexoEventInstance"|"VirtualModelInstanceObject"|"FireEventAction"|"AddClassInstance"|"FMLRTAction"|"FMLRTVirtualModelInstanceModelSlot"|"FlexoConceptInstance"|"InitiateMatching"|"AddFlexoConceptInstance"|"Localized"|"ModelSlotObject"|"MatchFlexoConceptInstance"|"RemoveFromListAction"|"EventListener"|"ControlStructureAction"|"DeclarationAction"|"UseModelSlotDeclaration"|"ActionScheme"|"FMLControlGraph"|"SynchronizationScheme"|"Condition"|"DeleteAction"|"FlexoConceptObject";
	readonly userID: string;
	readonly flexoID: number;
}

export interface Constraint extends FlexoConceptObject {
	readonly kind: "Constraint";
	readonly flexoConcept: Description<FlexoConcept>;
	readonly constraint: string;
}

export interface FlexoConceptStructuralFacet extends FlexoConceptObject {
	readonly kind: "FlexoConceptStructuralFacet";
}

export interface FlexoEventInstance extends FlexoConceptInstance {
	readonly kind: "FlexoEventInstance";
	readonly sourceVirtualModelInstance: VirtualModelInstance;
	readonly flexoConcept: FlexoEvent;
}

export interface VirtualModelInstanceObject extends FlexoObject {
	readonly kind: "ModelObjectActorReference"|"PrimitiveActorReference"|"TypeAwareModelSlotInstance"|"VirtualModelModelSlotInstance"|"ActorReference"|"VirtualModelInstance"|"FMLRTVirtualModelInstance"|"FreeModelSlotInstance"|"ModelSlotInstance"|"FlexoEventInstance"|"FlexoConceptInstance";
	readonly virtualModelInstance: VirtualModelInstance;
}

export interface FireEventAction extends AbstractAddFlexoConceptInstance {
	readonly kind: "FireEventAction";
}

export interface AddClassInstance extends AssignableAction {
	readonly kind: "AddClassInstance";
	readonly type: string;
	readonly parameter: Array<string>;
}

export interface FMLRTAction extends TechnologySpecificAction {
	readonly kind: "AbstractAddFlexoConceptInstance"|"AddVirtualModelInstance"|"FireEventAction"|"AddFlexoConceptInstance"|"MatchFlexoConceptInstance";
	readonly virtualModelInstance: string;
}

export interface FMLRTVirtualModelInstanceModelSlot extends FMLRTModelSlot {
	readonly kind: "FMLRTVirtualModelInstanceModelSlot";
}

export interface FlexoConceptInstance extends FlexoObject, VirtualModelInstanceObject {
	readonly kind: "VirtualModelInstance"|"FMLRTVirtualModelInstance"|"FlexoEventInstance"|"FlexoConceptInstance";
	readonly actors: Array<ActorReference>;
	readonly embeddedFlexoConceptInstances: Array<FlexoConceptInstance>;
	readonly containerFlexoConceptInstance: Description<FlexoConceptInstance>;
	readonly flexoConcept: FlexoConcept;
	readonly flexoConceptURI: string;
	readonly owningVirtualModelInstance: VirtualModelInstance;
}

export interface InitiateMatching extends AssignableAction {
	readonly kind: "InitiateMatching";
	readonly container: string;
	readonly flexoConceptTypeURI: string;
	readonly conditions: Array<MatchCondition>;
}

export interface AddFlexoConceptInstance extends AbstractAddFlexoConceptInstance {
	readonly kind: "AddFlexoConceptInstance";
}

export interface Localized extends FMLObject {
	readonly kind: "Localized";
	readonly localizedDictionary: FMLLocalizedDictionary;
	readonly lang: string;
	readonly value: string;
	readonly key: string;
}

export interface ModelSlotObject extends VirtualModelObject {
	readonly kind: "FreeModelSlot"|"TypeAwareModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FMLRTVirtualModelInstanceModelSlot";
}

export interface MatchFlexoConceptInstance extends FMLRTAction {
	readonly kind: "MatchFlexoConceptInstance";
	readonly container: string;
	readonly creationSchemeURI: string;
	readonly matchingCriterias: Array<MatchingCriteria>;
	readonly matchingSet: string;
	readonly parameters: Array<CreateFlexoConceptInstanceParameter>;
}

export interface RemoveFromListAction extends AssignableAction {
	readonly kind: "RemoveFromListAction";
	readonly list: string;
	readonly value: string;
}

export interface EventListener extends AbstractActionScheme {
	readonly kind: "EventListener";
	readonly listenedVirtualModelInstance: string;
	readonly flexoEventTypeURI: string;
	readonly eventType: Description<FlexoEvent>;
}

export interface ControlStructureAction extends EditionAction, FMLControlGraph {
	readonly kind: "ConditionalAction"|"AbstractIterationAction"|"IncrementalIterationAction"|"IterationAction"|"WhileAction";
}

export interface DeclarationAction extends AbstractAssignationAction {
	readonly kind: "DeclarationAction";
	readonly variable: string;
}

export interface UseModelSlotDeclaration extends FlexoObject {
	readonly kind: "UseModelSlotDeclaration";
	readonly modelSlotClass: string;
	readonly virtualModel: Description<VirtualModel>;
}

export interface ActionScheme extends AbstractActionScheme {
	readonly kind: "ActionScheme";
}

export interface FMLControlGraph extends FlexoConceptObject {
	readonly kind: "ConditionalAction"|"DeleteFlexoConceptInstance"|"AbstractAddFlexoConceptInstance"|"AddToListAction"|"FetchRequest"|"AssignableAction"|"AssignationAction"|"SelectFlexoConceptInstance"|"AbstractIterationAction"|"IncrementalIterationAction"|"EmptyControlGraph"|"EditionAction"|"ExpressionAction"|"NotifyPropertyChangedAction"|"AbstractAssignationAction"|"Sequence"|"ReturnStatement"|"LogAction"|"AddVirtualModelInstance"|"IterationAction"|"FinalizeMatching"|"TechnologySpecificAction"|"WhileAction"|"FireEventAction"|"AddClassInstance"|"FMLRTAction"|"InitiateMatching"|"AddFlexoConceptInstance"|"MatchFlexoConceptInstance"|"RemoveFromListAction"|"ControlStructureAction"|"DeclarationAction"|"DeleteAction";
	readonly owner: Description<FMLControlGraphOwner>;
	readonly ownerContext: string;
}

export interface SynchronizationScheme extends AbstractActionScheme {
	readonly kind: "SynchronizationScheme";
}

export interface Condition extends FlexoConceptObject {
	readonly kind: "Condition";
	readonly condition: string;
	readonly action: FetchRequest;
}

export interface DeleteAction extends EditionAction, AssignableAction {
	readonly kind: "DeleteFlexoConceptInstance"|"DeleteAction";
	readonly object: string;
}

export interface FlexoConceptObject extends FMLObject {
	readonly kind: "ConditionalAction"|"MatchCondition"|"DeleteFlexoConceptInstance"|"CreationScheme"|"AbstractAddFlexoConceptInstance"|"AbstractProperty"|"AddToListAction"|"FreeModelSlot"|"GetSetProperty"|"FetchRequest"|"AssignableAction"|"AddFlexoConceptInstanceParameter"|"DeleteFlexoConceptInstanceParameter"|"AssignationAction"|"SelectFlexoConceptInstance"|"TypeAwareModelSlot"|"ExecuteBehaviourParameter"|"AbstractIterationAction"|"IncrementalIterationAction"|"EmptyControlGraph"|"EditionAction"|"Inspector"|"CloningScheme"|"FMLControlGraphOwner"|"VirtualModel"|"AbstractCreationScheme"|"FlexoProperty"|"DeletionScheme"|"FlexoBehaviourObject"|"NavigationScheme"|"GetProperty"|"InnerConceptsFacet"|"ExpressionAction"|"FlexoRole"|"NotifyPropertyChangedAction"|"MatchingCriteria"|"VirtualModelObject"|"PrimitiveRole"|"CreateFlexoConceptInstanceParameter"|"AbstractAssignationAction"|"Sequence"|"FlexoConceptBehaviouralFacet"|"InspectorEntry"|"FlexoConcept"|"FlexoBehaviour"|"FMLRTModelSlot"|"ReturnStatement"|"ModelSlot"|"LogAction"|"AddVirtualModelInstance"|"GenericBehaviourParameter"|"DefaultFMLControlGraphOwner"|"FlexoEvent"|"IterationAction"|"FinalizeMatching"|"TechnologySpecificAction"|"AbstractActionScheme"|"WhileAction"|"ExpressionProperty"|"FlexoConceptInstanceRole"|"Constraint"|"FlexoConceptStructuralFacet"|"FireEventAction"|"AddClassInstance"|"FMLRTAction"|"FMLRTVirtualModelInstanceModelSlot"|"InitiateMatching"|"AddFlexoConceptInstance"|"ModelSlotObject"|"MatchFlexoConceptInstance"|"RemoveFromListAction"|"EventListener"|"ControlStructureAction"|"DeclarationAction"|"ActionScheme"|"FMLControlGraph"|"SynchronizationScheme"|"Condition"|"DeleteAction";
}
