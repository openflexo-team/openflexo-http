define(["require", "exports", "../api/Api", "../ui/TextField"], function (require, exports, Api_1, TextField_1) {
    "use strict";
    var idSeed = 0;
    var BoundTextField = (function () {
        function BoundTextField(api, binding, label, floatingLabel, invalid, id) {
            if (label === void 0) { label = null; }
            if (floatingLabel === void 0) { floatingLabel = false; }
            if (invalid === void 0) { invalid = false; }
            if (id === void 0) { id = null; }
            this.api = api;
            this.binding = binding;
            this.label = label;
            this.floatingLabel = floatingLabel;
            this.invalid = invalid;
            this.id = id;
            this.create();
        }
        BoundTextField.prototype.create = function () {
            var _this = this;
            var actualId = this.id !== null ? this.id : "boundTextField" + idSeed++;
            this.textField = new TextField_1.TextField(actualId, this.binding.binding.expression, this.label, this.floatingLabel, this.invalid);
            var input = this.textField.input;
            input.onchange = function (e) { return _this.sendToServer(e); };
            input.onblur = function (e) { return _this.sendToServer(e); };
            this.valueBinding = Api_1.runtimeBinding("", this.binding.binding.contextUrl, this.binding.runtimeUrl);
            this.api.evaluate(this.binding).then(function (value) {
                input.value = value;
            });
            this.api.addChangeListener(this.binding, function (e) { return _this.listenFromServer(e); });
            this.container = this.textField.container;
        };
        BoundTextField.prototype.listenFromServer = function (event) {
            this.textField.input.value = event.value;
        };
        BoundTextField.prototype.sendToServer = function (e) {
            var _this = this;
            this.valueBinding.binding.expression = "'" + this.textField.input.value + "'";
            this.api.assign(this.binding, this.valueBinding, false).then(function (value) {
                _this.container.classList.remove("is-invalid");
            })["catch"](function (error) {
                _this.container.classList.add("is-invalid");
            });
        };
        return BoundTextField;
    }());
    exports.BoundTextField = BoundTextField;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUZXh0RmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZFRleHRGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVmO1FBUUksd0JBQ1ksR0FBUSxFQUNSLE9BQXlCLEVBQ3pCLEtBQW1DLEVBQ25DLGFBQThCLEVBQzlCLE9BQXdCLEVBQ3hCLEVBQXNCO1lBSHRCLHNCQUFBLEVBQUEsWUFBbUM7WUFDbkMsOEJBQUEsRUFBQSxxQkFBOEI7WUFDOUIsd0JBQUEsRUFBQSxlQUF3QjtZQUN4QixtQkFBQSxFQUFBLFNBQXNCO1lBTHRCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUixZQUFPLEdBQVAsT0FBTyxDQUFrQjtZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUE4QjtZQUNuQyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDeEIsT0FBRSxHQUFGLEVBQUUsQ0FBb0I7WUFFOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCwrQkFBTSxHQUFOO1lBQUEsaUJBbUJDO1lBbEJHLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLEdBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFDckQsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUNuQyxDQUFDO1lBRUYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDakMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLENBQUM7WUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLENBQUM7WUFFM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFFLFVBQUEsS0FBSztnQkFDL0MsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztZQUUxRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUM7UUFFRCx5Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBa0I7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDN0MsQ0FBQztRQUVELHFDQUFZLEdBQVosVUFBYSxDQUFNO1lBQW5CLGlCQU9DO1lBTkcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQzlFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO2dCQUM5RCxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsVUFBQSxLQUFLO2dCQUNWLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTCxxQkFBQztJQUFELENBQUMsQUFyREQsSUFxREM7SUFyRFksd0NBQWMifQ==