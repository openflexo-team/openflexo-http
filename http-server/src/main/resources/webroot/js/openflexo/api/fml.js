var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    var FlexoConcept = (function (_super) {
        __extends(FlexoConcept, _super);
        function FlexoConcept(name, id, url, type, virtualModel, container, childFlexoConcepts, parents, properties, behaviors) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.virtualModel = virtualModel;
            _this.container = container;
            _this.childFlexoConcepts = childFlexoConcepts;
            _this.parents = parents;
            _this.properties = properties;
            _this.behaviors = behaviors;
            return _this;
        }
        return FlexoConcept;
    }(general_1.Description));
    exports.FlexoConcept = FlexoConcept;
    var VirtualModel = (function (_super) {
        __extends(VirtualModel, _super);
        function VirtualModel(name, id, url, type, container, properties, behaviors, flexoConcepts, resourceUrl) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.container = container;
            _this.properties = properties;
            _this.behaviors = behaviors;
            _this.flexoConcepts = flexoConcepts;
            _this.resourceUrl = resourceUrl;
            return _this;
        }
        return VirtualModel;
    }(general_1.Description));
    exports.VirtualModel = VirtualModel;
    var ViewPoint = (function (_super) {
        __extends(ViewPoint, _super);
        function ViewPoint(name, id, url, type, properties, behaviors, virtualModels, resourceUrl) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.properties = properties;
            _this.behaviors = behaviors;
            _this.virtualModels = virtualModels;
            _this.resourceUrl = resourceUrl;
            return _this;
        }
        return ViewPoint;
    }(general_1.Description));
    exports.ViewPoint = ViewPoint;
    var FlexoRole = (function (_super) {
        __extends(FlexoRole, _super);
        function FlexoRole(name, id, url, type) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            return _this;
        }
        return FlexoRole;
    }(general_1.Description));
    exports.FlexoRole = FlexoRole;
    var FlexoBehavior = (function (_super) {
        __extends(FlexoBehavior, _super);
        function FlexoBehavior(name, id, url, type) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            return _this;
        }
        return FlexoBehavior;
    }(general_1.Description));
    exports.FlexoBehavior = FlexoBehavior;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFFQTtRQUFrQyxnQ0FBeUI7UUFDdkQsc0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFlBQXVDLEVBQ3ZDLFNBQXlDLEVBQ3pDLGtCQUErQyxFQUMvQyxPQUFvQyxFQUNwQyxVQUF1QixFQUN2QixTQUEwQjtZQVZyQyxZQVlJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUM3QjtZQVpVLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixrQkFBWSxHQUFaLFlBQVksQ0FBMkI7WUFDdkMsZUFBUyxHQUFULFNBQVMsQ0FBZ0M7WUFDekMsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUE2QjtZQUMvQyxhQUFPLEdBQVAsT0FBTyxDQUE2QjtZQUNwQyxnQkFBVSxHQUFWLFVBQVUsQ0FBYTtZQUN2QixlQUFTLEdBQVQsU0FBUyxDQUFpQjs7UUFHckMsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQWZELENBQWtDLHFCQUFXLEdBZTVDO0lBZlksb0NBQVk7SUFpQnpCO1FBQWtDLGdDQUF5QjtRQUN2RCxzQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osU0FBeUMsRUFDekMsVUFBdUIsRUFDdkIsU0FBMEIsRUFDMUIsYUFBMEMsRUFDMUMsV0FBbUI7WUFUOUIsWUFXSSxrQkFBTSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDN0I7WUFYVSxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osZUFBUyxHQUFULFNBQVMsQ0FBZ0M7WUFDekMsZ0JBQVUsR0FBVixVQUFVLENBQWE7WUFDdkIsZUFBUyxHQUFULFNBQVMsQ0FBaUI7WUFDMUIsbUJBQWEsR0FBYixhQUFhLENBQTZCO1lBQzFDLGlCQUFXLEdBQVgsV0FBVyxDQUFROztRQUc5QixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBZEQsQ0FBa0MscUJBQVcsR0FjNUM7SUFkWSxvQ0FBWTtJQWdCekI7UUFBK0IsNkJBQXNCO1FBQ2pELG1CQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixVQUF1QixFQUN2QixTQUEwQixFQUMxQixhQUEwQyxFQUMxQyxXQUFtQjtZQVI5QixZQVVJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUM3QjtZQVZVLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixnQkFBVSxHQUFWLFVBQVUsQ0FBYTtZQUN2QixlQUFTLEdBQVQsU0FBUyxDQUFpQjtZQUMxQixtQkFBYSxHQUFiLGFBQWEsQ0FBNkI7WUFDMUMsaUJBQVcsR0FBWCxXQUFXLENBQVE7O1FBRzlCLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFiRCxDQUErQixxQkFBVyxHQWF6QztJQWJZLDhCQUFTO0lBZXRCO1FBQStCLDZCQUFzQjtRQUNqRCxtQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZO1lBSnZCLFlBTUksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQzVCO1lBTlMsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTs7UUFHdEIsQ0FBQztRQUNOLGdCQUFDO0lBQUQsQ0FBQyxBQVRELENBQStCLHFCQUFXLEdBU3pDO0lBVFksOEJBQVM7SUFXdEI7UUFBbUMsaUNBQTBCO1FBQ3pELHVCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVk7WUFKdkIsWUFNSSxrQkFBTSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDNUI7WUFOUyxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFROztRQUd0QixDQUFDO1FBQ04sb0JBQUM7SUFBRCxDQUFDLEFBVEQsQ0FBbUMscUJBQVcsR0FTN0M7SUFUWSxzQ0FBYSJ9