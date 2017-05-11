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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBcUIsSUFBWTtJQUM3QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDckMsOEJBQThCO0lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQU5ELG9CQU1DO0FBRUQ7SUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBSkQsMEJBSUM7QUFFRCw2Q0FBb0QsT0FBb0IsRUFBRSxhQUFxQjtJQUMzRixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRCxPQUFPLFNBQVMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUM7UUFBQyxDQUFDO1FBQ3hCLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFURCxrRkFTQztBQUVELHNCQUE2QixPQUFvQjtJQUM3QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQy9CLE9BQU8sS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztBQUNMLENBQUM7QUFORCxvQ0FNQyJ9