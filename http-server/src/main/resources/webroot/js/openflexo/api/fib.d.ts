import { Description } from "./general";

export interface FIBBrowserAction extends FIBModelObject {
	readonly owner: BrowserElement;
	readonly isAvailable: string;
	readonly method: string;
}

export interface Dependancy extends FIBModelObject {
	readonly owner: FIBComponent;
	readonly componentName: string;
}

export interface CustomColumn extends FIBTableColumn {
	readonly customRendering: boolean;
	readonly disableTerminateEditOnFocusLost: boolean;
	readonly assignments: Array<ColumnAssignment>;
	readonly componentClassName: string;
}

export interface CustomAction extends FIBTableAction {
	readonly isStatic: boolean;
}

export interface FIBDiscretePolarFunctionGraph extends FIBPolarFunctionGraph {
	readonly values: string;
	readonly angleExtent: string;
	readonly labels: string;
}

export interface TextFieldColumn extends FIBTableColumn {
	readonly isEditable: string;
}

export interface TextField extends FIBTextWidget {
	readonly passwd: boolean;
}

export interface FIBSplit extends FIBNode {
	readonly children: Array<FIBNode>;
	readonly name: string;
	readonly weight: number;
}

export interface TextArea extends FIBTextWidget {
	readonly rows: number;
}

export interface FIBContinuousPolarFunctionGraph extends FIBPolarFunctionGraph {
	readonly stepsNumber: string;
	readonly angleTickSpacing: string;
	readonly displayAngleTicks: boolean;
}

export interface RadioButtonList extends FIBMultipleValues {
	readonly trimText: boolean;
}

export interface FIBSimpleFunctionGraph extends FIBSingleParameteredGraph {
	readonly parameterOrientation: "HORIZONTAL" | "VERTICAL";
}

export interface DropDown extends FIBMultipleValues {
	readonly showReset: boolean;
}

export interface Label extends FIBWidget {
	readonly label: string;
	readonly align: "left" | "right" | "center";
	readonly trimText: boolean;
}

export interface FIBWidget extends FIBComponent {
	readonly localize: boolean;
	readonly manageDynamicModel: boolean;
	readonly tooltipText: string;
	readonly valueChangedAction: string;
	readonly icon: string;
	readonly format: string;
	readonly tooltip: string;
	readonly readOnly: boolean;
	readonly enable: string;
	readonly rightClickAction: string;
	readonly enterPressedAction: string;
	readonly valueTransform: string;
	readonly doubleClickAction: string;
	readonly valueValidator: string;
	readonly data: string;
	readonly clickAction: string;
}

export interface RowSplit extends FIBSplit {
}

export interface Assignment extends FIBModelObject {
	readonly owner: Custom;
	readonly variable: string;
	readonly value: string;
	readonly mandatory: boolean;
}

export interface Tab extends Panel {
	readonly title: string;
}

export interface Custom extends FIBWidget {
	readonly assignments: Array<Assignment>;
	readonly componentClassName: string;
	readonly dataClassForComponent: string;
}

export interface FIBDiscreteFunction extends FIBGraphFunction {
}

export interface ReferenceAssignment extends FIBModelObject {
	readonly owner: FIBReferencedComponent;
	readonly variable: string;
	readonly value: string;
	readonly mandatory: boolean;
}

export interface FIBTableColumn extends FIBModelObject {
	readonly owner: Table;
	readonly color: string;
	readonly data: string;
	readonly tooltipText: string;
	readonly resizable: boolean;
	readonly valueChangedAction: string;
	readonly icon: string;
	readonly format: string;
	readonly tooltip: string;
	readonly title: string;
	readonly displayTitle: boolean;
	readonly bgColor: string;
	readonly columnWidth: number;
	readonly showIcon: boolean;
	readonly font: string;
}

export interface Leaf extends FIBNode {
	readonly name: string;
	readonly weight: number;
}

export interface Number extends FIBWidget {
	readonly minValue: number;
	readonly numberType: "ByteType" | "ShortType" | "IntegerType" | "LongType" | "FloatType" | "DoubleType";
	readonly columns: number;
	readonly maxValue: number;
	readonly increment: number;
	readonly validateOnReturn: boolean;
	readonly allowsNull: boolean;
}

export interface FIBGraph extends FIBWidget {
	readonly borderLeft: number;
	readonly functions: Array<FIBGraphFunction>;
	readonly borderRight: number;
	readonly borderTop: number;
	readonly borderBottom: number;
}

export interface DropDownColumn extends FIBTableColumn {
	readonly data: string;
	readonly array: string;
	readonly staticList: string;
	readonly list: string;
}

export interface FIBSingleParameteredGraph extends FIBGraph {
	readonly parameterName: string;
}

export interface SplitPanel extends FIBContainer {
	readonly split: FIBSplit;
}

export interface File extends FIBWidget {
	readonly filter: string;
	readonly mode: "OpenMode" | "SaveMode";
	readonly columns: number;
	readonly defaultDirectory: string;
	readonly title: string;
	readonly isDirectory: boolean;
}

export interface Browser extends FIBWidget {
	readonly backgroundSelectionColor: string;
	readonly visibleRowCount: number;
	readonly boundToSelectionManager: boolean;
	readonly backgroundNonSelectionColor: string;
	readonly iteratorClassName: string;
	readonly textSelectionColor: string;
	readonly backgroundSecondarySelectionColor: string;
	readonly showRootsHandle: boolean;
	readonly showFooter: boolean;
	readonly selection: string;
	readonly allowsDragAndDrop: boolean;
	readonly textNonSelectionColor: string;
	readonly root: string;
	readonly elements: Array<BrowserElement>;
	readonly borderSelectionColor: string;
	readonly deepExploration: boolean;
	readonly selectionMode: "SingleTreeSelection" | "ContiguousTreeSelection" | "DiscontiguousTreeSelection";
	readonly selected: string;
	readonly rootVisible: boolean;
	readonly rowHeight: number;
}

export interface Font extends FIBWidget {
	readonly allowsNullText: string;
	readonly allowsNull: boolean;
	readonly sampleText: string;
}

export interface CheckboxList extends FIBMultipleValues {
	readonly trimText: boolean;
}

export interface EditorPane extends FIBTextWidget {
	readonly contentType: "PLAIN" | "HTML" | "RTF";
}

export interface BrowserAddAction extends FIBBrowserAction {
}

export interface FIBGraphFunction extends FIBModelObject {
	readonly owner: FIBGraph;
	readonly expression: string;
	readonly graphType: "POINTS" | "POLYLIN" | "RECT_POLYLIN" | "CURVE" | "BAR_GRAPH" | "COLORED_STEPS" | "SECTORS";
	readonly stepsSpacing: number;
	readonly foregroundColor: string;
	readonly backgroundColor1: string;
	readonly backgroundColor2: string;
	readonly backgroundType: "COLORED" | "GRADIENT" | "NONE";
	readonly angleSpacing: number;
}

export interface HTMLEditor extends FIBWidget {
	readonly optionsInLine3: Array<Option>;
	readonly optionsInLine1: Array<Option>;
	readonly optionsInLine2: Array<Option>;
	readonly visibleAndUnusedOptions: Array<Option>;
}

export interface FIBVariable extends FIBModelObject {
	readonly owner: FIBComponent;
	readonly type: string;
	readonly value: string;
	readonly mandatory: boolean;
}

export interface ColumnAssignment extends FIBModelObject {
	readonly owner: CustomColumn;
	readonly variable: string;
	readonly value: string;
	readonly mandatory: boolean;
}

export interface DragOperation extends FIBModelObject {
	readonly owner: BrowserElement;
	readonly isAvailable: string;
	readonly targetElementName: string;
	readonly action: string;
	readonly targetElement: BrowserElement;
}

export interface CheckBoxColumn extends FIBTableColumn {
}

export interface FIBPolarFunctionGraph extends FIBSingleParameteredGraph {
	readonly displayLabels: boolean;
	readonly displayGrid: boolean;
	readonly displayReferenceMarks: boolean;
}

export interface ButtonColumn extends FIBTableColumn {
	readonly action: string;
	readonly enabled: string;
}

export interface BrowserCustomAction extends FIBBrowserAction {
	readonly isStatic: boolean;
}

export interface FIBNumericFunction extends FIBGraphFunction {
	readonly displayLabels: boolean;
	readonly stepsNumber: string;
	readonly minValue: string;
	readonly maxValue: string;
	readonly majorTickSpacing: string;
	readonly displayMajorTicks: boolean;
	readonly minorTickSpacing: string;
	readonly displayMinorTicks: boolean;
}

export interface Color extends FIBWidget {
	readonly allowsNullText: string;
	readonly allowsNull: boolean;
}

export interface Button extends FIBWidget {
	readonly dynamicLabel: string;
	readonly default: boolean;
	readonly buttonIcon: string;
	readonly buttonType: "Trigger" | "Toggle";
	readonly action: string;
	readonly label: string;
}

export interface NumberColumn extends FIBTableColumn {
	readonly numberType: "ByteType" | "ShortType" | "IntegerType" | "LongType" | "FloatType" | "DoubleType";
}

export interface FIBContainer extends FIBComponent {
	readonly data: string;
	readonly dataClassName: string;
	readonly subComponents: Array<FIBComponent>;
}

export interface FIBDiscreteTwoLevelsPolarFunctionGraph extends FIBDiscretePolarFunctionGraph {
	readonly secondaryLabels: string;
	readonly primaryParameterName: string;
	readonly secondaryParameterName: string;
	readonly displaySecondaryLabels: boolean;
	readonly secondaryValues: string;
	readonly secondaryAngleExtent: string;
}

export interface Table extends FIBWidget {
	readonly backgroundSelectionColor: string;
	readonly visibleRowCount: number;
	readonly boundToSelectionManager: boolean;
	readonly backgroundNonSelectionColor: string;
	readonly iteratorClassName: string;
	readonly columns: Array<FIBTableColumn>;
	readonly showHeader: boolean;
	readonly textSelectionColor: string;
	readonly backgroundSecondarySelectionColor: string;
	readonly showFooter: boolean;
	readonly autoSelectFirstRow: boolean;
	readonly lookAndFeel: "Classic" | "FlatDesign";
	readonly textNonSelectionColor: string;
	readonly createNewRowOnClick: boolean;
	readonly actions: Array<FIBTableAction>;
	readonly selectionMode: "SingleSelection" | "SingleIntervalSelection" | "MultipleIntervalSelection";
	readonly selected: string;
	readonly rowHeight: number;
}

export interface Panel extends FIBContainer {
	readonly borderColor: string;
	readonly align: "left" | "right" | "center";
	readonly borderTop: number;
	readonly borderTitle: string;
	readonly flowAlignment: "LEFT" | "RIGHT" | "CENTER" | "LEADING" | "TRAILING";
	readonly borderLeft: number;
	readonly imageFile: string;
	readonly trackViewPortHeight: boolean;
	readonly protectContent: boolean;
	readonly trackViewPortWidth: boolean;
	readonly borderBottom: number;
	readonly cols: number;
	readonly boxLayoutAxis: "X_AXIS" | "Y_AXIS";
	readonly border: "empty" | "line" | "etched" | "raised" | "lowered" | "titled" | "rounded3d";
	readonly imageWidth: number;
	readonly sizeAdjustment: "OriginalSize" | "FitToAvailableSize" | "FitToAvailableSizeRespectRatio" | "AdjustWidth" | "AdjustHeight" | "AdjustDimensions";
	readonly darkLevel: number;
	readonly titleFont: string;
	readonly rows: number;
	readonly imageHeight: number;
	readonly layout: "none" | "flow" | "border" | "grid" | "box" | "twocols" | "gridbag" | "buttons" | "split";
	readonly borderRight: number;
	readonly vGap: number;
	readonly dynamicBackgroundImage: string;
	readonly hGap: number;
}

export interface FIBTableAction extends FIBModelObject {
	readonly owner: Table;
	readonly isAvailable: string;
	readonly method: string;
}

export interface Children extends FIBModelObject {
	readonly owner: BrowserElement;
	readonly cast: string;
	readonly visible: string;
	readonly data: string;
}

export interface ColSplit extends FIBSplit {
}

export interface Localized extends FIBModelObject {
	readonly dictionary: LocalizedDictionary;
	readonly lang: string;
	readonly value: string;
	readonly key: string;
}

export interface Image extends FIBWidget {
	readonly imageWidth: number;
	readonly sizeAdjustment: "OriginalSize" | "FitToAvailableSize" | "FitToAvailableSizeRespectRatio" | "AdjustWidth" | "AdjustHeight" | "AdjustDimensions";
	readonly imageFile: string;
	readonly align: "left" | "right" | "center";
	readonly imageHeight: number;
}

export interface FIBDiscreteSimpleFunctionGraph extends FIBSimpleFunctionGraph {
	readonly values: string;
	readonly labels: string;
}

export interface FIBMultipleValues extends FIBWidget {
	readonly autoSelectFirstRow: boolean;
	readonly array: string;
	readonly staticList: string;
	readonly iteratorClassName: string;
	readonly showText: boolean;
	readonly list: string;
	readonly showIcon: boolean;
}

export interface TabPanel extends FIBContainer {
	readonly restrictPreferredSizeToSelectedComponent: boolean;
}

export interface LocalizedDictionary extends FIBModelObject {
	readonly owner: FIBComponent;
	readonly localizedEntries: Array<Localized>;
}

export interface FIBContinuousSimpleFunctionGraph extends FIBSimpleFunctionGraph {
	readonly displayLabels: boolean;
	readonly displayGrid: boolean;
	readonly stepsNumber: string;
	readonly minValue: string;
	readonly maxValue: string;
	readonly majorTickSpacing: string;
	readonly displayMajorTicks: boolean;
	readonly minorTickSpacing: string;
	readonly displayMinorTicks: boolean;
	readonly displayReferenceMarks: boolean;
}

export interface CheckBox extends FIBWidget {
	readonly negate: boolean;
	readonly selected: boolean;
}

export interface Option extends FIBModelObject {
	readonly editor: HTMLEditor;
	readonly index: number;
	readonly isVisible: boolean;
}

export interface FIBTextWidget extends FIBWidget {
	readonly columns: number;
	readonly editable: string;
	readonly validateOnReturn: boolean;
	readonly text: string;
}

export interface AddAction extends FIBTableAction {
}

export interface BrowserElement extends FIBModelObject {
	readonly owner: Browser;
	readonly dynamicFont: string;
	readonly dragOperations: Array<DragOperation>;
	readonly visible: string;
	readonly dataClassName: string;
	readonly icon: string;
	readonly tooltip: string;
	readonly label: string;
	readonly enabled: string;
	readonly editableLabel: string;
	readonly isEditable: boolean;
	readonly filtered: boolean;
	readonly children: Array<Children>;
	readonly imageIconResource: string;
	readonly defaultVisible: boolean;
	readonly selectedDynamicColor: string;
	readonly actions: Array<FIBBrowserAction>;
	readonly nonSelectedDynamicColor: string;
	readonly font: string;
}

export interface Parameter extends Description<Parameter> {
	readonly name: string;
	readonly value: string;
}

export interface FIBComponent extends FIBModelObject {
	readonly useScrollBar: boolean;
	readonly parent: FIBContainer;
	readonly verticalScrollbarPolicy: "VERTICAL_SCROLLBAR_AS_NEEDED" | "VERTICAL_SCROLLBAR_NEVER" | "VERTICAL_SCROLLBAR_ALWAYS";
	readonly localizedDictionary: LocalizedDictionary;
	readonly constraints: string;
	readonly minHeight: number;
	readonly horizontalScrollbarPolicy: "HORIZONTAL_SCROLLBAR_AS_NEEDED" | "HORIZONTAL_SCROLLBAR_NEVER" | "HORIZONTAL_SCROLLBAR_ALWAYS";
	readonly maxHeight: number;
	readonly height: number;
	readonly maxWidth: number;
	readonly backgroundColor: string;
	readonly controllerClass: string;
	readonly variables: Array<FIBVariable>;
	readonly visible: string;
	readonly opaque: boolean;
	readonly index: number;
	readonly minWidth: number;
	readonly foregroundColor: string;
	readonly explicitDependancies: Array<Dependancy>;
	readonly width: number;
	readonly controllerClassName: string;
	readonly font: string;
}

export interface RemoveAction extends FIBTableAction {
}

export interface FIBModelObject extends Description<FIBModelObject> {
	readonly name: string;
	readonly description: string;
	readonly parameters: Array<Parameter>;
}

export interface Divider extends FIBNode {
}

export interface IconColumn extends FIBTableColumn {
}

export interface BrowserRemoveAction extends FIBBrowserAction {
}

export interface LabelColumn extends FIBTableColumn {
}

export interface FIBNode extends Description<FIBNode> {
}

export interface List extends FIBMultipleValues {
	readonly backgroundSelectionColor: string;
	readonly visibleRowCount: number;
	readonly boundToSelectionManager: boolean;
	readonly backgroundNonSelectionColor: string;
	readonly textSelectionColor: string;
	readonly textNonSelectionColor: string;
	readonly backgroundSecondarySelectionColor: string;
	readonly createNewRowOnClick: boolean;
	readonly layoutOrientation: "vertical" | "horizontal" | "jesaispas";
	readonly selectionMode: "SingleSelection" | "SingleIntervalSelection" | "MultipleIntervalSelection";
	readonly selected: string;
	readonly rowHeight: number;
}

export interface FIBReferencedComponent extends FIBWidget {
	readonly dynamicComponentFile: string;
	readonly assignments: Array<ReferenceAssignment>;
	readonly dynamicComponent: string;
	readonly componentFile: string;
	readonly controllerFactory: string;
}

export interface Editor extends FIBTextWidget {
	readonly syntaxStyle: "None" | "BatchFile" | "C" | "CC" | "IDL" | "JavaScript" | "Java" | "Eiffel" | "HTML" | "Patch" | "Perl" | "PHP" | "Props" | "Python" | "ShellScript" | "SQL" | "TSQL" | "TeX" | "WOD" | "XML" | "FML";
	readonly rows: number;
}
