define(["require", "exports", "../api/Api", "./BoundComponent", "../ui/Tree"], function (require, exports, Api_1, BoundComponent_1, Tree_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoundTreeElement = exports.BoundTree = void 0;
    /** Tree handled with a series of bindings throught BoundTreeElements */
    class BoundTree extends BoundComponent_1.BoundComponent {
        constructor(api, runtime, elements) {
            super(api);
            this.runtime = runtime;
            this.elements = elements;
            this.children = [];
            this.boundTree = this;
            this.parent = this;
            this.create();
            this.updateRuntime(runtime);
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
            this.container = this.tree.container;
        }
        updateRuntime(runtime, extensions = new Map()) {
            super.updateRuntime(runtime, extensions);
            this.api.call(this.runtime).then(value => this.updateRoot(value));
        }
        elementForValue(value) {
            for (let i = 0; i < this.elements.length; i += 1) {
                let element = this.elements[i];
                try {
                    if (element.select(value))
                        return element;
                }
                catch (e) {
                    // nothing to do pass to next element
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
        let childrenRtBindingId = (0, Api_1.createRuntimeBinding)(childrenBinding(object), object.url);
        let result = item.boundTree.api.evaluate(childrenRtBindingId, false);
        result.then((childrenValues => {
            updateValues(item, childrenValues, childrenRtBindingId);
        }));
        item.boundTree.api.addChangeListener(childrenRtBindingId, (value) => {
            updateValues(item, value, childrenRtBindingId);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUEyQkEsd0VBQXdFO0lBQ3hFLE1BQWEsU0FBVSxTQUFRLCtCQUFjO1FBY3pDLFlBQ0ksR0FBUSxFQUNBLE9BQWUsRUFDZixRQUE0QjtZQUVwQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFISCxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7WUFYeEMsYUFBUSxHQUFvQixFQUFFLENBQUM7WUFJdEIsY0FBUyxHQUFHLElBQUksQ0FBQztZQUVqQixXQUFNLEdBQUcsSUFBSSxDQUFDO1lBUW5CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELElBQUksT0FBTztZQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUM3QixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7b0JBQ25CLElBQUksb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7b0JBQ3BELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3JCLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ3ZDLENBQUMsQ0FBQyxDQUFBO29CQUNGLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2lCQUNsQztZQUNMLENBQUMsQ0FBQztZQUVGLElBQUksQ0FBQyxT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