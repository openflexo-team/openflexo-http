define(["require", "exports", "../ui/Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundComponent = void 0;
    class BoundComponent extends Component_1.Component {
        constructor(api) {
            super();
            this.api = api;
            this.visible = null;
            this.enable = null;
            this.visibleRuntimeBinding = null;
            this.visibleChangeListener = (value) => this.setVisible(value);
            this.enableRuntimeBinding = null;
            this.enableChangeListener = (value) => this.setEnable(value);
        }
        updateRuntime(runtime, extensions = new Map()) {
            if (this.enable != null) {
                this.enableRuntimeBinding = (0, utils_1.updateBindingRuntime)(this.api, this.enable, this.enableRuntimeBinding, this.enableChangeListener, runtime, extensions);
            }
            else {
                this.setEnable(runtime !== null);
            }
            if (this.visible != null) {
                this.visibleRuntimeBinding = (0, utils_1.updateBindingRuntime)(this.api, this.visible, this.visibleRuntimeBinding, this.visibleChangeListener, runtime, extensions);
            }
        }
    }
    exports.BoundComponent = BoundComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBSUEsTUFBc0IsY0FBZ0IsU0FBUSxxQkFBUztRQWFyRCxZQUE0QixHQUFRO1lBQ2xDLEtBQUssRUFBRSxDQUFDO1lBRGtCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFUN0IsWUFBTyxHQUFnQixJQUFJLENBQUM7WUFDNUIsV0FBTSxHQUFnQixJQUFJLENBQUM7WUFFMUIsMEJBQXFCLEdBQW1DLElBQUksQ0FBQTtZQUNuRCwwQkFBcUIsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUVsRSx5QkFBb0IsR0FBbUMsSUFBSSxDQUFBO1lBQ2xELHlCQUFvQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBSXpFLENBQUM7UUFJRCxhQUFhLENBQ1gsT0FBb0IsRUFBRSxhQUFhLElBQUksR0FBRyxFQUFrQjtZQUU1RCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUN2QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBQSw0QkFBb0IsRUFDNUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFDaEQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxVQUFVLENBQ2pELENBQUM7YUFDSDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQzthQUNsQztZQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFBLDRCQUFvQixFQUM3QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUNsRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FDbEQsQ0FBQzthQUNIO1FBRUgsQ0FBQztLQUNGO0lBdkNELHdDQXVDQyJ9