define(["require", "exports", "./BoundComponent", "../ui/Component", "../ui/utils", "../ui/Grid"], function (require, exports, BoundComponent_1, Component_1, utils_1, Grid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundGridCell extends BoundComponent_1.BoundComponent {
        // private readonly changelistener;// = value => this.container.innerText = value;
        // private runtimeBinding: RuntimeBindingId<string>|null;
        constructor(api, runtime = null, wrappedElement, size = 4
            //private binding:BindingId<string>
        ) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRHcmlkQ2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kR3JpZENlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBV0EsbUJBQTJCLFNBQVEsK0JBQWM7UUFNOUMsa0ZBQWtGO1FBRWxGLHlEQUF5RDtRQUV4RCxZQUNJLEdBQVEsRUFDUixVQUF1QixJQUFJLEVBQzNCLGNBQTBCLEVBQ2xCLE9BQWUsQ0FBQztZQUN4QixtQ0FBbUM7O1lBRXJDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUhELFNBQUksR0FBSixJQUFJLENBQVk7WUFJMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGVBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQW9CLHFCQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JFLGlGQUFpRjtZQUNqRixvQ0FBb0M7UUFDeEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3JCLEVBQUUsQ0FBQSxDQUFFLElBQUksQ0FBQyxjQUFjLFlBQVkscUJBQVUsQ0FBQyxDQUFBLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLENBQUM7UUFFTCxDQUFDO0tBQ0o7SUFuQ0Qsc0NBbUNDIn0=