
export function clearElement(element: HTMLElement) {
    var child = element.firstChild;
    while (child !== null) {
        element.removeChild(child);
        child = element.firstChild;
    }
}

export function addMdlScriptAndCssIfNotAlreadyPresent() {
    if (document.head.querySelector("[src='/bower_components/material-design-lite/material.min.js']") === null) {
        addScript("/bower_components/material-design-lite/material.min.js");
        addCss("css/mdl-openflexo.css");
        addCss("https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en");
        addCss("https://fonts.googleapis.com/icon?family=Material+Icons");
    }
}

export function addCssIfNotAlreadyPresent(reference: string) {
    if (document.head.querySelector("[href='"+ reference +"']") === null) {
        addCss(reference);
    }
}

export function addScriptIfNotAlreadyPresent(src: string) {
    if (document.head.querySelector("[src='"+ src +"']") === null) {
        addScript(src);
    }
}

function addCss(reference: string) {
    let link = document.createElement("link");
    link.href = reference;
    link.rel = "stylesheet";

    document.head.appendChild(link);
}

function addScript(src: string) {
    let script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
}