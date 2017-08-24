define(["require", "exports", "./utils", "./category"], function (require, exports, utils_1, category_1) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFJQTtRQUlJLFlBQ1ksS0FBdUIsRUFDdkIsV0FBeUI7WUFEekIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7WUFDdkIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFFakMsaUNBQXlCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVPLE1BQU07WUFDVixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVoRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFdkMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2hELEtBQUssQ0FBQyxXQUFXLENBQUMsb0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFakMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FDSjtJQWxDRCxvQkFrQ0M7SUFFRDtRQUlJLFlBQ1ksUUFBaUMsRUFDakMsT0FBZSxDQUFDO1lBRGhCLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQ2pDLFNBQUksR0FBSixJQUFJLENBQVk7WUFFeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxNQUFNO1lBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxJQUFJLEdBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDbkQseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FDSjtJQW5CRCw0QkFtQkMifQ==