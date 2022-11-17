package org.openflexo.http.server.core.controllers;


import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.connie.DataBinding;
import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.connie.type.TypeUtils;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.*;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rm.VirtualModelResourceFactory;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.repositories.VirtualModelsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.BehaviourParameterValidator;
import org.openflexo.http.server.core.validators.BehaviourValidator;
import org.openflexo.http.server.core.validators.PrimitivePropertyValidator;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.pamela.exceptions.ModelDefinitionException;
import org.python.jline.internal.Log;

import java.lang.reflect.Type;
import java.util.Arrays;

public class VirtualModelsController extends GenericController {

    private final VirtualModelLibrary virtualModelLibrary;

    public VirtualModelsController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }

    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();
        for (VirtualModelResource virtualModel : virtualModelLibrary.getVirtualModels()) {
            result.add(JsonSerializer.virtualModelSerializer(virtualModel.getVirtualModel()));
        }
        context.response().end(result.encodePrettily());
    }

    public void add(RoutingContext context) {
        VirtualModelsValidator validator    = new VirtualModelsValidator(context.request(), virtualModelLibrary);
        JsonArray errors                    = validator.validate();

        if(validator.isValid()){
            FMLTechnologyAdapter fmlTechnologyAdapter   = virtualModelLibrary.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
            VirtualModelResourceFactory factory         = fmlTechnologyAdapter.getVirtualModelResourceFactory();
            FlexoProject<?> project                     = ProjectsRepository.getProjectById(virtualModelLibrary, validator.getProjectId());
            VirtualModel newVirtualModel                = null;
            VirtualModelResource newVirtualModelResource;

            try {
                String virtualModelUri  = Helpers.createVirtualModelUri(project, validator.getName());
                newVirtualModelResource = factory.makeTopLevelVirtualModelResource(validator.getName(), virtualModelUri, fmlTechnologyAdapter.getGlobalRepository(project).getRootFolder(), true);
                newVirtualModel         = newVirtualModelResource.getLoadedResourceData();

                newVirtualModel.setDescription(validator.getDescription());
                newVirtualModel.setVisibility(validator.getVisibility());
                newVirtualModel.setAbstract(validator.isAbstract());
            } catch (SaveResourceException | ModelDefinitionException e) {
                badRequest(context);
            }

            context.response().end(JsonSerializer.virtualModelSerializer(newVirtualModel).encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }

    public void get(RoutingContext context) {
        String id                       = context.request().getParam("id");
        VirtualModel newVirtualModel    = VirtualModelsRepository.getVirtualModelById(virtualModelLibrary, id);

        if (newVirtualModel != null){
            context.response().end(JsonSerializer.virtualModelSerializer(newVirtualModel).encodePrettily());
        } else {
            notFound(context);
        }
    }

    public void edit(RoutingContext context) {}
    public void delete(RoutingContext context) {}

    public void addPrimitive(RoutingContext context){
        String id           = context.request().getParam("id");
        VirtualModel model  = VirtualModelsRepository.getVirtualModelById(virtualModelLibrary, id);

        if (model != null){
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
        } else {
            notFound(context);
        }
    }

    public void addBehaviour(RoutingContext context){
        String id           = context.request().getParam("id");
        VirtualModel model  = VirtualModelsRepository.getVirtualModelById(virtualModelLibrary, id);

        if (model != null){
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
        } else {
            notFound(context);
        }
    }

    public void addBehaviourParameter(RoutingContext context){
        String uri          = context.request().getFormAttribute("uri");
        String signature    = context.request().getFormAttribute("signature");

        FlexoBehaviour behaviour = virtualModelLibrary.getFlexoConcept(uri).getDeclaredFlexoBehaviour(signature);

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
                Log.info(parameter.hasActionExecutionSucceeded());

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
