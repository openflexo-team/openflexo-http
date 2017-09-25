define(["require", "exports", "./utils", "./category"], function (require, exports, utils_1, category_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Card {
        constructor(title, description) {
            this.title = title;
            this.description = description;
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/Card.css");
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
            title.appendChild(category_1.toElement(this.title));
            title.appendChild(titleText);
            this.container.appendChild(title);
            let text = document.createElement("div");
            text.classList.add("mdl-card__supporting-text");
            text.appendChild(category_1.toElement(this.description));
            this.container.appendChild(text);
            utils_1.mdlUpgradeElement(this.container);
        }
    }
    exports.Card = Card;
    class GridCell {
        constructor(contents, size = 4) {
            this.contents = contents;
            this.size = size;
            this.create();
        }
        create() {
            this.container = document.createElement("div");
            this.container.classList.add("grid-cell");
            this.container.classList.add("mdl-cell--" + this.size + "-col");
            let contents = this.contents;
            this.container.appendChild(utils_1.toHTMLElement(contents));
            utils_1.mdlUpgradeElement(this.container);
        }
    }
    exports.GridCell = GridCell;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFJSSxZQUNZLEtBQXVCLEVBQ3ZCLFdBQXlCO1lBRHpCLFVBQUssR0FBTCxLQUFLLENBQWtCO1lBQ3ZCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBRWpDLGlDQUF5QixDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFTyxNQUFNO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFaEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRXZDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNoRCxLQUFLLENBQUMsV0FBVyxDQUFDLG9CQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVsQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpDLHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQ0o7SUFsQ0Qsb0JBa0NDO0lBRUQ7UUFJSSxZQUNZLFFBQWlDLEVBQ2pDLE9BQWUsQ0FBQztZQURoQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUNqQyxTQUFJLEdBQUosSUFBSSxDQUFZO1lBRXhCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsSUFBSSxHQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMscUJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1lBQ25ELHlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQ0o7SUFuQkQsNEJBbUJDIn0=