define(["require", "exports", "./general"], function (require, exports, general_1) {
    "use strict";
    class FlexoConceptInstance extends general_1.Description {
        constructor(id, url, type, flexoConcept, virtualModelInstance, view, container, embeddedFlexoConceptInstance, actors) {
            super(id, url, type);
            this.id = id;
            this.url = url;
            this.type = type;
            this.flexoConcept = flexoConcept;
            this.virtualModelInstance = virtualModelInstance;
            this.view = view;
            this.container = container;
            this.embeddedFlexoConceptInstance = embeddedFlexoConceptInstance;
            this.actors = actors;
        }
    }
    exports.FlexoConceptInstance = FlexoConceptInstance;
    class VirtualModelInstance extends general_1.Description {
        constructor(name, id, url, type, virtualModel, view, actors, flexoConceptInstances, resourceUrl) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.virtualModel = virtualModel;
            this.view = view;
            this.actors = actors;
            this.flexoConceptInstances = flexoConceptInstances;
            this.resourceUrl = resourceUrl;
        }
    }
    exports.VirtualModelInstance = VirtualModelInstance;
    class View extends general_1.Description {
        constructor(name, id, url, type, viewPoint, container, actors, flexoConceptInstances, resourceUrl) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.viewPoint = viewPoint;
            this.container = container;
            this.actors = actors;
            this.flexoConceptInstances = flexoConceptInstances;
            this.resourceUrl = resourceUrl;
        }
    }
    exports.View = View;
    class FlexoActor extends general_1.Description {
        constructor(name, id, url, type, value) {
            super(id, url, type);
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
            this.value = value;
        }
    }
    exports.FlexoActor = FlexoActor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm1scnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbWxydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBLDBCQUFrQyxTQUFRLHFCQUFpQztRQUN2RSxZQUNXLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLFlBQXVDLEVBQ3ZDLG9CQUF1RCxFQUN2RCxJQUF1QixFQUN2QixTQUFpRCxFQUNqRCw0QkFBaUUsRUFDakUsTUFBb0I7WUFFM0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFWZCxPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBMkI7WUFDdkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFtQztZQUN2RCxTQUFJLEdBQUosSUFBSSxDQUFtQjtZQUN2QixjQUFTLEdBQVQsU0FBUyxDQUF3QztZQUNqRCxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQXFDO1lBQ2pFLFdBQU0sR0FBTixNQUFNLENBQWM7UUFHL0IsQ0FBQztLQUNKO0lBZEQsb0RBY0M7SUFFRCwwQkFBa0MsU0FBUSxxQkFBaUM7UUFDdkUsWUFDVyxJQUFZLEVBQ1osRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ1osWUFBdUMsRUFDdkMsSUFBdUIsRUFDdkIsTUFBb0IsRUFDcEIscUJBQTBELEVBQzFELFdBQW1CO1lBRTFCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBVmIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLGlCQUFZLEdBQVosWUFBWSxDQUEyQjtZQUN2QyxTQUFJLEdBQUosSUFBSSxDQUFtQjtZQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFjO1lBQ3BCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBcUM7WUFDMUQsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFHOUIsQ0FBQztLQUNKO0lBZEQsb0RBY0M7SUFFRCxVQUFrQixTQUFRLHFCQUFpQjtRQUN2QyxZQUNXLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVksRUFDWixTQUFpQyxFQUNqQyxTQUFpRCxFQUNqRCxNQUFvQixFQUNwQixxQkFBMEQsRUFDMUQsV0FBbUI7WUFFMUIsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFWYixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osY0FBUyxHQUFULFNBQVMsQ0FBd0I7WUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBd0M7WUFDakQsV0FBTSxHQUFOLE1BQU0sQ0FBYztZQUNwQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXFDO1lBQzFELGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBRzlCLENBQUM7S0FDSjtJQWRELG9CQWNDO0lBRUQsZ0JBQXdCLFNBQVEscUJBQXVCO1FBQ25ELFlBQ1csSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWSxFQUNaLEtBQWE7WUFFcEIsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFOZCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUd2QixDQUFDO0tBQ0w7SUFWRCxnQ0FVQyJ9