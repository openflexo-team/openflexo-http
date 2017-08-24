define(["require", "exports", "../api/Api", "../ui/TextField"], function (require, exports, Api_1, TextField_1) {
    "use strict";
    var idSeed = 0;
    class BoundTextField {
        constructor(api, binding, label = null, floatingLabel = false, invalid = false, id = null) {
            this.api = api;
            this.binding = binding;
            this.label = label;
            this.floatingLabel = floatingLabel;
            this.invalid = invalid;
            this.id = id;
            this.create();
        }
        create() {
            let actualId = this.id !== null ? this.id : "boundTextField" + idSeed++;
            this.textField = new TextField_1.TextField(actualId, this.binding.binding.expression, this.label, this.floatingLabel, this.invalid);
            let input = this.textField.input;
            input.onchange = (e) => this.sendToServer(e);
            input.onblur = (e) => this.sendToServer(e);
            this.valueBinding = Api_1.createRuntimeBinding("", this.binding.binding.contextUrl, this.binding.runtimeUrl);
            this.api.evaluate(this.binding).then(value => {
                input.value = value;
            });
            this.api.addChangeListener(this.binding, (e) => this.listenFromServer(e));
            this.container = this.textField.container;
        }
        listenFromServer(event) {
            this.textField.input.value = event.value;
        }
        sendToServer(e) {
            this.valueBinding.binding.expression = "'" + this.textField.input.value + "'";
            this.api.assign(this.binding, this.valueBinding, false).then(value => {
                this.container.classList.remove("is-invalid");
            }).catch(error => {
                this.container.classList.add("is-invalid");
            });
        }
    }
    exports.BoundTextField = BoundTextField;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUZXh0RmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZFRleHRGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVmO1FBUUksWUFDWSxHQUFRLEVBQ1IsT0FBeUIsRUFDekIsUUFBK0IsSUFBSSxFQUNuQyxnQkFBeUIsS0FBSyxFQUM5QixVQUFtQixLQUFLLEVBQ3hCLEtBQWtCLElBQUk7WUFMdEIsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNSLFlBQU8sR0FBUCxPQUFPLENBQWtCO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQThCO1lBQ25DLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtZQUM5QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUN4QixPQUFFLEdBQUYsRUFBRSxDQUFvQjtZQUU5QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLGdCQUFnQixHQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQ3JELElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FDbkMsQ0FBQztZQUVGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFlBQVksR0FBRywwQkFBb0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBRSxLQUFLO2dCQUMvQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUxRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUM7UUFFRCxnQkFBZ0IsQ0FBQyxLQUFrQjtZQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM3QyxDQUFDO1FBRUQsWUFBWSxDQUFDLENBQU07WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDOUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUVKO0lBckRELHdDQXFEQyJ9