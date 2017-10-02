define(["require", "exports", "../ui/Icon", "./BoundComponent", "./utils"], function (require, exports, Icon_1, BoundComponent_1, utils_1) {
    "use strict";
    class BoundIcon extends BoundComponent_1.BoundComponent {
        constructor(api, binding, runtime = null, defaultIcon = "warning") {
            super(api);
            this.binding = binding;
            this.defaultIcon = defaultIcon;
            this.runtimeBinding = null;
            this.changelistener = value => this.container.innerText = value;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.icon = new Icon_1.Icon(this.defaultIcon);
            this.container = this.icon.container;
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            this.runtimeBinding = utils_1.updateBindingRuntime(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
        setEnable(enable) {
            this.icon.setEnable(enable);
        }
    }
    exports.BoundIcon = BoundIcon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRJY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRJY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBU0EsZUFBdUIsU0FBUSwrQkFBYztRQVV6QyxZQUNJLEdBQVEsRUFDQSxPQUF5QixFQUNqQyxVQUF1QixJQUFJLEVBQ3BCLGNBQXNCLFNBQVM7WUFFdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBSkgsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7WUFFMUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1lBUmxDLG1CQUFjLEdBQWtDLElBQUksQ0FBQztZQUU1QyxtQkFBYyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRSxLQUFLLENBQUM7WUFTdkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFvQixFQUFFLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0I7WUFDeEUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLGNBQWMsR0FBRyw0QkFBb0IsQ0FDeEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDaEUsT0FBTyxFQUFFLFVBQVUsQ0FDcEIsQ0FBQTtRQUNILENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0o7SUF0Q0QsOEJBc0NDIn0=