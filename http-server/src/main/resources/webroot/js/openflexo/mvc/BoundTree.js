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
            this.elements.forEach(element => {
                try {
                    if (element.select(value))
                        return element;
                }
                catch (e) {
                }
            });
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
            this.children.forEach(child => {
                let found = child.findItemForObject(url);
                if (found !== null)
                    return found;
            });
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
            this.children.forEach(child => {
                let found = child.findItemForObject(url);
                if (found !== null)
                    return found;
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBb0JBO1FBUUksWUFDVyxHQUFRLEVBQ1AsSUFBc0IsRUFDdEIsUUFBNEI7WUFGN0IsUUFBRyxHQUFILEdBQUcsQ0FBSztZQUNQLFNBQUksR0FBSixJQUFJLENBQWtCO1lBQ3RCLGFBQVEsR0FBUixRQUFRLENBQW9CO1lBTHhDLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1lBTzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUU3RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxlQUFlLENBQUMsS0FBdUI7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDekIsSUFBSSxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDOUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUViLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FB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