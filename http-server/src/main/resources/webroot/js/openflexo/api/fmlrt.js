var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    var FlexoConceptInstance = (function (_super) {
        __extends(FlexoConceptInstance, _super);
        function FlexoConceptInstance(id, url, type, flexoConcept, container, embeddedFlexoConceptInstance, actors) {
            var _this = _super.call(this, "", id, url, type) || this;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.flexoConcept = flexoConcept;
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
        function VirtualModelInstance(name, id, url, type, virtualModel, container, actors, flexoConceptInstances, resourceUrl) {
            var _this = _super.call(this, name, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.virtualModel = virtualModel;
            _this.container = container;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm1scnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbWxydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBR0E7UUFBMEMsd0NBQWlDO1FBQ3ZFLDhCQUNXLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFlBQXVDLEVBQ3ZDLFNBQXNFLEVBQ3RFLDRCQUFpRSxFQUNqRSxNQUFvQjtZQVAvQixZQVNJLGtCQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUMzQjtZQVRVLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGtCQUFZLEdBQVosWUFBWSxDQUEyQjtZQUN2QyxlQUFTLEdBQVQsU0FBUyxDQUE2RDtZQUN0RSxrQ0FBNEIsR0FBNUIsNEJBQTRCLENBQXFDO1lBQ2pFLFlBQU0sR0FBTixNQUFNLENBQWM7O1FBRy9CLENBQUM7UUFDTCwyQkFBQztJQUFELENBQUMsQUFaRCxDQUEwQyxxQkFBVyxHQVlwRDtJQVpZLG9EQUFvQjtJQWNqQztRQUEwQyx3Q0FBaUM7UUFDdkUsOEJBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFlBQXVDLEVBQ3ZDLFNBQWlELEVBQ2pELE1BQW9CLEVBQ3BCLHFCQUEwRCxFQUMxRCxXQUFtQjtZQVQ5QixZQVdJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUM3QjtZQVhVLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixrQkFBWSxHQUFaLFlBQVksQ0FBMkI7WUFDdkMsZUFBUyxHQUFULFNBQVMsQ0FBd0M7WUFDakQsWUFBTSxHQUFOLE1BQU0sQ0FBYztZQUNwQiwyQkFBcUIsR0FBckIscUJBQXFCLENBQXFDO1lBQzFELGlCQUFXLEdBQVgsV0FBVyxDQUFROztRQUc5QixDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQUFDLEFBZEQsQ0FBMEMscUJBQVcsR0FjcEQ7SUFkWSxvREFBb0I7SUFnQmpDO1FBQTBCLHdCQUFpQjtRQUN2QyxjQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixTQUFpQyxFQUNqQyxTQUFpRCxFQUNqRCxNQUFvQixFQUNwQixxQkFBMEQsRUFDMUQsV0FBbUI7WUFUOUIsWUFXSSxrQkFBTSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDN0I7WUFYVSxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osZUFBUyxHQUFULFNBQVMsQ0FBd0I7WUFDakMsZUFBUyxHQUFULFNBQVMsQ0FBd0M7WUFDakQsWUFBTSxHQUFOLE1BQU0sQ0FBYztZQUNwQiwyQkFBcUIsR0FBckIscUJBQXFCLENBQXFDO1lBQzFELGlCQUFXLEdBQVgsV0FBVyxDQUFROztRQUc5QixDQUFDO1FBQ0wsV0FBQztJQUFELENBQUMsQUFkRCxDQUEwQixxQkFBVyxHQWNwQztJQWRZLG9CQUFJO0lBZ0JqQjtRQUFnQyw4QkFBdUI7UUFDbkQsb0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEtBQWE7WUFMeEIsWUFPSSxrQkFBTSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDNUI7WUFQUyxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osV0FBSyxHQUFMLEtBQUssQ0FBUTs7UUFHdkIsQ0FBQztRQUNOLGlCQUFDO0lBQUQsQ0FBQyxBQVZELENBQWdDLHFCQUFXLEdBVTFDO0lBVlksZ0NBQVUifQ==