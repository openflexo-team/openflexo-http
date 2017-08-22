define(["require", "exports", "./utils", "./icon"], function (require, exports, utils_1, icon_1) {
    "use strict";
    var hiddenClass = "of-tree__hidden";
    var expandedIcon = "indeterminate_check_box";
    var foldedIcon = "add_box";
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
        function TreeItem(contents, icon) {
            if (icon === void 0) { icon = null; }
            this.contents = contents;
            this.icon = icon;
            this.children = [];
            this.expanded = false;
            this.expandCallback = null;
            this.foldCallback = null;
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
            this.statusIcon.innerText = foldedIcon;
            primaryContent.appendChild(this.statusIcon);
            this.statusIcon.onclick = function (event) {
                if (_this.expanded)
                    _this.fold();
                else
                    _this.expand();
            };
            if (this.icon !== null) {
                primaryContent.appendChild(utils_1.toHTMLElement(new icon_1.Icon(this.icon)));
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFPQSxJQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztJQUN0QyxJQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztJQUMvQyxJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFFN0I7UUFDSSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7UUFDSSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFDYixDQUFDO0lBRUQ7UUFNSTtZQUZBLGFBQVEsR0FBZSxFQUFFLENBQUM7WUFHdEIsaUNBQXlCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVPLHFCQUFNLEdBQWQ7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV6Qyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELHVCQUFRLEdBQVIsVUFBUyxLQUFlO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMs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