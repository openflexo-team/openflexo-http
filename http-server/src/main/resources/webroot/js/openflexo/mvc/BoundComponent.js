define(["require", "exports", "../ui/Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                this.enableRuntimeBinding = utils_1.updateBindingRuntime(this.api, this.enable, this.enableRuntimeBinding, this.enableChangeListener, runtime, extensions);
            }
            else {
                this.setEnable(runtime !== null);
            }
            if (this.visible != null) {
                this.visibleRuntimeBinding = utils_1.updateBindingRuntime(this.api, this.visible, this.visibleRuntimeBinding, this.visibleChangeListener, runtime, extensions);
            }
        }
    }
    exports.BoundComponent = BoundComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQSxvQkFBc0MsU0FBUSxxQkFBUztRQWFyRCxZQUE0QixHQUFRO1lBQ2xDLEtBQUssRUFBRSxDQUFDO1lBRGtCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFUN0IsWUFBTyxHQUE0QixJQUFJLENBQUM7WUFDeEMsV0FBTSxHQUE0QixJQUFJLENBQUM7WUFFdEMsMEJBQXFCLEdBQW1DLElBQUksQ0FBQTtZQUNuRCwwQkFBcUIsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBRWxFLHlCQUFvQixHQUFtQyxJQUFJLENBQUE7WUFDbEQseUJBQW9CLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUl6RSxDQUFDO1FBSUQsYUFBYSxDQUNYLE9BQW9CLEVBQUUsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFrQjtZQUU1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyw0QkFBb0IsQ0FDNUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFDaEQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxVQUFVLENBQ2pELENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLDRCQUFvQixDQUM3QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUNsRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FDbEQsQ0FBQztZQUNKLENBQUM7UUFFSCxDQUFDO0tBQ0Y7SUF2Q0Qsd0NBdUNDIn0=