define(["require", "exports", "../api/Api", "../ui/Tree"], function (require, exports, Api_1, Tree_1) {
    "use strict";
    class BoundTree {
        constructor(api, root, elements) {
            this.api = api;
            this.root = root;
            this.elements = elements;
            this.children = [];
            this.create();
        }
        create() {
            this.tree = new Tree_1.Tree();
            this.api.evaluate(this.root).then(rootValue => this.updateRoot(rootValue));
            this.api.addChangeListener(this.root, event => this.updateRoot(event.value));
            this.container = this.tree.container;
        }
        elementForValue(value) {
            for (let i = 0; i < this.elements.length; i += 1) {
                let element = this.elements[i];
                try {
                    if (element.select(value))
                        return element;
                }
                catch (e) {
                }
            }
            return null;
        }
        updateRoot(root) {
            let rootElement = this.elementForValue(root);
            if (rootElement !== null && rootElement.children !== null) {
                let childrenRtBindingId = new Api_1.RuntimeBindingId(rootElement.children(root), root.url);
                let result = this.api.evaluate(childrenRtBindingId, false);
                result.then((values => { updateValues(this, values); }));
                this.api.addChangeListener(childrenRtBindingId, (event) => updateValues(this, event.value));
            }
        }
        addItem(value) {
            let boundItem = createBoundItem(this, value);
            if (boundItem != null) {
                this.children.push(boundItem);
                this.tree.addChild(boundItem.item);
            }
        }
        removeItem(index) {
            let item = this.children[index];
            this.children.splice(index, 1);
            this.tree.removeChild(item.item);
        }
        findItemForObject(url) {
            for (let i = 0; i < this.children.length; i += 1) {
                let child = this.children[i];
                let found = child.findItemForObject(url);
                if (found !== null)
                    return found;
            }
            ;
            return null;
        }
    }
    exports.BoundTree = BoundTree;
    class BoundTreeElement {
        constructor(name, select, component, children = null) {
            this.name = name;
            this.select = select;
            this.component = component;
            this.children = children;
        }
    }
    exports.BoundTreeElement = BoundTreeElement;
    class BoundTreeItem {
        constructor(boundTree, object, element, item, root = false) {
            this.boundTree = boundTree;
            this.object = object;
            this.element = element;
            this.item = item;
            this.root = root;
            this.children = [];
            item.onexpand = (item) => {
                if (item.data instanceof BoundTreeItem) {
                    let boundItem = item.data;
                    if (element.children != null) {
                        let childrenRtBindingId = new Api_1.RuntimeBindingId(element.children(boundItem.object), object.url);
                        let result = this.boundTree.api.evaluate(childrenRtBindingId, false);
                        result.then((childrenValues => {
                            updateValues(this, childrenValues);
                        }));
                        this.boundTree.api.addChangeListener(childrenRtBindingId, (event) => {
                            updateValues(this, event.value);
                        });
                    }
                }
            };
        }
        clear() {
            this.children.slice(0, this.children.length);
            this.item.clear();
        }
        addItem(value) {
            let boundItem = createBoundItem(this.boundTree, value);
            if (boundItem != null) {
                this.children.push(boundItem);
                this.item.addChild(boundItem.item);
            }
        }
        removeItem(index) {
            let item = this.children[index];
            this.children.splice(index, 1);
            this.item.removeChild(item.item);
            if (this.root) {
                this.boundTree.tree.removeChild(item.item);
            }
        }
        findItemForObject(url) {
            if (this.object.url === url)
                return this;
            for (let i = 0; i < this.children.length; i += 1) {
                let child = this.children[i];
                let found = child.findItemForObject(url);
                if (found !== null)
                    return found;
            }
            return null;
        }
    }
    /** Updates item children with given values. */
    function updateValues(container, values) {
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
            }
            else {
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
    function createBoundItem(tree, value) {
        let itemElement = tree.elementForValue(value);
        if (itemElement != null) {
            let component = itemElement.component(tree.api, value);
            let item = new Tree_1.TreeItem(tree.tree, component, itemElement.children === null);
            let boundItem = new BoundTreeItem(tree, value, itemElement, item);
            item.data = boundItem;
            return boundItem;
        }
        return null;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBb0JBO1FBUUksWUFDVyxHQUFRLEVBQ1AsSUFBc0IsRUFDdEIsUUFBNEI7WUFGN0IsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNQLFNBQUksR0FBSixJQUFJLENBQWtCO1lBQ3RCLGFBQVEsR0FBUixRQUFRLENBQW9CO1lBTHhDLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1lBTzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUU3RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxlQUFlLENBQUMsS0FBdUI7WUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxD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