define(["require", "exports", "../ui/Component"], function (require, exports, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundComponent extends Component_1.Component {
        constructor() {
            super(...arguments);
            this.visibleRuntimeBinding = null;
            this.visibleChangeListener = (event) => this.setVisible(event.value === "true");
            this.enableRuntimeBinding = null;
            this.enableChangeListener = (event) => this.setEnable(event.value === "true");
        }
    }
    exports.BoundComponent = BoundComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFHQSxvQkFBc0MsU0FBUSxxQkFBUztRQUF2RDs7WUFJWSwwQkFBcUIsR0FBa0MsSUFBSSxDQUFBO1lBQzNELDBCQUFxQixHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQTtZQUUxRSx5QkFBb0IsR0FBa0MsSUFBSSxDQUFBO1lBQzFELHlCQUFvQixHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQztRQUdyRixDQUFDO0tBQUE7SUFYRCx3Q0FXQyJ9