define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    class FlexoConcept extends general_1.Description {
        constructor(name, id, url, type, description, virtualModel, container, childFlexoConcepts, parents, properties, behaviors) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.description = description;
            this.virtualModel = virtualModel;
            this.container = container;
            this.childFlexoConcepts = childFlexoConcepts;
            this.parents = parents;
            this.properties = properties;
            this.behaviors = behaviors;
        }
    }
    exports.FlexoConcept = FlexoConcept;
    class VirtualModel extends general_1.Description {
        constructor(name, id, url, type, description, container, properties, behaviors, flexoConcepts, resourceUrl) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.description = description;
            this.container = container;
            this.properties = properties;
            this.behaviors = behaviors;
            this.flexoConcepts = flexoConcepts;
            this.resourceUrl = resourceUrl;
        }
    }
    exports.VirtualModel = VirtualModel;
    class ViewPoint extends general_1.Description {
        constructor(name, id, url, type, description, properties, behaviors, virtualModels, resourceUrl) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.description = description;
            this.properties = properties;
            this.behaviors = behaviors;
            this.virtualModels = virtualModels;
            this.resourceUrl = resourceUrl;
        }
    }
    exports.ViewPoint = ViewPoint;
    class FlexoRole extends general_1.Description {
        constructor(name, id, url, type, description) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.description = description;
        }
    }
    exports.FlexoRole = FlexoRole;
    class FlexoBehavior extends general_1.Description {
        constructor(name, id, url, type, description) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.description = description;
        }
    }
    exports.FlexoBehavior = FlexoBehavior;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBRUEsa0JBQTBCLFNBQVEscUJBQXlCO1FBQ3ZELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFdBQW1CLEVBQ25CLFlBQXVDLEVBQ3ZDLFNBQXlDLEVBQ3pDLGtCQUErQyxFQUMvQyxPQUFvQyxFQUNwQyxVQUF1QixFQUN2QixTQUEwQjtZQUVqQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQVpkLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtZQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBMkI7WUFDdkMsY0FBUyxHQUFULFNBQVMsQ0FBZ0M7WUFDekMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUE2QjtZQUMvQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtZQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFhO1lBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBR3JDLENBQUM7S0FDSjtJQWhCRCxvQ0FnQkM7SUFFRCxrQkFBMEIsU0FBUSxxQkFBeUI7UUFDdkQsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osV0FBbUIsRUFDbkIsU0FBeUMsRUFDekMsVUFBdUIsRUFDdkIsU0FBMEIsRUFDMUIsYUFBMEMsRUFDMUMsV0FBbUI7WUFFMUIsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFYYixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQVE7WUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBZ0M7WUFDekMsZUFBVSxHQUFWLFVBQVUsQ0FBYTtZQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFpQjtZQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBNkI7WUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFHOUIsQ0FBQztLQUNKO0lBZkQsb0NBZUM7SUFFRCxlQUF1QixTQUFRLHFCQUFzQjtRQUNqRCxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixXQUFtQixFQUNuQixVQUF1QixFQUN2QixTQUEwQixFQUMxQixhQUEwQyxFQUMxQyxXQUFtQjtZQUUxQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQVZiLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtZQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFhO1lBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQWlCO1lBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUE2QjtZQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUc5QixDQUFDO0tBQ0o7SUFkRCw4QkFjQztJQUVELGVBQXVCLFNBQVEscUJBQXNCO1FBQ2pELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFdBQW1CO1lBRTFCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBTmQsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBRzdCLENBQUM7S0FDTDtJQVZELDhCQVVDO0lBRUQsbUJBQTJCLFNBQVEscUJBQTBCO1FBQ3pELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFdBQW1CO1lBRTFCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBTmQsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBRzdCLENBQUM7S0FDTDtJQVZELHNDQVVDIn0=