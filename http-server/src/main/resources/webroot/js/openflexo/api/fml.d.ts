import { Description } from "./general";
import { Resource as FlexoResource } from "./resource";

export interface MatchFlexoConceptInstance extends FMLRTAction {
	readonly kind: "MatchFlexoConceptInstance";
	readonly container: string;
	readonly creationSchemeURI: string;
	readonly matchingCriterias: Array<MatchingCriteria>;
	readonly matchingSet: string;
	readonly parameters: Array<CreateFlexoConceptInstanceParameter>;
}

export interface ControlStructureAction extends EditionAction, FMLControlGraph {
	readonly kind: "WhileAction"|"IncrementalIterationAction"|"AbstractIterationAction"|"IterationAction"|"ConditionalAction";
}

export interface FMLRTAction extends TechnologySpecificAction {
	readonly kind: "MatchFlexoConceptInstance"|"AbstractAddFlexoConceptInstance"|"AddFlexoConceptInstance"|"AddVirtualModelInstance"|"FireEventAction";
	readonly virtualModelInstance: string;
}

export interface GetSetProperty extends GetProperty {
	readonly kind: "GetSetProperty";
	readonly setControlGraph: FMLControlGraph;
	readonly valueVariableName: string;
}

export interface FMLObject extends FlexoObject {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"FMLRTAction"|"GetSetProperty"|"NotifyPropertyChangedAction"|"FlexoEvent"|"DefaultFMLControlGraphOwner"|"DeleteFlexoConceptInstanceParameter"|"FreeModelSlot"|"ExecuteBehaviourParameter"|"FlexoConceptObject"|"AbstractAddFlexoConceptInstance"|"FMLRTModelSlot"|"ExpressionAction"|"ModelSlot"|"GetProperty"|"InspectorEntry"|"WhileAction"|"CreationScheme"|"FlexoBehaviourObject"|"AssignableAction"|"ActionScheme"|"InnerConceptsFacet"|"ExpressionProperty"|"ReturnStatement"|"EmptyControlGraph"|"AddFlexoConceptInstanceParameter"|"AddToListAction"|"IncrementalIterationAction"|"AddFlexoConceptInstance"|"RemoveFromListAction"|"FlexoConcept"|"NavigationScheme"|"AbstractCreationScheme"|"CreateFlexoConceptInstanceParameter"|"FinalizeMatching"|"EditionAction"|"Condition"|"Sequence"|"AddVirtualModelInstance"|"VirtualModelObject"|"FMLControlGraph"|"FireEventAction"|"AddClassInstance"|"Inspector"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"FMLControlGraphOwner"|"IterationAction"|"DeclarationAction"|"FMLRTVirtualModelInstanceModelSlot"|"AssignationAction"|"GenericBehaviourParameter"|"FlexoConceptInstanceRole"|"FMLLocalizedDictionary"|"DeletionScheme"|"VirtualModel"|"SynchronizationScheme"|"MatchingCriteria"|"FlexoProperty"|"AbstractActionScheme"|"CloningScheme"|"FetchRequest"|"InitiateMatching"|"ModelSlotObject"|"AbstractProperty"|"DeleteAction"|"TypeAwareModelSlot"|"FlexoConceptBehaviouralFacet"|"SelectFlexoConceptInstance"|"PrimitiveRole"|"ConditionalAction"|"EventListener"|"MatchCondition"|"Constraint"|"TechnologySpecificAction"|"FlexoConceptStructuralFacet"|"LogAction"|"FlexoRole"|"FlexoBehaviour"|"Localized";
	readonly author: string;
	readonly description: string;
}

export interface NotifyPropertyChangedAction extends EditionAction {
	readonly kind: "NotifyPropertyChangedAction";
	readonly propertyName: string;
	readonly object: string;
}

export interface ResourceData extends Description<ResourceData> {
	readonly kind: "VirtualModel";
	readonly flexoResource: FlexoResource;
}

export interface FlexoEvent extends FlexoConcept {
	readonly kind: "FlexoEvent";
}

export interface DefaultFMLControlGraphOwner extends FMLControlGraphOwner {
	readonly kind: "DefaultFMLControlGraphOwner";
	readonly controlGraph: Description<FMLControlGraph>;
	readonly conceptObject: Description<FlexoConceptObject>;
}

export interface DeleteFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "DeleteFlexoConceptInstanceParameter";
	readonly action: DeleteFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface FreeModelSlot extends ModelSlot {
}

export interface ExecuteBehaviourParameter extends FlexoBehaviourObject {
	readonly kind: "ExecuteBehaviourParameter";
	readonly action: FinalizeMatching;
	readonly paramName: string;
	readonly value: string;
}

export interface FlexoConceptObject extends FMLObject {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"FMLRTAction"|"GetSetProperty"|"NotifyPropertyChangedAction"|"FlexoEvent"|"DefaultFMLControlGraphOwner"|"DeleteFlexoConceptInstanceParameter"|"FreeModelSlot"|"ExecuteBehaviourParameter"|"AbstractAddFlexoConceptInstance"|"FMLRTModelSlot"|"ExpressionAction"|"ModelSlot"|"GetProperty"|"InspectorEntry"|"WhileAction"|"CreationScheme"|"FlexoBehaviourObject"|"AssignableAction"|"ActionScheme"|"InnerConceptsFacet"|"ExpressionProperty"|"ReturnStatement"|"EmptyControlGraph"|"AddFlexoConceptInstanceParameter"|"AddToListAction"|"IncrementalIterationAction"|"AddFlexoConceptInstance"|"RemoveFromListAction"|"FlexoConcept"|"NavigationScheme"|"AbstractCreationScheme"|"CreateFlexoConceptInstanceParameter"|"FinalizeMatching"|"EditionAction"|"Condition"|"Sequence"|"AddVirtualModelInstance"|"VirtualModelObject"|"FMLControlGraph"|"FireEventAction"|"AddClassInstance"|"Inspector"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"FMLControlGraphOwner"|"IterationAction"|"DeclarationAction"|"FMLRTVirtualModelInstanceModelSlot"|"AssignationAction"|"GenericBehaviourParameter"|"FlexoConceptInstanceRole"|"DeletionScheme"|"VirtualModel"|"SynchronizationScheme"|"MatchingCriteria"|"FlexoProperty"|"AbstractActionScheme"|"CloningScheme"|"FetchRequest"|"InitiateMatching"|"ModelSlotObject"|"AbstractProperty"|"DeleteAction"|"TypeAwareModelSlot"|"FlexoConceptBehaviouralFacet"|"SelectFlexoConceptInstance"|"PrimitiveRole"|"ConditionalAction"|"EventListener"|"MatchCondition"|"Constraint"|"TechnologySpecificAction"|"FlexoConceptStructuralFacet"|"LogAction"|"FlexoRole"|"FlexoBehaviour";
}

export interface AbstractAddFlexoConceptInstance extends FMLRTAction {
	readonly kind: "AddFlexoConceptInstance"|"AddVirtualModelInstance"|"FireEventAction";
	readonly container: string;
	readonly creationSchemeURI: string;
	readonly parameters: Array<AddFlexoConceptInstanceParameter>;
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
	readonly kind: "FreeModelSlot"|"FMLRTModelSlot"|"FMLRTVirtualModelInstanceModelSlot"|"TypeAwareModelSlot";
	readonly isRequired: boolean;
	readonly isReadOnly: boolean;
}

export interface GetProperty extends FlexoProperty, FMLControlGraphOwner {
	readonly kind: "GetSetProperty"|"GetProperty";
	readonly getControlGraph: FMLControlGraph;
}

export interface InspectorEntry extends FlexoConceptObject {
	readonly kind: "InspectorEntry";
	readonly container: string;
	readonly readOnly: boolean;
	readonly widget: "TEXT_FIELD" | "TEXT_AREA" | "URI" | "LOCALIZED_TEXT_FIELD" | "INTEGER" | "FLOAT" | "CHECKBOX" | "DROPDOWN" | "RADIO_BUTTON" | "CUSTOM_WIDGET";
	readonly data: string;
	readonly label: string;
	readonly inspector: Inspector;
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

export interface FlexoBehaviourObject extends FlexoConceptObject {
	readonly kind: "DeleteFlexoConceptInstanceParameter"|"ExecuteBehaviourParameter"|"CreationScheme"|"ActionScheme"|"AddFlexoConceptInstanceParameter"|"NavigationScheme"|"AbstractCreationScheme"|"CreateFlexoConceptInstanceParameter"|"GenericBehaviourParameter"|"DeletionScheme"|"SynchronizationScheme"|"AbstractActionScheme"|"CloningScheme"|"EventListener"|"FlexoBehaviour";
}

export interface AssignableAction extends EditionAction {
	readonly kind: "MatchFlexoConceptInstance"|"FMLRTAction"|"AbstractAddFlexoConceptInstance"|"ExpressionAction"|"ReturnStatement"|"AddToListAction"|"AddFlexoConceptInstance"|"RemoveFromListAction"|"AddVirtualModelInstance"|"FireEventAction"|"AddClassInstance"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"DeclarationAction"|"AssignationAction"|"FetchRequest"|"InitiateMatching"|"DeleteAction"|"SelectFlexoConceptInstance"|"TechnologySpecificAction";
	readonly variableName: string;
	readonly assignation: string;
}

export interface ActionScheme extends AbstractActionScheme {
	readonly kind: "ActionScheme";
}

export interface InnerConceptsFacet extends FlexoConceptObject {
	readonly kind: "InnerConceptsFacet";
}

export interface ExpressionProperty extends FlexoProperty {
	readonly kind: "ExpressionProperty";
	readonly expression: string;
}

export interface ReturnStatement extends AbstractAssignationAction {
	readonly kind: "ReturnStatement";
}

export interface EmptyControlGraph extends FMLControlGraph {
	readonly kind: "EmptyControlGraph";
}

export interface AddFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "AddFlexoConceptInstanceParameter";
	readonly action: AbstractAddFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface AddToListAction extends AssignableAction, FMLControlGraphOwner {
	readonly kind: "AddToListAction";
	readonly list: string;
	readonly value: string;
	readonly assignableAction: AssignableAction;
}

export interface IncrementalIterationAction extends AbstractIterationAction {
	readonly kind: "IncrementalIterationAction";
	readonly exclusiveEndValue: string;
	readonly increment: string;
	readonly startValue: string;
}

export interface AddFlexoConceptInstance extends AbstractAddFlexoConceptInstance {
	readonly kind: "AddFlexoConceptInstance";
}

export interface RemoveFromListAction extends AssignableAction {
	readonly kind: "RemoveFromListAction";
	readonly list: string;
	readonly value: string;
}

export interface FlexoConcept extends FlexoConceptObject, VirtualModelObject {
	readonly kind: "FlexoEvent"|"VirtualModel"|"FlexoConcept";
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

export interface NavigationScheme extends AbstractActionScheme {
	readonly kind: "NavigationScheme";
	readonly targetObject: string;
}

export interface AbstractCreationScheme extends FlexoBehaviour {
	readonly kind: "CreationScheme"|"CloningScheme";
}

export interface CreateFlexoConceptInstanceParameter extends FlexoBehaviourObject {
	readonly kind: "CreateFlexoConceptInstanceParameter";
	readonly action: MatchFlexoConceptInstance;
	readonly paramName: string;
	readonly value: string;
}

export interface UseModelSlotDeclaration extends FlexoObject {
	readonly kind: "UseModelSlotDeclaration";
	readonly modelSlotClass: string;
	readonly virtualModel: Description<VirtualModel>;
}

export interface FinalizeMatching extends EditionAction {
	readonly kind: "FinalizeMatching";
	readonly container: string;
	readonly flexoBehaviourURI: string;
	readonly matchingSet: string;
	readonly flexoConceptTypeURI: string;
	readonly parameters: Array<ExecuteBehaviourParameter>;
}

export interface EditionAction extends FMLControlGraph {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"FMLRTAction"|"NotifyPropertyChangedAction"|"AbstractAddFlexoConceptInstance"|"ExpressionAction"|"WhileAction"|"AssignableAction"|"ReturnStatement"|"AddToListAction"|"IncrementalIterationAction"|"AddFlexoConceptInstance"|"RemoveFromListAction"|"FinalizeMatching"|"AddVirtualModelInstance"|"FireEventAction"|"AddClassInstance"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"IterationAction"|"DeclarationAction"|"AssignationAction"|"FetchRequest"|"InitiateMatching"|"DeleteAction"|"SelectFlexoConceptInstance"|"ConditionalAction"|"TechnologySpecificAction"|"LogAction";
}

export interface Condition extends FlexoConceptObject {
	readonly kind: "Condition";
	readonly condition: string;
	readonly action: FetchRequest;
}

export interface Sequence extends FMLControlGraph, FMLControlGraphOwner {
	readonly kind: "Sequence";
	readonly controlGraph2: FMLControlGraph;
	readonly controlGraph1: FMLControlGraph;
}

export interface AddVirtualModelInstance extends AbstractAddFlexoConceptInstance {
	readonly kind: "AddVirtualModelInstance";
	readonly virtualModelInstanceTitle: string;
	readonly virtualModelInstanceName: string;
}

export interface VirtualModelObject extends FlexoConceptObject {
	readonly kind: "FlexoEvent"|"FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FlexoConcept"|"FMLRTVirtualModelInstanceModelSlot"|"VirtualModel"|"ModelSlotObject"|"TypeAwareModelSlot";
}

export interface FMLControlGraph extends FlexoConceptObject {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"FMLRTAction"|"NotifyPropertyChangedAction"|"AbstractAddFlexoConceptInstance"|"ExpressionAction"|"WhileAction"|"AssignableAction"|"ReturnStatement"|"EmptyControlGraph"|"AddToListAction"|"IncrementalIterationAction"|"AddFlexoConceptInstance"|"RemoveFromListAction"|"FinalizeMatching"|"EditionAction"|"Sequence"|"AddVirtualModelInstance"|"FireEventAction"|"AddClassInstance"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"IterationAction"|"DeclarationAction"|"AssignationAction"|"FetchRequest"|"InitiateMatching"|"DeleteAction"|"SelectFlexoConceptInstance"|"ConditionalAction"|"TechnologySpecificAction"|"LogAction";
	readonly owner: Description<FMLControlGraphOwner>;
	readonly ownerContext: string;
}

export interface FireEventAction extends AbstractAddFlexoConceptInstance {
	readonly kind: "FireEventAction";
}

export interface FlexoObject extends Description<FlexoObject> {
	readonly kind: "MatchFlexoConceptInstance"|"ControlStructureAction"|"FMLRTAction"|"GetSetProperty"|"FMLObject"|"NotifyPropertyChangedAction"|"FlexoEvent"|"DefaultFMLControlGraphOwner"|"DeleteFlexoConceptInstanceParameter"|"FreeModelSlot"|"ExecuteBehaviourParameter"|"FlexoConceptObject"|"AbstractAddFlexoConceptInstance"|"FMLRTModelSlot"|"ExpressionAction"|"ModelSlot"|"GetProperty"|"InspectorEntry"|"WhileAction"|"CreationScheme"|"FlexoBehaviourObject"|"AssignableAction"|"ActionScheme"|"InnerConceptsFacet"|"ExpressionProperty"|"ReturnStatement"|"EmptyControlGraph"|"AddFlexoConceptInstanceParameter"|"AddToListAction"|"IncrementalIterationAction"|"AddFlexoConceptInstance"|"RemoveFromListAction"|"FlexoConcept"|"NavigationScheme"|"AbstractCreationScheme"|"CreateFlexoConceptInstanceParameter"|"UseModelSlotDeclaration"|"FinalizeMatching"|"EditionAction"|"Condition"|"Sequence"|"AddVirtualModelInstance"|"VirtualModelObject"|"FMLControlGraph"|"FireEventAction"|"AddClassInstance"|"Inspector"|"DeleteFlexoConceptInstance"|"AbstractAssignationAction"|"AbstractIterationAction"|"FMLControlGraphOwner"|"IterationAction"|"DeclarationAction"|"FMLRTVirtualModelInstanceModelSlot"|"AssignationAction"|"GenericBehaviourParameter"|"FlexoConceptInstanceRole"|"FMLLocalizedDictionary"|"DeletionScheme"|"VirtualModel"|"SynchronizationScheme"|"MatchingCriteria"|"FlexoProperty"|"AbstractActionScheme"|"CloningScheme"|"FetchRequest"|"InitiateMatching"|"ModelSlotObject"|"AbstractProperty"|"DeleteAction"|"TypeAwareModelSlot"|"FlexoConceptBehaviouralFacet"|"SelectFlexoConceptInstance"|"PrimitiveRole"|"ConditionalAction"|"EventListener"|"MatchCondition"|"Constraint"|"TechnologySpecificAction"|"FlexoConceptStructuralFacet"|"LogAction"|"FlexoRole"|"FlexoBehaviour"|"Localized";
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
	readonly flexo_concept: FlexoConcept;
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

export interface FMLControlGraphOwner extends FlexoConceptObject {
	readonly kind: "GetSetProperty"|"DefaultFMLControlGraphOwner"|"GetProperty"|"WhileAction"|"CreationScheme"|"ActionScheme"|"ReturnStatement"|"AddToListAction"|"IncrementalIterationAction"|"NavigationScheme"|"AbstractCreationScheme"|"Sequence"|"AbstractAssignationAction"|"AbstractIterationAction"|"IterationAction"|"DeclarationAction"|"AssignationAction"|"DeletionScheme"|"SynchronizationScheme"|"AbstractActionScheme"|"CloningScheme"|"ConditionalAction"|"EventListener"|"FlexoBehaviour";
}

export interface IterationAction extends AbstractIterationAction {
	readonly kind: "IterationAction";
	readonly iteratorName: string;
	readonly iterationControlGraph: AssignableAction;
	readonly iteration: string;
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

export interface FlexoConceptInstanceRole extends FlexoRole {
	readonly kind: "FlexoConceptInstanceRole";
	readonly creationSchemeURI: string;
	readonly virtualModelInstance: string;
	readonly flexoConceptTypeURI: string;
}

export interface FMLLocalizedDictionary extends FMLObject {
	readonly kind: "FMLLocalizedDictionary";
	readonly owner: VirtualModel;
	readonly localizedEntries: Array<Localized>;
}

export interface DeletionScheme extends AbstractActionScheme {
	readonly kind: "DeletionScheme";
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

export interface SynchronizationScheme extends AbstractActionScheme {
	readonly kind: "SynchronizationScheme";
}

export interface MatchingCriteria extends FlexoConceptObject {
	readonly kind: "MatchingCriteria";
	readonly patternRoleName: string;
	readonly action: MatchFlexoConceptInstance;
	readonly value: string;
}

export interface FlexoProperty extends FlexoConceptObject {
	readonly kind: "GetSetProperty"|"FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"GetProperty"|"ExpressionProperty"|"FMLRTVirtualModelInstanceModelSlot"|"FlexoConceptInstanceRole"|"AbstractProperty"|"TypeAwareModelSlot"|"PrimitiveRole"|"FlexoRole";
	readonly propertyName: string;
	readonly flexoConcept: Description<FlexoConcept>;
}

export interface AbstractActionScheme extends FlexoBehaviour {
	readonly kind: "ActionScheme"|"NavigationScheme"|"DeletionScheme"|"SynchronizationScheme"|"EventListener";
	readonly conditional: string;
}

export interface CloningScheme extends AbstractCreationScheme {
	readonly kind: "CloningScheme";
}

export interface FetchRequest extends TechnologySpecificAction {
	readonly kind: "SelectFlexoConceptInstance";
	readonly conditions: Array<Condition>;
}

export interface InitiateMatching extends AssignableAction {
	readonly kind: "InitiateMatching";
	readonly container: string;
	readonly flexoConceptTypeURI: string;
	readonly conditions: Array<MatchCondition>;
}

export interface ModelSlotObject extends VirtualModelObject {
	readonly kind: "FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FMLRTVirtualModelInstanceModelSlot"|"TypeAwareModelSlot";
}

export interface AbstractProperty extends FlexoProperty {
	readonly kind: "AbstractProperty";
	readonly readOnly: boolean;
	readonly type: string;
}

export interface DeleteAction extends EditionAction, AssignableAction {
	readonly kind: "DeleteFlexoConceptInstance"|"DeleteAction";
	readonly object: string;
}

export interface TypeAwareModelSlot extends ModelSlot {
	readonly metaModelURI: string;
}

export interface FlexoConceptBehaviouralFacet extends FlexoConceptObject {
	readonly kind: "FlexoConceptBehaviouralFacet";
}

export interface SelectFlexoConceptInstance extends FetchRequest {
	readonly kind: "SelectFlexoConceptInstance";
	readonly container: string;
	readonly flexoConceptTypeURI: string;
}

export interface PrimitiveRole extends FlexoRole {
	readonly kind: "PrimitiveRole";
	readonly primitiveType: "Boolean" | "String" | "Integer" | "Float" | "Double";
}

export interface ConditionalAction extends ControlStructureAction, FMLControlGraphOwner {
	readonly kind: "ConditionalAction";
	readonly condition: string;
	readonly elseControlGraph: FMLControlGraph;
	readonly thenControlGraph: FMLControlGraph;
}

export interface EventListener extends AbstractActionScheme {
	readonly kind: "EventListener";
	readonly listenedVirtualModelInstance: string;
	readonly flexoEventTypeURI: string;
	readonly eventType: Description<FlexoEvent>;
}

export interface MatchCondition extends FlexoConceptObject {
	readonly kind: "MatchCondition";
	readonly condition: string;
	readonly action: InitiateMatching;
}

export interface Constraint extends FlexoConceptObject {
	readonly kind: "Constraint";
	readonly flexoConcept: Description<FlexoConcept>;
	readonly constraint: string;
}

export interface TechnologySpecificAction extends AssignableAction {
	readonly kind: "MatchFlexoConceptInstance"|"FMLRTAction"|"AbstractAddFlexoConceptInstance"|"AddFlexoConceptInstance"|"AddVirtualModelInstance"|"FireEventAction"|"FetchRequest"|"SelectFlexoConceptInstance";
	readonly modelSlot: ModelSlot;
	readonly receiver: string;
}

export interface FlexoConceptStructuralFacet extends FlexoConceptObject {
	readonly kind: "FlexoConceptStructuralFacet";
}

export interface LogAction extends EditionAction {
	readonly kind: "LogAction";
	readonly logLevel: "SEVERE" | "WARNING" | "INFO" | "FINE" | "FINER" | "FINEST" | "DEBUG";
	readonly logString: string;
}

export interface FlexoRole extends FlexoProperty {
	readonly kind: "FreeModelSlot"|"FMLRTModelSlot"|"ModelSlot"|"FMLRTVirtualModelInstanceModelSlot"|"FlexoConceptInstanceRole"|"TypeAwareModelSlot"|"PrimitiveRole";
	readonly container: string;
	readonly modelSlot: ModelSlot;
	readonly isRequired: boolean;
	readonly cloningStrategy: "Clone" | "Reference" | "Ignore" | "Factory";
	readonly defaultValue: string;
	readonly roleName: string;
	readonly cardinality: "ZeroOne" | "One" | "ZeroMany" | "OneMany";
}

export interface FlexoBehaviour extends FlexoBehaviourObject, FMLControlGraphOwner {
	readonly kind: "CreationScheme"|"ActionScheme"|"NavigationScheme"|"AbstractCreationScheme"|"DeletionScheme"|"SynchronizationScheme"|"AbstractActionScheme"|"CloningScheme"|"EventListener";
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

export interface Localized extends FMLObject {
	readonly kind: "Localized";
	readonly localizedDictionary: FMLLocalizedDictionary;
	readonly lang: string;
	readonly value: string;
	readonly key: string;
}
