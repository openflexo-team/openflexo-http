package org.openflexo.http.server.core.controllers;


import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.foundation.fml.action.CreateContainedVirtualModel;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rm.VirtualModelResourceFactory;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.foundation.task.Progress;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.pamela.exceptions.ModelDefinitionException;
import org.python.jline.internal.Log;
import org.openflexo.foundation.fml.FMLModelFactory;

public class VirtualModelsController extends GenericController {

    private final VirtualModelLibrary virtualModelLibrary;

    public VirtualModelsController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    public void list(RoutingContext context) {
//        JsonArray result = new JsonArray();
//        for (VirtualModelResource virtualModel : virtualModelLibrary.getVirtualModels()) {
//            result.add(JsonUtils.getCenterDescription(virtualModel));
//        }
//        context.response().end(result.encodePrettily());
        context.response().end(String.valueOf(virtualModelLibrary.getVirtualModels().size()));
    }

    public void add(RoutingContext context) {

        String name                                 = context.request().getFormAttribute("name");
        String description                          = context.request().getFormAttribute("description");
        String visibility                           = context.request().getFormAttribute("visibility");
        boolean isAbstract                          = context.request().getFormAttribute("is_abstract").equals("true");
        String projectId                            = context.request().getFormAttribute("project_id");
        FMLTechnologyAdapter fmlTechnologyAdapter   = virtualModelLibrary.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
        VirtualModelResourceFactory factory         = fmlTechnologyAdapter.getVirtualModelResourceFactory();
        FlexoProject<?> project                     = null;

        for (FlexoProject<?> prj : virtualModelLibrary.getServiceManager().getProjectLoaderService().getRootProjects()) {
            if(prj.getProjectURI().equals(IdUtils.decodeId(projectId))){
                project = prj;
            }
        }

        VirtualModelResource newVirtualModelResource;
        VirtualModel newVirtualModel;

        try {
            newVirtualModelResource = factory.makeTopLevelVirtualModelResource(name, project.getProjectURI() + "/" + name + ".fml", fmlTechnologyAdapter.getGlobalRepository(project).getRootFolder(), true);
            newVirtualModel         = newVirtualModelResource.getLoadedResourceData();
            newVirtualModel.setDescription(description);
            newVirtualModel.setVisibility(Visibility.valueOf(visibility));
            newVirtualModel.setAbstract(isAbstract);
        } catch (SaveResourceException e) {
            badRequest(context);
        } catch (ModelDefinitionException e) {
            badRequest(context);
        }

        context.response().end("Success");
    }

    public void get(RoutingContext context) {}
    public void edit(RoutingContext context) {}
    public void delete(RoutingContext context) {}

}
