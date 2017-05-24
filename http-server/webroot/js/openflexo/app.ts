import { Api } from "./api";
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
            let tab = new Tab("adapters", "Technology Adapters", this.createTAGrid());    
            tabs.addTab(tab);
            tabs.selectTab(tab);        
            
            root.appendChild(tabs.container);
        }
    }

    private createTAGrid(): Grid {
        const grid = new Grid();
        this.api.technologyAdapters().then(tas => {
            for (let ta of tas) {
                console.log("TA " +  ta.name);
                const taUI = new Card(ta.name, ta.name + " description");
                grid.addCell(new GridCell(taUI, 4));
            }
        });
        return grid;
    }
}