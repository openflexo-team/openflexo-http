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
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.pamela.exceptions.ModelDefinitionException;

/**
 * Virtual models rest apis controller.
 *
 * @author Ihab Benamer
 */
public class VirtualModelsController extends GenericController {

    private final VirtualModelLibrary virtualModelLibrary;

    /**
     * Instantiates a new Virtual models controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public VirtualModelsController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    /**
     * It creates a JSON array, iterates over the virtual models in the library, and adds each virtual model to the array
     *
     * @param context The routing context is the object that contains all the information about the request and the
     * response.
     */
    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();
        for (VirtualModelResource virtualModel : virtualModelLibrary.getVirtualModels()) {
            result.add(JsonSerializer.virtualModelSerializer(virtualModel.getVirtualModel()));
        }
        context.response().end(result.encodePrettily());
    }

    /**
     * It creates a new virtual model resource, and returns it as a JSON object
     *
     * @param context the routing context
     */
    public void add(RoutingContext context) {
        VirtualModelsValidator validator    = new VirtualModelsValidator(context.request(), virtualModelLibrary);
        JsonArray errors                    = validator.validate();

        if(validator.isValide()){
            FMLTechnologyAdapter fmlTechnologyAdapter   = virtualModelLibrary.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
            VirtualModelResourceFactory factory         = fmlTechnologyAdapter.getVirtualModelResourceFactory();
            FlexoProject<?> project                     = ProjectsRepository.getProjectById(virtualModelLibrary, validator.getProjectId());
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

    /**
     * If the virtual model exists, return it, otherwise return a 404
     *
     * @param context The context of the request.
     */
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
