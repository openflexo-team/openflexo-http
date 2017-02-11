package org.openflexo.http.server.core;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.ResourceManager;
import org.openflexo.http.server.IdUtils;
import org.openflexo.http.server.RestService;

/**
 * Created by charlie on 11/02/2017.
 */
public class ResourceRestService implements RestService {

	private ResourceManager resourceManager;

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		resourceManager = serviceManager.getResourceManager();
	}

	@Override
	public void addRoutes(Router router) {

		router.get("/resource").produces(JSON).handler(this::serveResourceList);
		router.get("/resource/:rid").produces(JSON).handler(this::serveResource);

		router.get("/resource/:rid/contents").handler(this::serveResourceContents);
	}

	private void serveResourceList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (FlexoResource<?> resource : resourceManager.getRegisteredResources()) {
			result.add(JsonUtils.getResourceDescription(resource));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveResource(RoutingContext context) {
		String id = context.request().getParam(("rid"));
		String uri = IdUtils.decodeId(id);

		FlexoResource<?> resource = resourceManager.getResource(uri);
		if (resource != null) {
			context.response().end(JsonUtils.getResourceDescription(resource).encodePrettily());
		} else {
			notFound(context);
		}
	}

	private void serveResourceContents(RoutingContext context) {
		String id = context.request().getParam(("rid"));
		String uri = IdUtils.decodeId(id);

		FlexoResource<?> resource = resourceManager.getResource(uri);
		if (resource != null) {
			try (InputStream inputStream = new BufferedInputStream(resource.openInputStream())) {
				Buffer buffer = Buffer.buffer();
				int read = inputStream.read();
				while (read >= 0) {
					buffer.appendByte((byte) read);
					read = inputStream.read();
				}
				HttpServerResponse response = context.response();
				response.putHeader("Content-Length", Integer.toString(buffer.length()));
				response.end(buffer);
			} catch (IOException e) {
				context.fail(e);
			}
		} else {
			notFound(context);
		}
	}
}
