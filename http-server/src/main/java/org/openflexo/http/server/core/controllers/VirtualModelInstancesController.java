package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstance;
import org.openflexo.foundation.fml.rt.action.CreateBasicVirtualModelInstance;
import org.openflexo.foundation.fml.rt.rm.FMLRTVirtualModelInstanceResource;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.VirtualModelInstanceValidator;
import org.openflexo.http.server.util.IdUtils;
import java.io.FileNotFoundException;

/**
 *  Virtual Model Instances rest apis controller.
 * @author Ihab Benamer
 */
public class VirtualModelInstancesController extends GenericController{
    private final VirtualModelLibrary virtualModelLibrary;

    /**
     * Instantiates a new Virtual model instances controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public VirtualModelInstancesController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    /**
     * It gets the project id and the virtual model id from the request, then it gets the project from the repository, then
     * it gets the virtual model instances from the project, then it serializes them to JSON and sends them back to the
     * client
     *
     * @param context the context of the request
     */
    public void list(RoutingContext context) {
//        String id   = context.request().getFormAttribute("project_id");
//        String vmId = context.request().getFormAttribute("vm_id");
//        try {
//            FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);
//            JsonArray result        = new JsonArray();
//
//            for (FMLRTVirtualModelInstance vmi: project.getVirtualModelInstanceRepository().getVirtualModelInstancesConformToVirtualModel(vmId)){
//                result.add(JsonSerializer.virtualModelInstanceSerializer(vmi));
//            }
//
//            context.response().end(result.encodePrettily());
//        } catch (Exception e) {
//            notFound(context);
//        }
    }

    /**
     * It gets the project id from the request, gets the project from the repository, gets the virtual model instance from
     * the project, and then serializes it to JSON
     *
     * @param context the routing context
     */
    public void get(RoutingContext context) {
//        String id       = context.request().getFormAttribute("project_id");
//        String vmiId    = context.request().getParam("vmi_id");
//        try {
//            FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);
//            context.response().end(JsonSerializer.virtualModelInstanceSerializer(project.getVirtualModelInstanceRepository().getVirtualModelInstance(vmiId).getVirtualModelInstance()).encodePrettily());
//        } catch (Exception e) {
//            notFound(context);
//        }
    }

    /**
     * It creates a new virtual model instance in the project with the given id
     *
     * @param context the routing context
     */
    public void add(RoutingContext context) {
        String id               = context.request().getFormAttribute("project_id");
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

                    if (model.hasCreationScheme()){
                        vmi.setCreationScheme(model.getCreationSchemes().get(0));
                    }

                    vmi.doAction();

                    try {
                        model.getResource().save();
                    } catch (SaveResourceException e) {
                        badRequest(context);
                    }

                    context.response().end(JsonSerializer.virtualModelInstanceSerializer(vmi.getNewVirtualModelInstance()).encodePrettily());
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
