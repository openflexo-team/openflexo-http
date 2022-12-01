package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.*;
import org.openflexo.foundation.fml.editionaction.LogAction;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.BehaviourActionsValidator;
import org.openflexo.http.server.core.validators.BehaviourParametersValidator;
import org.openflexo.http.server.core.validators.BehavioursValidator;
import org.openflexo.http.server.util.IdUtils;

import java.io.FileNotFoundException;

/**
 *  Behaviours rest apis controller.
 * @author Ihab Benamer
 */
public class BehavioursController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;
    private final DefaultFlexoEditor editor;

    /**
     * Instantiates a new Properties controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public BehavioursController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary    = virtualModelLibrary;
        editor                      = Helpers.getDefaultFlexoEditor(virtualModelLibrary);
    }

    /**
     * It gets the virtual model id from the request, gets the virtual model from the library, creates a JSON array, adds
     * all the behaviours of the virtual model to the array, and returns the array as the response
     *
     * @param context the routing context
     */
    public void list(RoutingContext context) {
        String id = context.request().getParam("vmid").trim();
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
            String modelId              = context.request().getParam("vmid").trim();
            String signature            = context.request().getParam("signature").trim();
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
        String id                       = context.request().getParam("id").trim();
        FlexoConcept concept            = virtualModelLibrary.getFlexoConcept(IdUtils.decodeId(id));
        BehavioursValidator validator    = new BehavioursValidator(context.request());
        JsonArray errors                = validator.validate();

        if(validator.isValid()){
            CreateFlexoBehaviour behaviour = CreateFlexoBehaviour.actionType.makeNewAction(concept, null, editor);

            behaviour.setFlexoBehaviourName(validator.getName());
            behaviour.setFlexoBehaviourClass(validator.getType());
            behaviour.setDescription(validator.getDescription());
            behaviour.setVisibility(validator.getVisibility());
            behaviour.setIsAbstract(validator.isAbstract());
            behaviour.doAction();

            try {
                concept.getDeclaringVirtualModel().getResource().save();
            } catch (SaveResourceException e) {
                badRequest(context);
            }

            context.response().end(JsonSerializer.behaviourSerializer(behaviour.getNewFlexoBehaviour()).encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }

    public void edit(RoutingContext context) {}

    public void delete(RoutingContext context) {

        String modelId              = context.request().getParam("vmid").trim();
        String signature            = context.request().getParam("signature").trim();
        VirtualModel model          = null;

        try {
            model = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(modelId));
        } catch (FileNotFoundException | ResourceLoadingCancelledException | FlexoException e) {
            notFound(context);
        }

        FlexoBehaviour behaviour = model.getDeclaredFlexoBehaviour(signature);

        if(behaviour != null){
            DeleteFlexoConceptObjects action = DeleteFlexoConceptObjects.actionType.makeNewAction(behaviour, null, editor);
            action.doAction();

            try {
                model.getResource().save();
            } catch (SaveResourceException e) {
                badRequest(context);
            }
            emptyResponse(context);
        } else {
            notFound(context);
        }


    }

    /**
     * It creates a new parameter for a behaviour
     *
     * @param context the routing context
     */
    public void addParameter(RoutingContext context) {
        String vm_id                = context.request().getParam("vmid").trim();
        String signature            = context.request().getParam("signature").trim();
        FlexoBehaviour behaviour    = virtualModelLibrary.getFlexoConcept(IdUtils.decodeId(vm_id)).getDeclaredFlexoBehaviour(signature);

        if (behaviour != null){
            VirtualModel model                      = behaviour.getDeclaringVirtualModel();
            BehaviourParametersValidator validator   = new BehaviourParametersValidator(context.request());
            JsonArray errors                        = validator.validate();

            if(validator.isValid()){
                CreateGenericBehaviourParameter parameter = CreateGenericBehaviourParameter.actionType.makeNewAction(behaviour, null, editor);
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

    /**
     * It takes a `vm_id` and a `signature` as parameters, and returns a list of parameters for the behaviour with the
     * given signature
     *
     * @param context the routing context
     */
    public void parameters(RoutingContext context) {
        JsonArray result            = new JsonArray();
        String vm_id                = context.request().getParam("vmid").trim();
        String signature            = context.request().getParam("signature").trim();
        FlexoBehaviour behaviour    = virtualModelLibrary.getFlexoConcept(IdUtils.decodeId(vm_id)).getDeclaredFlexoBehaviour(signature);

        for (FlexoBehaviourParameter param : behaviour.getParameters()) {
            result.add(JsonSerializer.behaviourParameterSerializer(param));
        }

        context.response().end(result.encodePrettily());
    }

    /**
     * It creates a new LogAction in the given behaviour
     *
     * @param context the routing context
     */
    public void addAction(RoutingContext context) {
        String id                   = context.request().getParam("id").trim();
        String signature            = context.request().getParam("signature").trim();
        FlexoBehaviour behaviour    = virtualModelLibrary.getFlexoConcept(IdUtils.decodeId(id)).getDeclaredFlexoBehaviour(signature);

        if (behaviour != null){
            VirtualModel model                  = behaviour.getDeclaringVirtualModel();
            BehaviourActionsValidator validator  = new BehaviourActionsValidator(context.request());
            JsonArray errors                    = validator.validateLogAction();

            if(validator.isValid()){
                CreateEditionAction createAction = CreateEditionAction.actionType.makeNewAction(behaviour.getControlGraph(), null, editor);

                createAction.setEditionActionClass(LogAction.class);
                createAction.doAction();

                LogAction action = (LogAction) createAction.getNewEditionAction();
                action.setLogLevel(validator.getLogLevel());
                action.setLogString(new DataBinding<>(validator.getValue()));

                try {
                    model.getResource().save();
                } catch (SaveResourceException e) {
                    badRequest(context);
                }

                context.response().end(JsonSerializer.behaviourActionSerializer(action).encodePrettily());
            } else {
                badValidation(context, errors);
            }
        } else {
            notFound(context);
        }
    }
}
