package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.CreatePrimitiveRole;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.PrimitivePropertyValidator;
import org.openflexo.http.server.util.IdUtils;

import java.io.FileNotFoundException;

/**
 *  Properties rest apis controller.
 * @author Ihab Benamer
 */
public class PropertiesController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;

    /**
     * Instantiates a new Properties controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public PropertiesController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    /**
     * It gets the virtual model from the library, then iterates over its properties and serializes them to JSON
     *
     * @param context the routing context
     */
    public void list(RoutingContext context) {
        String id = context.request().getFormAttribute("vm_id");
        try {
            VirtualModel model  = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));
            JsonArray result    = new JsonArray();

            for (FlexoProperty<?> property : model.getDeclaredProperties()) {
                result.add(JsonSerializer.primitivePropertySerializer((PrimitiveRole<?>) property));
            }

            context.response().end(result.encodePrettily());
        } catch (Exception e) {
            notFound(context);
        }
    }

    /**
     * It gets the virtual model with the given id, gets the primitive property with the given name, and returns the value
     * of that property
     *
     * @param context The routing context is the object that contains all the information about the current HTTP request
     * and response.
     */
    public void get(RoutingContext context) {
        String id   = context.request().getFormAttribute("vm_id");
        String name = context.request().getParam("name");

        try {
            VirtualModel model  = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));

            context.response().end(JsonSerializer.primitivePropertySerializer((PrimitiveRole<?>) model.getAccessibleProperty(name)).encodePrettily());
        } catch (Exception e) {
            notFound(context);
        }
    }

    /**
     * It creates a new primitive property in the virtual model with the given id
     *
     * @param context the routing context
     */
    public void add(RoutingContext context) {
        String id = context.request().getFormAttribute("id");
        try {
            VirtualModel model                      = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));
            PrimitivePropertyValidator validator    = new PrimitivePropertyValidator(context.request());
            JsonArray errors                        = validator.validate();

            if(validator.isValid()){
                CreatePrimitiveRole property = CreatePrimitiveRole.actionType.makeNewAction(model, null, Helpers.getDefaultFlexoEditor(virtualModelLibrary));
                property.setRoleName(validator.getName());
                property.setPrimitiveType(validator.getType());
                property.setCardinality(validator.getCardinality());
                property.setDescription(validator.getDescription());
                property.doAction();

                try {
                    model.getResource().save();
                } catch (SaveResourceException e) {
                    badRequest(context);
                }

                PrimitiveRole<?> prop = property.getNewFlexoRole();

                context.response().end(JsonSerializer.primitivePropertySerializer(prop).encodePrettily());
            } else {
                badValidation(context, errors);
            }
        } catch (FileNotFoundException | ResourceLoadingCancelledException | FlexoException e) {
            notFound(context);
        }
    }

    public void edit(RoutingContext context) {}

    public void delete(RoutingContext context) {}
}
