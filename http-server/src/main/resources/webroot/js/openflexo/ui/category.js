define(["require", "exports"], function (require, exports) {
    "use strict";
    function toElement(source) {
        switch (typeof source) {
            case "string":
                return document.createTextNode(source);
            case "number":
                return document.createTextNode(source.toString());
            default:
                return source;
        }
    }
    exports.toElement = toElement;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQVFBLG1CQUEwQixNQUFxQztRQUMzRCxNQUFNLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxRQUFRO2dCQUNULE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFTLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELEtBQUssUUFBUTtnQkFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN0RDtnQkFDSSxNQUFNLENBQVEsTUFBTSxDQUFDO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBVEQsOEJBU0MifQ==