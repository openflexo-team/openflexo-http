package org.openflexo.http.server.core.controllers;


import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rm.VirtualModelResourceFactory;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.VirtualModelValidator;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.pamela.exceptions.ModelDefinitionException;

public class VirtualModelsController extends GenericController {

    private final VirtualModelLibrary virtualModelLibrary;

    public VirtualModelsController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();
        for (VirtualModelResource virtualModel : virtualModelLibrary.getVirtualModels()) {
            result.add(JsonSerializer.virtualModelSerializer(virtualModel.getVirtualModel()));
        }
        context.response().end(result.encodePrettily());
    }

    public void add(RoutingContext context) {
        VirtualModelValidator validator = new VirtualModelValidator(context.request(), virtualModelLibrary);
        JsonArray errors                = validator.validate();

        if(validator.isValide()){
            FMLTechnologyAdapter fmlTechnologyAdapter   = virtualModelLibrary.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
            VirtualModelResourceFactory factory         = fmlTechnologyAdapter.getVirtualModelResourceFactory();
            FlexoProject<?> project                     = Helpers.getProjectById(virtualModelLibrary, validator.getProjectId());
            VirtualModel newVirtualModel                = null;
            VirtualModelResource newVirtualModelResource;

            try {
                String virtualModelUri  = Helpers.createVirtualModelUri(project, validator.getName());
                newVirtualModelResource = factory.makeTopLevelVirtualModelResource(validator.getName(), virtualModelUri, fmlTechnologyAdapter.getGlobalRepository(project).getRootFolder(), true);
                newVirtualModel         = newVirtualModelResource.getLoadedResourceData();

                newVirtualModel.setDescription(validator.getDescription());
                newVirtualModel.setVisibility(validator.getVisibility());
                newVirtualModel.setAbstract(validator.isAbstract());
            } catch (SaveResourceException | ModelDefinitionException e) {
                badRequest(context);
            }

            context.response().end(JsonSerializer.virtualModelSerializer(newVirtualModel).encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }

    public void get(RoutingContext context) {
        String id                       = context.request().getParam(("id"));
        VirtualModel newVirtualModel    = null;

        for (VirtualModelResource virtualModel : virtualModelLibrary.getVirtualModels()) {
            if(IdUtils.encodeuri(virtualModel.getVirtualModel().getURI()).equals(id)){
                newVirtualModel = virtualModel.getVirtualModel();
            }
        }

        if (newVirtualModel != null){
            context.response().end(JsonSerializer.virtualModelSerializer(newVirtualModel).encodePrettily());
        } else {
            notFound(context);
        }
    }

    public void edit(RoutingContext context) {}
    public void delete(RoutingContext context) {}

}
