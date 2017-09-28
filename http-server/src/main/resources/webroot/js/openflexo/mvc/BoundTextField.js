define(["require", "exports", "../api/Api", "./BoundComponent", "../ui/TextField"], function (require, exports, Api_1, BoundComponent_1, TextField_1) {
    "use strict";
    var idSeed = 0;
    class BoundTextField extends BoundComponent_1.BoundComponent {
        constructor(api, binding, label = null, runtime = null, floatingLabel = false, invalid = false, id = null) {
            super(api);
            this.binding = binding;
            this.label = label;
            this.runtime = runtime;
            this.floatingLabel = floatingLabel;
            this.invalid = invalid;
            this.id = id;
            this.runtimeBinding = null;
            this.changelistener = (event) => this.updateValue(event.value);
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            let actualId = this.id !== null ? this.id : "boundTextField" + idSeed++;
            this.textField = new TextField_1.TextField(actualId, this.binding.expression, this.label, this.floatingLabel, this.invalid);
            let input = this.textField.input;
            input.onchange = (e) => this.sendToServer(e);
            input.onblur = (e) => this.sendToServer(e);
            this.container = this.textField.container;
        }
        sendToServer(e) {
            if (this.runtimeBinding !== null) {
                this.api.assign(this.runtimeBinding, this.textField.input.value, false).then(value => {
                    this.container.classList.remove("is-invalid");
                }).catch(error => {
                    this.container.classList.add("is-invalid");
                });
            }
        }
        updateValue(value) {
            this.textField.input.value = value;
        }
        updateRuntime(runtime) {
            if (this.runtimeBinding !== null) {
                this.api.removeChangeListener(this.runtimeBinding, this.changelistener);
            }
            this.runtimeBinding = null;
            if (runtime !== null) {
                this.binding.contextUrl = runtime;
                this.runtimeBinding = new Api_1.RuntimeBindingId(this.binding, runtime);
                this.api.evaluate(this.runtimeBinding).then(value => this.updateValue(value));
                this.api.addChangeListener(this.runtimeBinding, this.changelistener);
                this.setEnable(true);
            }
            else {
                this.setEnable(false);
            }
        }
        setEnable(enable) {
            this.textField.setEnable(enable);
        }
    }
    exports.BoundTextField = BoundTextField;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUZXh0RmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZFRleHRGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU9BLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVmLG9CQUE0QixTQUFRLCtCQUFjO1FBVTlDLFlBQ0ksR0FBUSxFQUNBLE9BQTBCLEVBQ2pCLFFBQStCLElBQUksRUFDNUMsVUFBdUIsSUFBSSxFQUNsQixnQkFBeUIsS0FBSyxFQUM5QixVQUFtQixLQUFLLEVBQ3hCLEtBQWtCLElBQUk7WUFFdkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBUEgsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7WUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBOEI7WUFDNUMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7WUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWlCO1lBQzlCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1lBQ3hCLE9BQUUsR0FBRixFQUFFLENBQW9CO1lBWG5DLG1CQUFjLEdBQWtDLElBQUksQ0FBQztZQUU1QyxtQkFBYyxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBWXZFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLGdCQUFnQixHQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFDN0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMs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