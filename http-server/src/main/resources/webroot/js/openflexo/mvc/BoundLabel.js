define(["require", "exports", "../api/Api"], function (require, exports, Api_1) {
    "use strict";
    class BoundLabel {
        constructor(api, binding, runtime = null) {
            this.api = api;
            this.binding = binding;
            this.runtimeBinding = null;
            this.changelistener = event => this.container.innerText = event.value;
            this.create();
            this.updateModel(runtime);
        }
        create() {
            this.container = document.createElement("span");
        }
        updateModel(runtime) {
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
    exports.BoundLabel = BoundLabel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRMYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFLQTtRQVFJLFlBQ1ksR0FBUSxFQUNSLE9BQWlCLEVBQ3pCLFVBQXVCLElBQUk7WUFGbkIsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNSLFlBQU8sR0FBUCxPQUFPLENBQVU7WUFOckIsbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1lBRXBDLG1CQUFjLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFPOUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsV0FBVyxDQUFDLE9BQW9CO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1RSxDQUFDO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxzQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUUsQ0FBQztnQkFDakcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN6RSxDQUFDO1FBQ0wsQ0FBQztLQUNKO0lBaENELGdDQWdDQyJ9