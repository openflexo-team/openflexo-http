package org.openflexo.http.server.core.serializers;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.http.server.util.IdUtils;

public class JsonSerializer {

    public static JsonObject projectSerializer(FlexoProject<?> project) {
        String uri          = project.getProjectURI();
        String id           = IdUtils.encodeuri(uri);
        JsonObject result   = new JsonObject();

        result.put("name", project.getDisplayableName());
        result.put("resource_type", "Project");
        result.put("uri", uri);
        result.put("id", id);
        result.put("resource_center_id", project.getResourceCenter().getFlexoID());

        return result;
    }

    public static JsonObject virtualModelSerializer(VirtualModel virtualModel) {
        String uri          = virtualModel.getURI();
        String id           = IdUtils.encodeuri(uri);
        JsonObject result   = new JsonObject();

        result.put("name", virtualModel.getName());
        result.put("resource_type", "VirtualModel");
        result.put("uri", uri);
        result.put("id", id);
        result.put("visibility", virtualModel.getVisibility());
        result.put("is_abstract", virtualModel.isAbstract());

        return result;
    }

    public  static JsonObject primitivePropertySerializer(PrimitiveRole<?> role) {
        String name         = role.getRoleName();
        JsonObject result   = new JsonObject();

        result.put("name", name);
        result.put("resource_type", "PrimitiveProperty");
        result.put("cardinality", role.getCardinality());
        result.put("type", role.getPrimitiveType());
        result.put("virtual_model_id", IdUtils.encodeuri(role.getDeclaringVirtualModel().getURI()));

        return result;
    }

    public static JsonObject behaviourSerializer(FlexoBehaviour behaviour){
        JsonObject result   = new JsonObject();

        result.put("name", behaviour.getName());
        result.put("resource_type", "Behaviour");
        result.put("id", behaviour.getURI());
        result.put("type", behaviour.getFlexoBehaviourActionType().getClass().getName());
        result.put("visibility", behaviour.getVisibility());
        result.put("is_abstract", behaviour.isAbstract());
        result.put("description", behaviour.getDescription());
        result.put("signature", behaviour.getSignature());
        result.put("virtual_model_id", IdUtils.encodeuri(behaviour.getDeclaringVirtualModel().getURI()));

        return result;
    }

    public static JsonObject behaviourParameterSerializer(FlexoBehaviourParameter parameter){
        JsonObject result           = new JsonObject();

        result.put("name", parameter.getName());
        result.put("resource_type", "BehaviourParameter");
        result.put("type", parameter.getType().toString());
        result.put("default_value", parameter.getDefaultValue().toString());
        result.put("is_required", parameter.getIsRequired());
        result.put("description", parameter.getDescription());
        result.put("behaviour_id", IdUtils.encodeuri(parameter.getBehaviour().getURI()));

        return result;
    }

    public static JsonObject conceptSerializer(FlexoConcept concept) {
        JsonObject result           = new JsonObject();

        result.put("name", concept.getName());
        result.put("resource_type", "Concept");
        result.put("visibility", concept.getVisibility().toString());
        result.put("parent_concepts", concept.getParentFlexoConcepts().size());
        result.put("is_required", concept.isAbstract());
        result.put("description", concept.getDescription());
        result.put("behaviour_id", IdUtils.encodeuri(concept.getURI()));

        return result;
    }

    public static JsonObject virtualModelSerializer(VirtualModelInstance instance) {
        JsonObject result           = new JsonObject();

        result.put("name", instance.getName());
        result.put("resource_type", "VirtualModelInstance");
        result.put("title", instance.getTitle());
        result.put("virtual_model_id", IdUtils.encodeuri(instance.getVirtualModel().getURI()));

        return result;
    }
}
