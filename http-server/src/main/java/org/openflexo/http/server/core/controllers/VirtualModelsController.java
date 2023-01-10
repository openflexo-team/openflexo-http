package org.openflexo.http.server.core.controllers;


import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.DeleteFlexoConceptObjects;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rm.VirtualModelResourceFactory;
import org.openflexo.foundation.resource.RepositoryFolder;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.pamela.exceptions.ModelDefinitionException;
import org.python.jline.internal.Log;

import java.io.FileNotFoundException;

/**
 *  Virtual Models rest apis controller.
 * @author Ihab Benamer
 */
public class VirtualModelsController extends GenericController {

    private final VirtualModelLibrary virtualModelLibrary;
    private final DefaultFlexoEditor editor;

    /**
     * Instantiates a new Virtual models controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public VirtualModelsController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary    = virtualModelLibrary;
        editor                      = Helpers.getDefaultFlexoEditor(virtualModelLibrary);
    }

    /**
     * It creates a JSON array, iterates over the virtual models in the library, and adds each virtual model to the array
     *
     * @param context The routing context is the object that contains all the information about the request and the
     * response.
     */
    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();
        for (VirtualModel virtualModel : virtualModelLibrary.getLoadedVirtualModels()) {
            result.add(JsonSerializer.virtualModelSerializer(virtualModel));
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

        if(validator.isValid()){
            FMLTechnologyAdapter fmlTechnologyAdapter   = virtualModelLibrary.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
            VirtualModelResourceFactory factory         = fmlTechnologyAdapter.getVirtualModelResourceFactory();
            FlexoProject<?> project                     = ProjectsRepository.getProjectById(virtualModelLibrary, validator.getProjectId());
            VirtualModel newVirtualModel                = null;
            VirtualModelResource newVirtualModelResource;

            try {
                String virtualModelUri  = Helpers.createVirtualModelUri(project, validator.getName());
                String path             = validator.getPath();
                RepositoryFolder folder = null;

                if (path != null && !path.isEmpty()) {
                    folder = Helpers.getFolderFromPath(path, project);
                }

                if (folder == null) {
                    folder = fmlTechnologyAdapter.getGlobalRepository(project).getRootFolder();
                }

                newVirtualModelResource = factory.makeTopLevelVirtualModelResource(validator.getName(), virtualModelUri, folder, true);
                newVirtualModel         = newVirtualModelResource.getLoadedResourceData();

                newVirtualModel.setDescription(validator.getDescription());
                newVirtualModel.setVisibility(validator.getVisibility());
                newVirtualModel.setAbstract(validator.isAbstract());

                if(validator.getParent() != null){
                    newVirtualModel.addToParentFlexoConcepts(validator.getParent());
                }

                context.response().end(JsonSerializer.virtualModelSerializer(newVirtualModel).encodePrettily());
            } catch (SaveResourceException | ModelDefinitionException | InconsistentFlexoConceptHierarchyException e) {
                badRequest(context);
            }
        } else {
            badValidation(context, errors);
        }
    }

    /**
     * It gets the virtual model with the given id from the virtual model library, and returns it as a JSON object
     *
     * @param context the context of the request
     */
    public void get(RoutingContext context) {
        String id = context.request().getParam("id").trim();
        try {
            VirtualModel model = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));
            if (model != null){
                context.response().end(JsonSerializer.virtualModelSerializer(model).encodePrettily());
            } else {
                notFound(context);
            }

        } catch (FileNotFoundException | ResourceLoadingCancelledException | FlexoException e) {
            notFound(context);
        }
    }

    public void edit(RoutingContext context) {}

    /**
     * It deletes a virtual model
     *
     * @param context the routing context
     */
    public void delete(RoutingContext context) {
        String id = context.request().getParam("id").trim();
        try {
            VirtualModel model                  = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));
            DeleteFlexoConceptObjects action    = DeleteFlexoConceptObjects.actionType.makeNewAction(model, null, editor);

            action.doAction();
            model.getResource().destroy();

            emptyResponse(context);
        } catch (FileNotFoundException | ResourceLoadingCancelledException | FlexoException e) {
            notFound(context);
        }
    }
}