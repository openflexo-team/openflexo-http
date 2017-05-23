define(["require", "exports"], function (require, exports) {
    "use strict";
    function clearElement(element) {
        var child = element.firstChild;
        while (child !== null) {
            element.removeChild(child);
            child = element.firstChild;
        }
    }
    exports.clearElement = clearElement;
    function addMdlScriptAndCssIfNotAlreadyPresent() {
        if (document.head.querySelector("[src='/bower_components/material-design-lite/material.min.js']") === null) {
            addScript("/bower_components/material-design-lite/material.min.js");
            addCss("css/mdl-openflexo.css");
            addCss("https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en");
            addCss("https://fonts.googleapis.com/icon?family=Material+Icons");
        }
    }
    exports.addMdlScriptAndCssIfNotAlreadyPresent = addMdlScriptAndCssIfNotAlreadyPresent;
    function addCssIfNotAlreadyPresent(reference) {
        if (document.head.querySelector("[href='" + reference + "']") === null) {
            addCss(reference);
        }
    }
    exports.addCssIfNotAlreadyPresent = addCssIfNotAlreadyPresent;
    function addScriptIfNotAlreadyPresent(src) {
        if (document.head.querySelector("[src='" + src + "']") === null) {
            addScript(src);
        }
    }
    exports.addScriptIfNotAlreadyPresent = addScriptIfNotAlreadyPresent;
    function addCss(reference) {
        var link = document.createElement("link");
        link.href = reference;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }
    function addScript(src) {
        var script = document.createElement("script");
        script.src = src;
        document.head.appendChild(script);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUNBLHNCQUE2QixPQUFvQjtRQUM3QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQy9CLE9BQU8sS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFORCxvQ0FNQztJQUVEO1FBQ0ksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0VBQWdFLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pHLFNBQVMsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxtSEFBbUgsQ0FBQyxDQUFDO1lBQzVILE1BQU0sQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7SUFDTCxDQUFDO0lBUEQsc0ZBT0M7SUFFRCxtQ0FBMEMsU0FBaUI7UUFDdkQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFFLFNBQVMsR0FBRSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQUpELDhEQUlDO0lBRUQsc0NBQTZDLEdBQVc7UUFDcEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFFLEdBQUcsR0FBRSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO0lBQ0wsQ0FBQztJQUpELG9FQUlDO0lBRUQsZ0JBQWdCLFNBQWlCO1FBQzdCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7UUFFeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELG1CQUFtQixHQUFXO1FBQzFCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQyJ9