define(["require", "exports", "./BoundComponent", "../ui/Component", "../ui/utils"], function (require, exports, BoundComponent_1, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundWrapper = void 0;
    class BoundWrapper extends BoundComponent_1.BoundComponent {
        constructor(api, runtime = null, wrappedElement) {
            super(api);
            this.wrappedElement = wrappedElement;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.container = (0, utils_1.toHTMLElement)(this.wrappedElement);
        }
        setEnable(enable) {
            if (this.wrappedElement instanceof Component_1.Component) {
                this.wrappedElement.setEnable(enable);
            }
        }
    }
    exports.BoundWrapper = BoundWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRXcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFRQSxNQUFhLFlBQWEsU0FBUSwrQkFBYztRQU01QyxZQUNJLEdBQVEsRUFDUixVQUF1QixJQUFJLEVBQzNCLGNBQWlDO1lBRW5DLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsU0FBUyxHQUFpQixJQUFBLHFCQUFhLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUNyQixJQUFJLElBQUksQ0FBQyxjQUFjLFlBQVkscUJBQVMsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekM7UUFDTCxDQUFDO0tBQ0o7SUExQkQsb0NBMEJDIn0=