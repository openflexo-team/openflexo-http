define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
        constructor() {
            (0, utils_1.addCssIfNotAlreadyPresent)("/css/openflexo/ui/Component.css");
        }
        setVisible(visible) {
            if (visible) {
                this.container.classList.remove("of-hidden");
            }
            else {
                this.container.classList.add("of-hidden");
            }
        }
    }
    exports.Component = Component;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFFQSxNQUFzQixTQUFTO1FBSTNCO1lBRUUsSUFBQSxpQ0FBeUIsRUFBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxVQUFVLENBQUMsT0FBZ0I7WUFDekIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2FBQzdDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTthQUMxQztRQUNILENBQUM7S0FHSjtJQWxCRCw4QkFrQkMifQ==