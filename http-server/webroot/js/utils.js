define(["require", "exports"], function (require, exports) {
    "use strict";
    function icon(name) {
        var span = document.createElement("span");
        span.className = "material-icons";
        span.innerText = name;
        return span;
    }
    exports.icon = icon;
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
});
//# sourceMappingURL=utils.js.map