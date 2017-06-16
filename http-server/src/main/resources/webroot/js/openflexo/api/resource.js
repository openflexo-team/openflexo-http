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
            var _this = _super.call(this, name, id, url, type) || this;
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
            var _this = _super.call(this, name, id, url, type) || this;
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
        function Resource(name, id, url, type, uri, resourceCenterId, resourceCenterUrl, contentUrl, modelUrl, technologyAdapterId, technologyAdapterUrl) {
            var _this = _super.call(this, name, id, url, type, uri, url, resourceCenterId, resourceCenterUrl) || this;
            _this.name = name;
            _this.id = id;
            _this.url = url;
            _this.type = type;
            _this.uri = uri;
            _this.resourceCenterId = resourceCenterId;
            _this.resourceCenterUrl = resourceCenterUrl;
            _this.contentUrl = contentUrl;
            _this.modelUrl = modelUrl;
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
            var _this = _super.call(this, name, id, url, type) || this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBRUE7UUFBb0Msa0NBQTJCO1FBQzNELHdCQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixHQUFXLEVBQ1gsV0FBbUI7WUFOOUIsWUFRSSxrQkFBTSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FDN0I7WUFSVSxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxVQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osU0FBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLGlCQUFXLEdBQVgsV0FBVyxDQUFROztRQUc5QixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQUFDLEFBWEQsQ0FBb0MscUJBQVcsR0FXOUM7SUFYWSx3Q0FBYztJQWEzQjtRQUErQyw2Q0FBc0M7UUFFakYsbUNBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxXQUFtQixFQUNuQixnQkFBd0IsRUFDeEIsaUJBQXlCO1lBUnBDLFlBVUksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQzdCO1lBVlUsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxpQkFBVyxHQUFYLFdBQVcsQ0FBUTtZQUNuQixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7WUFDeEIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFROztRQUdwQyxDQUFDO1FBRUwsZ0NBQUM7SUFBRCxDQUFDLEFBZkQsQ0FBK0MscUJBQVcsR0FlekQ7SUFmWSw4REFBeUI7SUFpQnRDO1FBQThCLDRCQUF5QjtRQUNuRCxrQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBa0IsRUFDbEIsUUFBZ0IsRUFDaEIsbUJBQTJCLEVBQzNCLG9CQUE0QjtZQVh2QyxZQWFJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLFNBQzNFO1lBYlMsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFNBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7WUFDeEIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1lBQ3pCLGdCQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLGNBQVEsR0FBUixRQUFRLENBQVE7WUFDaEIseUJBQW1CLEdBQW5CLG1CQUFtQixDQUFRO1lBQzNCLDBCQUFvQixHQUFwQixvQkFBb0IsQ0FBUTs7UUFHdEMsQ0FBQztRQUNOLGVBQUM7SUFBRCxDQUFDLEFBaEJELENBQThCLHlCQUF5QixHQWdCdEQ7SUFoQlksNEJBQVE7SUFrQnJCO1FBQTRCLDBCQUF5QjtRQUNqRCxnQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osZ0JBQXdCLEVBQ3hCLGlCQUF5QjtZQU5wQyxZQVFJLGtCQUFNLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLFNBQzFFO1lBUlEsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtZQUN4Qix1QkFBaUIsR0FBakIsaUJBQWlCLENBQVE7O1FBR2xDLENBQUM7UUFDUCxhQUFDO0lBQUQsQ0FBQyxBQVhELENBQTRCLHlCQUF5QixHQVdwRDtJQVhZLHdCQUFNO0lBYW5CO1FBQXVDLHFDQUE4QjtRQUNqRSwyQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZO1lBSnZCLFlBTUksa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQzVCO1lBTlMsVUFBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUUsR0FBRixFQUFFLENBQVE7WUFDVixTQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsVUFBSSxHQUFKLElBQUksQ0FBUTs7UUFHdEIsQ0FBQztRQUVOLHdCQUFDO0lBQUQsQ0FBQyxBQVZELENBQXVDLHFCQUFXLEdBVWpEO0lBVlksOENBQWlCIn0=