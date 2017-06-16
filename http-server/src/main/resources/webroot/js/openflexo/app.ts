import { Api } from "./api/Api";
import { Grid, GridCell } from "./ui/Grid";
import { Tabs, Tab } from "./ui/Tabs";
import { Card } from "./ui/Card";
import { addMdlCssIfNotAlreadyPresent, addCssIfNotAlreadyPresent } from "./ui/utils";

export interface AppContext {
    api: Api;
}

export class Application implements AppContext {

    public api: Api = new Api();

    public start(): void {
        console.log("Starting OpenFlexo app");
        addCssIfNotAlreadyPresent("css/openflexo.css");
        addMdlCssIfNotAlreadyPresent();
        
        const root = document.querySelector("#root");  
        if (root) {      
            let tabs = new Tabs();
            let selected = this.createAdaptersTab();
            tabs.addTab(selected);
            tabs.addTab(this.createCentersTab());
            tabs.addTab(this.createResourcesTab());
            
            tabs.selectTab(selected);
            root.appendChild(tabs.container);
        }
    }

    private createAdaptersTab(): Tab {
        const grid = new Grid();
        this.api.technologyAdapters().then(tas => {
            for (let ta of tas) {
                console.log("TA " +  ta.name);
                const taUI = new Card(ta.name, ta.name + " description");
                grid.addCell(new GridCell(taUI, 4));
            }
        });
        return new Tab("adapters", "Technology Adapters", grid);
    }

     private createCentersTab(): Tab {
        const grid = new Grid();
        this.api.resourceCenters().then(rcs => {
            for (let rc of rcs) {
                console.log("RC " +  rc.name);
                const taUI = new Card(rc.name, rc.name + " description");
                grid.addCell(new GridCell(taUI, 4));
            }
        });
        return new Tab("centers", "Resource Centers", grid);
    }

    private createResourcesTab(): Tab {
        const grid = new Grid();
        this.api.resources().then(resources => {
            for (let resource of resources) {
                console.log("RC " +  resource.name);
                const taUI = new Card(resource.name, resource.name + " description");
                grid.addCell(new GridCell(taUI, 4));
            }
        });
        return new Tab("resources", "Resources", grid);
    }
}