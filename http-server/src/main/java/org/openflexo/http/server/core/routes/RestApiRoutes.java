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

/**
 * A web router, class used to declare web routes.
 */
public class RestApiRoutes implements RouteService<FlexoServiceManager> {

    private ResourceCentersController rcsController;
    private ResourcesController rsController;
    private TechnologyAdaptersController taController;
    private ProjectsController prjController;
    private VirtualModelsController vmController;
    private VirtualModelInstancesController vmiController;
    private ConceptsController cpController;
    private ConceptInstancesController cpiController;
    private PropertiesController prpController;
    private BehavioursController bhvController;

    /**
     * It creates all the necessary controllers and registers them with the service.
     *
     * @param service the HttpService instance
     * @param serviceManager the service manager that will be used to access the Flexo services
     */
    @Override
    public void initialize(HttpService service, FlexoServiceManager serviceManager) throws Exception {
        rcsController   = new ResourceCentersController(serviceManager.getResourceCenterService(), service.getTechnologyAdapterRestService());
        rsController    = new ResourcesController(serviceManager.getResourceManager(), service.getTechnologyAdapterRestService());
        taController    = new TechnologyAdaptersController();
        prjController   = new ProjectsController(serviceManager.getProjectLoaderService());
        vmController    = new VirtualModelsController(serviceManager.getVirtualModelLibrary());
        vmiController   = new VirtualModelInstancesController(serviceManager.getVirtualModelLibrary());
        cpController    = new ConceptsController(serviceManager.getVirtualModelLibrary());
        cpiController   = new ConceptInstancesController(serviceManager.getVirtualModelLibrary());
        prpController   = new PropertiesController(serviceManager.getVirtualModelLibrary());
        bhvController   = new BehavioursController(serviceManager.getVirtualModelLibrary());
    }

    /**
     * It adds routes to the router
     *
     * @param vertx the Vert.x instance
     * @param router the router to which the routes will be added
     */
    @Override
    public void addRoutes(Vertx vertx, Router router) {
        router.route().handler(BodyHandler.create());

        router.get("/rc/").produces(JSON).handler(rcsController::list);
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

        router.post("/properties/add").produces(JSON).handler(prpController::add);
        router.post("/properties/").produces(JSON).handler(prpController::list);
        router.post("/properties/:name").produces(JSON).handler(prpController::get);

        router.post("/behaviour/add").produces(JSON).handler(bhvController::add);
        router.post("/behaviour/").produces(JSON).handler(bhvController::list);
        router.post("/behaviour/:signature").produces(JSON).handler(bhvController::get);
        router.post("/behaviour/:signature/parameters/add").produces(JSON).handler(bhvController::addParameter);
        router.post("/behaviour/:signature/parameters/").produces(JSON).handler(bhvController::parameters);
        router.post("/behaviour/:signature/actions/add").produces(JSON).handler(bhvController::addAction);

        router.post("/vmi/add").produces(JSON).handler(vmiController::add);
        router.post("/vmi/").produces(JSON).handler(vmiController::list);
        router.post("/vmi/:id").produces(JSON).handler(vmiController::get);
        router.post("/vmi/:id/edit").produces(JSON).handler(vmiController::edit);
        router.delete("/vmi/:id/delete").produces(JSON).handler(vmiController::delete);

        router.post("/cp/add").produces(JSON).handler(cpController::add);
        router.get("/cp/").produces(JSON).handler(cpController::list);
        router.get("/cp/:id").produces(JSON).handler(cpController::get);
        router.post("/cp/:id/edit").produces(JSON).handler(cpController::edit);
        router.delete("/cp/:id/delete").produces(JSON).handler(cpController::delete);

        router.post("/cpi/add").produces(JSON).handler(cpiController::add);
        router.get("/cpi/").produces(JSON).handler(cpiController::list);
        router.get("/cpi/:id").produces(JSON).handler(cpiController::get);
        router.post("/cpi/:id/edit").produces(JSON).handler(cpiController::edit);
        router.delete("/cpi/:id/delete").produces(JSON).handler(cpiController::delete);


    }
}
