import { Description } from "../api/general"
import { Api, RuntimeBindingId, BindingId, ChangeEvent, runtimeBinding } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { Tree, TreeItem } from "../ui/Tree"

interface Item {

    children: BoundTreeItem[];

    addItem(value: Description<any>);
    removeItem(index: number);
}

export class BoundTree implements Component, Item {

    tree : Tree;

    container: HTMLUListElement;

    children: BoundTreeItem[] = [];

    constructor(
        public api: Api, 
        private root: RuntimeBindingId,
        private elements: BoundTreeElement[]
     ) {
        this.create();
    }

    create(): void {
        this.tree = new Tree();

        this.api.evaluate<Description<any>>(this.root).then(rootValue => this.updateRoot(rootValue));
        this.api.addChangeListener(this.root, event => this.updateRoot(event.value));    

        this.container = this.tree.container;
    }    

    elementForValue(value: Description<any>) {
        for (let element of this.elements) {
            if (element.select(value)) return element;
        }
        return null;
    }

    private updateRoot(root: Description<any>) {
        let rootElement = this.elementForValue(root);
        console.log("--- Update root ---");
        console.log(root);
        console.log(rootElement);
        if (rootElement !== null && rootElement.children !== null) {
            let childrenRtBindingId = new RuntimeBindingId(rootElement.children, root.url);
            
            let result = this.api.evaluate<Description<any>[]>(childrenRtBindingId, false);
            result.then((values => {
                console.log("--- Updates values ---");
                console.log(values);
                updateValues(this, values);
            }))
        }
    }

    addItem(value: Description<any>) {
        let itemElement = this.elementForValue(value);
        if (itemElement != null) {
            let component = itemElement.component(this.api, value);
            let item = new TreeItem(component);
            let boundItem = new BoundTreeItem(this, value.url, itemElement, item);
            
            this.children.push(boundItem);
            this.tree.addChild(item);
        }
    }

    removeItem(index: number) {
        let item = this.children[index];
        this.children.splice(index, 1);
        this.tree.removeChild(item.item);
    }
}

export class BoundTreeElement {   
    constructor(
        public name: string,
        public select: (element: Description<any>) => boolean,
        public children: BindingId|null = null,
        public component: (api: Api, element: Description<any>) => Component|PhrasingCategory
    ) { }
}

class BoundTreeItem implements Item {
    
    children: BoundTreeItem[] = [];
    
    constructor(
        public boundTree: BoundTree,
        public url: string,
        public element: BoundTreeElement,
        public item: TreeItem,
        private root: boolean = false
    ) {
        if (element.children != null) {
            let childrenRtBindingId = new RuntimeBindingId(element.children, url);
            item.expandCallback = (item) => {
                let result = this.boundTree.api.evaluate<Description<any>[]>(childrenRtBindingId, false);
                result.then((values => {
                    updateValues(this, values);
                }))
            }
        }
     }

     private clear() {
        this.children.slice(0, this.children.length);
        this.item.clear();
     }

    addItem(value: Description<any>) {
        let itemElement = this.boundTree.elementForValue(value);
        if (itemElement != null) {
            let component = itemElement.component(this.boundTree.api, value);
            let item = new TreeItem(component);
            let boundItem = new BoundTreeItem(this.boundTree, value.url, itemElement, item);
            
            this.children.push(boundItem);
            this.item.addChild(item);
            if (this.root) {
                this.boundTree.tree.addChild(item);
            }
        }
    }

    removeItem(index: number) {
        let item = this.children[index];
        this.children.splice(index, 1);
        this.item.removeChild(item.item);
        if (this.root) {
            this.boundTree.tree.removeChild(item.item);
        }
    }
}

function updateValues(container: Item, values: Description<any>[]) {
    let lineCount = 0;
    let valueCount = 0;

    // checks elements with current lines
    while (lineCount < container.children.length && valueCount < values.length) {
        let line = container.children[lineCount];
        let element = values[valueCount];

        if (line.url !== element.url) {
            // line if different from current element
            // removes the line current line
            this.removeItem(lineCount);
        } else {
            // line is the same checks next
            lineCount += 1;
            valueCount += 1;
        } 
    }

    // removes the rest of the lines if any
    while (lineCount < container.children.length) {
        container.removeItem(lineCount);
    }

    // adds the rest of values if any
    while (valueCount < values.length) {
        container.addItem(values[valueCount]);
        valueCount += 1;
    }
}