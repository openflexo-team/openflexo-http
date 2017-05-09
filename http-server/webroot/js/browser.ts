import {
    ResourceCenter, ContainedByResourceCenter, Resource,
    call, resourceCenters
} from "./openflexo";


import {
    findElementWithAttributeInHierarchy, spinner, icon
} from "./utils";

const arrow_right = "keyboard_arrow_right";
const arrow_down = "keyboard_arrow_down";

function getDataUrlElement(element: HTMLElement): HTMLElement {
    return findElementWithAttributeInHierarchy(element, "data-url");
}

function createTitle(rc: ResourceCenter): HTMLDivElement {
    let title = document.createElement("div")
    title.className = 'title';
    title.innerText = rc.name
    return title;
}

function expand(event: MouseEvent) {
    let item = getDataUrlElement(<HTMLElement>event.target);
    
    if (item) {
        let status = <HTMLElement>item.querySelector("span.material-icons");
        let itemChidlren = item.querySelector("div.children");
        if (itemChidlren) {
            item.removeChild(itemChidlren);
            status.innerText = arrow_right;
        } else {
            status.innerText = arrow_down;

            let div = document.createElement("div");
            div.className = 'children';
            item.appendChild(div);
            
            div.appendChild(spinner());

            call<ContainedByResourceCenter[]>(item.getAttribute("data-url"), (children) => {
                div.removeChild(div.firstChild);
                
                for (let child of children) {
                    div.appendChild(createItemFromSource(child));
                }
            });

        }
    }
}

function createRoot(rc: ResourceCenter):HTMLDivElement {
    return createFolderItem('/', rc.resourceUrl + '/');
}

function createItemFromSource(source: ContainedByResourceCenter):HTMLDivElement {
    switch (source.type) {
        case 'Folder':
            return createFolderItem(source.name, source.url);
        case 'Resource':
            return createResourceItem(<Resource>source);
    }
}

function createFolderItem(label: string, url: string):HTMLDivElement {
    let tree = document.createElement("div");
    tree.className = "item";
    tree.setAttribute("data-url", url);
    
    let item = document.createElement("div");
    item.className = "label";

    let treeStatus = icon(arrow_right);
    treeStatus.onclick = expand;
    item.appendChild(treeStatus);
    
    let itemIcon = icon("folder_open");
    item.appendChild(itemIcon);

    let itemLabel = document.createElement("span");
    itemLabel.className = "text";
    itemLabel.innerText = label;
    item.appendChild(itemLabel);
    
    tree.appendChild(item);
    return tree;
}

function createResourceItem(source: Resource):HTMLDivElement {
    let tree = document.createElement("div");
    tree.className = "item";
    
    let item = document.createElement("div");
    item.className = "label";

    let treeStatus = document.createElement("span");
    treeStatus.className = "status";
    item.appendChild(treeStatus);

    let itemIcon = icon("cloud_download");
    item.appendChild(itemIcon);

    let itemLabel = document.createElement("a");
    itemLabel.href = source.contentUrl;
    itemLabel.innerText = source.name;
    item.appendChild(itemLabel);
    
    let itemType = document.createElement("span");
    itemType.innerText = ` (${source.technologyAdapterId.substring(source.technologyAdapterId.lastIndexOf('.')+1)})`;
    item.appendChild(itemType);

    tree.appendChild(item);
    return tree;
}

resourceCenters((resourceCenters) => {
    let div = document.querySelector("#rcs");
    for (let rc of resourceCenters) {
        div.appendChild(document.createElement("hr"));
        div.appendChild(createTitle(rc));
        div.appendChild(createRoot(rc))
    }
});
