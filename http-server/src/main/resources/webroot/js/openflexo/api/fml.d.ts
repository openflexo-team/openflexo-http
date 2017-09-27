import { Description } from "./general";

export interface MatchFlexoConceptInstance extends FMLRTAction {
	readonly kind: "MatchFlexoConceptInstance";
	readonly container: string;
	readonly creationSchemeURI: string;
	readonly matchingCriterias: Array<MatchingCriteria>;
	readonly matchingSet: string;
	readonly parameters: Array<CreateFlexoConceptInstanceParameter>;
}

export interface ControlStructureAction extends EditionAction, FMLControlGraph {
	readonly kind: "WhileAction"|"IncrementalIterationAction"|"IterationAction"|"ConditionalAction"|"AbstractIterationAction";
}

export interface ResourceData extends Description<ResourceData> {
	readonly kind: "VirtualModel"|"VirtualModelInstance"|"FMLRTVirtualModelInstance";
}

export interface NotifyPropertyChangedAction extends EditionAction {
	readonly kind: "NotifyPropertyChangedAction";
	readonly propertyName: string;
	readonly object: string;
}

export interface FlexoEvent extends FlexoConcept {
	readonly kind: "FlexoEvent";
}

export interface DefaultFMLControlGraphOwner extends FMLControlGraphOwner {
	readonly kind: "DefaultFMLControlGraphOwner";
	readonly controlGraph: FMLControlGraph;
	readonly conceptObject: Description<FlexoConceptObject>;
}

export interface ExecuteBehaviourParameter extends FlexoBehaviourObject {
	readonly kind: "ExecuteBehaviourParameter";
	readonly action: Description<FinalizeMatching>;
	readonly paramName: string;
	readonly value: string;
}

export interface FMLControlGraph extends FlexoConceptObject {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"NotifyPropertyChangedAction"|"WhileAction"|"SelectFlexoConceptInstance"|"ReturnStatement"|"EmptyControlGraph"|"IncrementalIterationAction"|"TechnologySpecificAction"|"AddVirtualModelInstance"|"IterationAction"|"InitiateMatching"|"AbstractAddFlexoConceptInstance"|"ConditionalAction"|"LogAction"|"ExpressionAction"|"AssignableAction"|"AddToListAction"|"RemoveFromListAction"|"FinalizeMatching"|"FMLRTAction"|"Sequence"|"AddFlexoConceptInstance"|"FireEventAction"|"AddClassInstance"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"DeclarationAction"|"AssignationAction"|"FetchRequest"|"EditionAction"|"DeleteAction";
	readonly owner: Description<FMLControlGraphOwner>;
	readonly ownerContext: string;
}

export interface FlexoConceptInstance extends FlexoObject, VirtualModelInstanceObject {
	readonly kind: "VirtualModelInstance"|"FlexoEventInstance"|"FMLRTVirtualModelInstance"|"FlexoConceptInstance";
	readonly actors: Array<ActorReference>;
	readonly embeddedFlexoConceptInstances: Array<FlexoConceptInstance>;
	readonly containerFlexoConceptInstance: Description<FlexoConceptInstance>;
	readonly flexoConcept: Description<FlexoConcept>;
	readonly flexoConceptURI: string;
	readonly owningVirtualModelInstance: Description<VirtualModelInstance>;
}

export interface ActorReference extends VirtualModelInstanceObject {
	readonly kind: "FreeModelSlotInstance"|"ModelObjectActorReference"|"VirtualModelModelSlotInstance"|"PrimitiveActorReference"|"TypeAwareModelSlotInstance"|"ModelSlotInstance";
	readonly flexoConceptInstance: Description<FlexoConceptInstance>;
	readonly roleName: string;
}

export interface InspectorEntry extends FlexoConceptObject {
	readonly kind: "InspectorEntry";
	readonly container: string;
	readonly readOnly: boolean;
	readonly widget: "TEXT_FIELD" | "TEXT_AREA" | "URI" | "LOCALIZED_TEXT_FIELD" | "INTEGER" | "FLOAT" | "CHECKBOX" | "DROPDOWN" | "RADIO_BUTTON" | "CUSTOM_WIDGET";
	readonly data: string;
	readonly name: string;
	readonly inspector: Description<Inspector>;
	readonly label: string;
	readonly type: string;
	readonly list: string;
}

export interface WhileAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly kind: "WhileAction";
	readonly controlGraph: FMLControlGraph;
	readonly evaluateConditionAfterCycle: boolean;
	readonly condition: string;
}

export interface CreationScheme extends AbstractCreationScheme {
	readonly kind: "CreationScheme";
}

export interface PrimitiveRole extends FlexoRole {
	readonly kind: "PrimitiveRole";
	readonly primitiveType: "Boolean" | "String" | "Integer" | "Float" | "Double";
}

export interface SelectFlexoConceptInstance extends FetchRequest {
	readonly kind: "SelectFlexoConceptInstance";
	readonly container: string;
	readonly flexoConceptTypeURI: string;
}

export interface InnerConceptsFacet extends FlexoConceptObject {
	readonly kind: "InnerConceptsFacet";
}

export interface ActionScheme extends AbstractActionScheme {
	readonly kind: "ActionScheme";
}

export interface ReturnStatement extends AbstractAssignationAction {
	readonly kind: "ReturnStatement";
}

export interface AddFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "AddFlexoConceptInstanceParameter";
	readonly action: Description<AbstractAddFlexoConceptInstance>;
	readonly paramName: string;
	readonly value: string;
}

export interface EmptyControlGraph extends FMLControlGraph {
	readonly kind: "EmptyControlGraph";
}

export interface IncrementalIterationAction extends AbstractIterationAction {
	readonly kind: "IncrementalIterationAction";
	readonly exclusiveEndValue: string;
	readonly increment: string;
	readonly startValue: string;
}

export interface TechnologySpecificAction extends AssignableAction {
	readonly kind: "MatchFlexoConceptInstance"|"SelectFlexoConceptInstance"|"AddVirtualModelInstance"|"AbstractAddFlexoConceptInstance"|"FMLRTAction"|"AddFlexoConceptInstance"|"FireEventAction"|"FetchRequest";
	readonly modelSlot: Description<ModelSlot>;
	readonly receiver: string;
}

export interface CreateFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "CreateFlexoConceptInstanceParameter";
	readonly action: Description<MatchFlexoConceptInstance>;
	readonly paramName: string;
	readonly value: string;
}

export interface NavigationScheme extends AbstractActionScheme {
	readonly kind: "NavigationScheme";
	readonly targetObject: string;
}

export interface AddVirtualModelInstance extends AbstractAddFlexoConceptInstance {
	readonly kind: "AddVirtualModelInstance";
	readonly virtualModelInstanceTitle: string;
	readonly virtualModelInstanceName: string;
}

export interface FreeModelSlotInstance extends ModelSlotInstance {
	readonly kind: "FreeModelSlotInstance";
	readonly resourceURI: string;
}

export interface ModelObjectActorReference extends ActorReference {
	readonly kind: "ModelObjectActorReference";
	readonly objectReference: string;
}

export interface FMLControlGraphOwner extends FlexoConceptObject {
	readonly kind: "DefaultFMLControlGraphOwner"|"WhileAction"|"CreationScheme"|"ActionScheme"|"ReturnStatement"|"IncrementalIterationAction"|"NavigationScheme"|"IterationAction"|"DeletionScheme"|"SynchronizationScheme"|"GetSetProperty"|"AbstractActionScheme"|"ConditionalAction"|"EventListener"|"FlexoBehaviour"|"GetProperty"|"AddToListAction"|"AbstractCreationScheme"|"Sequence"|"AbstractAssignationAction"|"AbstractIterationAction"|"DeclarationAction"|"AssignationAction"|"CloningScheme";
}

export interface IterationAction extends AbstractIterationAction {
	readonly kind: "IterationAction";
	readonly iteratorName: string;
	readonly iterationControlGraph: AssignableAction;
	readonly iteration: string;
}

export interface FlexoConceptInstanceRole extends FlexoRole {
	readonly kind: "FlexoConceptInstanceRole";
	readonly creationSchemeURI: string;
	readonly virtualModelInstance: string;
	readonly flexoConceptTypeURI: string;
}

export interface GenericBehaviourParameter extends FlexoBehaviourObject {
	readonly kind: "GenericBehaviourParameter";
	readonly container: string;
	readonly isRequired: boolean;
	readonly widget: "TEXT_FIELD" | "TEXT_AREA" | "URI" | "LOCALIZED_TEXT_FIELD" | "INTEGER" | "FLOAT" | "CHECKBOX" | "DROPDOWN" | "RADIO_BUTTON" | "CUSTOM_WIDGET";
	readonly defaultValue: string;
	readonly flexoBehaviour: Description<FlexoBehaviour>;
	readonly name: string;
	readonly type: string;
	readonly list: string;
}

export interface FMLLocalizedDictionary extends FMLObject {
	readonly kind: "FMLLocalizedDictionary";
	readonly owner: Description<VirtualModel>;
	readonly localizedEntries: Array<Localized>;
}

export interface DeletionScheme extends AbstractActionScheme {
	readonly kind: "DeletionScheme";
}

export interface ExpressionProperty extends FlexoProperty {
	readonly kind: "ExpressionProperty";
	readonly expression: string;
}

export interface MatchingCriteria extends FlexoConceptObject {
	readonly kind: "MatchingCriteria";
	readonly patternRoleName: string;
	readonly action: Description<MatchFlexoConceptInstance>;
	readonly value: string;
}

export interface VirtualModel extends FlexoConcept, VirtualModelObject, ResourceData {
	readonly kind: "VirtualModel";
	readonly localizedDictionary: Description<FMLLocalizedDictionary>;
	readonly flexoConcepts: Array<FlexoConcept>;
	readonly modelVersion: string;
	readonly containerVirtualModel: Description<VirtualModel>;
	readonly uri: string;
	readonly version: string;
	readonly useDeclarations: Array<UseModelSlotDeclaration>;
}

export interface SynchronizationScheme extends AbstractActionScheme {
	readonly kind: "SynchronizationScheme";
}

export interface FlexoProperty extends FlexoConceptObject {
	readonly kind: "PrimitiveRole"|"FlexoConceptInstanceRole"|"ExpressionProperty"|"GetSetProperty"|"AbstractProperty"|"TypeAwareModelSlot"|"FlexoRole"|"GetProperty"|"FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FMLRTVirtualModelInstanceModelSlot";
	readonly propertyName: string;
	readonly flexoConcept: Description<FlexoConcept>;
}

export interface GetSetProperty extends GetProperty {
	readonly kind: "GetSetProperty";
	readonly setControlGraph: FMLControlGraph;
	readonly valueVariableName: string;
}

export interface AbstractActionScheme extends FlexoBehaviour {
	readonly kind: "ActionScheme"|"NavigationScheme"|"DeletionScheme"|"SynchronizationScheme"|"EventListener";
	readonly conditional: string;
}

export interface InitiateMatching extends AssignableAction {
	readonly kind: "InitiateMatching";
	readonly container: string;
	readonly flexoConceptTypeURI: string;
	readonly conditions: Array<MatchCondition>;
}

export interface AbstractAddFlexoConceptInstance extends FMLRTAction {
	readonly kind: "AddVirtualModelInstance"|"AddFlexoConceptInstance"|"FireEventAction";
	readonly container: string;
	readonly creationSchemeURI: string;
	readonly parameters: Array<AddFlexoConceptInstanceParameter>;
}

export interface AbstractProperty extends FlexoProperty {
	readonly kind: "AbstractProperty";
	readonly readOnly: boolean;
	readonly type: string;
}

export interface TypeAwareModelSlot extends ModelSlot {
	readonly kind: ;
	readonly metaModelURI: string;
}

export interface FlexoConceptBehaviouralFacet extends FlexoConceptObject {
	readonly kind: "FlexoConceptBehaviouralFacet";
}

export interface ConditionalAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly kind: "ConditionalAction";
	readonly condition: string;
	readonly elseControlGraph: FMLControlGraph;
	readonly thenControlGraph: FMLControlGraph;
}

export interface MatchCondition extends FlexoConceptObject {
	readonly kind: "MatchCondition";
	readonly condition: string;
	readonly action: Description<InitiateMatching>;
}

export interface EventListener extends AbstractActionScheme {
	readonly kind: "EventListener";
	readonly listenedVirtualModelInstance: string;
	readonly flexoEventTypeURI: string;
	readonly eventType: Description<FlexoEvent>;
}

export interface FlexoConceptStructuralFacet extends FlexoConceptObject {
	readonly kind: "FlexoConceptStructuralFacet";
}

export interface VirtualModelModelSlotInstance extends ModelSlotInstance {
	readonly kind: "VirtualModelModelSlotInstance";
	readonly virtualModelInstanceURI: string;
}

export interface PrimitiveActorReference extends ActorReference {
	readonly kind: "PrimitiveActorReference";
	readonly valueAsString: string;
}

export interface LogAction extends EditionAction {
	readonly kind: "LogAction";
	readonly logLevel: "SEVERE" | "WARNING" | "INFO" | "FINE" | "FINER" | "FINEST" | "DEBUG";
	readonly logString: string;
}

export interface FlexoRole extends FlexoProperty {
	readonly kind: "PrimitiveRole"|"FlexoConceptInstanceRole"|"TypeAwareModelSlot"|"FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FMLRTVirtualModelInstanceModelSlot";
	readonly modelSlot: ModelSlot;
	readonly container: string;
	readonly isRequired: boolean;
	readonly cloningStrategy: "Clone" | "Reference" | "Ignore" | "Factory";
	readonly defaultValue: string;
	readonly roleName: string;
	readonly cardinality: "ZeroOne" | "One" | "ZeroMany" | "OneMany";
}

export interface Localized extends FMLObject {
	readonly kind: "Localized";
	readonly localizedDictionary: Description<FMLLocalizedDictionary>;
	readonly lang: string;
	readonly value: string;
	readonly key: string;
}

export interface FlexoBehaviour extends FlexoBehaviourObject, FMLControlGraphOwner {
	readonly kind: "CreationScheme"|"ActionScheme"|"NavigationScheme"|"DeletionScheme"|"SynchronizationScheme"|"AbstractActionScheme"|"EventListener"|"AbstractCreationScheme"|"CloningScheme";
	readonly controlGraph: FMLControlGraph;
	readonly skipConfirmationPanel: boolean;
	readonly visibility: "Default" | "Public" | "Protected" | "Private";
	readonly name: string;
	readonly width: number;
	readonly flexoConcept: Description<FlexoConcept>;
	readonly label: string;
	readonly parameters: Array<GenericBehaviourParameter>;
	readonly definePopupDefaultSize: boolean;
	readonly height: number;
}

export interface FMLObject extends FlexoObject {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"NotifyPropertyChangedAction"|"FlexoEvent"|"DefaultFMLControlGraphOwner"|"ExecuteBehaviourParameter"|"FMLControlGraph"|"InspectorEntry"|"WhileAction"|"CreationScheme"|"PrimitiveRole"|"SelectFlexoConceptInstance"|"InnerConceptsFacet"|"ActionScheme"|"ReturnStatement"|"AddFlexoConceptInstanceParameter"|"EmptyControlGraph"|"IncrementalIterationAction"|"TechnologySpecificAction"|"CreateFlexoConceptInstanceParameter"|"NavigationScheme"|"AddVirtualModelInstance"|"FMLControlGraphOwner"|"IterationAction"|"FlexoConceptInstanceRole"|"GenericBehaviourParameter"|"FMLLocalizedDictionary"|"DeletionScheme"|"ExpressionProperty"|"MatchingCriteria"|"VirtualModel"|"SynchronizationScheme"|"FlexoProperty"|"GetSetProperty"|"AbstractActionScheme"|"InitiateMatching"|"AbstractAddFlexoConceptInstance"|"AbstractProperty"|"TypeAwareModelSlot"|"FlexoConceptBehaviouralFacet"|"ConditionalAction"|"MatchCondition"|"EventListener"|"FlexoConceptStructuralFacet"|"LogAction"|"FlexoRole"|"Localized"|"FlexoBehaviour"|"GetProperty"|"FreeModelSlot"|"DeleteFlexoConceptInstanceParameter"|"FlexoConceptObject"|"FMLRTModelSlot"|"ExpressionAction"|"ModelSlot"|"AssignableAction"|"FlexoBehaviourObject"|"AddToListAction"|"RemoveFromListAction"|"FlexoConcept"|"AbstractCreationScheme"|"FinalizeMatching"|"Condition"|"FMLRTAction"|"Sequence"|"VirtualModelObject"|"AddFlexoConceptInstance"|"FireEventAction"|"AddClassInstance"|"Inspector"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"DeclarationAction"|"FMLRTVirtualModelInstanceModelSlot"|"AssignationAction"|"FetchRequest"|"EditionAction"|"CloningScheme"|"ModelSlotObject"|"DeleteAction"|"Constraint";
	readonly author: string;
	readonly name: string;
	readonly description: string;
}

export interface GetProperty extends FlexoProperty, FMLControlGraphOwner {
	readonly kind: "GetSetProperty"|"GetProperty";
	readonly getControlGraph: FMLControlGraph;
}

export interface VirtualModelInstance extends FlexoConceptInstance, ResourceData {
	readonly kind: "FMLRTVirtualModelInstance";
	readonly flexoConceptInstances: Array<FlexoConceptInstance>;
	readonly virtualModelURI: string;
	readonly modelVersion: string;
	readonly name: string;
	readonly title: string;
	readonly version: string;
}

export interface FreeModelSlot extends ModelSlot {
	readonly kind: ;
}

export interface DeleteFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "DeleteFlexoConceptInstanceParameter";
	readonly action: Description<DeleteFlexoConceptInstance>;
	readonly paramName: string;
	readonly value: string;
}

export interface FlexoConceptObject extends FMLObject {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"NotifyPropertyChangedAction"|"FlexoEvent"|"DefaultFMLControlGraphOwner"|"ExecuteBehaviourParameter"|"FMLControlGraph"|"InspectorEntry"|"WhileAction"|"CreationScheme"|"PrimitiveRole"|"SelectFlexoConceptInstance"|"InnerConceptsFacet"|"ActionScheme"|"ReturnStatement"|"AddFlexoConceptInstanceParameter"|"EmptyControlGraph"|"IncrementalIterationAction"|"TechnologySpecificAction"|"CreateFlexoConceptInstanceParameter"|"NavigationScheme"|"AddVirtualModelInstance"|"FMLControlGraphOwner"|"IterationAction"|"FlexoConceptInstanceRole"|"GenericBehaviourParameter"|"DeletionScheme"|"ExpressionProperty"|"MatchingCriteria"|"VirtualModel"|"SynchronizationScheme"|"FlexoProperty"|"GetSetProperty"|"AbstractActionScheme"|"InitiateMatching"|"AbstractAddFlexoConceptInstance"|"AbstractProperty"|"TypeAwareModelSlot"|"FlexoConceptBehaviouralFacet"|"ConditionalAction"|"MatchCondition"|"EventListener"|"FlexoConceptStructuralFacet"|"LogAction"|"FlexoRole"|"FlexoBehaviour"|"GetProperty"|"FreeModelSlot"|"DeleteFlexoConceptInstanceParameter"|"FMLRTModelSlot"|"ExpressionAction"|"ModelSlot"|"AssignableAction"|"FlexoBehaviourObject"|"AddToListAction"|"RemoveFromListAction"|"FlexoConcept"|"AbstractCreationScheme"|"FinalizeMatching"|"Condition"|"FMLRTAction"|"Sequence"|"VirtualModelObject"|"AddFlexoConceptInstance"|"FireEventAction"|"AddClassInstance"|"Inspector"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"DeclarationAction"|"FMLRTVirtualModelInstanceModelSlot"|"AssignationAction"|"FetchRequest"|"EditionAction"|"CloningScheme"|"ModelSlotObject"|"DeleteAction"|"Constraint";
}

export interface TypeAwareModelSlotInstance extends ModelSlotInstance {
	readonly kind: "TypeAwareModelSlotInstance";
	readonly modelURI: string;
}

export interface FMLRTModelSlot extends ModelSlot {
	readonly kind: "FMLRTVirtualModelInstanceModelSlot";
	readonly virtualModelURI: string;
}

export interface ExpressionAction extends AssignableAction {
	readonly kind: "ExpressionAction";
	readonly expression: string;
}

export interface ModelSlot extends FlexoRole, ModelSlotObject, VirtualModelObject {
	readonly kind: "TypeAwareModelSlot"|"FreeModelSlot"|"FMLRTModelSlot"|"FMLRTVirtualModelInstanceModelSlot";
	readonly isRequired: boolean;
	readonly isReadOnly: boolean;
}

export interface AssignableAction extends EditionAction {
	readonly kind: "MatchFlexoConceptInstance"|"SelectFlexoConceptInstance"|"ReturnStatement"|"TechnologySpecificAction"|"AddVirtualModelInstance"|"InitiateMatching"|"AbstractAddFlexoConceptInstance"|"ExpressionAction"|"AddToListAction"|"RemoveFromListAction"|"FMLRTAction"|"AddFlexoConceptInstance"|"FireEventAction"|"AddClassInstance"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"DeclarationAction"|"AssignationAction"|"FetchRequest"|"DeleteAction";
	readonly variableName: string;
	readonly assignation: string;
}

export interface FlexoBehaviourObject extends FlexoConceptObject {
	readonly kind: "ExecuteBehaviourParameter"|"CreationScheme"|"ActionScheme"|"AddFlexoConceptInstanceParameter"|"CreateFlexoConceptInstanceParameter"|"NavigationScheme"|"GenericBehaviourParameter"|"DeletionScheme"|"SynchronizationScheme"|"AbstractActionScheme"|"EventListener"|"FlexoBehaviour"|"DeleteFlexoConceptInstanceParameter"|"AbstractCreationScheme"|"CloningScheme";
}

export interface AddToListAction extends AssignableAction, FMLControlGraphOwner {
	readonly kind: "AddToListAction";
	readonly list: string;
	readonly value: string;
	readonly assignableAction: AssignableAction;
}

export interface FlexoEventInstance extends FlexoConceptInstance {
	readonly kind: "FlexoEventInstance";
	readonly sourceVirtualModelInstance: Description<VirtualModelInstance>;
	readonly flexoConcept: Description<FlexoEvent>;
}

export interface FMLRTVirtualModelInstance extends VirtualModelInstance {
	readonly kind: "FMLRTVirtualModelInstance";
}

export interface RemoveFromListAction extends AssignableAction {
	readonly kind: "RemoveFromListAction";
	readonly list: string;
	readonly value: string;
}

export interface FlexoConcept extends FlexoConceptObject, VirtualModelObject {
	readonly kind: "FlexoEvent"|"VirtualModel"|"FlexoConcept";
	readonly owner: Description<VirtualModel>;
	readonly childFlexoConcepts: Array<Description<FlexoConcept>>;
	readonly keyProperties: Array<Description<FlexoProperty>>;
	readonly parentFlexoConcepts: Array<Description<FlexoConcept>>;
	readonly Inspector: Inspector;
	readonly isAbstract: boolean;
	readonly containerFlexoConcept: Description<FlexoConcept>;
	readonly embeddedFlexoConcepts: Array<FlexoConcept>;
	readonly flexoProperties: Array<FlexoProperty>;
	readonly flexoBehaviours: Array<FlexoBehaviour>;
	readonly parentFlexoConceptsList: string;
	readonly name: string;
	readonly flexoConceptConstraints: Array<Constraint>;
}

export interface AbstractCreationScheme extends FlexoBehaviour {
	readonly kind: "CreationScheme"|"CloningScheme";
}

export interface FinalizeMatching extends EditionAction {
	readonly kind: "FinalizeMatching";
	readonly container: string;
	readonly flexoBehaviourURI: string;
	readonly matchingSet: string;
	readonly flexoConceptTypeURI: string;
	readonly parameters: Array<ExecuteBehaviourParameter>;
}

export interface UseModelSlotDeclaration extends FlexoObject {
	readonly kind: "UseModelSlotDeclaration";
	readonly modelSlotClass: string;
	readonly virtualModel: Description<VirtualModel>;
}

export interface Condition extends FlexoConceptObject {
	readonly kind: "Condition";
	readonly condition: string;
	readonly action: Description<FetchRequest>;
}

export interface FMLRTAction extends TechnologySpecificAction {
	readonly kind: "MatchFlexoConceptInstance"|"AddVirtualModelInstance"|"AbstractAddFlexoConceptInstance"|"AddFlexoConceptInstance"|"FireEventAction";
	readonly virtualModelInstance: string;
}

export interface Sequence extends FMLControlGraph, FMLControlGraphOwner {
	readonly kind: "Sequence";
	readonly controlGraph2: FMLControlGraph;
	readonly controlGraph1: FMLControlGraph;
}

export interface VirtualModelObject extends FlexoConceptObject {
	readonly kind: "FlexoEvent"|"VirtualModel"|"TypeAwareModelSlot"|"FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FlexoConcept"|"FMLRTVirtualModelInstanceModelSlot"|"ModelSlotObject";
}

export interface AddFlexoConceptInstance extends AbstractAddFlexoConceptInstance {
	readonly kind: "AddFlexoConceptInstance";
}

export interface FireEventAction extends AbstractAddFlexoConceptInstance {
	readonly kind: "FireEventAction";
}

export interface FlexoObject extends Description<FlexoObject> {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"NotifyPropertyChangedAction"|"FlexoEvent"|"DefaultFMLControlGraphOwner"|"ExecuteBehaviourParameter"|"FMLControlGraph"|"FlexoConceptInstance"|"ActorReference"|"InspectorEntry"|"WhileAction"|"CreationScheme"|"PrimitiveRole"|"SelectFlexoConceptInstance"|"InnerConceptsFacet"|"ActionScheme"|"ReturnStatement"|"AddFlexoConceptInstanceParameter"|"EmptyControlGraph"|"IncrementalIterationAction"|"TechnologySpecificAction"|"CreateFlexoConceptInstanceParameter"|"NavigationScheme"|"AddVirtualModelInstance"|"FreeModelSlotInstance"|"ModelObjectActorReference"|"FMLControlGraphOwner"|"IterationAction"|"FlexoConceptInstanceRole"|"GenericBehaviourParameter"|"FMLLocalizedDictionary"|"DeletionScheme"|"ExpressionProperty"|"MatchingCriteria"|"VirtualModel"|"SynchronizationScheme"|"FlexoProperty"|"GetSetProperty"|"AbstractActionScheme"|"InitiateMatching"|"AbstractAddFlexoConceptInstance"|"AbstractProperty"|"TypeAwareModelSlot"|"FlexoConceptBehaviouralFacet"|"ConditionalAction"|"MatchCondition"|"EventListener"|"FlexoConceptStructuralFacet"|"VirtualModelModelSlotInstance"|"PrimitiveActorReference"|"LogAction"|"FlexoRole"|"Localized"|"FlexoBehaviour"|"FMLObject"|"GetProperty"|"VirtualModelInstance"|"FreeModelSlot"|"DeleteFlexoConceptInstanceParameter"|"FlexoConceptObject"|"TypeAwareModelSlotInstance"|"FMLRTModelSlot"|"ExpressionAction"|"ModelSlot"|"AssignableAction"|"FlexoBehaviourObject"|"AddToListAction"|"FlexoEventInstance"|"FMLRTVirtualModelInstance"|"RemoveFromListAction"|"FlexoConcept"|"AbstractCreationScheme"|"FinalizeMatching"|"UseModelSlotDeclaration"|"Condition"|"FMLRTAction"|"Sequence"|"VirtualModelObject"|"AddFlexoConceptInstance"|"FireEventAction"|"AddClassInstance"|"Inspector"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"DeclarationAction"|"FMLRTVirtualModelInstanceModelSlot"|"AssignationAction"|"FetchRequest"|"EditionAction"|"CloningScheme"|"ModelSlotObject"|"DeleteAction"|"ModelSlotInstance"|"VirtualModelInstanceObject"|"Constraint";
	readonly userID: string;
	readonly flexoID: number;
}

export interface AddClassInstance extends AssignableAction {
	readonly kind: "AddClassInstance";
	readonly type: string;
	readonly parameter: Array<string>;
}

export interface Inspector extends FlexoConceptObject {
	readonly kind: "Inspector";
	readonly entries: Array<InspectorEntry>;
	readonly renderer: string;
	readonly flexo_concept: Description<FlexoConcept>;
	readonly inspectorTitle: string;
}

export interface DeleteFlexoConceptInstance extends DeleteAction {
	readonly kind: "DeleteFlexoConceptInstance";
	readonly deletionSchemeURI: string;
	readonly parameters: Array<DeleteFlexoConceptInstanceParameter>;
}

export interface AbstractAssignationAction extends AssignableAction, FMLControlGraphOwner {
	readonly kind: "ReturnStatement"|"DeclarationAction"|"AssignationAction";
	readonly assignableAction: AssignableAction;
}

export interface AbstractIterationAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly kind: "IncrementalIterationAction"|"IterationAction";
	readonly controlGraph: FMLControlGraph;
	readonly iteratorName: string;
}

export interface DeclarationAction extends AbstractAssignationAction {
	readonly kind: "DeclarationAction";
	readonly variable: string;
}

export interface FMLRTVirtualModelInstanceModelSlot extends FMLRTModelSlot {
	readonly kind: "FMLRTVirtualModelInstanceModelSlot";
}

export interface AssignationAction extends AbstractAssignationAction {
	readonly kind: "AssignationAction";
	readonly assign: string;
	readonly value: string;
}

export interface FetchRequest extends TechnologySpecificAction {
	readonly kind: "SelectFlexoConceptInstance";
	readonly conditions: Array<Condition>;
}

export interface EditionAction extends FMLControlGraph {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"NotifyPropertyChangedAction"|"WhileAction"|"SelectFlexoConceptInstance"|"ReturnStatement"|"IncrementalIterationAction"|"TechnologySpecificAction"|"AddVirtualModelInstance"|"IterationAction"|"InitiateMatching"|"AbstractAddFlexoConceptInstance"|"ConditionalAction"|"LogAction"|"ExpressionAction"|"AssignableAction"|"AddToListAction"|"RemoveFromListAction"|"FinalizeMatching"|"FMLRTAction"|"AddFlexoConceptInstance"|"FireEventAction"|"AddClassInstance"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"DeclarationAction"|"AssignationAction"|"FetchRequest"|"DeleteAction";
}

export interface CloningScheme extends AbstractCreationScheme {
	readonly kind: "CloningScheme";
}

export interface ModelSlotObject extends VirtualModelObject {
	readonly kind: "TypeAwareModelSlot"|"FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FMLRTVirtualModelInstanceModelSlot";
}

export interface DeleteAction extends EditionAction, AssignableAction {
	readonly kind: "DeleteFlexoConceptInstance"|"DeleteAction";
	readonly object: string;
}

export interface ModelSlotInstance extends ActorReference {
	readonly kind: "FreeModelSlotInstance"|"VirtualModelModelSlotInstance"|"TypeAwareModelSlotInstance";
	readonly modelSlotName: string;
}

export interface VirtualModelInstanceObject extends FlexoObject {
	readonly kind: "FlexoConceptInstance"|"ActorReference"|"FreeModelSlotInstance"|"ModelObjectActorReference"|"VirtualModelModelSlotInstance"|"PrimitiveActorReference"|"VirtualModelInstance"|"TypeAwareModelSlotInstance"|"FlexoEventInstance"|"FMLRTVirtualModelInstance"|"ModelSlotInstance";
	readonly virtualModelInstance: Description<VirtualModelInstance>;
}

export interface Constraint extends FlexoConceptObject {
	readonly kind: "Constraint";
	readonly flexoConcept: Description<FlexoConcept>;
	readonly constraint: string;
}
