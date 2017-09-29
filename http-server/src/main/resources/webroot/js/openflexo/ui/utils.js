/// <reference path="./mdl.d.ts" />
define(["require", "exports", "./Component"], function (require, exports, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7Ozs7SUFLbkMsc0JBQTZCLE9BQW9CO1FBQzdDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDL0IsT0FBTyxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQU5ELG9DQU1DO0lBRUQsMkJBQWtDLE9BQW9CO1FBQ2xELGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRkQsOENBRUM7SUFFRCw2QkFBb0MsT0FBb0I7UUFDcEQsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUZELGtEQUVDO0lBRUQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLG1IQUFtSCxDQUFDLENBQUM7WUFDNUgsTUFBTSxDQUFDLHlEQUF5RCxDQUFDLENBQUM7UUFDdEUsQ0FBQztJQUNMLENBQUM7SUFORCxvRUFNQztJQUVELG1DQUEwQyxTQUFpQjtRQUN2RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUUsU0FBUyxHQUFFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7SUFDTCxDQUFDO0lBSkQsOERBSUM7SUFFRCxnQkFBZ0IsU0FBaUI7UUFDN0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztRQUV4QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLHFCQUE0QixJQUFjLEVBQUUsUUFBeUM7UUFDakYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0wsQ0FBQztJQUpELGtDQUlDO0lBRUQsdUJBQThCLE1BQW9CO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQWMsTUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFjLE1BQU8sQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFRLE1BQU0sQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQVpELHNDQVlDO0lBRUQsbUJBQTBCLE1BQXlCLEVBQUUsTUFBZTtRQUNsRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSxxQkFBUyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBTEQsOEJBS0MifQ==