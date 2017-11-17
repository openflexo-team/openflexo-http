define(["require", "exports", "./BoundComponent", "../ui/Component", "../ui/utils"], function (require, exports, BoundComponent_1, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundWrapper extends BoundComponent_1.BoundComponent {
        constructor(api, runtime = null, wrappedElement) {
            super(api);
            this.wrappedElement = wrappedElement;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.container = utils_1.toHTMLElement(this.wrappedElement);
        }
        setEnable(enable) {
            if (this.wrappedElement instanceof Component_1.Component) {
                this.wrappedElement.setEnable(enable);
            }
        }
    }
    exports.BoundWrapper = BoundWrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRXcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBLGtCQUEwQixTQUFRLCtCQUFjO1FBTTVDLFlBQ0ksR0FBUSxFQUNSLFVBQXVCLElBQUksRUFDM0IsY0FBaUM7WUFFbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQWlCLHFCQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUNyQixFQUFFLENBQUEsQ0FBRSxJQUFJLENBQUMsY0FBYyxZQUFZLHFCQUFVLENBQUMsQ0FBQSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQztLQUNKO0lBMUJELG9DQTBCQyJ9