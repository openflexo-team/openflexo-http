/// <reference path="./mdl.d.ts" />

import { Component } from "./Component"
import { FlowCategory } from "./category"

export function clearElement(element: HTMLElement) {
    var child = element.firstChild;
    while (child !== null) {
        element.removeChild(child);
        child = element.firstChild;
    }
}

export function mdlUpgradeElement(element: HTMLElement) {
    componentHandler.upgradeElements(element);
}

export function mdlDowngradeElement(element: HTMLElement) {
    componentHandler.downgradeElements(element);
}

export function addMdlCssIfNotAlreadyPresent() {
    if (document.head.querySelector("[href='css/mdl-openflexo.css']") === null) {
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

function addCss(reference: string) {
    let link = document.createElement("link");
    link.href = reference;
    link.rel = "stylesheet";

    document.head.appendChild(link);
}

// forEach method, could be shipped as part of an Object Literal/Module
export function forEachNode(list: NodeList, callback:(i:number, n: HTMLElement)=>void) {
    for (let i=0; i<list.length; i++) {
        callback.call(callback, i, list.item(i));
    }
}

export function toHTMLElement(source: Component|FlowCategory|string): Node {
    if ((<Component> source).container) {
       return (<Component> source).container;
    } else if (typeof source === "string") {
        return document.createTextNode(source);
    } else {
        return <HTMLElement> source;
    }
}