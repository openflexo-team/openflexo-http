define(["require", "exports", "./openflexo/api/Api", "./utils"], function (require, exports, Api_1, utils_1) {
    "use strict";
    const arrow_right = "keyboard_arrow_right";
    const arrow_down = "keyboard_arrow_down";
    const api = new Api_1.Api();
    function getDataUrlElement(element) {
        return utils_1.findElementWithAttributeInHierarchy(element, "data-url");
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
                div.appendChild(utils_1.spinner());
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
        let treeStatus = utils_1.icon(arrow_right);
        treeStatus.onclick = expand;
        item.appendChild(treeStatus);
        let itemIcon = utils_1.icon("folder_open");
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
        let itemIcon = utils_1.icon("cloud_download");
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
        let itemIcon = utils_1.icon("error");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFZQSxNQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQztJQUMzQyxNQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztJQUV6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO0lBRXRCLDJCQUEyQixPQUFvQjtRQUMzQyxNQUFNLENBQUMsMkNBQW1DLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxxQkFBcUIsRUFBa0I7UUFDbkMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN6QyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUMxQixLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUE7UUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0JBQWdCLEtBQWlCO1FBQzdCLElBQUksSUFBSSxHQUFHLGlCQUFpQixDQUFjLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxNQUFNLEdBQWdCLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNwRSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO2dC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