define(["require", "exports", "../api/Api", "../ui/Icon", "./BoundComponent"], function (require, exports, Api_1, Icon_1, BoundComponent_1) {
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
        updateRuntime(runtime) {
            if (this.runtimeBinding !== null) {
                this.api.removeChangeListener(this.runtimeBinding, this.changelistener);
            }
            this.runtimeBinding = null;
            if (runtime !== null) {
                this.runtimeBinding = new Api_1.RuntimeBindingId(this.binding, runtime);
                this.api.evaluate(this.runtimeBinding).then(this.changelistener);
                this.api.addChangeListener(this.runtimeBinding, this.changelistener);
            }
        }
        setEnable(enable) {
            this.icon.setEnable(enable);
        }
    }
    exports.BoundIcon = BoundIcon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRJY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRJY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBUUEsZUFBdUIsU0FBUSwrQkFBYztRQVV6QyxZQUNJLEdBQVEsRUFDQSxPQUF5QixFQUNqQyxVQUF1QixJQUFJLEVBQ3BCLGNBQXNCLFNBQVM7WUFFdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBSkgsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7WUFFMUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1lBUmxDLG1CQUFjLEdBQWtDLElBQUksQ0FBQztZQUU1QyxtQkFBYyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRSxLQUFLLENBQUM7WUFTdkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFvQjtZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUUsQ0FBQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksc0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekUsQ0FBQztRQUNMLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0o7SUF6Q0QsOEJBeUNDIn0=