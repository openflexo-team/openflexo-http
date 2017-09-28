define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    class Component {
        constructor() {
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/Component.css");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBRUE7UUFJSTtZQUVFLGlDQUF5QixDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVELFVBQVUsQ0FBQyxPQUFnQjtZQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUM5QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQzNDLENBQUM7UUFDSCxDQUFDO0tBR0o7SUFsQkQsOEJBa0JDIn0=