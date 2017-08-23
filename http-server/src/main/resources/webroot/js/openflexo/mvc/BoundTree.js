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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBa0JBO1FBUUksbUJBQ1csR0FBUSxFQUNQLElBQXNCLEVBQ3RCLFFBQTRCO1lBRjdCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUCxTQUFJLEdBQUosSUFBSSxDQUFrQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUx4QyxhQUFRLEdBQW9CLEVBQUUsQ0FBQztZQU8zQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELDBCQUFNLEdBQU47WUFBQSxpQkFPQztZQU5HLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1lBRTdFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQztRQUVELG1DQUFlLEdBQWYsVUFBZ0IsS0FBdUI7WUFDbkMsR0FBRyxDQUFDLENBQWdCLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWE7Z0JBQTVCLElBQUksT0FBTyxTQUFBO2dCQUNaLElBQUksQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtB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