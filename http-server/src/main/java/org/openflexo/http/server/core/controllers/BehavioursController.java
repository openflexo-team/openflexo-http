package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.CreateFlexoBehaviour;
import org.openflexo.foundation.fml.action.CreateGenericBehaviourParameter;
import org.openflexo.foundation.fml.action.CreatePrimitiveRole;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.BehaviourParameterValidator;
import org.openflexo.http.server.core.validators.BehaviourValidator;
import org.openflexo.http.server.core.validators.PrimitivePropertyValidator;
import org.openflexo.http.server.util.IdUtils;

import java.io.FileNotFoundException;

/**
 *  Behaviours rest apis controller.
 * @author Ihab Benamer
 */
public class BehavioursController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;

    /**
     * Instantiates a new Properties controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public BehavioursController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    /**
     * It gets the virtual model id from the request, gets the virtual model from the library, creates a JSON array, adds
     * all the behaviours of the virtual model to the array, and returns the array as the response
     *
     * @param context the routing context
     */
    public void list(RoutingContext context) {
        String id = context.request().getFormAttribute("vm_id");
        try {
            VirtualModel model  = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));
            JsonArray result    = new JsonArray();

            for (FlexoBehaviour behaviour : model.getFlexoBehaviours()) {
                result.add(JsonSerializer.behaviourSerializer(behaviour));
            }

            context.response().end(result.encodePrettily());
        } catch (Exception e) {
            notFound(context);
        }
    }

    /**
     * It gets the virtual model id and the signature of the behaviour from the request, gets the virtual model and the
     * behaviour from the virtual model library, and then serializes the behaviour to JSON and sends it back to the client
     *
     * @param context the context of the request.
     */
    public void get(RoutingContext context) {
        try {
            String modelId              = context.request().getFormAttribute("vm_id");
            String signature            = context.request().getParam("signature");
            VirtualModel model          = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(modelId));
            FlexoBehaviour behaviour    = model.getDeclaredFlexoBehaviour(signature);
            context.response().end(JsonSerializer.behaviourSerializer(behaviour).encodePrettily());

        } catch (Exception e) {
            notFound(context);
        }
    }

    /**
     * It creates a new behaviour in the virtual model
     *
     * @param context the routing context
     */
    public void add(RoutingContext context) {
        String id = context.request().getFormAttribute("id");
        try {
            VirtualModel model              = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));
            BehaviourValidator validator    = new BehaviourValidator(context.request());
            JsonArray errors                = validator.validate();

            if(validator.isValid()){
                CreateFlexoBehaviour behaviour = CreateFlexoBehaviour.actionType.makeNewAction(model, null, Helpers.getDefaultFlexoEditor(virtualModelLibrary));

                behaviour.setFlexoBehaviourName(validator.getName());
                behaviour.setFlexoBehaviourClass(validator.getType());
                behaviour.setDescription(validator.getDescription());
                behaviour.setVisibility(validator.getVisibility());
                behaviour.setIsAbstract(validator.isAbstract());
                behaviour.doAction();

                try {
                    model.getResource().save();
                } catch (SaveResourceException e) {
                    badRequest(context);
                }

                context.response().end(JsonSerializer.behaviourSerializer(behaviour.getNewFlexoBehaviour()).encodePrettily());
            } else {
                badValidation(context, errors);
            }
        } catch (FileNotFoundException | ResourceLoadingCancelledException | FlexoException e) {
            notFound(context);
        }
    }

    public void edit(RoutingContext context) {}

    public void delete(RoutingContext context) {}

    /**
     * It creates a new parameter for a behaviour
     *
     * @param context the routing context
     */
    public void addParameter(RoutingContext context) {
        String vm_id                = context.request().getFormAttribute("vm_id");
        String signature            = context.request().getParam("signature");
        FlexoBehaviour behaviour    = virtualModelLibrary.getFlexoConcept(IdUtils.decodeId(vm_id)).getDeclaredFlexoBehaviour(signature);

        if (behaviour != null){
            VirtualModel model                      = behaviour.getDeclaringVirtualModel();
            BehaviourParameterValidator validator   = new BehaviourParameterValidator(context.request());
            JsonArray errors                        = validator.validate();

            if(validator.isValid()){
                CreateGenericBehaviourParameter parameter = CreateGenericBehaviourParameter.actionType.makeNewAction(behaviour, null, Helpers.getDefaultFlexoEditor(virtualModelLibrary));
                parameter.setParameterName(validator.getName());
                parameter.setParameterType(validator.getType());
                parameter.setDescription(validator.getDescription());
                parameter.setIsRequired(validator.isRequired());
//                parameter.setDefaultValue(validator.getDefaultValue());
                parameter.doAction();
                FlexoBehaviourParameter param = parameter.getNewParameter();

                try {
                    model.getResource().save();
                } catch (SaveResourceException e) {
                    badRequest(context);
                }

                context.response().end(JsonSerializer.behaviourParameterSerializer(param).encodePrettily());
            } else {
                badValidation(context, errors);
            }
        } else {
            notFound(context);
        }
    }

    public void parameters(RoutingContext context) {
        JsonArray result            = new JsonArray();
        String vm_id                = context.request().getFormAttribute("vm_id");
        String signature            = context.request().getParam("signature");

        FlexoBehaviour behaviour    = virtualModelLibrary.getFlexoConcept(IdUtils.decodeId(vm_id)).getDeclaredFlexoBehaviour(signature);


        for (FlexoBehaviourParameter param : behaviour.getParameters()) {
            result.add(JsonSerializer.behaviourParameterSerializer(param));
        }

        context.response().end(result.encodePrettily());
    }

}
