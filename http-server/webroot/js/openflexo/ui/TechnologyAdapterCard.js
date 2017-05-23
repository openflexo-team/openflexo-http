define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var TechnologyAdapterCard = (function () {
        function TechnologyAdapterCard(ta) {
            this.ta = ta;
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/TechnologyAdapterCard.css");
            this.create();
        }
        TechnologyAdapterCard.prototype.create = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVjaG5vbG9neUFkYXB0ZXJDYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVjaG5vbG9neUFkYXB0ZXJDYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBTUE7UUFNSSwrQkFBWSxFQUFxQjtZQUM3QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUViLGlDQUF5QixDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFTyxzQ0FBTSxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVoRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFdkMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2hELFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVsQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FBQyxBQWpDRCxJQWlDQztJQWpDWSxzREFBcUI7O0FBa0NsQzs7Ozs7Ozs7Ozs7RUFXRSJ9