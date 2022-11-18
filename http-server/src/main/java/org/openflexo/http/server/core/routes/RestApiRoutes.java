package org.openflexo.http.server.core.routes;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.RouteService;
import org.openflexo.http.server.core.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.controllers.*;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.http.server.util.ResourceRestService;

import java.util.Collections;
import java.util.Map;

public class RestApiRoutes implements RouteService<FlexoServiceManager> {

    private ResourceCentersController rcsController;
    private ResourcesController rsController;
    private TechnologyAdaptersController taController;
    private ProjectsController prjController;
    private VirtualModelsController vmController;
    private VirtualModelInstancesController vmiController;
    private ConceptsController cpController;
    private ConceptInstancesController cpiController;

    @Override
    public void initialize(HttpService service, FlexoServiceManager serviceManager) throws Exception {
        rcsController   = new ResourceCentersController(serviceManager.getResourceCenterService(), service.getTechnologyAdapterRestService());
        rsController    = new ResourcesController(serviceManager.getResourceManager(), service.getTechnologyAdapterRestService());
        taController    = new TechnologyAdaptersController();
        prjController   = new ProjectsController(serviceManager.getProjectLoaderService());
        vmController    = new VirtualModelsController(serviceManager.getVirtualModelLibrary());
        vmiController   = new VirtualModelInstancesController();
        cpController    = new ConceptsController(serviceManager.getVirtualModelLibrary());
        cpiController   = new ConceptInstancesController();
    }

    @Override
    public void addRoutes(Vertx vertx, Router router) {
        router.route().handler(BodyHandler.create());

        router.get("/rc").produces(JSON).handler(rcsController::list);
        router.post("/rc/add").produces(JSON).handler(rcsController::add);
        router.post("/rc/upload").produces(JSON).handler(rcsController::upload);
        router.get("/rc/:rcid").produces(JSON).handler(rcsController::get);
        router.get("/rc/:rcid/resource").produces(JSON).handler(rcsController::resources);
        router.get("/rc/:rcid/resource/*").produces(JSON).handler(rcsController::resourceFolder);

        router.get("/resource").produces(JSON).handler(rsController::list);
        router.get("/resource/:rid").produces(JSON).handler(rsController::get);
        router.post("/resource/:rid").produces(JSON).handler(rsController::process);
        router.get("/resource/:rid/contents").handler(rsController::contents);

        router.get("/ta").produces(JSON).handler(taController::list);
        router.get("/ta/:taid").produces(JSON).handler(taController::get);

        for (Map.Entry<TechnologyAdapter<?>, TechnologyAdapterRouteComplement> entry : taController.getComplementMap().entrySet()) {
            Router subRouter = Router.router(vertx);
            String route = "/ta/" + IdUtils.getTechnologyAdapterId(entry.getKey());
            router.mountSubRouter(route, subRouter);
            entry.getValue().addRoutes(vertx, subRouter);

            for (ResourceRestService service : taController.getRestServices().getOrDefault(entry.getKey(), Collections.emptyList())) {
                service.addRoutes(subRouter);
                taController.getResourcePrefixes().put(service.getResourceClass(), route + service.getPrefix());
            }
        }

        router.get("/prj/").produces(JSON).handler(prjController::list);
        router.get("/prj/:id").produces(JSON).handler(prjController::get);
        router.post("/prj/add").produces(JSON).handler(prjController::add);
        router.post("/prj/:id/edit").produces(JSON).handler(prjController::edit);
        router.delete("/prj/:id/delete").produces(JSON).handler(prjController::delete);

        router.get("/vm/").produces(JSON).handler(vmController::list);
        router.get("/vm/:id").produces(JSON).handler(vmController::get);
        router.post("/vm/add").produces(JSON).handler(vmController::add);
        router.post("/vm/:id/edit").produces(JSON).handler(vmController::edit);
        router.delete("/vm/:id/delete").produces(JSON).handler(vmController::delete);
        router.post("/vm/:id/properties/add").produces(JSON).handler(vmController::addPrimitive);
        router.post("/vm/:id/behaviour/add").produces(JSON).handler(vmController::addBehaviour);

        router.post("/behaviour/parameters/add").produces(JSON).handler(vmController::addBehaviourParameter);

        router.get("/vmi/").produces(JSON).handler(vmiController::list);
        router.get("/vmi/:id").produces(JSON).handler(vmiController::get);
        router.post("/vmi/add").produces(JSON).handler(vmiController::add);
        router.post("/vmi/:id/edit").produces(JSON).handler(vmiController::edit);
        router.delete("/vmi/:id/delete").produces(JSON).handler(vmiController::delete);

        router.get("/cp/").produces(JSON).handler(cpController::list);
        router.get("/cp/:id").produces(JSON).handler(cpController::get);
        router.post("/vm/:vmid/cp/add").produces(JSON).handler(cpController::add);
        router.post("/cp/:id/edit").produces(JSON).handler(cpController::edit);
        router.delete("/cp/:id/delete").produces(JSON).handler(cpController::delete);

        router.get("/cpi/").produces(JSON).handler(cpiController::list);
        router.get("/cpi/:id").produces(JSON).handler(cpiController::get);
        router.post("/cpi/add").produces(JSON).handler(cpiController::add);
        router.post("/cpi/:id/edit").produces(JSON).handler(cpiController::edit);
        router.delete("/cpi/:id/delete").produces(JSON).handler(cpiController::delete);


    }
}
