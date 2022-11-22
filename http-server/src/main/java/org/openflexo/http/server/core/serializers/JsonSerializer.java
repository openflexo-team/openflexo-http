package org.openflexo.http.server.core.serializers;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.http.server.util.IdUtils;

/**
 * A class for defining Json serializers
 *
 * @author Ihab Benamer
 */
public class JsonSerializer {

    /**
     * It takes a FlexoProject and returns a JsonObject that contains the project's name, uri, id, and resource center id
     *
     * @param project the project to serialize
     * @return A JsonObject
     */
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

    /**
     * It takes a VirtualModel object and returns a JsonObject that contains the name, resource_type, uri, id, visibility,
     * and is_abstract fields
     *
     * @param virtualModel The VirtualModel object that you want to serialize.
     * @return A JsonObject
     */
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

    /**
     * It takes a PrimitiveRole object and returns a JsonObject
     *
     * @param role the role to serialize
     * @return A JsonObject
     */
    public  static JsonObject primitivePropertySerializer(PrimitiveRole<?> role) {
        JsonObject result = new JsonObject();

        result.put("name", role.getRoleName());
        result.put("resource_type", "PrimitiveProperty");
        result.put("cardinality", role.getCardinality());
        result.put("type", role.getPrimitiveType());
        result.put("virtual_model_id", IdUtils.encodeuri(role.getDeclaringVirtualModel().getURI()));

        return result;
    }

    /**
     * It takes a FlexoBehaviour object and returns a JsonObject that contains all the information that we want to send to
     * the client
     *
     * @param behaviour the behaviour to serialize
     * @return A JsonObject
     */
    public static JsonObject behaviourSerializer(FlexoBehaviour behaviour){
        JsonObject result = new JsonObject();

        result.put("name", behaviour.getName());
        result.put("resource_type", "Behaviour");
        result.put("id", behaviour.getURI());
        result.put("type", behaviour.getFlexoBehaviourType().getTypeName());
        result.put("visibility", behaviour.getVisibility());
        result.put("is_abstract", behaviour.isAbstract());
        result.put("description", behaviour.getDescription());
        result.put("signature", behaviour.getSignature());
        result.put("virtual_model_id", IdUtils.encodeuri(behaviour.getDeclaringVirtualModel().getURI()));

        return result;
    }

    /**
     * It takes a FlexoBehaviourParameter object and returns a JsonObject that contains all the information about the
     * parameter
     *
     * @param parameter the parameter to serialize
     * @return A JsonObject
     */
    public static JsonObject behaviourParameterSerializer(FlexoBehaviourParameter parameter){
        JsonObject result = new JsonObject();

        result.put("name", parameter.getName());
        result.put("resource_type", "BehaviourParameter");
        result.put("type", parameter.getType().toString());
        result.put("default_value", parameter.getDefaultValue().toString());
        result.put("is_required", parameter.getIsRequired());
        result.put("description", parameter.getDescription());
        result.put("behaviour_id", IdUtils.encodeuri(parameter.getBehaviour().getURI()));

        return result;
    }

    /**
     * It takes a FlexoConcept and returns a JsonObject
     *
     * @param concept the concept to serialize
     * @return A JsonObject
     */
    public static JsonObject conceptSerializer(FlexoConcept concept) {
        JsonObject result           = new JsonObject();

        result.put("id", concept.getName());
        result.put("name", concept.getName());
        result.put("uri", concept.getURI());
        result.put("resource_type", "Concept");
        result.put("visibility", concept.getVisibility().toString());
        result.put("parent_concepts", concept.getParentFlexoConcepts().size());
        result.put("is_required", concept.isAbstract());
        result.put("description", concept.getDescription());
        result.put("behaviour_id", IdUtils.encodeuri(concept.getURI()));

        return result;
    }

    /**
     * It takes a VirtualModelInstance object and returns a JsonObject that contains the name, uri, resource_type, title,
     * and virtual_model_uri of the VirtualModelInstance
     *
     * @param instance the VirtualModelInstance object to serialize
     * @return A JsonObject
     */
    public static JsonObject virtualModelInstanceSerializer(VirtualModelInstance instance) {
        JsonObject result           = new JsonObject();

        result.put("name", instance.getName());
        result.put("uri", instance.getURI());
        result.put("resource_type", "VirtualModelInstance");
        result.put("title", instance.getTitle());
        result.put("virtual_model_uri", instance.getVirtualModel().getURI());

        return result;
    }

    /**
     * It takes a FlexoConceptInstance and returns a JsonObject that contains the FlexoConceptInstance's flexoID, resource
     * type, and concept URI
     *
     * @param instance the instance of the concept to serialize
     * @return A JsonObject
     */
    public static JsonObject conceptInstanceSerializer(FlexoConceptInstance instance) {
        JsonObject result           = new JsonObject();

        result.put("flexo_id", instance.getFlexoID());
        result.put("resource_type", "FlexoConceptInstance");
        result.put("concept_uri", instance.getFlexoConceptURI());

        return result;
    }
}
