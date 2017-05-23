define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var TechnologyAdapterCard = (function () {
        function TechnologyAdapterCard(ta) {
            this.ta = ta;
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/TechnologyAdapterCard.css");
        }
        TechnologyAdapterCard.prototype.initialize = function () {
            this.container = document.createElement("div");
            this.container.classList.add("of-technologyadaptercard");
            this.container.classList.add("mdl-card");
            this.container.classList.add("mdl-shadow--2dp");
            var title = document.createElement("div");
            title.classList.add("mdl-card__title");
            var titleText = document.createElement("div");
            titleText.classList.add("mdl-card__title-text");
            titleText.innerText = this.ta.name;
            title.appendChild(titleText);
            this.container.appendChild(title);
            var text = document.createElement("div");
            text.classList.add("mdl-card__supporting-text");
            text.innerText = this.ta.name + " description";
            this.container.appendChild(text);
        };
        TechnologyAdapterCard.prototype.dispose = function () {
        };
        return TechnologyAdapterCard;
    }());
    exports.TechnologyAdapterCard = TechnologyAdapterCard;
});
/*
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Get Started
    </a>
  </div>
  <div class="mdl-card__menu">
    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
      <i class="material-icons">share</i>
    </button>
  </div>
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVjaG5vbG9neUFkYXB0ZXJDYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVjaG5vbG9neUFkYXB0ZXJDYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBTUE7UUFNSSwrQkFBWSxFQUFxQjtZQUM3QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUViLGlDQUF5QixDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVELDBDQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRWhELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUV2QyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDaEQsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNuQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQsdUNBQU8sR0FBUDtRQUVBLENBQUM7UUFDTCw0QkFBQztJQUFELENBQUMsQUFwQ0QsSUFvQ0M7SUFwQ1ksc0RBQXFCOztBQXFDbEM7Ozs7Ozs7Ozs7O0VBV0UifQ==