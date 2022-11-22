package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.CreateFlexoBehaviour;
import org.openflexo.foundation.fml.action.CreateGenericBehaviourParameter;
import org.openflexo.foundation.fml.action.CreatePrimitiveRole;
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

    public void list(RoutingContext context) {}

    public void get(RoutingContext context) {}

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
        String uri                  = context.request().getFormAttribute("uri");
        String signature            = context.request().getFormAttribute("signature");
        FlexoBehaviour behaviour    = virtualModelLibrary.getFlexoConcept(uri).getDeclaredFlexoBehaviour(signature);

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


}
