package org.openflexo.http.server.core.serializers;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.action.CreateFlexoBehaviour;
import org.openflexo.foundation.fml.action.CreatePrimitiveRole;
import org.openflexo.http.server.util.IdUtils;

public class JsonSerializer {

    public static JsonObject projectSerializer(FlexoProject<?> project) {
        String uri          = project.getProjectURI();
        String id           = IdUtils.encodeuri(uri);
        JsonObject result   = new JsonObject();

        result.put("name", project.getDisplayableName());
        result.put("type", "Project");
        result.put("uri", uri);
        result.put("id", id);
        result.put("url", "/prj/" + id);

        return result;
    }

    public static JsonObject virtualModelSerializer(VirtualModel virtualModel) {
        String uri          = virtualModel.getURI();
        String id           = IdUtils.encodeuri(uri);
        JsonObject result   = new JsonObject();

        result.put("name", virtualModel.getName());
        result.put("type", "VirtualModel");
        result.put("uri", uri);
        result.put("id", id);
        result.put("url", "/vm/" + id);
        result.put("visibility", virtualModel.getVisibility());
        result.put("is_abstract", virtualModel.isAbstract());

        return result;
    }

    public  static JsonObject primitivePropertySerializer(CreatePrimitiveRole role) {
        String uri          = role.getFlexoConcept().getURI();
        String id           = IdUtils.encodeuri(uri);
        String name         = role.getRoleName();
        JsonObject result   = new JsonObject();

        result.put("name", name);
        result.put("Resource_type", "PrimitiveProperty");
        result.put("url", "/vm/" + id + "/" + name);
        result.put("cardinality", role.getCardinality());
        result.put("type", role.getPrimitiveType());

        return result;
    }

    public static JsonObject behaviourSerializer(CreateFlexoBehaviour behaviour){
        String uri          = behaviour.getFlexoConcept().getURI();
        String id           = IdUtils.encodeuri(uri);
        String name         = behaviour.getFlexoBehaviourName();
        JsonObject result   = new JsonObject();

        result.put("name", name);
        result.put("Resource_type", "FlexoBehaviour");
        result.put("url", "/vm/" + id + "/" + name);
        result.put("type", behaviour.getFlexoBehaviourClass());
        result.put("visibility", behaviour.getVisibility());
        result.put("is_abstract", behaviour.getIsAbstract());
        result.put("description", behaviour.getDescription());


        return result;
    }

}
