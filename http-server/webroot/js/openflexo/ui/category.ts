
// TODO complete category
export type PhrasingCategory = string | number | HTMLSpanElement | HTMLAnchorElement;

// TODO complete category
export type FlowCategory = HTMLDivElement | PhrasingCategory;


export function toElement(source: FlowCategory|PhrasingCategory): Node {
    switch (typeof source) {
        case "string":
            return document.createTextNode(<string>source);
        case "number":
            return document.createTextNode(source.toString());            
        default:
            return <Node> source;
    }
}