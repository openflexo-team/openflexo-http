define(["require", "exports", "./BoundComponent", "../ui/Component", "../ui/utils", "../ui/Grid"], function (require, exports, BoundComponent_1, Component_1, utils_1, Grid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundGridCell = void 0;
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
            this.container = (0, utils_1.toHTMLElement)(this.wrappedElement);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRHcmlkQ2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kR3JpZENlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVdBLE1BQWEsYUFBYyxTQUFRLCtCQUFjO1FBTTlDLGtGQUFrRjtRQUVsRix5REFBeUQ7UUFFeEQsWUFDSSxHQUFRLEVBQ1IsVUFBdUIsSUFBSSxFQUMzQixjQUEwQixFQUNsQixPQUFlLENBQUM7WUFFMUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRkQsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUcxQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZUFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBb0IsSUFBQSxxQkFBYSxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRSxpRUFBaUU7WUFDakUsb0NBQW9DO1FBQ3hDLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUNyQixJQUFJLElBQUksQ0FBQyxjQUFjLFlBQVkscUJBQVMsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekM7UUFFTCxDQUFDO0tBQ0o7SUFsQ0Qsc0NBa0NDIn0=