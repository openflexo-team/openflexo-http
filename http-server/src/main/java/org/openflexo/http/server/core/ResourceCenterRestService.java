package org.openflexo.http.server.core;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import java.util.List;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.FlexoResourceCenterService;
import org.openflexo.http.server.IdUtils;
import org.openflexo.http.server.RestService;

/**
 * Created by charlie on 11/02/2017.
 */
public class ResourceCenterRestService implements RestService {

	private FlexoResourceCenterService resourceCenterService;

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		resourceCenterService = serviceManager.getResourceCenterService();
	}

	@Override
	public void addRoutes(Router router) {
		router.get("/rc").produces(JSON).handler(this::serveResourceCenterList);
		router.get("/rc/:rcid").produces(JSON).handler(this::serveResourceCenter);
		router.get("/rc/:rcid/resource").produces(JSON).handler(this::serveResourceCenterResourceList);
		router.get("/rc/:rcid/resource/*").produces(JSON).handler(this::serveResourceCenterResourceFolderList);
	}

	private void serveResourceCenterList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (FlexoResourceCenter<?> center : resourceCenterService.getResourceCenters()) {
			result.add(JsonUtils.getCenterDescription(center));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveResourceCenter(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String uri = IdUtils.decodeId(centerId);

		FlexoResourceCenter<?> resourceCenter = resourceCenterService.getFlexoResourceCenter(uri);
		if (resourceCenter != null) {
			context.response().end(JsonUtils.getCenterDescription(resourceCenter).encodePrettily());
		} else {
			notFound(context);
		}
	}

	private void serveResourceCenterResourceList(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String centerUri = IdUtils.decodeId(centerId);

		FlexoResourceCenter<?> resourceCenter = resourceCenterService.getFlexoResourceCenter(centerUri);
		if (resourceCenter != null) {
			JsonArray result = new JsonArray();
			for (FlexoResource<?> resource : resourceCenter.getAllResources(null)) {
				result.add(JsonUtils.getResourceDescription(resource));
			}
			context.response().end(result.encodePrettily());
		} else {
			notFound(context);
		}
	}

	private void serveResourceCenterResourceFolderList(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String centerUri = IdUtils.decodeId(centerId);

		String path = context.request().path();
		String pathFragment = "resource";
		String folder = path.substring(path.lastIndexOf(pathFragment) + pathFragment.length());
		String[] fragments = folder.split("/");

		FlexoResourceCenter<Object> resourceCenter = (FlexoResourceCenter<Object>) resourceCenterService.getFlexoResourceCenter(centerUri);
		if (resourceCenter != null) {
			Object current = resourceCenter.getBaseArtefact();
			if (fragments.length > 0) {
				for (String fragment : fragments) {
					if (fragment.length() == 0) continue;

					List<Object> children = resourceCenter.getContents(current);
					boolean found = false;
					for (Object child : children) {
						if (fragment.equals(resourceCenter.retrieveName(child))) {
							current = child;
							found = true;
							break;
						}
					}

					if (!found) {
						current = null;
						break;
					}
				}
			}

			if (current != null) {
				JsonArray result = new JsonArray();
				List<Object> children = resourceCenter.getContents(current);
				for (Object child : children) {
					String name = resourceCenter.retrieveName(child);
					if (resourceCenter.isDirectory(child)) {
						result.add(JsonUtils.getFolderDescription(name, folder, centerId));
					}
					else {
						FlexoResource resource = resourceCenter.getResource(child, FlexoResource.class);
						if (resource != null) {
							result.add(JsonUtils.getResourceDescription(resource));
						}
					}
				}
				context.response().end(result.encodePrettily());
			} else {
				notFound(context);
			}

		} else {
			notFound(context);
		}
	}

}
