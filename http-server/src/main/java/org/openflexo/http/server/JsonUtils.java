package org.openflexo.http.server;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;

/**
 * Utility methods for JSON handling
 */
public class JsonUtils {

	public static JsonObject getCenterDescription(FlexoResourceCenter<?> center) {
		String uri = center.getDefaultBaseURI();
		String id = IdUtils.encoreUri(uri);
		JsonObject centerDescription = new JsonObject();
		centerDescription.put("name", center.getName());
		centerDescription.put("type", "ResourceCenter");
		centerDescription.put("uri", uri);
		centerDescription.put("id", id);
		centerDescription.put("url", "/center/" + id);
		return centerDescription;
	}

	public static JsonObject getResourceDescription(FlexoResource<?> resource) {
		String uri = resource.getURI();
		String id = IdUtils.encoreUri(uri);
		String centerId = IdUtils.encoreUri(resource.getResourceCenter().getDefaultBaseURI());
		JsonObject resourceDescription = new JsonObject();
		resourceDescription.put("name", resource.getName());
		resourceDescription.put("type", "Resource");
		resourceDescription.put("uri", uri);
		resourceDescription.put("id", id);
		resourceDescription.put("resourceCenterId", centerId);
		resourceDescription.put("resourceCenterUrl", "/center/"+centerId);
		resourceDescription.put("url", "/resource/" + id);
		return resourceDescription;
	}

}
