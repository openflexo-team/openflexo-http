export function icon(name: string): HTMLSpanElement {
    let span = document.createElement("span");
    span.classList.add("material-icons");
    //span.classList.add("md-18");
    span.innerText = name;
    return span;
}

export function spinner(): HTMLSpanElement {
    let spinner = icon("autorenew");
    spinner.classList.add("rotate");
    return spinner;
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
