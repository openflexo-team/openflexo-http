
export function clearElement(element: HTMLElement) {
    var child = element.firstChild;
    while (child !== null) {
        element.removeChild(child);
        child = element.firstChild;
    }
}

export function addCssIfNotAlreadyPresent(reference: string) {
    if (document.head.querySelector("[href='"+ reference +"']") === null) {
        let link = document.createElement("link");
        link.href = reference;
        link.rel = "stylesheet";

        document.head.appendChild(link);
    }
}