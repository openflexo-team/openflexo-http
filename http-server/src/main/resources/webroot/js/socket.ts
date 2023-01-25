import { Api, RuntimeBindingId, createRuntimeBinding } from "./openflexo/api/Api";

const api = new Api();

var rightBinding: RuntimeBindingId<any>|null = null;

function evaluateBinding(right: string) {
    var contextInput = <HTMLInputElement>document.getElementById("context");

    // let context = contextInput.value;
    let context = "context";
    rightBinding = createRuntimeBinding(right, context, context);

    api.addChangeListener(rightBinding, (value) => {
        let div = document.createElement("div");
        div.className = "details";
        div.innerText = JSON.stringify(value);
    });
}

setInterval(() => {
    let xml_right:string = window.localStorage.getItem('canvas_xml') + "";
    evaluateBinding(xml_right)
}, 5000);