define(["require", "exports", "../ui/Component", "../api/Api"], function (require, exports, Component_1, Api_1) {
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
            if (this.enableRuntimeBinding !== null) {
                this.api.removeChangeListener(this.enableRuntimeBinding, this.enableChangeListener);
            }
            this.enableRuntimeBinding = null;
            if (runtime !== null) {
                if (this.enable !== null) {
                    this.enable.contextUrl = runtime;
                    this.enableRuntimeBinding = new Api_1.RuntimeBindingId(this.enable, runtime, extensions);
                    //this.api.evaluate<boolean>(this.enableRuntimeBinding).then(this.enableChangeListener);
                    this.api.addChangeListener(this.enableRuntimeBinding, this.enableChangeListener);
                }
                else {
                    this.setEnable(true);
                }
            }
            else {
                this.setEnable(false);
            }
        }
    }
    exports.BoundComponent = BoundComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBLG9CQUFzQyxTQUFRLHFCQUFTO1FBYXJELFlBQTRCLEdBQVE7WUFDbEMsS0FBSyxFQUFFLENBQUM7WUFEa0IsUUFBRyxHQUFILEdBQUcsQ0FBSztZQVQ3QixZQUFPLEdBQTRCLElBQUksQ0FBQztZQUN4QyxXQUFNLEdBQTRCLElBQUksQ0FBQztZQUV0QywwQkFBcUIsR0FBbUMsSUFBSSxDQUFBO1lBQ25ELDBCQUFxQixHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7WUFFbEUseUJBQW9CLEdBQW1DLElBQUksQ0FBQTtZQUNsRCx5QkFBb0IsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBSXpFLENBQUM7UUFJRCxhQUFhLENBQ1gsT0FBb0IsRUFBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtCO1lBRTNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN4RixDQUFDO1lBQ0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLHNCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNsRix3RkFBd0Y7b0JBQ3hGLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNyRixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7WUFFTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQztLQUNGO0lBeENELHdDQXdDQyJ9