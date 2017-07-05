define(["require", "exports", "../ui/Button"], function (require, exports, Button_1) {
    "use strict";
    var BoundButton = (function () {
        function BoundButton(api, action, enabled, label, type, colored, accent, rippleEffect) {
            if (type === void 0) { type = "raised"; }
            if (colored === void 0) { colored = false; }
            if (accent === void 0) { accent = false; }
            if (rippleEffect === void 0) { rippleEffect = false; }
            this.api = api;
            this.action = action;
            this.enabled = enabled;
            this.label = label;
            this.type = type;
            this.colored = colored;
            this.accent = accent;
            this.rippleEffect = rippleEffect;
            this.create();
        }
        BoundButton.prototype.create = function () {
            var _this = this;
            this.button = new Button_1.Button(this.label, this.type, this.colored, this.accent, this.rippleEffect);
            this.container = this.button.container;
            this.container.onclick = function (e) { return _this.sendActionToServer(e); };
            if (this.enabled != null) {
                this.api.evaluate(this.enabled, false).then(function (value) {
                    _this.button.setEnable(value === "true");
                });
                this.api.addChangeListener(this.enabled, function (e) { return _this.listenFromServer(e); });
            }
        };
        BoundButton.prototype.listenFromServer = function (event) {
            this.button.setEnable(event.value === "true");
        };
        BoundButton.prototype.sendActionToServer = function (e) {
            var _this = this;
            this.api.evaluate(this.action, false).then(function (value) {
                _this.container.classList.remove("mdl-button--colored");
            })["catch"](function (error) {
                _this.container.classList.add("mdl-button--colored");
            });
        };
        return BoundButton;
    }());
    exports.BoundButton = BoundButton;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BO1FBTUkscUJBQ1ksR0FBUSxFQUNSLE1BQXdCLEVBQ3hCLE9BQThCLEVBQzlCLEtBQWlDLEVBQ2pDLElBQWlELEVBQ2pELE9BQXdCLEVBQ3hCLE1BQXVCLEVBQ3ZCLFlBQTZCO1lBSDdCLHFCQUFBLEVBQUEsZUFBaUQ7WUFDakQsd0JBQUEsRUFBQSxlQUF3QjtZQUN4Qix1QkFBQSxFQUFBLGNBQXVCO1lBQ3ZCLDZCQUFBLEVBQUEsb0JBQTZCO1lBUDdCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUixXQUFNLEdBQU4sTUFBTSxDQUFrQjtZQUN4QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtZQUM5QixVQUFLLEdBQUwsS0FBSyxDQUE0QjtZQUNqQyxTQUFJLEdBQUosSUFBSSxDQUE2QztZQUNqRCxZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtZQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7WUFFckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCw0QkFBTSxHQUFOO1lBQUEsaUJBYUM7WUFaRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFFdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQTFCLENBQTBCLENBQUM7WUFFM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBRSxVQUFBLEtBQUs7b0JBQ3RELEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQTtnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7WUFDOUUsQ0FBQztRQUNMLENBQUM7UUFFRCxzQ0FBZ0IsR0FBaEIsVUFBaUIsS0FBa0I7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBRUQsd0NBQWtCLEdBQWxCLFVBQW1CLENBQU07WUFBekIsaUJBTUM7WUFMRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7Z0JBQzVDLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUEsS0FBSztnQkFDVixLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTCxrQkFBQztJQUFELENBQUMsQUE5Q0QsSUE4Q0M7SUE5Q1ksa0NBQVcifQ==