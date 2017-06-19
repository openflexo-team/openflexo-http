var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    var FlexoConcept = (function (_super) {
        __extends(FlexoConcept, _super);
        function FlexoConcept(name, id, url, type, description, virtualModel, container, childFlexoConcepts, parents, properties, behaviors) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.description = description;
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
        function VirtualModel(name, id, url, type, description, container, properties, behaviors, flexoConcepts, resourceUrl) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.description = description;
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
        function ViewPoint(name, id, url, type, description, properties, behaviors, virtualModels, resourceUrl) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.description = description;
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
        function FlexoRole(name, id, url, type, description) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.description = description;
            return _this;
        }
        return FlexoRole;
    }(general_1.Description));
    exports.FlexoRole = FlexoRole;
    var FlexoBehavior = (function (_super) {
        __extends(FlexoBehavior, _super);
        function FlexoBehavior(name, id, url, type, description) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.description = description;
            return _this;
        }
        return FlexoBehavior;
    }(general_1.Description));
    exports.FlexoBehavior = FlexoBehavior;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFFQTtRQUFrQyxnQ0FBeUI7UUFDdkQsc0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFdBQW1CLEVBQ25CLFlBQXVDLEVBQ3ZDLFNBQXlDLEVBQ3pDLGtCQUErQyxFQUMvQyxPQUFvQyxFQUNwQyxVQUF1QixFQUN2QixTQUEwQjtZQVhyQyxZQWFJLGtCQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQ3ZCO1lBYlUsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGlCQUFXLEdBQVgsV0FBVyxDQUFRO1lBQ25CLGtCQUFZLEdBQVosWUFBWSxDQUEyQjtZQUN2QyxlQUFTLEdBQVQsU0FBUyxDQUFnQztZQUN6Qyx3QkFBa0IsR0FBbEIsa0JBQWtCLENBQTZCO1lBQy9DLGFBQU8sR0FBUCxPQUFPLENBQTZCO1lBQ3BDLGdCQUFVLEdBQVYsVUFBVSxDQUFhO1lBQ3ZCLGVBQVMsR0FBVCxTQUFTLENBQWlCOztRQUdyQyxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBaEJELENBQWtDLHFCQUFXLEdBZ0I1QztJQWhCWSxvQ0FBWTtJQWtCekI7UUFBa0MsZ0NBQXlCO1FBQ3ZELHNCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixXQUFtQixFQUNuQixTQUF5QyxFQUN6QyxVQUF1QixFQUN2QixTQUEwQixFQUMxQixhQUEwQyxFQUMxQyxXQUFtQjtZQVY5QixZQVlJLGtCQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQ3ZCO1lBWlUsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGlCQUFXLEdBQVgsV0FBVyxDQUFRO1lBQ25CLGVBQVMsR0FBVCxTQUFTLENBQWdDO1lBQ3pDLGdCQUFVLEdBQVYsVUFBVSxDQUFhO1lBQ3ZCLGVBQVMsR0FBVCxTQUFTLENBQWlCO1lBQzFCLG1CQUFhLEdBQWIsYUFBYSxDQUE2QjtZQUMxQyxpQkFBVyxHQUFYLFdBQVcsQ0FBUTs7UUFHOUIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQWZELENBQWtDLHFCQUFXLEdBZTVDO0lBZlksb0NBQVk7SUFpQnpCO1FBQStCLDZCQUFzQjtRQUNqRCxtQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osV0FBbUIsRUFDbkIsVUFBdUIsRUFDdkIsU0FBMEIsRUFDMUIsYUFBMEMsRUFDMUMsV0FBbUI7WUFUOUIsWUFXSSxrQkFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUN2QjtZQVhVLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixpQkFBVyxHQUFYLFdBQVcsQ0FBUTtZQUNuQixnQkFBVSxHQUFWLFVBQVUsQ0FBYTtZQUN2QixlQUFTLEdBQVQsU0FBUyxDQUFpQjtZQUMxQixtQkFBYSxHQUFiLGFBQWEsQ0FBNkI7WUFDMUMsaUJBQVcsR0FBWCxXQUFXLENBQVE7O1FBRzlCLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFkRCxDQUErQixxQkFBVyxHQWN6QztJQWRZLDhCQUFTO0lBZ0J0QjtRQUErQiw2QkFBc0I7UUFDakQsbUJBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFdBQW1CO1lBTDlCLFlBT0ksa0JBQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDdEI7WUFQUyxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osaUJBQVcsR0FBWCxXQUFXLENBQVE7O1FBRzdCLENBQUM7UUFDTixnQkFBQztJQUFELENBQUMsQUFWRCxDQUErQixxQkFBVyxHQVV6QztJQVZZLDhCQUFTO0lBWXRCO1FBQW1DLGlDQUEwQjtRQUN6RCx1QkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osV0FBbUI7WUFMOUIsWUFPSSxrQkFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUN0QjtZQVBTLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixpQkFBVyxHQUFYLFdBQVcsQ0FBUTs7UUFHN0IsQ0FBQztRQUNOLG9CQUFDO0lBQUQsQ0FBQyxBQVZELENBQW1DLHFCQUFXLEdBVTdDO0lBVlksc0NBQWEifQ==