package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.action.CreatePrimitiveRole;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.repositories.VirtualModelsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.PrimitivePropertyValidator;

public class PropertiesController extends GenericController {

    private final VirtualModelLibrary virtualModelLibrary;

    public PropertiesController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    public void addPrimitive(RoutingContext context){
        String id           = context.request().getParam("vmid");
        VirtualModel model  = VirtualModelsRepository.getVirtualModelById(virtualModelLibrary, id);

        if (model != null){
            PrimitivePropertyValidator validator    = new PrimitivePropertyValidator(context.request());
            JsonArray errors                        = validator.validate();

            if(validator.isValide()){
                CreatePrimitiveRole property = CreatePrimitiveRole.actionType.makeNewAction(model, null, new DefaultFlexoEditor(null, virtualModelLibrary.getServiceManager()));
                property.setRoleName(validator.getName());
                property.setPrimitiveType(validator.getType());
                property.setCardinality(validator.getCardinality());
                property.setDescription(validator.getDescription());

                try {
                    property.doActionInContext();
                } catch (FlexoException e) {
                    badRequest(context);
                }

                try {
                    model.getResource().save();
                } catch (SaveResourceException e) {
                    badRequest(context);
                }

                context.response().end(JsonSerializer.primitivePropertySerializer(property).encodePrettily());
            } else {
                badValidation(context, errors);
            }
        } else {
            notFound(context);

        }
    }
}
