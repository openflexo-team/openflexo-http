define(["require", "exports"], function (require, exports) {
    "use strict";
    var ResourceCenter = (function () {
        function ResourceCenter(name, id, url, type, uri, resourceUrl) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceUrl = resourceUrl;
        }
        return ResourceCenter;
    }());
    exports.ResourceCenter = ResourceCenter;
    var Resource = (function () {
        function Resource(name, id, url, type, uri, resourceCenterId, resourceCenterUrl, contentUrl, modelUrl, technologyAdapterId, technologyAdapterUrl) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
            this.contentUrl = contentUrl;
            this.modelUrl = modelUrl;
            this.technologyAdapterId = technologyAdapterId;
            this.technologyAdapterUrl = technologyAdapterUrl;
        }
        return Resource;
    }());
    exports.Resource = Resource;
    var Folder = (function () {
        function Folder(name, id, url, type, resourceCenterId, resourceCenterUrl) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
        }
        return Folder;
    }());
    exports.Folder = Folder;
    var TechnologyAdapter = (function () {
        function TechnologyAdapter(name, id, url, type) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
        return TechnologyAdapter;
    }());
    exports.TechnologyAdapter = TechnologyAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUVBO1FBQ0ksd0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxXQUFtQjtZQUxuQixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ3pCLENBQUM7UUFDVixxQkFBQztJQUFELENBQUMsQUFURCxJQVNDO0lBVFksd0NBQWM7SUFnQjNCO1FBQ0ksa0JBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxnQkFBd0IsRUFDeEIsaUJBQXlCLEVBQ3pCLFVBQWtCLEVBQ2xCLFFBQWdCLEVBQ2hCLG1CQUEyQixFQUMzQixvQkFBNEI7WUFWNUIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7WUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1lBQ3pCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVE7WUFDM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFRO1FBQ2xDLENBQUM7UUFDVixlQUFDO0lBQUQsQ0FBQyxBQWRELElBY0M7SUFkWSw0QkFBUTtJQWdCckI7UUFDSSxnQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osZ0JBQXdCLEVBQ3hCLGlCQUF5QjtZQUx6QixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1oscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUMvQixDQUFDO1FBQ1YsYUFBQztJQUFELENBQUMsQUFURCxJQVNDO0lBVFksd0JBQU07SUFXbkI7UUFDSSwyQkFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZO1lBSFosU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNsQixDQUFDO1FBRVYsd0JBQUM7SUFBRCxDQUFDLEFBUkQsSUFRQztJQVJZLDhDQUFpQiJ9