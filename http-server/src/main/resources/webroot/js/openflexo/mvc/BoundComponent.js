define(["require", "exports", "../ui/Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUlBLG9CQUFzQyxTQUFRLHFCQUFTO1FBYXJELFlBQTRCLEdBQVE7WUFDbEMsS0FBSyxFQUFFLENBQUM7WUFEa0IsUUFBRyxHQUFILEdBQUcsQ0FBSztZQVQ3QixZQUFPLEdBQTRCLElBQUksQ0FBQztZQUN4QyxXQUFNLEdBQTRCLElBQUksQ0FBQztZQUV0QywwQkFBcUIsR0FBbUMsSUFBSSxDQUFBO1lBQ25ELDBCQUFxQixHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7WUFFbEUseUJBQW9CLEdBQW1DLElBQUksQ0FBQTtZQUNsRCx5QkFBb0IsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBSXpFLENBQUM7UUFJRCxhQUFhLENBQ1gsT0FBb0IsRUFBRSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtCO1lBRTVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLDRCQUFvQixDQUM1QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUNoRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FDakQsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMscUJBQXFCLEdBQUcsNEJBQW9CLENBQzdDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQ2xELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUNsRCxDQUFDO1lBQ0osQ0FBQztRQUVILENBQUM7S0FDRjtJQXZDRCx3Q0F1Q0MifQ==