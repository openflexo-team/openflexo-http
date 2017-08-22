define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var hiddenClass = "of-tree__hidden";
    var expandedIcon = "indeterminate_check_box";
    var foldedIcon = "add_box";
    var emptyIcon = "stop";
    function createDiv() {
        var div = document.createElement("div");
        return div;
    }
    function createUl() {
        var ul = document.createElement("ul");
        ul.classList.add("of-tree");
        ul.classList.add("mdl-list");
        return ul;
    }
    var Tree = (function () {
        function Tree() {
            this.children = [];
            utils_1.addCssIfNotAlreadyPresent("/css/openflexo/ui/Tree.css");
            this.create();
        }
        Tree.prototype.create = function () {
            this.container = document.createElement("ul");
            this.container.classList.add("of-tree");
            this.container.classList.add("mdl-list");
            utils_1.mdlUpgradeElement(this.container);
        };
        Tree.prototype.addChild = function (child) {
            this.children.push(child);
            this.container.appendChild(child.container);
        };
        Tree.prototype.removeChild = function (child) {
            var index = this.children.indexOf(child);
            if (index >= 0) {
                // removes from array
                this.children.splice(index, 1);
                // removes from dom
                this.container.removeChild(child.container);
            }
        };
        return Tree;
    }());
    exports.Tree = Tree;
    var TreeItem = (function () {
        function TreeItem(contents, noChildren) {
            if (noChildren === void 0) { noChildren = false; }
            this.contents = contents;
            this.noChildren = noChildren;
            this.children = [];
            this.expanded = false;
            this.expandCallback = null;
            this.foldCallback = null;
            /** Internal data for advanced tree usage, not for user to use */
            this.data = null;
            this.create();
        }
        TreeItem.prototype.addChild = function (child) {
            this.children.push(child);
            this.childrenContainer.appendChild(child.container);
        };
        TreeItem.prototype.removeChild = function (child) {
            var index = this.children.indexOf(child);
            if (index >= 0) {
                // removes from array
                this.children.splice(index, 1);
                // removes from dom
                this.childrenContainer.removeChild(child.container);
            }
        };
        TreeItem.prototype.clear = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var item = _a[_i];
                this.removeChild(item);
            }
        };
        TreeItem.prototype.create = function () {
            var _this = this;
            this.container = createDiv();
            var li = document.createElement("li");
            li.classList.add("mdl-list__item");
            li.classList.add("of-tree__item");
            var primaryContent = document.createElement("span");
            primaryContent.classList.add("mdl-list__item-primary-content");
            li.appendChild(primaryContent);
            this.statusIcon = document.createElement("i");
            this.statusIcon.classList.add("material-icons");
            this.statusIcon.classList.add("mdl-list__item-icon");
            this.statusIcon.innerText = this.noChildren ? emptyIcon : foldedIcon;
            primaryContent.appendChild(this.statusIcon);
            this.statusIcon.onclick = function (event) {
                if (!_this.noChildren) {
                    if (_this.expanded)
                        _this.fold();
                    else
                        _this.expand();
                }
            };
            primaryContent.appendChild(utils_1.toHTMLElement(this.contents));
            this.container.appendChild(li);
            this.childrenContainer = createUl();
            this.childrenContainer.classList.add(hiddenClass);
            this.container.appendChild(this.childrenContainer);
            utils_1.mdlUpgradeElement(this.container);
        };
        TreeItem.prototype.expand = function () {
            if (!this.expanded) {
                // expands
                if (this.expandCallback !== null) {
                    this.expandCallback(this);
                }
                this.childrenContainer.classList.remove(hiddenClass);
                this.statusIcon.innerText = expandedIcon;
                this.expanded = true;
            }
        };
        TreeItem.prototype.fold = function () {
            if (this.expand) {
                // folds
                if (this.foldCallback !== null) {
                    this.foldCallback(this);
                }
                this.childrenContainer.classList.add(hiddenClass);
                this.statusIcon.innerText = foldedIcon;
                this.expanded = false;
            }
        };
        return TreeItem;
    }());
    exports.TreeItem = TreeItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFPQSxJQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztJQUN0QyxJQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztJQUMvQyxJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDN0IsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBRXpCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEO1FBQ0ksSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVEO1FBTUk7WUFGQSxhQUFRLEdBQWUsRUFBRSxDQUFDO1lBR3RCLGlDQUF5QixDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFTyxxQkFBTSxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFekMseUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCx1QkFBUSxHQUFSLFVBQVMs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