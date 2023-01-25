define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Flow = void 0;
    class Flow extends Component_1.Component {
        constructor(...children) {
            super();
            this.children = [];
            this.elements = [];
            this.create();
            children.forEach(child => this.addChild(child));
        }
        addChild(child) {
            this.children.push(child);
            let element = (0, utils_1.toHTMLElement)(child);
            this.elements.push(element);
            this.container.appendChild(element);
        }
        removeChild(child) {
            let index = this.children.indexOf(child);
            if (index >= 0) {
                // removes from array
                this.children.splice(index, 1);
                let element = this.elements[index];
                this.elements.splice(index, 1);
                // removes from dom
                this.container.removeChild(element);
            }
        }
        create() {
            this.container = document.createElement("span");
        }
        setEnable(enable) {
            this.children.forEach(child => (0, utils_1.setEnable)(child, enable));
        }
    }
    exports.Flow = Flow;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUlBLE1BQWEsSUFBSyxTQUFRLHFCQUFTO1FBTy9CLFlBQ0ksR0FBRyxRQUF3QjtZQUUzQixLQUFLLEVBQUUsQ0FBQztZQU5KLGFBQVEsR0FBbUIsRUFBRSxDQUFDO1lBQzlCLGFBQVEsR0FBVyxFQUFFLENBQUM7WUFNMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsUUFBUSxDQUFDLEtBQW1CO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxHQUFHLElBQUEscUJBQWEsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsV0FBVyxDQUFDLEtBQW1CO1lBQzNCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDWixxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0wsQ0FBQztRQUVTLE1BQU07WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFlO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBQSxpQkFBUyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7S0FDSjtJQTFDRCxvQkEwQ0MifQ==