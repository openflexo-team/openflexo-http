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

        // Resource centers
        router.get("/resource-centers/").produces(JSON).handler(rcsController::list);
        router.post("/resource-centers/add").produces(JSON).handler(rcsController::add);
        router.post("/resource-centers/upload").produces(JSON).handler(rcsController::upload);
        router.get("/resource-centers/:rcid").produces(JSON).handler(rcsController::get);
        router.get("/resource-centers/:rcid/resource").produces(JSON).handler(rcsController::resources);
        router.get("/resource-centers/:rcid/resource/*").produces(JSON).handler(rcsController::resourceFolder);

        // Resources
        router.get("/resource").produces(JSON).handler(rsController::list);
        router.get("/resource/:rid").produces(JSON).handler(rsController::get);
        router.post("/resource/:rid").produces(JSON).handler(rsController::process);
        router.get("/resource/:rid/contents").handler(rsController::contents);

        // Technology Adapters
        router.get("/technology-adapters").produces(JSON).handler(taController::list);
        router.get("/technology-adapters/:taid").produces(JSON).handler(taController::get);

        // Projects
        router.get("/projects/").produces(JSON).handler(prjController::list);
        router.get("/projects/:id").produces(JSON).handler(prjController::get);
        router.post("/projects/add").produces(JSON).handler(prjController::add);
        router.patch("/projects/:id/edit").produces(JSON).handler(prjController::edit);
        router.delete("/projects/:id/delete").produces(JSON).handler(prjController::delete);

        // Virtual Models
        router.get("/virtual-models/").produces(JSON).handler(vmController::list);
        router.get("/virtual-models/:id").produces(JSON).handler(vmController::get);
        router.post("/virtual-models/add").produces(JSON).handler(vmController::add);
        router.patch("/virtual-models/:id/edit").produces(JSON).handler(vmController::edit);
        router.delete("/virtual-models/:id/delete").produces(JSON).handler(vmController::delete);
        // Concepts
        router.get("/virtual-models/:vmid/concepts/").produces(JSON).handler(cpController::list);
        router.get("/virtual-models/:vmid/concepts/:id").produces(JSON).handler(cpController::get);
        router.post("/virtual-models/:vmid/concepts/add").produces(JSON).handler(cpController::add);
        router.patch("/virtual-models/:vmid/concepts/:id/edit").produces(JSON).handler(cpController::edit);
        router.delete("/virtual-models/:vmid/concepts/:id/delete").produces(JSON).handler(cpController::delete);
        // properties
        router.get("/virtual-models/:vmid/concepts/:id/properties/").produces(JSON).handler(prpController::list);
        router.get("/virtual-models/:vmid/concepts/:id/properties/:name").produces(JSON).handler(prpController::get);
        router.post("/virtual-models/:vmid/concepts/:id/properties/add").produces(JSON).handler(prpController::add);
        // Behaviours
        router.get("/virtual-models/:vmid/concepts/:id/behaviours/").produces(JSON).handler(bhvController::list);
        router.get("/virtual-models/:vmid/concepts/:id/behaviours/:signature").produces(JSON).handler(bhvController::get);
        router.post("/virtual-models/:vmid/concepts/:id/behaviours/add").produces(JSON).handler(bhvController::add);
        // Parameters
        router.post("/virtual-models/:vmid/concepts/:id/behaviours/:signature/parameters/add").produces(JSON).handler(bhvController::addParameter);
        router.get("/virtual-models/:vmid/concepts/:id/behaviours/:signature/parameters/").produces(JSON).handler(bhvController::parameters);
        // Actions
        router.post("/virtual-models/:vmid/concepts/:id/behaviours/:signature/actions/add").produces(JSON).handler(bhvController::addAction);

        // Virtual Model Instances
        router.post("/virtual-model-instances/add").produces(JSON).handler(vmiController::add);
        router.post("/virtual-model-instances/").produces(JSON).handler(vmiController::list);
        router.post("/virtual-model-instances/:id").produces(JSON).handler(vmiController::get);
        router.patch("/virtual-model-instances/:id/edit").produces(JSON).handler(vmiController::edit);
        router.delete("/virtual-model-instances/:id/delete").produces(JSON).handler(vmiController::delete);

        // Concept Instances
        router.post("/concept-instances/add").produces(JSON).handler(cpiController::add);
        router.get("/concept-instances/").produces(JSON).handler(cpiController::list);
        router.get("/concept-instances/:id").produces(JSON).handler(cpiController::get);
        router.patch("/concept-instances/:id/edit").produces(JSON).handler(cpiController::edit);
        router.delete("/concept-instances/:id/delete").produces(JSON).handler(cpiController::delete);



        // -------------- SHORT ROUTES --------------


        // Resource Centers
        router.get("/rc/").produces(JSON).handler(rcsController::list);
        router.post("/rc/add").produces(JSON).handler(rcsController::add);
        router.post("/rc/upload").produces(JSON).handler(rcsController::upload);
        router.get("/rc/:rcid").produces(JSON).handler(rcsController::get);
        router.get("/rc/:rcid/rsc").produces(JSON).handler(rcsController::resources);
        router.get("/rc/:rcid/rsc/*").produces(JSON).handler(rcsController::resourceFolder);

        // Resources
        router.get("/rsc").produces(JSON).handler(rsController::list);
        router.get("/rsc/:rid").produces(JSON).handler(rsController::get);
        router.post("/rsc/:rid").produces(JSON).handler(rsController::process);
        router.get("/rsc/:rid/contents").handler(rsController::contents);

        // Projects
        router.get("/prj/").produces(JSON).handler(prjController::list);
        router.get("/prj/:id").produces(JSON).handler(prjController::get);
        router.post("/prj/add").produces(JSON).handler(prjController::add);
        router.patch("/prj/:id/edit").produces(JSON).handler(prjController::edit);
        router.delete("/prj/:id/delete").produces(JSON).handler(prjController::delete);

        // Virtual Models
        router.get("/vm/").produces(JSON).handler(vmController::list);
        router.get("/vm/:id").produces(JSON).handler(vmController::get);
        router.post("/vm/add").produces(JSON).handler(vmController::add);
        router.patch("/vm/:id/edit").produces(JSON).handler(vmController::edit);
        router.delete("/vm/:id/delete").produces(JSON).handler(vmController::delete);
        // Concepts
        router.get("/vm/:vmid/cp/").produces(JSON).handler(cpController::list);
        router.get("/vm/:vmid/cp/:id").produces(JSON).handler(cpController::get);
        router.post("/vm/:vmid/cp/add").produces(JSON).handler(cpController::add);
        router.patch("/vm/:vmid/cp/:id/edit").produces(JSON).handler(cpController::edit);
        router.delete("/vm/:vmid/cp/:id/delete").produces(JSON).handler(cpController::delete);
        // Properties
        router.get("/vm/:vmid/cp/:id/prp/").produces(JSON).handler(prpController::list);
        router.get("/vm/:vmid/cp/:id/prp/:name").produces(JSON).handler(prpController::get);
        router.post("/vm/:vmid/cp/:id/prp/add").produces(JSON).handler(prpController::add);
        // Behaviours
        router.get("/vm/:vmid/cp/:id/bhv/").produces(JSON).handler(bhvController::list);
        router.get("/vm/:vmid/cp/:id/bhv/:signature").produces(JSON).handler(bhvController::get);
        router.post("/vm/:vmid/cp/:id/bhv/add").produces(JSON).handler(bhvController::add);
        // Parameters
        router.post("/vm/:vmid/cp/:id/bhv/:signature/param/add").produces(JSON).handler(bhvController::addParameter);
        router.get("/vm/:vmid/cp/:id/bhv/:signature/param/").produces(JSON).handler(bhvController::parameters);
        // Actions
        router.post("/vm/:vmid/cp/:id/bhv/:signature/act/add").produces(JSON).handler(bhvController::addAction);

        // Virtual Model Instances
        router.post("/vmi/add").produces(JSON).handler(vmiController::add);
        router.post("/vmi/").produces(JSON).handler(vmiController::list);
        router.post("/vmi/:id").produces(JSON).handler(vmiController::get);
        router.patch("/vmi/:id/edit").produces(JSON).handler(vmiController::edit);
        router.delete("/vmi/:id/delete").produces(JSON).handler(vmiController::delete);

        // Concept Instances
        router.post("/cpi/add").produces(JSON).handler(cpiController::add);
        router.get("/cpi/").produces(JSON).handler(cpiController::list);
        router.get("/cpi/:id").produces(JSON).handler(cpiController::get);
        router.patch("/cpi/:id/edit").produces(JSON).handler(cpiController::edit);
        router.delete("/cpi/:id/delete").produces(JSON).handler(cpiController::delete);

        // Technology Adapters
        router.get("/ta").produces(JSON).handler(taController::list);
        router.get("/ta/:taid").produces(JSON).handler(taController::get);

        for (Map.Entry<TechnologyAdapter<?>, TechnologyAdapterRouteComplement> entry : taController.getComplementMap().entrySet()) {
            Router subRouter    = Router.router(vertx);
            String route        = "/ta/" + IdUtils.getTechnologyAdapterId(entry.getKey());
            String shortRoute   = "/technology-adapters/" + IdUtils.getTechnologyAdapterId(entry.getKey());

            router.mountSubRouter(route, subRouter);
            router.mountSubRouter(shortRoute, subRouter);
            entry.getValue().addRoutes(vertx, subRouter);

            for (ResourceRestService service : taController.getRestServices().getOrDefault(entry.getKey(), Collections.emptyList())) {
                service.addRoutes(subRouter);
                taController.getResourcePrefixes().put(service.getResourceClass(), route + service.getPrefix());
            }
        }
    }
}
