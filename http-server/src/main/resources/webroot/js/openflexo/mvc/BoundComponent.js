define(["require", "exports", "../ui/Component"], function (require, exports, Component_1) {
    "use strict";
    class BoundComponent extends Component_1.Component {
        constructor() {
            super(...arguments);
            this.visibleRuntimeBinding = null;
            this.visibleChangeListener = (event) => this.setVisible(event.value === "true");
            this.enableRuntimeBinding = null;
            this.enableChangeListener = (event) => this.setEnable(event.value === "true");
        }
        updateRuntime(runtime, extensions = new Map()) {
            // TODO
        }
    }
    exports.BoundComponent = BoundComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBLG9CQUFzQyxTQUFRLHFCQUFTO1FBQXZEOztZQUlZLDBCQUFxQixHQUFrQyxJQUFJLENBQUE7WUFDM0QsMEJBQXFCLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFBO1lBRTFFLHlCQUFvQixHQUFrQyxJQUFJLENBQUE7WUFDMUQseUJBQW9CLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBT3JGLENBQUM7UUFIQyxhQUFhLENBQUMsT0FBb0IsRUFBQyxhQUFrQyxJQUFJLEdBQUcsRUFBa0I7WUFDNUYsT0FBTztRQUNULENBQUM7S0FDRjtJQWZELHdDQWVDIn0=