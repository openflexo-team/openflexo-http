"use strict";
function icon(name) {
    var span = document.createElement("span");
    span.classList.add("material-icons");
    //span.classList.add("md-18");
    span.innerText = name;
    return span;
}
exports.icon = icon;
function spinner() {
    var spinner = icon("autorenew");
    spinner.classList.add("rotate");
    return spinner;
}
exports.spinner = spinner;
function findElementWithAttributeInHierarchy(element, attributeName) {
    var current = element;
    var attribute = current.getAttribute(attributeName);
    while (attribute === null) {
        current = current.parentElement;
        if (!current) {
            break;
        }
        attribute = current.getAttribute(attributeName);
    }
    return current;
}
exports.findElementWithAttributeInHierarchy = findElementWithAttributeInHierarchy;
function clearElement(element) {
    var child = element.firstChild;
    while (child !== null) {
        element.removeChild(child);
        child = element.firstChild;
    }
}
exports.clearElement = clearElement;
//# sourceMappingURL=utils.js.map