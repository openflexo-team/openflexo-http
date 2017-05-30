define(["require", "exports", "./openflexo", "./utils"], function (require, exports, openflexo_1, utils_1) {
    "use strict";
    var arrow_right = "keyboard_arrow_right";
    var arrow_down = "keyboard_arrow_down";
    function getDataUrlElement(element) {
        return utils_1.findElementWithAttributeInHierarchy(element, "data-url");
    }
    function createTitle(rc) {
        var title = document.createElement("div");
        title.className = 'title';
        title.innerText = rc.name;
        return title;
    }
    function expand(event) {
        var item = getDataUrlElement(event.target);
        if (item) {
            var status_1 = item.querySelector("span.material-icons");
            var itemChidlren = item.querySelector("div.children");
            if (itemChidlren) {
                item.removeChild(itemChidlren);
                status_1.innerText = arrow_right;
            }
            else {
                status_1.innerText = arrow_down;
                var div_1 = document.createElement("div");
                div_1.className = 'children';
                item.appendChild(div_1);
                div_1.appendChild(utils_1.spinner());
                var url = item.getAttribute("data-url");
                if (url) {
                    openflexo_1.call(url, function (children) {
                        if (div_1.firstChild) {
                            div_1.removeChild(div_1.firstChild);
                        }
                        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                            var child = children_1[_i];
                            div_1.appendChild(createItemFromSource(child));
                        }
                    });
                }
            }
        }
    }
    function createRoot(rc) {
        return createFolderItem('/', rc.resourceUrl + '/');
    }
    function createItemFromSource(source) {
        switch (source.type) {
            case 'Folder':
                return createFolderItem(source.name, source.url);
            case 'Resource':
                return createResourceItem(source);
        }
        var error = document.createElement("div");
        return error;
    }
    function createFolderItem(label, url) {
        var tree = document.createElement("div");
        tree.className = "item";
        tree.setAttribute("data-url", url);
        var item = document.createElement("div");
        item.className = "label";
        var treeStatus = utils_1.icon(arrow_right);
        treeStatus.onclick = expand;
        item.appendChild(treeStatus);
        var itemIcon = utils_1.icon("folder_open");
        item.appendChild(itemIcon);
        var itemLabel = document.createElement("span");
        itemLabel.className = "text";
        itemLabel.innerText = label;
        item.appendChild(itemLabel);
        tree.appendChild(item);
        return tree;
    }
    function createResourceItem(source) {
        var tree = document.createElement("div");
        tree.className = "item";
        var item = document.createElement("div");
        item.className = "label";
        var treeStatus = document.createElement("span");
        treeStatus.className = "status";
        item.appendChild(treeStatus);
        var itemIcon = utils_1.icon("cloud_download");
        item.appendChild(itemIcon);
        var itemLabel = document.createElement("a");
        itemLabel.href = source.contentUrl;
        itemLabel.innerText = source.name;
        item.appendChild(itemLabel);
        var itemType = document.createElement("span");
        itemType.innerText = " (" + source.technologyAdapterId.substring(source.technologyAdapterId.lastIndexOf('.') + 1) + ")";
        item.appendChild(itemType);
        tree.appendChild(item);
        return tree;
    }
    function createErrorItem() {
        var tree = document.createElement("div");
        tree.className = "item";
        var item = document.createElement("div");
        item.className = "label";
        var treeStatus = document.createElement("span");
        treeStatus.className = "status";
        item.appendChild(treeStatus);
        var itemIcon = utils_1.icon("error");
        item.appendChild(itemIcon);
        var itemLabel = document.createElement("a");
        itemLabel.innerText = "<error>";
        item.appendChild(itemLabel);
        var itemType = document.createElement("span");
        itemType.innerText = "unknown";
        item.appendChild(itemType);
        tree.appendChild(item);
        return tree;
    }
    openflexo_1.resourceCenters(function (resourceCenters) {
        var div = document.querySelector("#rcs");
        if (div) {
            for (var _i = 0, resourceCenters_1 = resourceCenters; _i < resourceCenters_1.length; _i++) {
                var rc = resourceCenters_1[_i];
                div.appendChild(document.createElement("hr"));
                div.appendChild(createTitle(rc));
                div.appendChild(createRoot(rc));
            }
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFVQSxJQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQztJQUMzQyxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUV6QywyQkFBMkIsT0FBb0I7UUFDM0MsTUFBTSxDQUFDLDJDQUFtQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQscUJBQXFCLEVBQWtCO1FBQ25DLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDekMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDMUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGdCQUFnQixLQUFpQjtRQUM3QixJQUFJLElBQUksR0FBRyxpQkFBaUIsQ0FBYyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksUUFBTSxHQUFnQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDcEUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN0RCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9CLFFBQU0sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1lBQ25DLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixRQUFNLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztnQkFFOUIsSUFBSSxLQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxL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