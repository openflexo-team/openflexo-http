export function icon(name: string): HTMLSpanElement {
    let span = document.createElement("span");
    span.className = "material-icons";
    span.innerText = name;
    return span;
}

export function findElementWithAttributeInHierarchy(element: HTMLElement, attributeName: string):HTMLElement {
    let current = element;
    let attribute = current.getAttribute(attributeName);
    while (attribute === null) {
        current = current.parentElement;
        if (!current) { break; }
        attribute = current.getAttribute(attributeName);
    }
    return current;   
}
