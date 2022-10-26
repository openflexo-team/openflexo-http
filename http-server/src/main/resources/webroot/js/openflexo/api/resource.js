define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TechnologyAdapter = exports.Folder = exports.Resource = exports.ContainedByResourceCenter = exports.ResourceCenter = void 0;
    class ResourceCenter extends general_1.Description {
        constructor(name, id, url, type, uri, resourceUrl) {
            super(name, id, url, type);
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
            super(name, id, url, type);
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
            super(name, id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
    }
    exports.TechnologyAdapter = TechnologyAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBRUEsTUFBYSxjQUFlLFNBQVEscUJBQTJCO1FBQzNELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxXQUFtQjtZQUUxQixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFQcEIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUc5QixDQUFDO0tBQ0o7SUFYRCx3Q0FXQztJQUVELE1BQWEseUJBQTBCLFNBQVEscUJBQXNDO1FBRWpGLFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxXQUFtQixFQUNuQixnQkFBd0IsRUFDeEIsaUJBQXlCO1lBRWhDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQVRwQixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1lBQ25CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtZQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFHcEMsQ0FBQztLQUVKO0lBZkQsOERBZUM7SUFFRCxNQUFhLFFBQVMsU0FBUSx5QkFBeUI7UUFDbkQsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsbUJBQTJCLEVBQzNCLG9CQUE0QixFQUM1QixRQUFnQjtZQUV2QixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQWJuRSxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtZQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7WUFDekIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBUTtZQUMzQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVE7WUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUcxQixDQUFDO0tBQ0w7SUFqQkQsNEJBaUJDO0lBRUQsTUFBYSxNQUFPLFNBQVEseUJBQXlCO1FBQ2pELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLGdCQUF3QixFQUN4QixpQkFBeUI7WUFFaEMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFQbkUsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtZQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFHbEMsQ0FBQztLQUNOO0lBWEQsd0JBV0M7SUFFRCxNQUFhLGlCQUFrQixTQUFRLHFCQUE4QjtRQUNqRSxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVk7WUFFbkIsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBTHBCLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7UUFHdEIsQ0FBQztLQUVMO0lBVkQsOENBVUMifQ==