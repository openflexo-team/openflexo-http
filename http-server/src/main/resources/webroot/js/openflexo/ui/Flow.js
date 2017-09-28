define(["require", "exports", "./Component", "./utils"], function (require, exports, Component_1, utils_1) {
    "use strict";
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
            let element = utils_1.toHTMLElement(child);
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
            this.children.forEach(child => utils_1.setEnable(child, enable));
        }
    }
    exports.Flow = Flow;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFJQSxVQUFrQixTQUFRLHFCQUFTO1FBTy9CLFlBQ0ksR0FBRyxRQUF3QjtZQUUzQixLQUFLLEVBQUUsQ0FBQztZQU5KLGFBQVEsR0FBbUIsRUFBRSxDQUFDO1lBQzlCLGFBQVEsR0FBVyxFQUFFLENBQUM7WUFNMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxRQUFRLENBQUMsS0FBbUI7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsSUFBSSxPQUFPLEdBQUcscUJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsV0FBVyxDQUFDLEtBQW1CO1lBQzNCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLG1CQUFtQjtnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxTQUFTLENBQUMsTUFBZTtZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksaUJBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQ0o7SUExQ0Qsb0JBMENDIn0=