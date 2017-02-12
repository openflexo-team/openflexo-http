define(["require", "exports", "./openflexo", "./utils"], function (require, exports, openflexo, utils) {
    "use strict";
    var arrow_right = "keyboard_arrow_right";
    var arrow_down = "keyboard_arrow_down";
    function getDataUrlElement(element) {
        return utils.findElementWithAttributeInHierarchy(element, "data-url");
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
                openflexo.call(item.getAttribute("data-url"), function (children) {
                    var div = document.createElement("div");
                    div.className = 'children';
                    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                        var child = children_1[_i];
                        div.appendChild(createItemFromSource(child));
                    }
                    item.appendChild(div);
                    status_1.innerText = arrow_down;
                });
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
    }
    function createFolderItem(label, url) {
        var tree = document.createElement("div");
        tree.className = "item";
        tree.setAttribute("data-url", url);
        var item = document.createElement("div");
        item.className = "label";
        var treeStatus = utils.icon(arrow_right);
        treeStatus.onclick = expand;
        item.appendChild(treeStatus);
        var itemIcon = utils.icon("folder_open");
        item.appendChild(itemIcon);
        var itemLabel = document.createElement("span");
        itemLabel.innerText = label;
        item.appendChild(itemLabel);
        tree.appendChild(item);
        return tree;
    }
    function createResourceItem(source) {
        var tree = document.createElement("div");
        tree.className = "item";
        var item = document.createElement("a");
        item.href = source.contentUrl;
        item.className = "label";
        var itemIcon = utils.icon("cloud_download");
        item.appendChild(itemIcon);
        var itemLabel = document.createElement("span");
        itemLabel.innerText = source.name;
        item.appendChild(itemLabel);
        tree.appendChild(item);
        return tree;
    }
    openflexo.resourceCenters(function (resourceCenters) {
        var div = document.querySelector("#rcs");
        for (var _i = 0, resourceCenters_1 = resourceCenters; _i < resourceCenters_1.length; _i++) {
            var rc = resourceCenters_1[_i];
            div.appendChild(document.createElement("hr"));
            div.appendChild(createTitle(rc));
            div.appendChild(createRoot(rc));
        }
    });
});
//# sourceMappingURL=browser.js.map