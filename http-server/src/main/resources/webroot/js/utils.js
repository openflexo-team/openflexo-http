define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clearElement = exports.findElementWithAttributeInHierarchy = exports.spinner = exports.icon = void 0;
    function icon(name) {
        let span = document.createElement("span");
        span.classList.add("material-icons");
        //span.classList.add("md-18");
        span.innerText = name;
        return span;
    }
    exports.icon = icon;
    function spinner() {
        let spinner = icon("autorenew");
        spinner.classList.add("rotate");
        return spinner;
    }
    exports.spinner = spinner;
    function findElementWithAttributeInHierarchy(element, attributeName) {
        let current = element;
        let attribute = current.getAttribute(attributeName);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQUEsU0FBZ0IsSUFBSSxDQUFDLElBQVk7UUFDN0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBTkQsb0JBTUM7SUFFRCxTQUFnQixPQUFPO1FBQ25CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBSkQsMEJBSUM7SUFFRCxTQUFnQixtQ0FBbUMsQ0FBQyxPQUFvQixFQUFFLGFBQXFCO1FBQzNGLElBQUksT0FBTyxHQUFxQixPQUFPLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxPQUFPLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDdkIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFBRSxNQUFNO2FBQUU7WUFDeEIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBVEQsa0ZBU0M7SUFFRCxTQUFnQixZQUFZLENBQUMsT0FBb0I7UUFDN0MsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUMvQixPQUFPLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFORCxvQ0FNQyJ9