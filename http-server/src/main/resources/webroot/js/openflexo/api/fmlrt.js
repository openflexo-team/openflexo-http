var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    var FlexoConceptInstance = (function (_super) {
        __extends(FlexoConceptInstance, _super);
        function FlexoConceptInstance(id, url, type, flexoConcept, virtualModelInstance, view, container, embeddedFlexoConceptInstance, actors) {
            var _this = _super.call(this, "", id, url, type) || this;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.flexoConcept = flexoConcept;
            _this.virtualModelInstance = virtualModelInstance;
            _this.view = view;
            _this.container = container;
            _this.embeddedFlexoConceptInstance = embeddedFlexoConceptInstance;
            _this.actors = actors;
            return _this;
        }
        return FlexoConceptInstance;
    }(general_1.Description));
    exports.FlexoConceptInstance = FlexoConceptInstance;
    var VirtualModelInstance = (function (_super) {
        __extends(VirtualModelInstance, _super);
        function VirtualModelInstance(name, id, url, type, virtualModel, view, actors, flexoConceptInstances, resourceUrl) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.virtualModel = virtualModel;
            _this.view = view;
            _this.actors = actors;
            _this.flexoConceptInstances = flexoConceptInstances;
            _this.resourceUrl = resourceUrl;
            return _this;
        }
        return VirtualModelInstance;
    }(general_1.Description));
    exports.VirtualModelInstance = VirtualModelInstance;
    var View = (function (_super) {
        __extends(View, _super);
        function View(name, id, url, type, viewPoint, container, actors, flexoConceptInstances, resourceUrl) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.viewPoint = viewPoint;
            _this.container = container;
            _this.actors = actors;
            _this.flexoConceptInstances = flexoConceptInstances;
            _this.resourceUrl = resourceUrl;
            return _this;
        }
        return View;
    }(general_1.Description));
    exports.View = View;
    var FlexoActor = (function (_super) {
        __extends(FlexoActor, _super);
        function FlexoActor(name, id, url, type, value) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.value = value;
            return _this;
        }
        return FlexoActor;
    }(general_1.Description));
    exports.FlexoActor = FlexoActor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm1scnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbWxydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBR0E7UUFBMEMsd0NBQWlDO1FBQ3ZFLDhCQUNXLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFlBQXVDLEVBQ3ZDLG9CQUF1RCxFQUN2RCxJQUF1QixFQUN2QixTQUFpRCxFQUNqRCw0QkFBaUUsRUFDakUsTUFBb0I7WUFUL0IsWUFXSSxrQkFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDM0I7WUFYVSxRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixrQkFBWSxHQUFaLFlBQVksQ0FBMkI7WUFDdkMsMEJBQW9CLEdBQXBCLG9CQUFvQixDQUFtQztZQUN2RCxVQUFJLEdBQUosSUFBSSxDQUFtQjtZQUN2QixlQUFTLEdBQVQsU0FBUyxDQUF3QztZQUNqRCxrQ0FBNEIsR0FBNUIsNEJBQTRCLENBQXFDO1lBQ2pFLFlBQU0sR0FBTixNQUFNLENBQWM7O1FBRy9CLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUFkRCxDQUEwQyxxQkFBVyxHQWNwRDtJQWRZLG9EQUFvQjtJQWdCakM7UUFBMEMsd0NBQWlDO1FBQ3ZFLDhCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixZQUF1QyxFQUN2QyxJQUF1QixFQUN2QixNQUFvQixFQUNwQixxQkFBMEQsRUFDMUQsV0FBbUI7WUFUOUIsWUFXSSxrQkFBTSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDN0I7WUFYVSxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osa0JBQVksR0FBWixZQUFZLENBQTJCO1lBQ3ZDLFVBQUksR0FBSixJQUFJLENBQW1CO1lBQ3ZCLFlBQU0sR0FBTixNQUFNLENBQWM7WUFDcEIsMkJBQXFCLEdBQXJCLHFCQUFxQixDQUFxQztZQUMxRCxpQkFBVyxHQUFYLFdBQVcsQ0FBUTs7UUFHOUIsQ0FBQztRQUNMLDJCQUFDO0lBQUQsQ0FBQyxBQWRELENBQTBDLHFCQUFXLEdBY3BEO0lBZFksb0RBQW9CO0lBZ0JqQztRQUEwQix3QkFBaUI7UUFDdkMsY0FDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osU0FBaUMsRUFDakMsU0FBaUQsRUFDakQsTUFBb0IsRUFDcEIscUJBQTBELEVBQzFELFdBQW1CO1lBVDlCLFlBV0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQzdCO1lBWFUsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGVBQVMsR0FBVCxTQUFTLENBQXdCO1lBQ2pDLGVBQVMsR0FBVCxTQUFTLENBQXdDO1lBQ2pELFlBQU0sR0FBTixNQUFNLENBQWM7WUFDcEIsMkJBQXFCLEdBQXJCLHFCQUFxQixDQUFxQztZQUMxRCxpQkFBVyxHQUFYLFdBQVcsQ0FBUTs7UUFHOUIsQ0FBQztRQUNMLFdBQUM7SUFBRCxDQUFDLEFBZEQsQ0FBMEIscUJBQVcsR0FjcEM7SUFkWSxvQkFBSTtJQWdCakI7UUFBZ0MsOEJBQXVCO1FBQ25ELG9CQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixLQUFhO1lBTHhCLFlBT0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQzVCO1lBUFMsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFdBQUssR0FBTCxLQUFLLENBQVE7O1FBR3ZCLENBQUM7UUFDTixpQkFBQztJQUFELENBQUMsQUFWRCxDQUFnQyxxQkFBVyxHQVUxQztJQVZZLGdDQUFVIn0=