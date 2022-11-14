package org.openflexo.http.server.core.serializers;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.VirtualModel;
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

    public  static JsonObject primitivePropertySerializer(CreatePrimitiveRole createPrimitiveRole) {
        String uri          = createPrimitiveRole.getFlexoConcept().getURI();
        String id           = IdUtils.encodeuri(uri);
        String name         = createPrimitiveRole.getRoleName();
        JsonObject result   = new JsonObject();

        result.put("name", name);
        result.put("Resource_type", "PrimitiveProperty");
        result.put("url", "/vm/" + id + "/" + name);
        result.put("cardinality", createPrimitiveRole.getCardinality());
        result.put("type", createPrimitiveRole.getPrimitiveType());

        return result;
    }

}
