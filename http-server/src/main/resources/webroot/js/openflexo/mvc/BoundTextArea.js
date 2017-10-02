define(["require", "exports", "./BoundComponent", "../ui/TextArea", "./utils"], function (require, exports, BoundComponent_1, TextArea_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.textArea = new TextArea_1.TextArea(actualId, this.binding.expression, this.label, this.floatingLabel, this.invalid, this.rows);
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
            this.runtimeBinding = utils_1.updateBindingRuntime(this.api, this.binding, this.runtimeBinding, this.changelistener, runtime, extensions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUZXh0QXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdW5kVGV4dEFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRWYsbUJBQTJCLFNBQVEsK0JBQWM7UUFVN0MsWUFDSSxHQUFRLEVBQ0EsT0FBMEIsRUFDakIsUUFBK0IsSUFBSSxFQUM1QyxVQUF1QixJQUFJLEVBQ2xCLGdCQUF5QixLQUFLLEVBQzlCLFVBQW1CLEtBQUssRUFDeEIsS0FBa0IsSUFBSSxFQUN0QixJQUFvQjtZQUVyQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFSSCxZQUFPLEdBQVAsT0FBTyxDQUFtQjtZQUNqQixVQUFLLEdBQUwsS0FBSyxDQUE4QjtZQUM1QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtZQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7WUFDeEIsT0FBRSxHQUFGLEVBQUUsQ0FBb0I7WUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7WUFaakMsbUJBQWMsR0FBa0MsSUFBSSxDQUFDO1lBRTVDLG1CQUFjLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQWFqRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxNQUFNO1lBQ0YsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsR0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQzdDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUM5QyxDQUFDO1lBRUYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDaEMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzdDLENBQUM7UUFFTyxZQUFZLENBQUMsQ0FBTTtZQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUM3RSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0MsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztRQUVPLFdBQVcsQ0FBQyxLQUFVO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdEMsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFvQixFQUFFLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0I7WUFDeEUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLGNBQWMsR0FBRyw0QkFBb0IsQ0FDeEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQzNDLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FDekMsQ0FBQztRQUNKLENBQUM7UUFFRCxRQUFRO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FDSjtJQXJFRCxzQ0FxRUMifQ==