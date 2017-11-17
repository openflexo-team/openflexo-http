define(["require", "exports", "./BoundComponent", "../ui/Component", "../ui/utils", "../ui/Grid"], function (require, exports, BoundComponent_1, Component_1, utils_1, Grid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundGridCell extends BoundComponent_1.BoundComponent {
        // private readonly changelistener;// = value => this.container.innerText = value;
        // private runtimeBinding: RuntimeBindingId<string>|null;
        constructor(api, runtime = null, wrappedElement, size = 4) {
            super(api);
            this.size = size;
            this.wrappedElement = new Grid_1.GridCell(wrappedElement, size);
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.container = utils_1.toHTMLElement(this.wrappedElement);
            //this.container.appendChild(toHTMLElement(this.wrappedElement));
            //mdlUpgradeElement(this.container);
        }
        setEnable(enable) {
            if (this.wrappedElement instanceof Component_1.Component) {
                this.wrappedElement.setEnable(enable);
            }
        }
    }
    exports.BoundGridCell = BoundGridCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRHcmlkQ2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kR3JpZENlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBV0EsbUJBQTJCLFNBQVEsK0JBQWM7UUFNOUMsa0ZBQWtGO1FBRWxGLHlEQUF5RDtRQUV4RCxZQUNJLEdBQVEsRUFDUixVQUF1QixJQUFJLEVBQzNCLGNBQTBCLEVBQ2xCLE9BQWUsQ0FBQztZQUUxQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFGRCxTQUFJLEdBQUosSUFBSSxDQUFZO1lBRzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxlQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsU0FBUyxHQUFvQixxQkFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRSxpRUFBaUU7WUFDakUsb0NBQW9DO1FBQ3hDLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUNyQixFQUFFLENBQUEsQ0FBRSxJQUFJLENBQUMsY0FBYyxZQUFZLHFCQUFVLENBQUMsQ0FBQSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBRUwsQ0FBQztLQUNKO0lBbENELHNDQWtDQyJ9