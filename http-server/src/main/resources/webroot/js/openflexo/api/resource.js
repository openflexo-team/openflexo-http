define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxvQkFBNEIsU0FBUSxxQkFBMkI7UUFDM0QsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLFdBQW1CO1lBRTFCLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQVBwQixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBRzlCLENBQUM7S0FDSjtJQVhELHdDQVdDO0lBRUQsK0JBQXVDLFNBQVEscUJBQXNDO1FBRWpGLFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxXQUFtQixFQUNuQixnQkFBd0IsRUFDeEIsaUJBQXlCO1lBRWhDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQVRwQixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1lBQ25CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtZQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFHcEMsQ0FBQztLQUVKO0lBZkQsOERBZUM7SUFFRCxjQUFzQixTQUFRLHlCQUF5QjtRQUNuRCxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixHQUFXLEVBQ1gsZ0JBQXdCLEVBQ3hCLGlCQUF5QixFQUN6QixVQUFrQixFQUNsQixVQUFrQixFQUNsQixtQkFBMkIsRUFDM0Isb0JBQTRCLEVBQzVCLFFBQWdCO1lBRXZCLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBYm5FLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtZQUN6QixlQUFVLEdBQVYsVUFBVSxDQUFRO1lBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFRO1lBQzNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUTtZQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRzFCLENBQUM7S0FDTDtJQWpCRCw0QkFpQkM7SUFFRCxZQUFvQixTQUFRLHlCQUF5QjtRQUNqRCxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixnQkFBd0IsRUFDeEIsaUJBQXlCO1lBRWhDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBUG5FLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7WUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1FBR2xDLENBQUM7S0FDTjtJQVhELHdCQVdDO0lBRUQsdUJBQStCLFNBQVEscUJBQThCO1FBQ2pFLFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWTtZQUVuQixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFMcEIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUd0QixDQUFDO0tBRUw7SUFWRCw4Q0FVQyJ9