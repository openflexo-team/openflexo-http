define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextArea extends Component_1.Component {
        constructor(id, value = null, label = null, floatingLabel = false, invalid = false, rows, max_rows = null) {
            super();
            this.id = id;
            this.value = value;
            this.label = label;
            this.floatingLabel = floatingLabel;
            this.invalid = invalid;
            this.rows = rows;
            this.max_rows = max_rows;
            this.create();
        }
        create() {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-textfield");
            this.container.classList.add("mdl-js-textfield");
            if (this.floatingLabel) {
                this.container.classList.add("mdl-textfield--floating-label");
            }
            if (this.invalid) {
                this.container.classList.add("is-invalid");
            }
            this.input = document.createElement("textarea");
            this.input.classList.add("mdl-textfield__input");
            this.input.id = this.id;
            if (this.rows) {
                this.input.rows = this.rows;
            }
            if (this.max_rows) {
                this.input.cols = this.max_rows;
            }
            this.container.appendChild(this.input);
            if (this.value != null) {
                this.input.value = this.value;
            }
            if (this.label != null) {
                let label = document.createElement("label");
                label.classList.add("mdl-textfield__label");
                label.htmlFor = this.id;
                label.appendChild(utils_1.toHTMLElement(this.label));
                this.container.appendChild(label);
            }
            utils_1.mdlUpgradeElement(this.container);
        }
        isEnable() {
            return !this.input.disabled;
        }
        setEnable(enable) {
            utils_1.setEnable(this.label, enable);
            this.input.disabled = !enable;
        }
    }
    exports.TextArea = TextArea;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXh0QXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQSxjQUFzQixTQUFRLHFCQUFTO1FBY25DLFlBQ3FCLEVBQVUsRUFDbkIsUUFBcUIsSUFBSSxFQUN6QixRQUErQixJQUFJLEVBQzFCLGdCQUF5QixLQUFLLEVBQzlCLFVBQW1CLEtBQUssRUFDeEIsSUFBb0IsRUFDcEIsV0FBMkIsSUFBSTtZQUVoRCxLQUFLLEVBQUUsQ0FBQztZQVJTLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7WUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBOEI7WUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO1lBQzlCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1lBQ3hCLFNBQUksR0FBSixJQUFJLENBQWdCO1lBQ3BCLGFBQVEsR0FBUixRQUFRLENBQXVCO1lBR2hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBRXhCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDcEMsQ0FBQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsV0FBVyxDQUFDLHFCQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFDRCx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELFFBQVE7WUFDTixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM5QixDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsaUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2hDLENBQUM7S0FDSjtJQTFFRCw0QkEwRUMifQ==