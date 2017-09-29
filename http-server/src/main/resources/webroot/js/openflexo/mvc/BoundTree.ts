import { Description } from "../api/general"
import { Api, RuntimeBindingId, BindingId, ChangeEvent } from "../api/Api"
import { BoundComponent } from "./BoundComponent"
import { Component } from "../ui/Component"
import { PhrasingCategory } from "../ui/category"
import { mdlUpgradeElement } from "../ui/utils"

import { Tree, TreeItem } from "../ui/Tree"

/** Common interface for BoundTree and BoundTreeItem that holds children */
interface Item {

    readonly boundTree: BoundTree;

    readonly parent: BoundTree|BoundTreeItem;

    readonly support: Tree|TreeItem;

    children: BoundTreeItem[];

    addItem(value: Description<any>, sourceBinding: RuntimeBindingId<any>);

    removeItem(index: number);

    findItemForObject(url: string): BoundTreeItem|null;
}

/** Tree handled with a series of bindings throught BoundTreeElements */
export class BoundTree extends BoundComponent implements Item {

    tree : Tree;

    container: HTMLUListElement;

    children: BoundTreeItem[] = [];

    onselect: ((selection: ReadonlySet<BoundTreeItem>)=>void)|null;

    readonly boundTree = this;

    readonly parent = this;

    constructor(
        api: Api,
        private root: RuntimeBindingId<any>,
        private elements: BoundTreeElement[]
     ) {
        super(api);
        this.create();
    }

    get support(): Tree|TreeItem {
        return this.tree;
    }

    protected create(): void {
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
        this.api.addChangeListener(this.root, value => this.updateRoot(value));

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
        if (rootElement !== null) {
            rootElement.children.forEach(child => childrenForObject(this, child, root));
        }
    }

    addItem(value: Description<any>, sourceBinding: RuntimeBindingId<any>) {
        let boundItem = createBoundItem(this, value, sourceBinding);
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

    setEnable(enable: boolean) {
      this.tree.setEnable(enable);
    }
}

export class BoundTreeElement {

    public children:((element:any) => BindingId<Description<any>[]>)[];

    constructor(
        public name: string,
        public select: (element: any) => boolean,
        public component: (api: Api, element: any) => Component|PhrasingCategory,
        ...children: ((element:any) => BindingId<Description<any>[]>)[]
    ) {
        this.children = children;
     }
}

class BoundTreeItem implements Item {

    children: BoundTreeItem[] = [];

    readonly boundTree = this.parent instanceof BoundTree ? this.parent : this.parent.boundTree;

    constructor(
        public readonly parent: BoundTree|BoundTreeItem,
        public object: Description<any>,
        public sourceBinding: RuntimeBindingId<any>,
        public element: BoundTreeElement,
        public item: TreeItem
    ) {
        item.onexpand = (item) => {
            if (item.data instanceof BoundTreeItem) {
                element.children.forEach(child => childrenForObject(this, child, object));
            }
        }
     }

     get support(): Tree|TreeItem {
        return this.item;
    }

     private clear() {
        this.children.slice(0, this.children.length);
        this.item.clear();
     }

    addItem(value: Description<any>, sourceBinding: RuntimeBindingId<any>) {
        let boundItem = createBoundItem(this, value, sourceBinding);
        if (boundItem != null) {
            this.children.push(boundItem);
            this.item.addChild(boundItem.item);
        }
    }

    removeItem(index: number) {
        let item = this.children[index];
        this.children.splice(index, 1);
        this.item.removeChild(item.item);
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
function updateValues(container: Item, values: Description<any>[], sourceBinding: RuntimeBindingId<any>) {
    let lineCount = 0;
    let valueCount = 0;

    // checks elements with current lines
    while (lineCount < container.children.length && valueCount < values.length) {
        let boundItem = container.children[lineCount];
        let value = values[valueCount];

        if (!boundItem.sourceBinding.equals(sourceBinding)) {
            // item source isn't the current binding, ignore it
            lineCount += 1;
        } else {
            // item source is the given binding
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
    }

    // removes the rest of the lines if any
    while (lineCount < container.children.length) {
        let boundItem = container.children[lineCount];
        if (boundItem.sourceBinding.equals(sourceBinding)) {
            container.removeItem(lineCount);
        } else {
            lineCount += 1
        }
    }

    // adds the rest of values if any
    while (valueCount < values.length) {
        container.addItem(values[valueCount], sourceBinding);
        valueCount += 1;
    }
}

/** Creates a BoundItem for a given value */
function createBoundItem(parent: Item, value: Description<any>, sourceBinding: RuntimeBindingId<any>): BoundTreeItem|null {
    let tree = parent.boundTree;
    let itemElement = tree.elementForValue(value);
    if (itemElement != null) {
        let component = itemElement.component(tree.api, value);
        let item = new TreeItem(parent.support, component, itemElement.children.length === 0);
        let boundItem = new BoundTreeItem(tree, value, sourceBinding, itemElement, item);
        item.data = boundItem;
        return boundItem;
    }
    return null;
}

/** Evaluates children binding */
function childrenForObject(item: Item, childrenBinding: (element:any) => BindingId<Description<any>>, object: Description<any>) {
    let childrenRtBindingId = new RuntimeBindingId(childrenBinding(object), object.url);

    let result = item.boundTree.api.evaluate<Description<any>[]>(childrenRtBindingId, false);
    result.then((childrenValues => {
        updateValues(item, childrenValues, childrenRtBindingId);
    }))

    item.boundTree.api.addChangeListener(childrenRtBindingId, (value) => {
        updateValues(item, value, childrenRtBindingId);
    })
 }
