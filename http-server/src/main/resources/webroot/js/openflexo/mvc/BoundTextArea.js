define(["require", "exports", "./BoundComponent", "../ui/TextArea", "./utils"], function (require, exports, BoundComponent_1, TextArea_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundTextArea = void 0;
    var idSeed = 0;
    class BoundTextArea extends BoundComponent_1.BoundComponent {
        constructor(api, binding, label = null, runtime = null, floatingLabel = false, invalid = false, id = null, rows) {
            super(api);
            this.binding = binding;
            this.label = label;
            this.runtime = runtime;
            this.floatingLabel = floatingLabel;
            this.invalid = invalid;
            this.id = id;
            this.rows = rows;
            this.runtimeBinding = null;
            this.changelistener = (value) => this.updateValue(value);
            this.create();
            this.updateRuntime(runtime);
        }
        create() {
            let actualId = this.id !== null ? this.id : "boundTextField" + idSeed++;
            this.textArea = new TextArea_1.TextArea(actualId, this.binding, this.label, this.floatingLabel, this.invalid, this.rows);
            let input = this.textArea.input;
            input.onchange = (e) => this.sendToServer(e);
            input.onblur = (e) => this.sendToServer(e);
            this.container = this.textArea.container;
        }
        sendToServer(e) {
            if (this.runtimeBinding !== null) {
                this.api.assign(this.runtimeBinding, this.textArea.input.value, false).then(value => {
                    this.container.classList.remove("is-invalid");
                }).catch(error => {
                    this.container.classList.add("is-invalid");
                });
            }
        }
        updateValue(value) {
            this.textArea.input.value = value;
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            this.runtimeBinding = (0, utils_1.updateBindingRuntime)(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
        }
        isEnable() {
            return this.textArea.isEnable();
        }
        setEnable(enable) {
            this.textArea.setEnable(enable);
        }
    }
    exports.BoundTextArea = BoundTextArea;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUZXh0QXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGV4dEFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVFBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVmLE1BQWEsYUFBYyxTQUFRLCtCQUFjO1FBVTdDLFlBQ0ksR0FBUSxFQUNBLE9BQWUsRUFDTixRQUErQixJQUFJLEVBQzVDLFVBQXVCLElBQUksRUFDbEIsZ0JBQXlCLEtBQUssRUFDOUIsVUFBbUIsS0FBSyxFQUN4QixLQUFrQixJQUFJLEVBQ3RCLElBQW9CO1lBRXJDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQVJILFlBQU8sR0FBUCxPQUFPLENBQVE7WUFDTixVQUFLLEdBQUwsS0FBSyxDQUE4QjtZQUM1QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtZQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDeEIsT0FBRSxHQUFGLEVBQUUsQ0FBb0I7WUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7WUFaakMsbUJBQWMsR0FBa0MsSUFBSSxDQUFDO1lBRTVDLG1CQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFhakUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFDbEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQzlDLENBQUM7WUFFRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNoQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUM3QyxDQUFDO1FBRU8sWUFBWSxDQUFDLENBQU07WUFDdkIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtnQkFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNoRixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO1FBRU8sV0FBVyxDQUFDLEtBQVU7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN0QyxDQUFDO1FBRUQsYUFBYSxDQUFDLE9BQW9CLEVBQUUsYUFBYSxJQUFJLEdBQUcsRUFBa0I7WUFDeEUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFBLDRCQUFvQixFQUN4QyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDM0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUN6QyxDQUFDO1FBQ0osQ0FBQztRQUVELFFBQVE7WUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FDSjtJQXJFRCxzQ0FxRUMifQ==