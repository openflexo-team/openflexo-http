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
            this.valueBinding = Api_1.runtimeBinding("", this.binding.binding.contextUrl, this.binding.runtimeUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUZXh0RmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZFRleHRGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVmO1FBUUksWUFDWSxHQUFRLEVBQ1IsT0FBeUIsRUFDekIsUUFBK0IsSUFBSSxFQUNuQyxnQkFBeUIsS0FBSyxFQUM5QixVQUFtQixLQUFLLEVBQ3hCLEtBQWtCLElBQUk7WUFMdEIsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNSLFlBQU8sR0FBUCxPQUFPLENBQWtCO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQThCO1lBQ25DLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtZQUM5QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUN4QixPQUFFLEdBQUYsRUFBRSxDQUFvQjtZQUU5QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLGdCQUFnQixHQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQ3JELElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FDbkMsQ0FBQztZQUVGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFFLEtBQUs7Z0JBQy9DLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDOUMsQ0FBQztRQUVELGdCQUFnQixDQUFDLEtBQWtCO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdDLENBQUM7UUFFRCxZQUFZLENBQUMsQ0FBTTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUM5RSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFDVixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBRUo7SUFyREQsd0NBcURDIn0=