package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.action.CreateFlexoConcept;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rm.VirtualModelResourceFactory;
import org.openflexo.foundation.fml.rt.action.CreateBasicVirtualModelInstance;
import org.openflexo.foundation.resource.RepositoryFolder;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.ConceptValidator;
import org.openflexo.http.server.core.validators.VirtualModelInstanceValidator;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.pamela.exceptions.ModelDefinitionException;
import org.openflexo.toolbox.StringUtils;
import org.python.jline.internal.Log;

import java.io.FileNotFoundException;

public class VirtualModelInstancesController extends GenericController{
    private final VirtualModelLibrary virtualModelLibrary;

    public VirtualModelInstancesController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    public void list(RoutingContext context) {}
    public void get(RoutingContext context) {}
    public void add(RoutingContext context) {
        String id               = context.request().getParam("prjid");
        FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);

        if(project != null){
            VirtualModelInstanceValidator validator = new VirtualModelInstanceValidator(context.request(), virtualModelLibrary);
            JsonArray errors                        = validator.validate();

            if(validator.isValid()){
                try {
                    VirtualModel model                  = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(validator.getVirtualModelId()));
                    CreateBasicVirtualModelInstance vmi = CreateBasicVirtualModelInstance.actionType.makeNewAction(project.getVirtualModelInstanceRepository().getRootFolder(), null, Helpers.getDefaultFlexoEditor(virtualModelLibrary));

                    vmi.setNewVirtualModelInstanceName(validator.getName());
                    vmi.setNewVirtualModelInstanceTitle(validator.getTitle());
                    vmi.setVirtualModel(model);

                    vmi.doAction();

                    try {
                        model.getResource().save();
                    } catch (SaveResourceException e) {
                        badRequest(context);
                    }

                    context.response().end(JsonSerializer.virtualModelSerializer(vmi.getNewVirtualModelInstance()).encodePrettily());
                } catch (FileNotFoundException | ResourceLoadingCancelledException | FlexoException e) {
                    notFound(context);
                }
            } else {
                badValidation(context, errors);
            }
        } else {
            notFound(context);
        }
    }

    public void edit(RoutingContext context) {}
    public void delete(RoutingContext context) {}

}
