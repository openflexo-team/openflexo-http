define(["require", "exports", "../api/Api"], function (require, exports, Api_1) {
    "use strict";
    class BoundLabel {
        constructor(api, binding, runtime = null) {
            this.api = api;
            this.binding = binding;
            this.runtimeBinding = null;
            this.changelistener = event => this.container.innerText = event.value;
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            this.container = document.createElement("span");
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
    exports.BoundLabel = BoundLabel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRMYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFLQTtRQVFJLFlBQ1ksR0FBUSxFQUNSLE9BQXlCLEVBQ2pDLFVBQXVCLElBQUk7WUFGbkIsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNSLFlBQU8sR0FBUCxPQUFPLENBQWtCO1lBTjdCLG1CQUFjLEdBQWtDLElBQUksQ0FBQztZQUU1QyxtQkFBYyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBTzlFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFvQjtZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUUsQ0FBQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksc0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBRSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFFLENBQUM7Z0JBQ2pHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekUsQ0FBQztRQUNMLENBQUM7S0FDSjtJQWhDRCxnQ0FnQ0MifQ==