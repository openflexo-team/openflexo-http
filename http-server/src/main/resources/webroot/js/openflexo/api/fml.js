var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var FlexoConcept = (function () {
        function FlexoConcept(name, id, url, type, virtualModel, parents, properties) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.virtualModel = virtualModel;
            this.parents = parents;
            this.properties = properties;
        }
        return FlexoConcept;
    }());
    exports.FlexoConcept = FlexoConcept;
    var VirtualModel = (function (_super) {
        __extends(VirtualModel, _super);
        function VirtualModel(name, id, url, type, virtualModel, parents, properties) {
            var _this = _super.call(this, name, id, url, type, virtualModel, parents, parents) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.virtualModel = virtualModel;
            _this.parents = parents;
            _this.properties = properties;
            return _this;
        }
        return VirtualModel;
    }(FlexoConcept));
    exports.VirtualModel = VirtualModel;
    var ViewPoint = (function (_super) {
        __extends(ViewPoint, _super);
        function ViewPoint(name, id, url, type, virtualModel, parents, properties) {
            var _this = _super.call(this, name, id, url, type, virtualModel, parents, parents) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.virtualModel = virtualModel;
            _this.parents = parents;
            _this.properties = properties;
            return _this;
        }
        return ViewPoint;
    }(VirtualModel));
    exports.ViewPoint = ViewPoint;
    var FlexoRole = (function () {
        function FlexoRole(name, id, url, type) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
        return FlexoRole;
    }());
    exports.FlexoRole = FlexoRole;
    var FlexoBehavior = (function () {
        function FlexoBehavior(name, id, url, type) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
        return FlexoBehavior;
    }());
    exports.FlexoBehavior = FlexoBehavior;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFFQTtRQUNJLHNCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixZQUF5QixFQUN6QixPQUFzQixFQUN0QixVQUF1QjtZQU52QixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osaUJBQVksR0FBWixZQUFZLENBQWE7WUFDekIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtZQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFhO1FBQzdCLENBQUM7UUFDVixtQkFBQztJQUFELENBQUMsQUFWRCxJQVVDO0lBVlksb0NBQVk7SUFZekI7UUFBa0MsZ0NBQVk7UUFDMUMsc0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFlBQXlCLEVBQ3pCLE9BQXNCLEVBQ3RCLFVBQXVCO1lBUGxDLFlBU0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQzdEO1lBVFUsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGtCQUFZLEdBQVosWUFBWSxDQUFhO1lBQ3pCLGFBQU8sR0FBUCxPQUFPLENBQWU7WUFDdEIsZ0JBQVUsR0FBVixVQUFVLENBQWE7O1FBR2xDLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUFaRCxDQUFrQyxZQUFZLEdBWTdDO0lBWlksb0NBQVk7SUFjekI7UUFBK0IsNkJBQVk7UUFDdkMsbUJBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFlBQXlCLEVBQ3pCLE9BQXNCLEVBQ3RCLFVBQXVCO1lBUGxDLFlBU0ksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQzdEO1lBVFUsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGtCQUFZLEdBQVosWUFBWSxDQUFhO1lBQ3pCLGFBQU8sR0FBUCxPQUFPLENBQWU7WUFDdEIsZ0JBQVUsR0FBVixVQUFVLENBQWE7O1FBR2xDLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFaRCxDQUErQixZQUFZLEdBWTFDO0lBWlksOEJBQVM7SUFjdEI7UUFDSSxtQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZO1lBSFosU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNsQixDQUFDO1FBQ1YsZ0JBQUM7SUFBRCxDQUFDLEFBUEQsSUFPQztJQVBZLDhCQUFTO0lBVXRCO1FBQ0ksdUJBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWTtZQUhaLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbEIsQ0FBQztRQUNWLG9CQUFDO0lBQUQsQ0FBQyxBQVBELElBT0M7SUFQWSxzQ0FBYSJ9