define(["require", "exports", "./openflexo/api/Api", "./utils"], function (require, exports, Api_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const arrow_right = "keyboard_arrow_right";
    const arrow_down = "keyboard_arrow_down";
    const api = new Api_1.Api();
    function getDataUrlElement(element) {
        return (0, utils_1.findElementWithAttributeInHierarchy)(element, "data-url");
    }
    function createTitle(rc) {
        let title = document.createElement("div");
        title.className = 'title';
        title.innerText = rc.name;
        return title;
    }
    function expand(event) {
        let item = getDataUrlElement(event.target);
        if (item) {
            let status = item.querySelector("span.material-icons");
            let itemChidlren = item.querySelector("div.children");
            if (itemChidlren) {
                item.removeChild(itemChidlren);
                status.innerText = arrow_right;
            }
            else {
                status.innerText = arrow_down;
                let div = document.createElement("div");
                div.className = 'children';
                item.appendChild(div);
                div.appendChild((0, utils_1.spinner)());
                let url = item.getAttribute("data-url");
                if (url) {
                    let result = api.call(url);
                    result.then(children => {
                        if (div.firstChild) {
                            div.removeChild(div.firstChild);
                        }
                        children.forEach(child => {
                            div.appendChild(createItemFromSource(child));
                        });
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
        let error = document.createElement("div");
        return error;
    }
    function createFolderItem(label, url) {
        let tree = document.createElement("div");
        tree.className = "item";
        tree.setAttribute("data-url", url);
        let item = document.createElement("div");
        item.className = "label";
        let treeStatus = (0, utils_1.icon)(arrow_right);
        treeStatus.onclick = expand;
        item.appendChild(treeStatus);
        let itemIcon = (0, utils_1.icon)("folder_open");
        item.appendChild(itemIcon);
        let itemLabel = document.createElement("span");
        itemLabel.className = "text";
        itemLabel.innerText = label;
        item.appendChild(itemLabel);
        tree.appendChild(item);
        return tree;
    }
    function createResourceItem(source) {
        let tree = document.createElement("div");
        tree.className = "item";
        let item = document.createElement("div");
        item.className = "label";
        let treeStatus = document.createElement("span");
        treeStatus.className = "status";
        item.appendChild(treeStatus);
        let itemIcon = (0, utils_1.icon)("cloud_download");
        item.appendChild(itemIcon);
        let itemLabel = document.createElement("a");
        itemLabel.href = source.contentUrl;
        itemLabel.innerText = source.name;
        item.appendChild(itemLabel);
        let itemType = document.createElement("span");
        itemType.innerText = ` (${source.technologyAdapterId.substring(source.technologyAdapterId.lastIndexOf('.') + 1)})`;
        item.appendChild(itemType);
        tree.appendChild(item);
        return tree;
    }
    function createErrorItem() {
        let tree = document.createElement("div");
        tree.className = "item";
        let item = document.createElement("div");
        item.className = "label";
        let treeStatus = document.createElement("span");
        treeStatus.className = "status";
        item.appendChild(treeStatus);
        let itemIcon = (0, utils_1.icon)("error");
        item.appendChild(itemIcon);
        let itemLabel = document.createElement("a");
        itemLabel.innerText = "<error>";
        item.appendChild(itemLabel);
        let itemType = document.createElement("span");
        itemType.innerText = "unknown";
        item.appendChild(itemType);
        tree.appendChild(item);
        return tree;
    }
    let resourceCenters = api.resourceCenters();
    resourceCenters.then(resourceCenters => {
        const div = document.querySelector("#rcs");
        if (div) {
            resourceCenters.forEach(rc => {
                div.appendChild(document.createElement("hr"));
                div.appendChild(createTitle(rc));
                div.appendChild(createRoot(rc));
            });
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBWUEsTUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUM7SUFDM0MsTUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUM7SUFFekMsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztJQUV0QixTQUFTLGlCQUFpQixDQUFDLE9BQW9CO1FBQzNDLE9BQU8sSUFBQSwyQ0FBbUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFNBQVMsV0FBVyxDQUFDLEVBQWtCO1FBQ25DLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDekMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDMUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBO1FBQ3pCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTLE1BQU0sQ0FBQyxLQUFpQjtRQUM3QixJQUFJLElBQUksR0FBRyxpQkFBaUIsQ0FBYyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEQsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3BFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEQsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Z0JBRTlCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENB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