define(["require", "exports", "../ui/Component", "../api/Api"], function (require, exports, Component_1, Api_1) {
    "use strict";
    class BoundComponent extends Component_1.Component {
        constructor(api) {
            super();
            this.api = api;
            this.visible = null;
            this.enable = null;
            this.visibleRuntimeBinding = null;
            this.visibleChangeListener = (event) => this.setVisible(event.value);
            this.enableRuntimeBinding = null;
            this.enableChangeListener = (event) => this.setEnable(event.value);
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
                    this.api.evaluate(this.enableRuntimeBinding).then(value => {
                        this.setEnable(value);
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBLG9CQUFzQyxTQUFRLHFCQUFTO1FBYXJELFlBQTRCLEdBQVE7WUFDbEMsS0FBSyxFQUFFLENBQUM7WUFEa0IsUUFBRyxHQUFILEdBQUcsQ0FBSztZQVQ3QixZQUFPLEdBQTRCLElBQUksQ0FBQztZQUN4QyxXQUFNLEdBQTRCLElBQUksQ0FBQztZQUV0QywwQkFBcUIsR0FBbUMsSUFBSSxDQUFBO1lBQ25ELDBCQUFxQixHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBRXhFLHlCQUFvQixHQUFtQyxJQUFJLENBQUE7WUFDbEQseUJBQW9CLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFJL0UsQ0FBQztRQUlELGFBQWEsQ0FDWCxPQUFvQixFQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0I7WUFFM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3hGLENBQUM7WUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztvQkFDakMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksc0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2xGLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFVLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBRSxLQUFLO3dCQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUN6QixDQUFDLENBQUUsQ0FBQztvQkFDSixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDckYsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixDQUFDO1lBRUwsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUM7S0FDRjtJQTFDRCx3Q0EwQ0MifQ==