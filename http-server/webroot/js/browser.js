"use strict";
var openflexo_1 = require("./openflexo");
var utils_1 = require("./utils");
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
            openflexo_1.call(item.getAttribute("data-url"), function (children) {
                div_1.removeChild(div_1.firstChild);
                for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                    var child = children_1[_i];
                    div_1.appendChild(createItemFromSource(child));
                }
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
openflexo_1.resourceCenters(function (resourceCenters) {
    var div = document.querySelector("#rcs");
    for (var _i = 0, resourceCenters_1 = resourceCenters; _i < resourceCenters_1.length; _i++) {
        var rc = resourceCenters_1[_i];
        div.appendChild(document.createElement("hr"));
        div.appendChild(createTitle(rc));
        div.appendChild(createRoot(rc));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUdxQjtBQUdyQixpQ0FFaUI7QUFFakIsSUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUM7QUFDM0MsSUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUM7QUFFekMsMkJBQTJCLE9BQW9CO0lBQzNDLE1BQU0sQ0FBQywyQ0FBbUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUVELHFCQUFxQixFQUFrQjtJQUNuQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTtJQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxnQkFBZ0IsS0FBaUI7SUFDN0IsSUFBSSxJQUFJLEdBQUcsaUJBQWlCLENBQWMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXhELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLFFBQU0sR0FBZ0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3BFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0IsUUFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osUUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFFOUIsSUFBSSxLQUFHLEdBQUcs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