import { Description } from "./general";

export interface FIBReferencedComponent extends FIBWidget {
	readonly kind: "FIBReferencedComponent";
	readonly dynamicComponentFile: string;
	readonly assignments: Array<Description<ReferenceAssignment>>;
	readonly dynamicComponent: string;
	readonly componentFile: string;
	readonly controllerFactory: string;
}

export interface Label extends FIBWidget {
	readonly kind: "Label";
	readonly label: string;
	readonly align: "left" | "right" | "center";
	readonly trimText: boolean;
}

export interface LabelColumn extends FIBTableColumn {
	readonly kind: "LabelColumn";
}

export interface FIBGraphFunction extends FIBModelObject {
	readonly kind: "FIBNumericFunction"|"FIBDiscreteFunction";
	readonly owner: Description<FIBGraph>;
	readonly expression: string;
	readonly graphType: "POINTS" | "POLYLIN" | "RECT_POLYLIN" | "CURVE" | "BAR_GRAPH" | "COLORED_STEPS" | "SECTORS";
	readonly stepsSpacing: number;
	readonly foregroundColor: string;
	readonly backgroundColor1: string;
	readonly backgroundColor2: string;
	readonly backgroundType: "COLORED" | "GRADIENT" | "NONE";
	readonly angleSpacing: number;
}

export interface FIBContinuousSimpleFunctionGraph extends FIBSimpleFunctionGraph {
	readonly kind: "FIBContinuousSimpleFunctionGraph";
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

export interface Option extends FIBModelObject {
	readonly kind: "Option";
	readonly editor: Description<HTMLEditor>;
	readonly index: number;
	readonly isVisible: boolean;
}

export interface DropDown extends FIBMultipleValues {
	readonly kind: "DropDown";
	readonly showReset: boolean;
}

export interface FIBDiscreteSimpleFunctionGraph extends FIBSimpleFunctionGraph {
	readonly kind: "FIBDiscreteSimpleFunctionGraph";
	readonly values: string;
	readonly labels: string;
}

export interface TextField extends FIBTextWidget {
	readonly kind: "TextField";
	readonly passwd: boolean;
}

export interface FIBSplit extends FIBNode {
	readonly kind: "ColSplit"|"RowSplit";
	readonly children: Array<Description<FIBNode>>;
	readonly name: string;
	readonly weight: number;
}

export interface RadioButtonList extends FIBMultipleValues {
	readonly kind: "RadioButtonList";
	readonly trimText: boolean;
}

export interface FIBContinuousPolarFunctionGraph extends FIBPolarFunctionGraph {
	readonly kind: "FIBContinuousPolarFunctionGraph";
	readonly stepsNumber: string;
	readonly angleTickSpacing: string;
	readonly displayAngleTicks: boolean;
}

export interface FIBMultipleValues extends FIBWidget {
	readonly kind: "DropDown"|"RadioButtonList"|"CheckboxList"|"List";
	readonly autoSelectFirstRow: boolean;
	readonly array: string;
	readonly staticList: string;
	readonly iteratorClassName: string;
	readonly showText: boolean;
	readonly list: string;
	readonly showIcon: boolean;
}

export interface RemoveAction extends FIBTableAction {
	readonly kind: "RemoveAction";
}

export interface FIBSingleParameteredGraph extends FIBGraph {
	readonly kind: "FIBContinuousSimpleFunctionGraph"|"FIBDiscreteSimpleFunctionGraph"|"FIBContinuousPolarFunctionGraph"|"FIBPolarFunctionGraph"|"FIBDiscreteTwoLevelsPolarFunctionGraph"|"FIBSimpleFunctionGraph"|"FIBDiscretePolarFunctionGraph";
	readonly parameterName: string;
}

export interface HTMLEditor extends FIBWidget {
	readonly kind: "HTMLEditor";
	readonly optionsInLine3: Array<Description<Option>>;
	readonly optionsInLine1: Array<Description<Option>>;
	readonly optionsInLine2: Array<Description<Option>>;
	readonly visibleAndUnusedOptions: Array<Description<Option>>;
}

export interface Divider extends FIBNode {
	readonly kind: "Divider";
}

export interface Children extends FIBModelObject {
	readonly kind: "Children";
	readonly owner: Description<BrowserElement>;
	readonly cast: string;
	readonly visible: string;
	readonly data: string;
}

export interface ColSplit extends FIBSplit {
	readonly kind: "ColSplit";
}

export interface Assignment extends FIBModelObject {
	readonly kind: "Assignment";
	readonly owner: Description<Custom>;
	readonly variable: string;
	readonly value: string;
	readonly mandatory: boolean;
}

export interface FIBPolarFunctionGraph extends FIBSingleParameteredGraph {
	readonly kind: "FIBContinuousPolarFunctionGraph"|"FIBDiscreteTwoLevelsPolarFunctionGraph"|"FIBDiscretePolarFunctionGraph";
	readonly displayLabels: boolean;
	readonly displayGrid: boolean;
	readonly displayReferenceMarks: boolean;
}

export interface IconColumn extends FIBTableColumn {
	readonly kind: "IconColumn";
}

export interface FIBTextWidget extends FIBWidget {
	readonly kind: "TextField"|"EditorPane"|"TextArea"|"Editor";
	readonly columns: number;
	readonly editable: string;
	readonly validateOnReturn: boolean;
	readonly text: string;
}

export interface FIBModelObject extends Description<FIBModelObject> {
	readonly kind: "FIBReferencedComponent"|"Label"|"LabelColumn"|"FIBGraphFunction"|"FIBContinuousSimpleFunctionGraph"|"Option"|"DropDown"|"FIBDiscreteSimpleFunctionGraph"|"TextField"|"RadioButtonList"|"FIBContinuousPolarFunctionGraph"|"FIBMultipleValues"|"RemoveAction"|"FIBSingleParameteredGraph"|"HTMLEditor"|"Children"|"Assignment"|"FIBPolarFunctionGraph"|"IconColumn"|"FIBTextWidget"|"Font"|"FIBNumericFunction"|"FIBDiscreteTwoLevelsPolarFunctionGraph"|"Image"|"ButtonColumn"|"TabPanel"|"FIBBrowserAction"|"Dependancy"|"File"|"SplitPanel"|"CheckboxList"|"ColumnAssignment"|"Panel"|"FIBTableColumn"|"FIBSimpleFunctionGraph"|"Table"|"BrowserRemoveAction"|"FIBVariable"|"NumberColumn"|"FIBGraph"|"FIBWidget"|"BrowserCustomAction"|"FIBDiscreteFunction"|"LocalizedDictionary"|"List"|"CheckBoxColumn"|"Localized"|"Tab"|"FIBContainer"|"Number"|"FIBComponent"|"Button"|"AddAction"|"FIBDiscretePolarFunctionGraph"|"Color"|"CustomAction"|"CheckBox"|"Browser"|"BrowserElement"|"FIBTableAction"|"EditorPane"|"DragOperation"|"CustomColumn"|"DropDownColumn"|"TextFieldColumn"|"TextArea"|"Custom"|"BrowserAddAction"|"Editor"|"ReferenceAssignment";
	readonly name: string;
	readonly description: string;
	readonly parameters: Array<Description<Parameter>>;
}

export interface Font extends FIBWidget {
	readonly kind: "Font";
	readonly allowsNullText: string;
	readonly allowsNull: boolean;
	readonly sampleText: string;
}

export interface FIBNumericFunction extends FIBGraphFunction {
	readonly kind: "FIBNumericFunction";
	readonly displayLabels: boolean;
	readonly stepsNumber: string;
	readonly minValue: string;
	readonly maxValue: string;
	readonly majorTickSpacing: string;
	readonly displayMajorTicks: boolean;
	readonly minorTickSpacing: string;
	readonly displayMinorTicks: boolean;
}

export interface FIBDiscreteTwoLevelsPolarFunctionGraph extends FIBDiscretePolarFunctionGraph {
	readonly kind: "FIBDiscreteTwoLevelsPolarFunctionGraph";
	readonly secondaryLabels: string;
	readonly primaryParameterName: string;
	readonly secondaryParameterName: string;
	readonly displaySecondaryLabels: boolean;
	readonly secondaryValues: string;
	readonly secondaryAngleExtent: string;
}

export interface Image extends FIBWidget {
	readonly kind: "Image";
	readonly imageWidth: number;
	readonly sizeAdjustment: "OriginalSize" | "FitToAvailableSize" | "FitToAvailableSizeRespectRatio" | "AdjustWidth" | "AdjustHeight" | "AdjustDimensions";
	readonly imageFile: string;
	readonly align: "left" | "right" | "center";
	readonly imageHeight: number;
}

export interface ButtonColumn extends FIBTableColumn {
	readonly kind: "ButtonColumn";
	readonly action: string;
	readonly enabled: string;
}

export interface TabPanel extends FIBContainer {
	readonly kind: "TabPanel";
	readonly restrictPreferredSizeToSelectedComponent: boolean;
}

export interface FIBBrowserAction extends FIBModelObject {
	readonly kind: "BrowserRemoveAction"|"BrowserCustomAction"|"BrowserAddAction";
	readonly owner: Description<BrowserElement>;
	readonly isAvailable: string;
	readonly method: string;
}

export interface Dependancy extends FIBModelObject {
	readonly kind: "Dependancy";
	readonly owner: Description<FIBComponent>;
	readonly componentName: string;
}

export interface File extends FIBWidget {
	readonly kind: "File";
	readonly mode: "OpenMode" | "SaveMode";
	readonly filter: string;
	readonly columns: number;
	readonly defaultDirectory: string;
	readonly title: string;
	readonly isDirectory: boolean;
}

export interface SplitPanel extends FIBContainer {
	readonly kind: "SplitPanel";
	readonly split: Description<FIBSplit>;
}

export interface CheckboxList extends FIBMultipleValues {
	readonly kind: "CheckboxList";
	readonly trimText: boolean;
}

export interface ColumnAssignment extends FIBModelObject {
	readonly kind: "ColumnAssignment";
	readonly owner: Description<CustomColumn>;
	readonly variable: string;
	readonly value: string;
	readonly mandatory: boolean;
}

export interface Panel extends FIBContainer {
	readonly kind: "Tab"|"Panel";
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
	readonly cols: number;
	readonly borderBottom: number;
	readonly boxLayoutAxis: "X_AXIS" | "Y_AXIS";
	readonly border: "empty" | "line" | "etched" | "raised" | "lowered" | "titled" | "rounded3d";
	readonly imageWidth: number;
	readonly sizeAdjustment: "OriginalSize" | "FitToAvailableSize" | "FitToAvailableSizeRespectRatio" | "AdjustWidth" | "AdjustHeight" | "AdjustDimensions";
	readonly darkLevel: number;
	readonly titleFont: string;
	readonly rows: number;
	readonly imageHeight: number;
	readonly layout: "none" | "flow" | "border" | "grid" | "box" | "twocols" | "gridbag" | "buttons" | "split";
	readonly vGap: number;
	readonly borderRight: number;
	readonly dynamicBackgroundImage: string;
	readonly hGap: number;
}

export interface FIBNode extends Description<FIBNode> {
	readonly kind: "FIBSplit"|"Divider"|"ColSplit"|"Leaf"|"RowSplit";
}

export interface FIBTableColumn extends FIBModelObject {
	readonly kind: "LabelColumn"|"IconColumn"|"ButtonColumn"|"NumberColumn"|"CheckBoxColumn"|"CustomColumn"|"DropDownColumn"|"TextFieldColumn";
	readonly owner: Description<Table>;
	readonly color: string;
	readonly data: string;
	readonly tooltipText: string;
	readonly resizable: boolean;
	readonly valueChangedAction: string;
	readonly format: string;
	readonly icon: string;
	readonly tooltip: string;
	readonly title: string;
	readonly displayTitle: boolean;
	readonly bgColor: string;
	readonly columnWidth: number;
	readonly showIcon: boolean;
	readonly font: string;
}

export interface FIBSimpleFunctionGraph extends FIBSingleParameteredGraph {
	readonly kind: "FIBContinuousSimpleFunctionGraph"|"FIBDiscreteSimpleFunctionGraph";
	readonly parameterOrientation: "HORIZONTAL" | "VERTICAL";
}

export interface Table extends FIBWidget {
	readonly kind: "Table";
	readonly backgroundSelectionColor: string;
	readonly visibleRowCount: number;
	readonly boundToSelectionManager: boolean;
	readonly backgroundNonSelectionColor: string;
	readonly iteratorClassName: string;
	readonly textSelectionColor: string;
	readonly backgroundSecondarySelectionColor: string;
	readonly columns: Array<FIBTableColumn>;
	readonly showHeader: boolean;
	readonly showFooter: boolean;
	readonly autoSelectFirstRow: boolean;
	readonly lookAndFeel: "Classic" | "FlatDesign";
	readonly textNonSelectionColor: string;
	readonly createNewRowOnClick: boolean;
	readonly actions: Array<FIBTableAction>;
	readonly selected: string;
	readonly selectionMode: "SingleSelection" | "SingleIntervalSelection" | "MultipleIntervalSelection";
	readonly rowHeight: number;
}

export interface BrowserRemoveAction extends FIBBrowserAction {
	readonly kind: "BrowserRemoveAction";
}

export interface FIBVariable extends FIBModelObject {
	readonly kind: "FIBVariable";
	readonly owner: Description<FIBComponent>;
	readonly type: string;
	readonly value: string;
	readonly mandatory: boolean;
}

export interface NumberColumn extends FIBTableColumn {
	readonly kind: "NumberColumn";
	readonly numberType: "ByteType" | "ShortType" | "IntegerType" | "LongType" | "FloatType" | "DoubleType";
}

export interface FIBGraph extends FIBWidget {
	readonly kind: "FIBContinuousSimpleFunctionGraph"|"FIBDiscreteSimpleFunctionGraph"|"FIBContinuousPolarFunctionGraph"|"FIBSingleParameteredGraph"|"FIBPolarFunctionGraph"|"FIBDiscreteTwoLevelsPolarFunctionGraph"|"FIBSimpleFunctionGraph"|"FIBDiscretePolarFunctionGraph";
	readonly borderLeft: number;
	readonly functions: Array<FIBGraphFunction>;
	readonly borderRight: number;
	readonly borderTop: number;
	readonly borderBottom: number;
}

export interface FIBWidget extends FIBComponent {
	readonly kind: "FIBReferencedComponent"|"Label"|"FIBContinuousSimpleFunctionGraph"|"DropDown"|"FIBDiscreteSimpleFunctionGraph"|"TextField"|"RadioButtonList"|"FIBContinuousPolarFunctionGraph"|"FIBMultipleValues"|"FIBSingleParameteredGraph"|"HTMLEditor"|"FIBPolarFunctionGraph"|"FIBTextWidget"|"Font"|"FIBDiscreteTwoLevelsPolarFunctionGraph"|"Image"|"File"|"CheckboxList"|"FIBSimpleFunctionGraph"|"Table"|"FIBGraph"|"List"|"Number"|"Button"|"FIBDiscretePolarFunctionGraph"|"Color"|"CheckBox"|"Browser"|"EditorPane"|"TextArea"|"Custom"|"Editor";
	readonly localize: boolean;
	readonly manageDynamicModel: boolean;
	readonly tooltipText: string;
	readonly valueChangedAction: string;
	readonly format: string;
	readonly icon: string;
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

export interface BrowserCustomAction extends FIBBrowserAction {
	readonly kind: "BrowserCustomAction";
	readonly isStatic: boolean;
}

export interface FIBDiscreteFunction extends FIBGraphFunction {
	readonly kind: "FIBDiscreteFunction";
}

export interface LocalizedDictionary extends FIBModelObject {
	readonly kind: "LocalizedDictionary";
	readonly owner: Description<FIBComponent>;
	readonly localizedEntries: Array<Localized>;
}

export interface List extends FIBMultipleValues {
	readonly kind: "List";
	readonly backgroundSelectionColor: string;
	readonly visibleRowCount: number;
	readonly boundToSelectionManager: boolean;
	readonly backgroundNonSelectionColor: string;
	readonly textSelectionColor: string;
	readonly textNonSelectionColor: string;
	readonly backgroundSecondarySelectionColor: string;
	readonly createNewRowOnClick: boolean;
	readonly layoutOrientation: "vertical" | "horizontal" | "jesaispas";
	readonly selected: string;
	readonly selectionMode: "SingleSelection" | "SingleIntervalSelection" | "MultipleIntervalSelection";
	readonly rowHeight: number;
}

export interface CheckBoxColumn extends FIBTableColumn {
	readonly kind: "CheckBoxColumn";
}

export interface Localized extends FIBModelObject {
	readonly kind: "Localized";
	readonly dictionary: Description<LocalizedDictionary>;
	readonly lang: string;
	readonly value: string;
	readonly key: string;
}

export interface Tab extends Panel {
	readonly kind: "Tab";
	readonly title: string;
}

export interface FIBContainer extends FIBComponent {
	readonly kind: "TabPanel"|"SplitPanel"|"Panel"|"Tab";
	readonly data: string;
	readonly dataClassName: string;
	readonly subComponents: Array<FIBComponent>;
}

export interface Number extends FIBWidget {
	readonly kind: "Number";
	readonly minValue: number;
	readonly numberType: "ByteType" | "ShortType" | "IntegerType" | "LongType" | "FloatType" | "DoubleType";
	readonly maxValue: number;
	readonly columns: number;
	readonly increment: number;
	readonly validateOnReturn: boolean;
	readonly allowsNull: boolean;
}

export interface FIBComponent extends FIBModelObject {
	readonly kind: "FIBReferencedComponent"|"Label"|"FIBContinuousSimpleFunctionGraph"|"DropDown"|"FIBDiscreteSimpleFunctionGraph"|"TextField"|"RadioButtonList"|"FIBContinuousPolarFunctionGraph"|"FIBMultipleValues"|"FIBSingleParameteredGraph"|"HTMLEditor"|"FIBPolarFunctionGraph"|"FIBTextWidget"|"Font"|"FIBDiscreteTwoLevelsPolarFunctionGraph"|"Image"|"TabPanel"|"File"|"SplitPanel"|"CheckboxList"|"Panel"|"FIBSimpleFunctionGraph"|"Table"|"FIBGraph"|"FIBWidget"|"List"|"Tab"|"FIBContainer"|"Number"|"Button"|"FIBDiscretePolarFunctionGraph"|"Color"|"CheckBox"|"Browser"|"EditorPane"|"TextArea"|"Custom"|"Editor";
	readonly useScrollBar: boolean;
	readonly parent: Description<FIBContainer>;
	readonly verticalScrollbarPolicy: "VERTICAL_SCROLLBAR_AS_NEEDED" | "VERTICAL_SCROLLBAR_NEVER" | "VERTICAL_SCROLLBAR_ALWAYS";
	readonly localizedDictionary: LocalizedDictionary;
	readonly constraints: string;
	readonly minHeight: number;
	readonly horizontalScrollbarPolicy: "HORIZONTAL_SCROLLBAR_AS_NEEDED" | "HORIZONTAL_SCROLLBAR_NEVER" | "HORIZONTAL_SCROLLBAR_ALWAYS";
	readonly maxHeight: number;
	readonly maxWidth: number;
	readonly height: number;
	readonly controllerClass: string;
	readonly backgroundColor: string;
	readonly variables: Array<Description<FIBVariable>>;
	readonly visible: string;
	readonly opaque: boolean;
	readonly index: number;
	readonly foregroundColor: string;
	readonly minWidth: number;
	readonly explicitDependancies: Array<Dependancy>;
	readonly width: number;
	readonly controllerClassName: string;
	readonly font: string;
}

export interface Button extends FIBWidget {
	readonly kind: "Button";
	readonly dynamicLabel: string;
	readonly default: boolean;
	readonly buttonIcon: string;
	readonly buttonType: "Trigger" | "Toggle";
	readonly action: string;
	readonly label: string;
}

export interface AddAction extends FIBTableAction {
	readonly kind: "AddAction";
}

export interface Leaf extends FIBNode {
	readonly kind: "Leaf";
	readonly name: string;
	readonly weight: number;
}

export interface FIBDiscretePolarFunctionGraph extends FIBPolarFunctionGraph {
	readonly kind: "FIBDiscreteTwoLevelsPolarFunctionGraph"|"FIBDiscretePolarFunctionGraph";
	readonly values: string;
	readonly labels: string;
	readonly angleExtent: string;
}

export interface Color extends FIBWidget {
	readonly kind: "Color";
	readonly allowsNullText: string;
	readonly allowsNull: boolean;
}

export interface CustomAction extends FIBTableAction {
	readonly kind: "CustomAction";
	readonly isStatic: boolean;
}

export interface CheckBox extends FIBWidget {
	readonly kind: "CheckBox";
	readonly negate: boolean;
	readonly selected: boolean;
}

export interface Browser extends FIBWidget {
	readonly kind: "Browser";
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

export interface BrowserElement extends FIBModelObject {
	readonly kind: "BrowserElement";
	readonly owner: Description<Browser>;
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

export interface FIBTableAction extends FIBModelObject {
	readonly kind: "RemoveAction"|"AddAction"|"CustomAction";
	readonly owner: Description<Table>;
	readonly isAvailable: string;
	readonly method: string;
}

export interface EditorPane extends FIBTextWidget {
	readonly kind: "EditorPane";
	readonly contentType: "PLAIN" | "HTML" | "RTF";
}

export interface DragOperation extends FIBModelObject {
	readonly kind: "DragOperation";
	readonly owner: Description<BrowserElement>;
	readonly isAvailable: string;
	readonly targetElementName: string;
	readonly action: string;
	readonly targetElement: Description<BrowserElement>;
}

export interface CustomColumn extends FIBTableColumn {
	readonly kind: "CustomColumn";
	readonly customRendering: boolean;
	readonly disableTerminateEditOnFocusLost: boolean;
	readonly assignments: Array<ColumnAssignment>;
	readonly componentClassName: string;
}

export interface DropDownColumn extends FIBTableColumn {
	readonly kind: "DropDownColumn";
	readonly data: string;
	readonly array: string;
	readonly staticList: string;
	readonly list: string;
}

export interface TextFieldColumn extends FIBTableColumn {
	readonly kind: "TextFieldColumn";
	readonly isEditable: string;
}

export interface TextArea extends FIBTextWidget {
	readonly kind: "TextArea";
	readonly rows: number;
}

export interface Custom extends FIBWidget {
	readonly kind: "Custom";
	readonly assignments: Array<Assignment>;
	readonly componentClassName: string;
	readonly dataClassForComponent: string;
}

export interface BrowserAddAction extends FIBBrowserAction {
	readonly kind: "BrowserAddAction";
}

export interface Parameter extends Description<Parameter> {
	readonly kind: "Parameter";
	readonly name: string;
	readonly value: string;
}

export interface RowSplit extends FIBSplit {
	readonly kind: "RowSplit";
}

export interface Editor extends FIBTextWidget {
	readonly kind: "Editor";
	readonly syntaxStyle: "None" | "BatchFile" | "C" | "CC" | "IDL" | "JavaScript" | "Java" | "Eiffel" | "HTML" | "Patch" | "Perl" | "PHP" | "Props" | "Python" | "ShellScript" | "SQL" | "TSQL" | "TeX" | "WOD" | "XML" | "FML";
	readonly rows: number;
}

export interface ReferenceAssignment extends FIBModelObject {
	readonly kind: "ReferenceAssignment";
	readonly owner: Description<FIBReferencedComponent>;
	readonly variable: string;
	readonly value: string;
	readonly mandatory: boolean;
}
