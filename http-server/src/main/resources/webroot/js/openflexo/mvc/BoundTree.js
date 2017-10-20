define(["require", "exports", "../api/Api", "./BoundComponent", "../ui/Tree"], function (require, exports, Api_1, BoundComponent_1, Tree_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        let childrenRtBindingId = Api_1.createRuntimeBinding(childrenBinding(object), object.url);
        let result = item.boundTree.api.evaluate(childrenRtBindingId, false);
        result.then((childrenValues => {
            updateValues(item, childrenValues, childrenRtBindingId);
        }));
        item.boundTree.api.addChangeListener(childrenRtBindingId, (value) => {
            updateValues(item, value, childrenRtBindingId);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTJCQSx3RUFBd0U7SUFDeEUsZUFBdUIsU0FBUSwrQkFBYztRQWN6QyxZQUNJLEdBQVEsRUFDQSxPQUFlLEVBQ2YsUUFBNEI7WUFFcEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBSEgsWUFBTyxHQUFQLE9BQU8sQ0FBUTtZQUNmLGFBQVEsR0FBUixRQUFRLENBQW9CO1lBWHhDLGFBQVEsR0FBb0IsRUFBRSxDQUFDO1lBSXRCLGNBQVMsR0FBRyxJQUFJLENBQUM7WUFFakIsV0FBTSxHQUFHLElBQUksQ0FBQztZQVFuQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxJQUFJLE9BQU87WUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRVMsTUFBTTtZQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLFNBQVM7Z0JBQzNCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFpQixDQUFDO29CQUNwRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUk7d0JBQ2xCLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ3ZDLENBQUMsQ0FBQyxDQUFBO29CQUNGLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsSUFBSSxD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