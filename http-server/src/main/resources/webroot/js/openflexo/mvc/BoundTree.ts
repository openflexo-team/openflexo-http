import { Description } from "../api/general"
import { Api, RuntimeBindingId, BindingId, ChangeEvent } from "../api/Api"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { Tree, TreeItem } from "../ui/Tree"

/** Common interface for BoundTree and BoundTreeItem that holds children */
interface Item {

    children: BoundTreeItem[];

    addItem(value: Description<any>);

    removeItem(index: number);

    findItemForObject(url: string): BoundTreeItem|null;
}

export class BoundTree implements Component, Item {

    tree : Tree;

    container: HTMLUListElement;

    children: BoundTreeItem[] = [];

    onselect: ((selection: ReadonlySet<BoundTreeItem>)=>void)|null;
    
    constructor(
        public api: Api, 
        private root: RuntimeBindingId<any>,
        private elements: BoundTreeElement[]
     ) {
        this.create();
    }

    create(): void {
        this.tree = new Tree();
        this.tree.onselect = (selection) => {
            let onselect = this.onselect;
            if (onselect !== null) {
                let transformedSelection = new Set<BoundTreeItem>();
                selection.forEach(item => { 
                    transformedSelection.add(item.data)
                })
                onselect(transformedSelection);
            }
        };
        this.api.evaluate<Description<any>>(this.root).then(rootValue => this.updateRoot(rootValue));
        this.api.addChangeListener(this.root, event => this.updateRoot(event.value));    

        this.container = this.tree.container;
    }    

    elementForValue(value: Description<any>):BoundTreeElement|null {
        for (let i=0; i<this.elements.length; i+=1) {
            let element = this.elements[i];
            try {
                if (element.select(value)) return element;
            } catch (e) {
                // nothing to do pass to next element
            }
        }
        return null;
    }
    
    private selectCallback(selection: ReadonlySet<TreeItem>) {
        let onselect = this.onselect;
        if (onselect !== null) {
            let transformedSelection = new Set<BoundTreeItem>();
            selection.forEach(item => { 
                transformedSelection.add(item.data)
            })
            onselect(transformedSelection);
        }
    }

    private updateRoot(root: Description<any>) {
        let rootElement = this.elementForValue(root);
        if (rootElement !== null && rootElement.children !== null) {
            let childrenRtBindingId = new RuntimeBindingId(rootElement.children(root), root.url); 
            let result = this.api.evaluate<Description<any>[]>(childrenRtBindingId, false);
            result.then((values => { updateValues(this, values); }))
            this.api.addChangeListener(childrenRtBindingId, (event) => updateValues(this,event.value));
        }
    }

    addItem(value: Description<any>) {
        let boundItem = createBoundItem(this, value);
        if (boundItem != null) {
            this.children.push(boundItem);
            this.tree.addChild(boundItem.item);
        }
    }
    
    removeItem(index: number) {
        let item = this.children[index];
        this.children.splice(index, 1);
        this.tree.removeChild(item.item);
    }

    findItemForObject(url: string): BoundTreeItem|null {
        for (let i=0; i<this.children.length; i+=1) {
            let child = this.children[i];
            let found = child.findItemForObject(url);
            if (found !== null) return found;
        };
        return null;
    }
}

export class BoundTreeElement {   
    constructor(
        public name: string,
        public select: (element: any) => boolean,
        public component: (api: Api, element: any) => Component|PhrasingCategory,
        public children: ((element:any) => BindingId<Description<any>[]>)|null = null
    ) { }
}

class BoundTreeItem implements Item {
    
    children: BoundTreeItem[] = [];
    
    constructor(
        public boundTree: BoundTree,
        public object: Description<any>,
        public element: BoundTreeElement,
        public item: TreeItem,
        private root: boolean = false
    ) {
        item.onexpand = (item) => {
            if (item.data instanceof BoundTreeItem) {
                let boundItem = item.data;
                if (element.children != null) {
                    let childrenRtBindingId = new RuntimeBindingId(element.children(boundItem.object), object.url);
                
                    let result = this.boundTree.api.evaluate<Description<any>[]>(childrenRtBindingId, false);
                    result.then((childrenValues => {
                        updateValues(this, childrenValues);
                    }))

                    this.boundTree.api.addChangeListener(childrenRtBindingId, (event) => {
                        updateValues(this, event.value);
                    })
                }
            }
        }
     }

     private clear() {
        this.children.slice(0, this.children.length);
        this.item.clear();
     }

    addItem(value: Description<any>) {
        let boundItem = createBoundItem(this.boundTree, value);
        if (boundItem != null) {
            this.children.push(boundItem);
            this.item.addChild(boundItem.item);
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

    findItemForObject(url: string): BoundTreeItem|null {
        if (this.object.url === url) return this;
        for (let i=0; i<this.children.length; i+=1) {
            let child = this.children[i];
            let found = child.findItemForObject(url);
            if (found !== null) return found;
        }
        return null;
    }
}

/** Updates item children with given values. */
function updateValues(container: Item, values: Description<any>[]) {
    let lineCount = 0;
    let valueCount = 0;

    // checks elements with current lines
    while (lineCount < container.children.length && valueCount < values.length) {
        let boundItem = container.children[lineCount];
        let value = values[valueCount];

        if (boundItem.object !== value) {
            // line if different from current element
            // removes the line current line
            container.removeItem(lineCount);
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

/** Creates a BoundItem for a given value */
function createBoundItem(tree: BoundTree, value: Description<any>): BoundTreeItem|null {
    let itemElement = tree.elementForValue(value);
    if (itemElement != null) {
        let component = itemElement.component(tree.api, value);
        let item = new TreeItem(tree.tree, component, itemElement.children === null);
        let boundItem = new BoundTreeItem(tree, value, itemElement, item);
        item.data = boundItem;
        return boundItem;
    }
    return null;
}
