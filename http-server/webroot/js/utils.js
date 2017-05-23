define(["require", "exports"], function (require, exports) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBLGNBQXFCLElBQVk7UUFDN0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFORCxvQkFNQztJQUVEO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUpELDBCQUlDO0lBRUQsNkNBQW9ELE9BQW9CLEVBQUUsYUFBcUI7UUFDM0YsSUFBSSxPQUFPLEdBQXFCLE9BQU8sQ0FBQztRQUN4QyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFBQyxDQUFDO1lBQ3hCLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFURCxrRkFTQztJQUVELHNCQUE2QixPQUFvQjtRQUM3QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQy9CLE9BQU8sS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFORCxvQ0FNQyJ9