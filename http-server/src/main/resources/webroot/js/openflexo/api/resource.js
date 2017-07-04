var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    var ResourceCenter = (function (_super) {
        __extends(ResourceCenter, _super);
        function ResourceCenter(name, id, url, type, uri, resourceUrl) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.uri = uri;
            _this.resourceUrl = resourceUrl;
            return _this;
        }
        return ResourceCenter;
    }(general_1.Description));
    exports.ResourceCenter = ResourceCenter;
    var ContainedByResourceCenter = (function (_super) {
        __extends(ContainedByResourceCenter, _super);
        function ContainedByResourceCenter(name, id, url, type, uri, resourceUrl, resourceCenterId, resourceCenterUrl) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.uri = uri;
            _this.resourceUrl = resourceUrl;
            _this.resourceCenterId = resourceCenterId;
            _this.resourceCenterUrl = resourceCenterUrl;
            return _this;
        }
        return ContainedByResourceCenter;
    }(general_1.Description));
    exports.ContainedByResourceCenter = ContainedByResourceCenter;
    var Resource = (function (_super) {
        __extends(Resource, _super);
        function Resource(name, id, url, type, uri, resourceCenterId, resourceCenterUrl, contentUrl, contextUrl, technologyAdapterId, technologyAdapterUrl) {
            var _this = _super.call(this, name, id, url, type, uri, url, resourceCenterId, resourceCenterUrl) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.uri = uri;
            _this.resourceCenterId = resourceCenterId;
            _this.resourceCenterUrl = resourceCenterUrl;
            _this.contentUrl = contentUrl;
            _this.contextUrl = contextUrl;
            _this.technologyAdapterId = technologyAdapterId;
            _this.technologyAdapterUrl = technologyAdapterUrl;
            return _this;
        }
        return Resource;
    }(ContainedByResourceCenter));
    exports.Resource = Resource;
    var Folder = (function (_super) {
        __extends(Folder, _super);
        function Folder(name, id, url, type, resourceCenterId, resourceCenterUrl) {
            var _this = _super.call(this, name, id, url, type, url, url, resourceCenterId, resourceCenterUrl) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.resourceCenterId = resourceCenterId;
            _this.resourceCenterUrl = resourceCenterUrl;
            return _this;
        }
        return Folder;
    }(ContainedByResourceCenter));
    exports.Folder = Folder;
    var TechnologyAdapter = (function (_super) {
        __extends(TechnologyAdapter, _super);
        function TechnologyAdapter(name, id, url, type) {
            var _this = _super.call(this, id, url, type) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            return _this;
        }
        return TechnologyAdapter;
    }(general_1.Description));
    exports.TechnologyAdapter = TechnologyAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBRUE7UUFBb0Msa0NBQTJCO1FBQzNELHdCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixHQUFXLEVBQ1gsV0FBbUI7WUFOOUIsWUFRSSxrQkFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUN2QjtZQVJVLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsaUJBQVcsR0FBWCxXQUFXLENBQVE7O1FBRzlCLENBQUM7UUFDTCxxQkFBQztJQUFELENBQUMsQUFYRCxDQUFvQyxxQkFBVyxHQVc5QztJQVhZLHdDQUFjO0lBYTNCO1FBQStDLDZDQUFzQztRQUVqRixtQ0FDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLFdBQW1CLEVBQ25CLGdCQUF3QixFQUN4QixpQkFBeUI7WUFScEMsWUFVSSxrQkFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUN2QjtZQVZVLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsaUJBQVcsR0FBWCxXQUFXLENBQVE7WUFDbkIsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTs7UUFHcEMsQ0FBQztRQUVMLGdDQUFDO0lBQUQsQ0FBQyxBQWZELENBQStDLHFCQUFXLEdBZXpEO0lBZlksOERBQXlCO0lBaUJ0QztRQUE4Qiw0QkFBeUI7UUFDbkQsa0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxnQkFBd0IsRUFDeEIsaUJBQXlCLEVBQ3pCLFVBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLG1CQUEyQixFQUMzQixvQkFBNEI7WUFYdkMsWUFhSSxrQkFBTSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUMzRTtZQWJTLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtZQUN6QixnQkFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQixnQkFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQix5QkFBbUIsR0FBbkIsbUJBQW1CLENBQVE7WUFDM0IsMEJBQW9CLEdBQXBCLG9CQUFvQixDQUFROztRQUd0QyxDQUFDO1FBQ04sZUFBQztJQUFELENBQUMsQUFoQkQsQ0FBOEIseUJBQXlCLEdBZ0J0RDtJQWhCWSw0QkFBUTtJQWtCckI7UUFBNEIsMEJBQXlCO1FBQ2pELGdCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixnQkFBd0IsRUFDeEIsaUJBQXlCO1lBTnBDLFlBUUksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsU0FDMUU7WUFSUSxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTs7UUFHbEMsQ0FBQztRQUNQLGFBQUM7SUFBRCxDQUFDLEFBWEQsQ0FBNEIseUJBQXlCLEdBV3BEO0lBWFksd0JBQU07SUFhbkI7UUFBdUMscUNBQThCO1FBQ2pFLDJCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVk7WUFKdkIsWUFNSSxrQkFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUN0QjtZQU5TLFVBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFVBQUksR0FBSixJQUFJLENBQVE7O1FBR3RCLENBQUM7UUFFTix3QkFBQztJQUFELENBQUMsQUFWRCxDQUF1QyxxQkFBVyxHQVVqRDtJQVZZLDhDQUFpQiJ9