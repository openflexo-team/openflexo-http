define(["require", "exports"], function (require, exports) {
    "use strict";
    var BoundLabel = (function () {
        function BoundLabel(api, binding) {
            this.api = api;
            this.binding = binding;
            this.create();
        }
        BoundLabel.prototype.create = function () {
            var _this = this;
            this.container = document.createElement("span");
            this.api.evaluate(this.binding).then(function (value) { return _this.container.innerText = value; });
            this.api.addChangeListener(this.binding, function (event) { return _this.container.innerText = event.value; });
        };
        return BoundLabel;
    }());
    exports.BoundLabel = BoundLabel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRMYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFLQTtRQUlJLG9CQUNZLEdBQVEsRUFDUixPQUF5QjtZQUR6QixRQUFHLEdBQUgsR0FBRyxDQUFLO1lBQ1IsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7WUFFakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCwyQkFBTSxHQUFOO1lBQUEsaUJBTUM7WUFMRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUssRUFBaEMsQ0FBZ0MsQ0FBRSxDQUFDO1lBRTFGLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQXRDLENBQXNDLENBQUUsQ0FBQztRQUMvRixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQUFDLEFBbEJELElBa0JDO0lBbEJZLGdDQUFVIn0=