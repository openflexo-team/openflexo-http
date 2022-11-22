package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.PrimitiveRole;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
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

    public void list(RoutingContext context) {}

    public void get(RoutingContext context) {}

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
