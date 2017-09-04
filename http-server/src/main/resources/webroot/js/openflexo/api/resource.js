define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    class ResourceCenter extends general_1.Description {
        constructor(name, id, url, type, uri, resourceUrl) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceUrl = resourceUrl;
        }
    }
    exports.ResourceCenter = ResourceCenter;
    class ContainedByResourceCenter extends general_1.Description {
        constructor(name, id, url, type, uri, resourceUrl, resourceCenterId, resourceCenterUrl) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceUrl = resourceUrl;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
        }
    }
    exports.ContainedByResourceCenter = ContainedByResourceCenter;
    class Resource extends ContainedByResourceCenter {
        constructor(name, id, url, type, uri, resourceCenterId, resourceCenterUrl, contentUrl, contextUrl, technologyAdapterId, technologyAdapterUrl, modelUrl) {
            super(name, id, url, type, uri, url, resourceCenterId, resourceCenterUrl);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.uri = uri;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
            this.contentUrl = contentUrl;
            this.contextUrl = contextUrl;
            this.technologyAdapterId = technologyAdapterId;
            this.technologyAdapterUrl = technologyAdapterUrl;
            this.modelUrl = modelUrl;
        }
    }
    exports.Resource = Resource;
    class Folder extends ContainedByResourceCenter {
        constructor(name, id, url, type, resourceCenterId, resourceCenterUrl) {
            super(name, id, url, type, url, url, resourceCenterId, resourceCenterUrl);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.resourceCenterId = resourceCenterId;
            this.resourceCenterUrl = resourceCenterUrl;
        }
    }
    exports.Folder = Folder;
    class TechnologyAdapter extends general_1.Description {
        constructor(name, id, url, type) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
    }
    exports.TechnologyAdapter = TechnologyAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUVBLG9CQUE0QixTQUFRLHFCQUEyQjtRQUMzRCxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixHQUFXLEVBQ1gsV0FBbUI7WUFFMUIsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFQZCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBRzlCLENBQUM7S0FDSjtJQVhELHdDQVdDO0lBRUQsK0JBQXVDLFNBQVEscUJBQXNDO1FBRWpGLFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxXQUFtQixFQUNuQixnQkFBd0IsRUFDeEIsaUJBQXlCO1lBRWhDLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBVGQsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtZQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7WUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1FBR3BDLENBQUM7S0FFSjtJQWZELDhEQWVDO0lBRUQsY0FBc0IsU0FBUSx5QkFBeUI7UUFDbkQsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsbUJBQTJCLEVBQzNCLG9CQUE0QixFQUM1QixRQUFnQjtZQUV2QixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQWJuRSxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtZQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7WUFDekIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBUTtZQUMzQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVE7WUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUcxQixDQUFDO0tBQ0w7SUFqQkQsNEJBaUJDO0lBRUQsWUFBb0IsU0FBUSx5QkFBeUI7UUFDakQsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osZ0JBQXdCLEVBQ3hCLGlCQUF5QjtZQUVoQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQVBuRSxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1oscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUdsQyxDQUFDO0tBQ047SUFYRCx3QkFXQztJQUVELHVCQUErQixTQUFRLHFCQUE4QjtRQUNqRSxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVk7WUFFbkIsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFMZCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBR3RCLENBQUM7S0FFTDtJQVZELDhDQVVDIn0=