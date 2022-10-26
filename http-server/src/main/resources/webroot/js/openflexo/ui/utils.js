/// <reference path="./mdl.d.ts" />
define(["require", "exports", "./Component"], function (require, exports, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setEnable = exports.toHTMLElement = exports.forEachNode = exports.addCssIfNotAlreadyPresent = exports.addMdlCssIfNotAlreadyPresent = exports.mdlDowngradeElement = exports.mdlUpgradeElement = exports.clearElement = void 0;
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
            let node = document.createElement("span");
            node.innerHTML = source;
            return node;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7Ozs7O0lBS25DLFNBQWdCLFlBQVksQ0FBQyxPQUFvQjtRQUM3QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQy9CLE9BQU8sS0FBSyxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQU5ELG9DQU1DO0lBRUQsU0FBZ0IsaUJBQWlCLENBQUMsT0FBb0I7UUFDbEQsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFGRCw4Q0FFQztJQUVELFNBQWdCLG1CQUFtQixDQUFDLE9BQW9CO1FBQ3BELGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFGRCxrREFFQztJQUVELFNBQWdCLDRCQUE0QjtRQUN4QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3hFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxtSEFBbUgsQ0FBQyxDQUFDO1lBQzVILE1BQU0sQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQztJQU5ELG9FQU1DO0lBRUQsU0FBZ0IseUJBQXlCLENBQUMsU0FBaUI7UUFDdkQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUUsU0FBUyxHQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNsRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBSkQsOERBSUM7SUFFRCxTQUFTLE1BQU0sQ0FBQyxTQUFpQjtRQUM3QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBRXhCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsU0FBZ0IsV0FBVyxDQUFDLElBQWMsRUFBRSxRQUF5QztRQUNqRixLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUpELGtDQUlDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQW9CO1FBQzlDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ25DLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQWlCLE1BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDeEMsT0FBb0IsTUFBTyxDQUFDLFNBQVMsQ0FBQztTQUN4QzthQUFNO1lBQ0gsT0FBYyxNQUFNLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBWkQsc0NBWUM7SUFFRCxTQUFnQixTQUFTLENBQUMsTUFBeUIsRUFBRSxNQUFlO1FBQ2xFLElBQUksTUFBTSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQzVCLElBQUksTUFBTSxZQUFZLHFCQUFTLEVBQUU7WUFDL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFMRCw4QkFLQyJ9