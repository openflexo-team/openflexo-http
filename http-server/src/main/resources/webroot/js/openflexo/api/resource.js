define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUVBLG9CQUE0QixTQUFRLHFCQUEyQjtRQUMzRCxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixHQUFXLEVBQ1gsV0FBbUI7WUFFMUIsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBUHBCLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFHOUIsQ0FBQztLQUNKO0lBWEQsd0NBV0M7SUFFRCwrQkFBdUMsU0FBUSxxQkFBc0M7UUFFakYsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osR0FBVyxFQUNYLFdBQW1CLEVBQ25CLGdCQUF3QixFQUN4QixpQkFBeUI7WUFFaEMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBVHBCLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1lBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUdwQyxDQUFDO0tBRUo7SUFmRCw4REFlQztJQUVELGNBQXNCLFNBQVEseUJBQXlCO1FBQ25ELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEdBQVcsRUFDWCxnQkFBd0IsRUFDeEIsaUJBQXlCLEVBQ3pCLFVBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLG1CQUEyQixFQUMzQixvQkFBNEIsRUFDNUIsUUFBZ0I7WUFFdkIsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFibkUsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7WUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1lBQ3pCLGVBQVUsR0FBVixVQUFVLENBQVE7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtZQUNsQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVE7WUFDM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFRO1lBQzVCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFHMUIsQ0FBQztLQUNMO0lBakJELDRCQWlCQztJQUVELFlBQW9CLFNBQVEseUJBQXlCO1FBQ2pELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLGdCQUF3QixFQUN4QixpQkFBeUI7WUFFaEMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFQbkUsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtZQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFHbEMsQ0FBQztLQUNOO0lBWEQsd0JBV0M7SUFFRCx1QkFBK0IsU0FBUSxxQkFBOEI7UUFDakUsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZO1lBRW5CLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUxwQixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBR3RCLENBQUM7S0FFTDtJQVZELDhDQVVDIn0=