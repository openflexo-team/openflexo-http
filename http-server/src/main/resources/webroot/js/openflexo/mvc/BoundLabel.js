define(["require", "exports"], function (require, exports) {
    "use strict";
    class BoundLabel {
        constructor(api, binding) {
            this.api = api;
            this.binding = binding;
            this.create();
        }
        create() {
            this.container = document.createElement("span");
            this.api.evaluate(this.binding).then(value => this.container.innerText = value);
            this.api.addChangeListener(this.binding, event => this.container.innerText = event.value);
        }
    }
    exports.BoundLabel = BoundLabel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRMYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFLQTtRQUlJLFlBQ1ksR0FBUSxFQUNSLE9BQXlCO1lBRHpCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUixZQUFPLEdBQVAsT0FBTyxDQUFrQjtZQUVqQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBRSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFFLENBQUM7WUFFMUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFFLENBQUM7UUFDL0YsQ0FBQztLQUNKO0lBbEJELGdDQWtCQyJ9