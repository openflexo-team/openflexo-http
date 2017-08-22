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
                if (element.select(value))
                    return element;
            }
            return null;
        };
        BoundTree.prototype.updateRoot = function (root) {
            var _this = this;
            var rootElement = this.elementForValue(root);
            console.log("--- Update root ---");
            console.log(root);
            console.log(rootElement);
            if (rootElement !== null && rootElement.children !== null) {
                var childrenRtBindingId = new Api_1.RuntimeBindingId(rootElement.children, root.url);
                var result = this.api.evaluate(childrenRtBindingId, false);
                result.then((function (values) {
                    console.log("--- Updates values ---");
                    console.log(values);
                    updateValues(_this, values);
                }));
            }
        };
        BoundTree.prototype.addItem = function (value) {
            var itemElement = this.elementForValue(value);
            if (itemElement != null) {
                var component = itemElement.component(this.api, value);
                var item = new Tree_1.TreeItem(component);
                var boundItem = new BoundTreeItem(this, value.url, itemElement, item);
                this.children.push(boundItem);
                this.tree.addChild(item);
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
        function BoundTreeElement(name, select, children, component) {
            if (children === void 0) { children = null; }
            this.name = name;
            this.select = select;
            this.children = children;
            this.component = component;
        }
        return BoundTreeElement;
    }());
    exports.BoundTreeElement = BoundTreeElement;
    var BoundTreeItem = (function () {
        function BoundTreeItem(boundTree, url, element, item, root) {
            if (root === void 0) { root = false; }
            var _this = this;
            this.boundTree = boundTree;
            this.url = url;
            this.element = element;
            this.item = item;
            this.root = root;
            this.children = [];
            if (element.children != null) {
                var childrenRtBindingId_1 = new Api_1.RuntimeBindingId(element.children, url);
                item.expandCallback = function (item) {
                    var result = _this.boundTree.api.evaluate(childrenRtBindingId_1, false);
                    result.then((function (values) {
                        updateValues(_this, values);
                    }));
                };
            }
        }
        BoundTreeItem.prototype.clear = function () {
            this.children.slice(0, this.children.length);
            this.item.clear();
        };
        BoundTreeItem.prototype.addItem = function (value) {
            var itemElement = this.boundTree.elementForValue(value);
            if (itemElement != null) {
                var component = itemElement.component(this.boundTree.api, value);
                var item = new Tree_1.TreeItem(component);
                var boundItem = new BoundTreeItem(this.boundTree, value.url, itemElement, item);
                this.children.push(boundItem);
                this.item.addChild(item);
                if (this.root) {
                    this.boundTree.tree.addChild(item);
                }
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
    function updateValues(container, values) {
        var lineCount = 0;
        var valueCount = 0;
        // checks elements with current lines
        while (lineCount < container.children.length && valueCount < values.length) {
            var line = container.children[lineCount];
            var element = values[valueCount];
            if (line.url !== element.url) {
                // line if different from current element
                // removes the line current line
                this.removeItem(lineCount);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bmRUcmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm91bmRUcmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBZ0JBO1FBUUksbUJBQ1csR0FBUSxFQUNQLElBQXNCLEVBQ3RCLFFBQTRCO1lBRjdCLFFBQUcsR0FBSCxHQUFHLENBQUs7WUFDUCxTQUFJLEdBQUosSUFBSSxDQUFrQjtZQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFvQjtZQUx4QyxhQUFRLEdBQW9CLEVBQUUsQ0FBQztZQU8zQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELDBCQUFNLEdBQU47WUFBQSxpQkFPQztZQU5HLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1lBRTdFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQztRQUVELG1DQUFlLEdBQWYsVUFBZ0IsS0FBdUI7WUFDbkMsR0FBRyxDQUFDLENBQWdCLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWE7Z0JBQTVCLElBQUksT0FBTyxTQUFBO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JB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