package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rm.VirtualModelResourceFactory;
import org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstance;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstanceRepository;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.action.CreateBasicVirtualModelInstance;
import org.openflexo.foundation.fml.rt.action.CreateFlexoConceptInstance;
import org.openflexo.foundation.fml.rt.rm.FMLRTVirtualModelInstanceResource;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.ConceptInstanceValidator;
import org.openflexo.http.server.core.validators.VirtualModelInstanceValidator;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.fml.FMLRtRouteComplement;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.pamela.exceptions.ModelDefinitionException;
import org.python.jline.internal.Log;

import java.io.File;
import java.io.FileNotFoundException;

/**
 *  Concept Instances rest apis controller.
 * @author Ihab Benamer
 */
public class ConceptInstancesController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;
    private final DefaultFlexoEditor editor;

    /**
     * Instantiates a new Concept instances controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public ConceptInstancesController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary    = virtualModelLibrary;
        editor                      = Helpers.getDefaultFlexoEditor(virtualModelLibrary);
    }

    public void list(RoutingContext context) {}

    public void get(RoutingContext context) {}

    /**
     * It creates a new instance of a FlexoConcept in a VirtualModelInstance
     *
     * @param context the routing context
     */
    public void add(RoutingContext context) {

        ConceptInstanceValidator validator = new ConceptInstanceValidator(context.request(), virtualModelLibrary);
        JsonArray errors                   = validator.validate();

        if(validator.isValid()){
            CreateFlexoConceptInstance action   = CreateFlexoConceptInstance.actionType.makeNewAction(validator.getContainer(), null, editor);
            action.setFlexoConcept(validator.getConcept());

            if (validator.getConcept().getCreationSchemes().size() > 0) {
                CreationScheme cs = validator.getConcept().getCreationSchemes().get(0);
                action.setCreationScheme(cs);
            }

            action.doAction();

            try {
                validator.getContainer().getResource().save();
            } catch (SaveResourceException e) {
                throw new RuntimeException(e);
            }

            context.response().end(JsonSerializer.conceptInstanceSerializer(action.getNewFlexoConceptInstance()).encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }

    public void edit(RoutingContext context) {}

    public void delete(RoutingContext context) {}

}
