define(["require", "exports", "./openflexo/api/Api"], function (require, exports, Api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const api = new Api_1.Api();
    var rightBinding = null;
    function evaluateBinding(right) {
        var contextInput = document.getElementById("context");
        // let context = contextInput.value;
        let context = "context";
        rightBinding = (0, Api_1.createRuntimeBinding)(right, context, context);
        api.addChangeListener(rightBinding, (value) => {
            let div = document.createElement("div");
            div.className = "details";
            div.innerText = JSON.stringify(value);
        });
    }
    setInterval(() => {
        let xml_right = window.localStorage.getItem('canvas_xml') + "";
        evaluateBinding(xml_right);
    }, 5000);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUVBLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7SUFFdEIsSUFBSSxZQUFZLEdBQStCLElBQUksQ0FBQztJQUVwRCxTQUFTLGVBQWUsQ0FBQyxLQUFhO1FBQ2xDLElBQUksWUFBWSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXhFLG9DQUFvQztRQUNwQyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDeEIsWUFBWSxHQUFHLElBQUEsMEJBQW9CLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU3RCxHQUFHLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMxQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksU0FBUyxHQUFVLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0RSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDIn0=