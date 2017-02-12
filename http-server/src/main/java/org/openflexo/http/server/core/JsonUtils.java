package org.openflexo.http.server.core;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterResource;
import org.openflexo.http.server.IdUtils;

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
		centerDescription.put("url", "/rc/" + id);
		centerDescription.put("resourceUrl", "/rc/" + id + "/resource");
		return centerDescription;
	}

	public static JsonObject getFolderDescription(String name, String path, String rcId) {
		JsonObject folderDescription = new JsonObject();
		folderDescription.put("name", name);
		folderDescription.put("type", "Folder");
		String id = path + (path.endsWith("/") ? "" : "/") + name;
		folderDescription.put("id", id);

		String rcUrl = "/rc/" + rcId;
		folderDescription.put("url", rcUrl + "/resource" + id);
		folderDescription.put("resourceCenterId", rcId);
		folderDescription.put("resourceCenterUrl", rcUrl);
		return folderDescription;
	}

	public static JsonObject getResourceDescription(FlexoResource<?> resource) {
		String uri = resource.getURI();
		String id = IdUtils.encoreUri(uri);
		JsonObject resourceDescription = new JsonObject();
		resourceDescription.put("name", resource.getName());
		resourceDescription.put("type", "Resource");
		resourceDescription.put("uri", uri);
		resourceDescription.put("id", id);
		if (resource.getResourceCenter() != null) {
			String centerId = IdUtils.encoreUri(resource.getResourceCenter().getDefaultBaseURI());
			resourceDescription.put("resourceCenterId", centerId);
			resourceDescription.put("resourceCenterUrl", "/rc/" + centerId);
		} else {
			System.out.println("Resource '"+ resource.getName() + "' has no rc.");
		}
		resourceDescription.put("url", "/resource/" + id);
		resourceDescription.put("contentUrl", "/resource/" + id + "/contents");
		if (resource instanceof TechnologyAdapterResource) {
			String taId = ((TechnologyAdapterResource) resource).getTechnologyAdapter().getClass().getName();
			resourceDescription.put("technologyAdapterId", taId);
			resourceDescription.put("technologyAdapterUrl", "/ta/"+taId);
		}
		return resourceDescription;
	}

	public static JsonObject getTechnologyAdapterDescription(TechnologyAdapter adapter) {
		String id = adapter.getClass().getName();
		JsonObject resourceDescription = new JsonObject();
		resourceDescription.put("name", adapter.getName());
		resourceDescription.put("type", "TechnologyAdapter");
		resourceDescription.put("id", id);
		resourceDescription.put("activated", adapter.isActivated());
		resourceDescription.put("url", "/ta/" + id);
		return resourceDescription;
	}

}
