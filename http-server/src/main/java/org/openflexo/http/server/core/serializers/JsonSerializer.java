package org.openflexo.http.server.core.serializers;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.http.server.util.IdUtils;

public class JsonSerializer {

    public static JsonObject getProjectDescription(FlexoProject<?> project) {
        String uri = project.getProjectURI();
        String id = IdUtils.encodeuri(uri);
        JsonObject centerDescription = new JsonObject();
        centerDescription.put("name", project.getDisplayableName());
        centerDescription.put("type", "ResourceCenter");
        centerDescription.put("uri", uri);
        centerDescription.put("id", id);
        centerDescription.put("url", "/rc/" + id);
        centerDescription.put("resourceUrl", "/rc/" + id + "/resource");
        return centerDescription;
    }

}
