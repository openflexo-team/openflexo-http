define(["require", "exports", "../api/Api", "../ui/Tree"], function (require, exports, Api_1, Tree_1) {
    "use strict";
    var BoundTree = (function () {
        function BoundTree(api, root, elements) {
            this.api = api;
            this.root = root;
            this.elements = elements;
            this.children = [];
            this.create();
        }
        BoundTree.prototype.create = function () {
            var _this = this;
            this.tree = new Tree_1.Tree();
            this.api.evaluate(this.root).then(function (rootValue) { return _this.updateRoot(rootValue); });
            this.api.addChangeListener(this.root, function (event) { return _this.updateRoot(event.value); });
            this.container = this.tree.container;
        };
        BoundTree.prototype.elementForValue = function (value) {
            for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                try {
                    if (element.select(value))
                        return element;
                }
                catch (e) {
                }
            }
            return null;
        };
        BoundTree.prototype.updateRoot = function (root) {
            var _this = this;
            var rootElement = this.elementForValue(root);
            if (rootElement !== null && rootElement.children !== null) {
                var childrenRtBindingId = new Api_1.RuntimeBindingId(rootElement.children(root), root.url);
                var result = this.api.evaluate(childrenRtBindingId, false);
                result.then((function (values) { updateValues(_this, values); }));
                this.api.addChangeListener(childrenRtBindingId, function (event) { return updateValues(_this, event.value); });
            }
        };
        BoundTree.prototype.addItem = function (value) {
            var boundItem = createBoundItem(this, value);
            if (boundItem != null) {
                this.children.push(boundItem);
                this.tree.addChild(boundItem.item);
            }
        };
        BoundTree.prototype.removeItem = function (index) {
            var item = this.children[index];
            this.children.splice(index, 1);
            this.tree.removeChild(item.item);
        };
        BoundTree.prototype.findItemForObject = function (url) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var found = child.findItemForObject(url);
                if (found !== null)
                    return found;
            }
            return null;
        };
        return BoundTree;
    }());
    exports.BoundTree = BoundTree;
    var BoundTreeElement = (function () {
        function BoundTreeElement(name, select, component, children) {
            if (children === void 0) { children = null; }
            this.name = name;
            this.select = select;
            this.component = component;
            this.children = children;
        }
        return BoundTreeElement;
    }());
    exports.BoundTreeElement = BoundTreeElement;
    var BoundTreeItem = (function () {
        function BoundTreeItem(boundTree, object, element, item, root) {
            if (root === void 0) { root = false; }
            var _this = this;
            this.boundTree = boundTree;
            this.object = object;
            this.element = element;
            this.item = item;
            this.root = root;
            this.children = [];
            item.onexpand = function (item) {
                if (item.data instanceof BoundTreeItem) {
                    var boundItem = item.data;
                    if (element.children != null) {
                        var childrenRtBindingId = new Api_1.RuntimeBindingId(element.children(boundItem.object), object.url);
                        var result = _this.boundTree.api.evaluate(childrenRtBindingId, false);
                        result.then((function (childrenValues) {
                            updateValues(_this, childrenValues);
                        }));
                        _this.boundTree.api.addChangeListener(childrenRtBindingId, function (event) {
                            updateValues(_this, event.value);
                        });
                    }
                }
            };
        }
        BoundTreeItem.prototype.clear = function () {
            this.children.slice(0, this.children.length);
            this.item.clear();
        };
        BoundTreeItem.prototype.addItem = function (value) {
            var boundItem = createBoundItem(this.boundTree, value);
            if (boundItem != null) {
                this.children.push(boundItem);
                this.item.addChild(boundItem.item);
            }
        };
        BoundTreeItem.prototype.removeItem = function (index) {
            var item = this.children[index];
            this.children.splice(index, 1);
            this.item.removeChild(item.item);
            if (this.root) {
                this.boundTree.tree.removeChild(item.item);
            }
        };
        BoundTreeItem.prototype.findItemForObject = function (url) {
            if (this.object.url === url)
                return this;
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var found = child.findItemForObject(url);
                if (found !== null)
                    return found;
            }
            return null;
        };
        return BoundTreeItem;
    }());
    /** Updates item children with given values. */
    function updateValues(container, values) {
        var lineCount = 0;
        var valueCount = 0;
        // checks elements with current lines
        while (lineCount < container.children.length && valueCount < values.length) {
            var boundItem = container.children[lineCount];
            var value = values[valueCount];
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
        var itemElement = tree.elementForValue(value);
        if (itemElement != null) {
            var component = itemElement.component(tree.api, value);
            var item = new Tree_1.TreeItem(tree.tree, component, itemElement.children === null);
            var boundItem = new BoundTreeItem(tree, value, itemElement, item);
            item.data = boundItem;
            return boundItem;
        }
        return null;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBb0JBO1FBUUksbUJBQ1csR0FBUSxFQUNQLElBQXNCLEVBQ3RCLFFBQTRCO1lBRjdCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUCxTQUFJLEdBQUosSUFBSSxDQUFrQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUx4QyxhQUFRLEdBQW9CLEVBQUUsQ0FBQztZQU8zQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELDBCQUFNLEdBQU47WUFBQSxpQkFPQztZQU5HLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1lBRTdFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQztRQUVELG1DQUFlLEdBQWYsVUFBZ0IsS0FBdUI7WUFDbkMsR0FBRyxDQUFDLENBQWdCLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWE7Z0JBQTVCLElBQUksT0FBTyxTQUFBO2dCQUNaLElBQUksQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtB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