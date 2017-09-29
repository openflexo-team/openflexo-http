define(["require", "exports", "../api/Api", "./BoundComponent", "../ui/Tree"], function (require, exports, Api_1, BoundComponent_1, Tree_1) {
    "use strict";
    /** Tree handled with a series of bindings throught BoundTreeElements */
    class BoundTree extends BoundComponent_1.BoundComponent {
        constructor(api, root, elements) {
            super(api);
            this.root = root;
            this.elements = elements;
            this.children = [];
            this.boundTree = this;
            this.parent = this;
            this.create();
        }
        get support() {
            return this.tree;
        }
        create() {
            this.tree = new Tree_1.Tree();
            this.tree.onselect = (selection) => {
                let onselect = this.onselect;
                if (onselect !== null) {
                    let transformedSelection = new Set();
                    selection.forEach(item => {
                        transformedSelection.add(item.data);
                    });
                    onselect(transformedSelection);
                }
            };
            this.api.addChangeListener(this.root, value => this.updateRoot(value));
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
        selectCallback(selection) {
            let onselect = this.onselect;
            if (onselect !== null) {
                let transformedSelection = new Set();
                selection.forEach(item => {
                    transformedSelection.add(item.data);
                });
                onselect(transformedSelection);
            }
        }
        updateRoot(root) {
            let rootElement = this.elementForValue(root);
            if (rootElement !== null) {
                rootElement.children.forEach(child => childrenForObject(this, child, root));
            }
        }
        addItem(value, sourceBinding) {
            let boundItem = createBoundItem(this, value, sourceBinding);
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
        setEnable(enable) {
            this.tree.setEnable(enable);
        }
    }
    exports.BoundTree = BoundTree;
    class BoundTreeElement {
        constructor(name, select, component, ...children) {
            this.name = name;
            this.select = select;
            this.component = component;
            this.children = children;
        }
    }
    exports.BoundTreeElement = BoundTreeElement;
    class BoundTreeItem {
        constructor(parent, object, sourceBinding, element, item) {
            this.parent = parent;
            this.object = object;
            this.sourceBinding = sourceBinding;
            this.element = element;
            this.item = item;
            this.children = [];
            this.boundTree = this.parent instanceof BoundTree ? this.parent : this.parent.boundTree;
            item.onexpand = (item) => {
                if (item.data instanceof BoundTreeItem) {
                    element.children.forEach(child => childrenForObject(this, child, object));
                }
            };
        }
        get support() {
            return this.item;
        }
        clear() {
            this.children.slice(0, this.children.length);
            this.item.clear();
        }
        addItem(value, sourceBinding) {
            let boundItem = createBoundItem(this, value, sourceBinding);
            if (boundItem != null) {
                this.children.push(boundItem);
                this.item.addChild(boundItem.item);
            }
        }
        removeItem(index) {
            let item = this.children[index];
            this.children.splice(index, 1);
            this.item.removeChild(item.item);
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
    function updateValues(container, values, sourceBinding) {
        let lineCount = 0;
        let valueCount = 0;
        // checks elements with current lines
        while (lineCount < container.children.length && valueCount < values.length) {
            let boundItem = container.children[lineCount];
            let value = values[valueCount];
            if (!boundItem.sourceBinding.equals(sourceBinding)) {
                // item source isn't the current binding, ignore it
                lineCount += 1;
            }
            else {
                // item source is the given binding
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
        }
        // removes the rest of the lines if any
        while (lineCount < container.children.length) {
            let boundItem = container.children[lineCount];
            if (boundItem.sourceBinding.equals(sourceBinding)) {
                container.removeItem(lineCount);
            }
            else {
                lineCount += 1;
            }
        }
        // adds the rest of values if any
        while (valueCount < values.length) {
            container.addItem(values[valueCount], sourceBinding);
            valueCount += 1;
        }
    }
    /** Creates a BoundItem for a given value */
    function createBoundItem(parent, value, sourceBinding) {
        let tree = parent.boundTree;
        let itemElement = tree.elementForValue(value);
        if (itemElement != null) {
            let component = itemElement.component(tree.api, value);
            let item = new Tree_1.TreeItem(parent.support, component, itemElement.children.length === 0);
            let boundItem = new BoundTreeItem(tree, value, sourceBinding, itemElement, item);
            item.data = boundItem;
            return boundItem;
        }
        return null;
    }
    /** Evaluates children binding */
    function childrenForObject(item, childrenBinding, object) {
        let childrenRtBindingId = new Api_1.RuntimeBindingId(childrenBinding(object), object.url);
        let result = item.boundTree.api.evaluate(childrenRtBindingId, false);
        result.then((childrenValues => {
            updateValues(item, childrenValues, childrenRtBindingId);
        }));
        item.boundTree.api.addChangeListener(childrenRtBindingId, (value) => {
            updateValues(item, value, childrenRtBindingId);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBMkJBLHdFQUF3RTtJQUN4RSxlQUF1QixTQUFRLCtCQUFjO1FBY3pDLFlBQ0ksR0FBUSxFQUNBLElBQTJCLEVBQzNCLFFBQTRCO1lBRXBDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUhILFNBQUksR0FBSixJQUFJLENBQXVCO1lBQzNCLGFBQVEsR0FBUixRQUFRLENBQW9CO1lBWHhDLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1lBSXRCLGNBQVMsR0FBRyxJQUFJLENBQUM7WUFFakIsV0FBTSxHQUFHLElBQUksQ0FBQztZQVFuQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELElBQUksT0FBTztZQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFUyxNQUFNO1lBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsU0FBUztnQkFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLElBQUksb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7b0JBQ3BELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSTt3QkFDbEIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDdkMsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFDTCxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJ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