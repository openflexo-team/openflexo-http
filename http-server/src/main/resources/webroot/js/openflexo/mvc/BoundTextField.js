define(["require", "exports", "./BoundComponent", "../ui/TextField", "./utils"], function (require, exports, BoundComponent_1, TextField_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.changelistener = (value) => this.updateValue(value);
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            let actualId = this.id !== null ? this.id : "boundTextField" + idSeed++;
            this.textField = new TextField_1.TextField(actualId, this.binding, this.label, this.floatingLabel, this.invalid);
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
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            this.runtimeBinding = utils_1.updateBindingRuntime(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
        isEnable() {
            return this.textField.isEnable();
        }
        setEnable(enable) {
            this.textField.setEnable(enable);
        }
    }
    exports.BoundTextField = BoundTextField;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUZXh0RmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCb3VuZFRleHRGaWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFZixvQkFBNEIsU0FBUSwrQkFBYztRQVU5QyxZQUNJLEdBQVEsRUFDQSxPQUFlLEVBQ04sUUFBK0IsSUFBSSxFQUM1QyxVQUF1QixJQUFJLEVBQ2xCLGdCQUF5QixLQUFLLEVBQzlCLFVBQW1CLEtBQUssRUFDeEIsS0FBa0IsSUFBSTtZQUV2QyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFQSCxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ04sVUFBSyxHQUFMLEtBQUssQ0FBOEI7WUFDNUMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7WUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWlCO1lBQzlCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1lBQ3hCLE9BQUUsR0FBRixFQUFFLENBQW9CO1lBWG5DLG1CQUFjLEdBQWtDLElBQUksQ0FBQztZQUU1QyxtQkFBYyxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFZakUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLEdBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FDbkMsQ0FBQztZQUVGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUM5QyxDQUFDO1FBRU8sWUFBWSxDQUFDLENBQU07WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztvQkFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDVixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFFTyxXQUFXLENBQUMsS0FBVTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxhQUFhLENBQUMsT0FBb0IsRUFBRSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtCO1lBQ3hFLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLElBQUksQ0FBQyxjQUFjLEdBQUcsNEJBQW9CLENBQ3hDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUMzQyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQ3pDLENBQUM7UUFDSixDQUFDO1FBRUQsUUFBUTtZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQ0o7SUFwRUQsd0NBb0VDIn0=