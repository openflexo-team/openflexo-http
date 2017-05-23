define(["require", "exports"], function (require, exports) {
    "use strict";
    var TechnologyAdapterCard = (function () {
        function TechnologyAdapterCard(ta) {
            this.ta = ta;
        }
        TechnologyAdapterCard.prototype.initialize = function () {
            this.container = document.createElement("div");
            this.container.classList.add("mdl-card");
            this.container.classList.add("mdl-shadow--2dp");
            var title = document.createElement("div");
            title.classList.add("mdl-card__title");
            var titleText = document.createElement("div");
            titleText.classList.add("mdl-card__title-text");
            titleText.innerText = this.ta.name;
            title.appendChild(titleText);
            this.container.appendChild(title);
        };
        TechnologyAdapterCard.prototype.dispose = function () {
        };
        return TechnologyAdapterCard;
    }());
    exports.TechnologyAdapterCard = TechnologyAdapterCard;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVjaG5vbG9neUFkYXB0ZXJDYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVjaG5vbG9neUFkYXB0ZXJDYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBSUE7UUFNSSwrQkFBWSxFQUFxQjtZQUM3QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBRUQsMENBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFaEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRXZDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNoRCxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ25DLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELHVDQUFPLEdBQVA7UUFFQSxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQUFDLEFBN0JELElBNkJDO0lBN0JZLHNEQUFxQiJ9