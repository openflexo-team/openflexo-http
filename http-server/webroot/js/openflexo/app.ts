import { Api } from "./api";
import { Grid, GridCell } from "./ui/Grid";
import { TechnologyAdapterCard } from "./ui/TechnologyAdapterCard";
import { addMdlScriptAndCssIfNotAlreadyPresent, addCssIfNotAlreadyPresent } from "./ui/utils";

export interface AppContext {
    api: Api;
}

export class Application implements AppContext {

    public api: Api = new Api();

    public start(): void {
        console.log("Starting OpenFlexo app");
        addCssIfNotAlreadyPresent("css/openflexo.css");
        addMdlScriptAndCssIfNotAlreadyPresent();
        
        const adapters = document.querySelector("#adapters");        
        const grid = new Grid();

        this.api.technologyAdapters().then(tas => {
            for (let ta of tas) {
                console.log("TA " +  ta.name);
                const taUI = new TechnologyAdapterCard(ta);
                grid.addCell(new GridCell(taUI, 4));
            }

            grid.initialize();
            adapters.appendChild(grid.container);
        });

    }
}