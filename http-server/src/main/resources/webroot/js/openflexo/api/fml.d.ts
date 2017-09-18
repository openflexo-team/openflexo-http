import { Description } from "./general";

export interface AbstractAddFlexoConceptInstance extends FMLRTAction {
	readonly creationSchemeURI: string;
	readonly container: string;
	readonly parameters: Array<AddFlexoConceptInstanceParameter>;
}

export interface ExecuteBehaviourParameter extends FlexoBehaviourObject {
	readonly action: FinalizeMatching;
	readonly paramName: string;
	readonly value: string;
}

export interface VirtualModelInstanceObject extends FlexoObject {
	readonly virtualModelInstance: VirtualModelInstance;
}

export interface ResourceData extends Description<ResourceData> {
}

export interface WhileAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly controlGraph: FMLControlGraph;
	readonly evaluateConditionAfterCycle: boolean;
	readonly condition: string;
}

export interface AssignationAction extends AbstractAssignationAction {
	readonly assign: string;
	readonly value: string;
}

export interface ModelSlot extends FlexoRole, ModelSlotObject, VirtualModelObject {
	readonly isRequired: boolean;
	readonly isReadOnly: boolean;
}

export interface AddClassInstance extends AssignableAction {
	readonly type: string;
	readonly parameter: Array<string>;
}

export interface UseModelSlotDeclaration extends FlexoObject {
	readonly modelSlotClass: string;
	readonly virtualModel: VirtualModel;
}

export interface AddFlexoConceptInstance extends AbstractAddFlexoConceptInstance {
}

export interface ActorReference extends VirtualModelInstanceObject {
	readonly flexoConceptInstance: FlexoConceptInstance;
	readonly roleName: string;
}

export interface SelectFlexoConceptInstance extends FetchRequest {
	readonly container: string;
	readonly flexoConceptTypeURI: string;
}

export interface GetSetProperty extends GetProperty {
	readonly setControlGraph: FMLControlGraph;
	readonly valueVariableName: string;
}

export interface Inspector extends FlexoConceptObject {
	readonly entries: Array<InspectorEntry>;
	readonly renderer: string;
	readonly flexo_concept: FlexoConcept;
	readonly inspectorTitle: string;
}

export interface FlexoConceptInstanceRole extends FlexoRole {
	readonly creationSchemeURI: string;
	readonly virtualModelInstance: string;
	readonly flexoConceptTypeURI: string;
}

export interface AddToListAction extends AssignableAction, FMLControlGraphOwner {
	readonly list: string;
	readonly value: string;
	readonly assignableAction: AssignableAction;
}

export interface FMLRTAction extends TechnologySpecificAction {
	readonly virtualModelInstance: string;
}

export interface FreeModelSlot extends ModelSlot {
}

export interface NotifyPropertyChangedAction extends EditionAction {
	readonly propertyName: string;
	readonly object: string;
}

export interface ModelSlotInstance extends ActorReference {
	readonly modelSlotName: string;
}

export interface FinalizeMatching extends EditionAction {
	readonly container: string;
	readonly flexoBehaviourURI: string;
	readonly matchingSet: string;
	readonly flexoConceptTypeURI: string;
	readonly parameters: Array<ExecuteBehaviourParameter>;
}

export interface FMLRTVirtualModelInstanceModelSlot extends FMLRTModelSlot {
}

export interface DeleteFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly action: DeleteFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface FlexoConceptInstance extends FlexoObject, VirtualModelInstanceObject {
	readonly actors: Array<ActorReference>;
	readonly embeddedFlexoConceptInstances: Array<FlexoConceptInstance>;
	readonly containerFlexoConceptInstance: FlexoConceptInstance;
	readonly flexoConcept: FlexoConcept;
	readonly flexoConceptURI: string;
	readonly owningVirtualModelInstance: VirtualModelInstance;
}

export interface CreateFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly action: MatchFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface DeletionScheme extends AbstractActionScheme {
}

export interface EventListener extends AbstractActionScheme {
	readonly listenedVirtualModelInstance: string;
	readonly flexoEventTypeURI: string;
	readonly eventType: FlexoEvent;
}

export interface FMLLocalizedDictionary extends FMLObject {
	readonly owner: VirtualModel;
	readonly localizedEntries: Array<Localized>;
}

export interface AbstractAssignationAction extends AssignableAction, FMLControlGraphOwner {
	readonly assignableAction: AssignableAction;
}

export interface MatchFlexoConceptInstance extends FMLRTAction {
	readonly creationSchemeURI: string;
	readonly container: string;
	readonly matchingCriterias: Array<MatchingCriteria>;
	readonly matchingSet: string;
	readonly parameters: Array<CreateFlexoConceptInstanceParameter>;
}

export interface ReturnStatement extends AbstractAssignationAction {
}

export interface FlexoBehaviour extends FlexoBehaviourObject, FMLControlGraphOwner {
	readonly controlGraph: FMLControlGraph;
	readonly skipConfirmationPanel: boolean;
	readonly visibility: "Default" | "Public" | "Protected" | "Private";
	readonly name: string;
	readonly width: number;
	readonly flexoConcept: FlexoConcept;
	readonly label: string;
	readonly parameters: Array<GenericBehaviourParameter>;
	readonly definePopupDefaultSize: boolean;
	readonly height: number;
}

export interface GenericBehaviourParameter extends FlexoBehaviourObject {
	readonly container: string;
	readonly isRequired: boolean;
	readonly widget: "TEXT_FIELD" | "TEXT_AREA" | "URI" | "LOCALIZED_TEXT_FIELD" | "INTEGER" | "FLOAT" | "CHECKBOX" | "DROPDOWN" | "RADIO_BUTTON" | "CUSTOM_WIDGET";
	readonly defaultValue: string;
	readonly flexoBehaviour: FlexoBehaviour;
	readonly name: string;
	readonly type: string;
	readonly list: string;
}

export interface InspectorEntry extends FlexoConceptObject {
	readonly container: string;
	readonly readOnly: boolean;
	readonly widget: "TEXT_FIELD" | "TEXT_AREA" | "URI" | "LOCALIZED_TEXT_FIELD" | "INTEGER" | "FLOAT" | "CHECKBOX" | "DROPDOWN" | "RADIO_BUTTON" | "CUSTOM_WIDGET";
	readonly data: string;
	readonly name: string;
	readonly inspector: Inspector;
	readonly label: string;
	readonly type: string;
	readonly list: string;
}

export interface FlexoBehaviourObject extends FlexoConceptObject {
}

export interface Condition extends FlexoConceptObject {
	readonly condition: string;
	readonly action: FetchRequest;
}

export interface AbstractCreationScheme extends FlexoBehaviour {
}

export interface DeclarationAction extends AbstractAssignationAction {
	readonly variable: string;
}

export interface GetProperty extends FlexoProperty, FMLControlGraphOwner {
	readonly getControlGraph: FMLControlGraph;
}

export interface FlexoEvent extends FlexoConcept {
}

export interface CreationScheme extends AbstractCreationScheme {
}

export interface ModelSlotObject extends VirtualModelObject {
}

export interface PrimitiveActorReference extends ActorReference {
	readonly valueAsString: string;
}

export interface LogAction extends EditionAction {
	readonly logLevel: "SEVERE" | "WARNING" | "INFO" | "FINE" | "FINER" | "FINEST" | "DEBUG";
	readonly logString: string;
}

export interface DeleteFlexoConceptInstance extends DeleteAction {
	readonly deletionSchemeURI: string;
	readonly parameters: Array<DeleteFlexoConceptInstanceParameter>;
}

export interface AddFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly action: AbstractAddFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface VirtualModelModelSlotInstance extends ModelSlotInstance {
	readonly virtualModelInstanceURI: string;
}

export interface FMLControlGraph extends FlexoConceptObject {
	readonly owner: FMLControlGraphOwner;
	readonly ownerContext: string;
}

export interface TypeAwareModelSlot extends ModelSlot {
	readonly metaModelURI: string;
}

export interface TypeAwareModelSlotInstance extends ModelSlotInstance {
	readonly modelURI: string;
}

export interface FreeModelSlotInstance extends ModelSlotInstance {
	readonly resourceURI: string;
}

export interface RemoveFromListAction extends AssignableAction {
	readonly list: string;
	readonly value: string;
}

export interface FlexoConceptObject extends FMLObject {
}

export interface EmptyControlGraph extends FMLControlGraph {
}

export interface SynchronizationScheme extends AbstractActionScheme {
}

export interface AddVirtualModelInstance extends AbstractAddFlexoConceptInstance {
	readonly virtualModelInstanceTitle: string;
	readonly virtualModelInstanceName: string;
}

export interface FlexoProperty extends FlexoConceptObject {
	readonly propertyName: string;
	readonly flexoConcept: FlexoConcept;
}

export interface FMLControlGraphOwner extends FlexoConceptObject {
}

export interface ActionScheme extends AbstractActionScheme {
}

export interface FetchRequest extends TechnologySpecificAction {
	readonly conditions: Array<Condition>;
}

export interface Sequence extends FMLControlGraph, FMLControlGraphOwner {
	readonly controlGraph2: FMLControlGraph;
	readonly controlGraph1: FMLControlGraph;
}

export interface VirtualModel extends FlexoConcept, VirtualModelObject, ResourceData {
	readonly localizedDictionary: FMLLocalizedDictionary;
	readonly flexoConcepts: Array<FlexoConcept>;
	readonly containerVirtualModel: VirtualModel;
	readonly modelVersion: string;
	readonly useDeclarations: Array<UseModelSlotDeclaration>;
	readonly uri: string;
	readonly version: string;
}

export interface AssignableAction extends EditionAction {
	readonly variableName: string;
	readonly assignation: string;
}

export interface ConditionalAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly condition: string;
	readonly elseControlGraph: FMLControlGraph;
	readonly thenControlGraph: FMLControlGraph;
}

export interface IterationAction extends AbstractIterationAction {
	readonly iteratorName: string;
	readonly iterationControlGraph: AssignableAction;
	readonly iteration: string;
}

export interface AbstractActionScheme extends FlexoBehaviour {
	readonly conditional: string;
}

export interface FlexoConcept extends FlexoConceptObject, VirtualModelObject {
	readonly owner: VirtualModel;
	readonly childFlexoConcepts: Array<FlexoConcept>;
	readonly keyProperties: Array<FlexoProperty>;
	readonly parentFlexoConcepts: Array<FlexoConcept>;
	readonly Inspector: Inspector;
	readonly isAbstract: boolean;
	readonly containerFlexoConcept: FlexoConcept;
	readonly embeddedFlexoConcepts: Array<FlexoConcept>;
	readonly flexoProperties: Array<FlexoProperty>;
	readonly flexoBehaviours: Array<FlexoBehaviour>;
	readonly parentFlexoConceptsList: string;
	readonly name: string;
	readonly flexoConceptConstraints: Array<Constraint>;
}

export interface VirtualModelObject extends FlexoConceptObject {
}

export interface ExpressionProperty extends FlexoProperty {
	readonly expression: string;
}

export interface ModelObjectActorReference extends ActorReference {
	readonly objectReference: string;
}

export interface Localized extends FMLObject {
	readonly localizedDictionary: FMLLocalizedDictionary;
	readonly lang: string;
	readonly value: string;
	readonly key: string;
}

export interface CloningScheme extends AbstractCreationScheme {
}

export interface IncrementalIterationAction extends AbstractIterationAction {
	readonly exclusiveEndValue: string;
	readonly increment: string;
	readonly startValue: string;
}

export interface FlexoEventInstance extends FlexoConceptInstance {
	readonly sourceVirtualModelInstance: VirtualModelInstance;
	readonly flexoConcept: FlexoEvent;
}

export interface ExpressionAction extends AssignableAction {
	readonly expression: string;
}

export interface PrimitiveRole extends FlexoRole {
	readonly primitiveType: "Boolean" | "String" | "Integer" | "Float" | "Double";
}

export interface DefaultFMLControlGraphOwner extends FMLControlGraphOwner {
	readonly controlGraph: FMLControlGraph;
	readonly conceptObject: FlexoConceptObject;
}

export interface InitiateMatching extends AssignableAction {
	readonly container: string;
	readonly flexoConceptTypeURI: string;
	readonly conditions: Array<MatchCondition>;
}

export interface AbstractProperty extends FlexoProperty {
	readonly readOnly: boolean;
	readonly type: string;
}

export interface TechnologySpecificAction extends AssignableAction {
	readonly modelSlot: ModelSlot;
	readonly receiver: string;
}

export interface FireEventAction extends AbstractAddFlexoConceptInstance {
}

export interface FlexoConceptBehaviouralFacet extends FlexoConceptObject {
}

export interface ControlStructureAction extends EditionAction, FMLControlGraph {
}

export interface FMLObject extends FlexoObject {
	readonly author: string;
	readonly name: string;
	readonly description: string;
}

export interface InnerConceptsFacet extends FlexoConceptObject {
}

export interface EditionAction extends FMLControlGraph {
}

export interface NavigationScheme extends AbstractActionScheme {
	readonly targetObject: string;
}

export interface FlexoObject extends Description<FlexoObject> {
	readonly userID: string;
	readonly flexoID: number;
}

export interface DeleteAction extends EditionAction, AssignableAction {
	readonly object: string;
}

export interface FMLRTVirtualModelInstance extends VirtualModelInstance {
}

export interface VirtualModelInstance extends FlexoConceptInstance, ResourceData {
	readonly flexoConceptInstances: Array<FlexoConceptInstance>;
	readonly virtualModelURI: string;
	readonly modelVersion: string;
	readonly name: string;
	readonly title: string;
	readonly version: string;
}

export interface MatchCondition extends FlexoConceptObject {
	readonly condition: string;
	readonly action: InitiateMatching;
}

export interface AbstractIterationAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly controlGraph: FMLControlGraph;
	readonly iteratorName: string;
}

export interface FlexoRole extends FlexoProperty {
	readonly modelSlot: ModelSlot;
	readonly container: string;
	readonly isRequired: boolean;
	readonly cloningStrategy: "Clone" | "Reference" | "Ignore" | "Factory";
	readonly defaultValue: string;
	readonly roleName: string;
	readonly cardinality: "ZeroOne" | "One" | "ZeroMany" | "OneMany";
}

export interface MatchingCriteria extends FlexoConceptObject {
	readonly patternRoleName: string;
	readonly action: MatchFlexoConceptInstance;
	readonly value: string;
}

export interface Constraint extends FlexoConceptObject {
	readonly flexoConcept: FlexoConcept;
	readonly constraint: string;
}

export interface FMLRTModelSlot extends ModelSlot {
	readonly virtualModelURI: string;
}

export interface FlexoConceptStructuralFacet extends FlexoConceptObject {
}
