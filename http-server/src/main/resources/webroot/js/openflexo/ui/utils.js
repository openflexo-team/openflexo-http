/// <reference path="./mdl.d.ts" />
define(["require", "exports", "./Component"], function (require, exports, Component_1) {
    "use strict";
    function clearElement(element) {
        var child = element.firstChild;
        while (child !== null) {
            element.removeChild(child);
            child = element.firstChild;
        }
    }
    exports.clearElement = clearElement;
    function mdlUpgradeElement(element) {
        componentHandler.upgradeElements(element);
    }
    exports.mdlUpgradeElement = mdlUpgradeElement;
    function mdlDowngradeElement(element) {
        componentHandler.downgradeElements(element);
    }
    exports.mdlDowngradeElement = mdlDowngradeElement;
    function addMdlCssIfNotAlreadyPresent() {
        if (document.head.querySelector("[href='css/mdl-openflexo.css']") === null) {
            addCss("css/mdl-openflexo.css");
            addCss("https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en");
            addCss("https://fonts.googleapis.com/icon?family=Material+Icons");
        }
    }
    exports.addMdlCssIfNotAlreadyPresent = addMdlCssIfNotAlreadyPresent;
    function addCssIfNotAlreadyPresent(reference) {
        if (document.head.querySelector("[href='" + reference + "']") === null) {
            addCss(reference);
        }
    }
    exports.addCssIfNotAlreadyPresent = addCssIfNotAlreadyPresent;
    function addCss(reference) {
        let link = document.createElement("link");
        link.href = reference;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }
    // forEach method, could be shipped as part of an Object Literal/Module
    function forEachNode(list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback.call(callback, i, list.item(i));
        }
    }
    exports.forEachNode = forEachNode;
    function toHTMLElement(source) {
        if (typeof source === "string") {
            return document.createTextNode(source);
        }
        else if (typeof source === "number") {
            return document.createTextNode(source.toString());
        }
        else if (source.container) {
            return source.container;
        }
        else {
            return source;
        }
    }
    exports.toHTMLElement = toHTMLElement;
    function setEnable(source, enable) {
        if (source === null)
            return;
        if (source instanceof Component_1.Component) {
            source.setEnable(enable);
        }
    }
    exports.setEnable = setEnable;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7OztJQUtuQyxzQkFBNkIsT0FBb0I7UUFDN0MsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUMvQixPQUFPLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNwQixPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQy9CLENBQUM7SUFDTCxDQUFDO0lBTkQsb0NBTUM7SUFFRCwyQkFBa0MsT0FBb0I7UUFDbEQsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFGRCw4Q0FFQztJQUVELDZCQUFvQyxPQUFvQjtRQUNwRCxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRkQsa0RBRUM7SUFFRDtRQUNJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsbUhBQW1ILENBQUMsQ0FBQztZQUM1SCxNQUFNLENBQUMseURBQXlELENBQUMsQ0FBQztRQUN0RSxDQUFDO0lBQ0wsQ0FBQztJQU5ELG9FQU1DO0lBRUQsbUNBQTBDLFNBQWlCO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRSxTQUFTLEdBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFKRCw4REFJQztJQUVELGdCQUFnQixTQUFpQjtRQUM3QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBRXhCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUscUJBQTRCLElBQWMsRUFBRSxRQUF5QztRQUNqRixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBSkQsa0NBSUM7SUFFRCx1QkFBOEIsTUFBb0I7UUFDOUMsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBYyxNQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQWMsTUFBTyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQVEsTUFBTSxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBVkQsc0NBVUM7SUFFRCxtQkFBMEIsTUFBeUIsRUFBRSxNQUFlO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDNUIsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLHFCQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFMRCw4QkFLQyJ9