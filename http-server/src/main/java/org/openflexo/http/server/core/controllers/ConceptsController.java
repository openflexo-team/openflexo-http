package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.action.CreateFlexoConcept;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.VirtualModelsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.ConceptValidator;
import org.openflexo.http.server.util.IdUtils;

import java.io.FileNotFoundException;

/**
 *  Concepts rest apis controller.
 * @author Ihab Benamer
 */
public class ConceptsController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;

    /**
     * Instantiates a new Concepts controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public ConceptsController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    public void list(RoutingContext context) {}

    public void get(RoutingContext context) {}

    /**
     * It adds a new concept to a virtual model
     *
     * @param context the routing context
     */
    public void add(RoutingContext context) {
        String id = context.request().getFormAttribute("virtual_model_id");

        try {
            VirtualModel model          = virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id));
            ConceptValidator validator  = new ConceptValidator(context.request());
            JsonArray errors            = validator.validate();

            if(validator.isValid()){
                CreateFlexoConcept concept = CreateFlexoConcept.actionType.makeNewAction(model, null, Helpers.getDefaultFlexoEditor(virtualModelLibrary));
                concept.setNewFlexoConceptName(validator.getName());
                concept.setVisibility(validator.getVisibility());
                concept.setIsAbstract(validator.isAbstract());
                concept.setNewFlexoConceptDescription(validator.getDescription());
                concept.doAction();

                try {
                    model.getResource().save();
                } catch (SaveResourceException e) {
                    badRequest(context);
                }

                context.response().end(JsonSerializer.conceptSerializer(concept.getNewFlexoConcept()).encodePrettily());
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
