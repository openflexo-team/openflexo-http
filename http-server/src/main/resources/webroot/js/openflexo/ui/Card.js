define(["require", "exports", "./utils", "./Component"], function (require, exports, utils_1, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Card = void 0;
    class Card extends Component_1.Component {
        constructor(title, description) {
            super();
            this.title = title;
            this.description = description;
            (0, utils_1.addCssIfNotAlreadyPresent)("/css/openflexo/ui/Card.css");
            this.create();
        }
        create() {
            this.container = document.createElement("div");
            this.container.classList.add("of-card");
            this.container.classList.add("mdl-card");
            this.container.classList.add("mdl-shadow--2dp");
            let title = document.createElement("div");
            title.classList.add("mdl-card__title");
            let titleText = document.createElement("div");
            titleText.classList.add("mdl-card__title-text");
            title.appendChild((0, utils_1.toHTMLElement)(this.title));
            title.appendChild(titleText);
            this.container.appendChild(title);
            let text = document.createElement("div");
            text.classList.add("mdl-card__supporting-text");
            text.appendChild((0, utils_1.toHTMLElement)(this.description));
            this.container.appendChild(text);
        }
        setEnable(enable) {
            (0, utils_1.setEnable)(this.title, enable);
            (0, utils_1.setEnable)(this.description, enable);
        }
    }
    exports.Card = Card;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUlBLE1BQWEsSUFBSyxTQUFRLHFCQUFTO1FBSS9CLFlBQ1ksS0FBdUIsRUFDdkIsV0FBeUI7WUFFakMsS0FBSyxFQUFFLENBQUM7WUFIQSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtZQUN2QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUdqQyxJQUFBLGlDQUF5QixFQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFaEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRXZDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNoRCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUEscUJBQWEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUEscUJBQWEsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQsU0FBUyxDQUFDLE1BQWU7WUFDdkIsSUFBQSxpQkFBUyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUIsSUFBQSxpQkFBUyxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUNKO0lBdENELG9CQXNDQyJ9