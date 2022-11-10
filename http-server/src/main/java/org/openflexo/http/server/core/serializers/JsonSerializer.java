package org.openflexo.http.server.core.serializers;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.http.server.util.IdUtils;

/**
 * A class for defining Json serializers
 *
 * @author Ihab Benamer
 */
public class JsonSerializer {

    /**
     * It takes a FlexoProject object and returns a JsonObject that contains the project's name, type, uri, id, and url
     *
     * @param project the project to serialize
     * @return A JsonObject
     */
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

    /**
     * It takes a VirtualModel object and returns a JsonObject that contains the VirtualModel's name, type, uri, id, url,
     * visibility, and is_abstract
     *
     * @param virtualModel The VirtualModel object to serialize
     * @return A JsonObject
     */
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

}
