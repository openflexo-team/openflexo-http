define(["require", "exports", "./openflexo/api/Api", "./utils"], function (require, exports, Api_1, utils_1) {
    "use strict";
    var arrow_right = "keyboard_arrow_right";
    var arrow_down = "keyboard_arrow_down";
    var api = new Api_1.Api();
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
                    var result = api.call(url);
                    result.then(function (children) {
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
    var resourceCenters = api.resourceCenters();
    resourceCenters.then(function (resourceCenters) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFZQSxJQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQztJQUMzQyxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUV6QyxJQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO0lBRXRCLDJCQUEyQixPQUFvQjtRQUMzQyxNQUFNLENBQUMsMkNBQW1DLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxxQkFBcUIsRUFBa0I7UUFDbkMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN6QyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUMxQixLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUE7UUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0JBQWdCLEtBQWlCO1FBQzdCLElBQUksSUFBSSxHQUFHLGlCQUFpQixDQUFjLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxRQUFNLEdBQWdCLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNwRSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0IsUUFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFFBQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO2dC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