define(["require", "exports", "../api/Api", "../ui/Icon"], function (require, exports, Api_1, Icon_1) {
    "use strict";
    class BoundIcon {
        constructor(api, binding, runtime = null, defaultIcon = "warning") {
            this.api = api;
            this.binding = binding;
            this.defaultIcon = defaultIcon;
            this.runtimeBinding = null;
            this.changelistener = event => this.container.innerText = event.value;
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
                this.api.evaluate(this.runtimeBinding).then(value => this.container.innerText = value);
                this.api.addChangeListener(this.runtimeBinding, this.changelistener);
            }
        }
    }
    exports.BoundIcon = BoundIcon;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRJY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRJY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBTUE7UUFVSSxZQUNZLEdBQVEsRUFDUixPQUF5QixFQUNqQyxVQUF1QixJQUFJLEVBQ3BCLGNBQXNCLFNBQVM7WUFIOUIsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNSLFlBQU8sR0FBUCxPQUFPLENBQWtCO1lBRTFCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtZQVJsQyxtQkFBYyxHQUFrQyxJQUFJLENBQUM7WUFFNUMsbUJBQWMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQVE5RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxNQUFNO1lBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDO1FBRUQsYUFBYSxDQUFDLE9BQW9CO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1RSxDQUFDO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxzQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUUsQ0FBQztnQkFDakcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN6RSxDQUFDO1FBQ0wsQ0FBQztLQUNKO0lBcENELDhCQW9DQyJ9