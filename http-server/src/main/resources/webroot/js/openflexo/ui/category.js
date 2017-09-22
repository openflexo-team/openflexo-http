define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQSxtQkFBMEIsTUFBcUM7UUFDM0QsTUFBTSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssUUFBUTtnQkFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBUyxNQUFNLENBQUMsQ0FBQztZQUNuRCxLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEQ7Z0JBQ0ksTUFBTSxDQUFRLE1BQU0sQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQVRELDhCQVNDIn0=