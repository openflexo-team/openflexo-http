package org.openflexo.http.server.core;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.ResourceManager;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.RouteService;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.rm.Resource;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

/**
 * Created by charlie on 11/02/2017.
 */
public class ResourceRouteService /*implements RouteService<FlexoServiceManager>*/ {

//	private ResourceManager resourceManager;
//
//	private TechnologyAdapterRouteService technologyAdapterRestService;
//
//	@Override
//	public void initialize(HttpService service, FlexoServiceManager serviceManager) throws Exception {
//		resourceManager = serviceManager.getResourceManager();
//		technologyAdapterRestService = service.getTechnologyAdapterRestService();
//	}
//
//	@Override
//	public void addRoutes(Vertx vertx, Router router) {
//		router.get("/resource").produces(JSON).handler(this::serveResourceList);
//		router.get("/resource/:rid").produces(JSON).handler(this::serveResource);
//		router.post("/resource/:rid").produces(JSON).handler(this::processResource);
//		router.get("/resource/:rid/contents").handler(this::serveResourceContents);
//	}
//
//	private void serveResourceList(RoutingContext context) {
//		JsonArray result = new JsonArray();
//		for (FlexoResource<?> resource : resourceManager.getRegisteredResources()) {
//			result.add(JsonUtils.getResourceDescription(resource, technologyAdapterRestService));
//		}
//		context.response().end(result.encodePrettily());
//	}
//
//	private void serveResource(RoutingContext context) {
//		String id = context.request().getParam(("rid"));
//		String uri = IdUtils.decodeId(id);
//
//		FlexoResource<?> resource = resourceManager.getResource(uri);
//		if (resource != null) {
//			context.response().end(JsonUtils.getResourceDescription(resource, technologyAdapterRestService).encodePrettily());
//		}
//		else {
//			notFound(context);
//		}
//	}
//
//	private void processResource(RoutingContext context) {
//		String id = context.request().getParam(("rid"));
//		String uri = IdUtils.decodeId(id);
//
//		FlexoResource<?> resource = resourceManager.getResource(uri);
//		if (resource != null) {
//			try {
//				resource.save();
//				context.response().end(JsonUtils.getResourceDescription(resource, technologyAdapterRestService).encodePrettily());
//			} catch (SaveResourceException e) {
//				error(context, e);
//			}
//
//		}
//		else {
//			notFound(context);
//		}
//	}
//
//	private void serveResourceContents(RoutingContext context) {
//		String id = context.request().getParam(("rid"));
//		String uri = IdUtils.decodeId(id);
//
//		FlexoResource<?> resource = resourceManager.getResource(uri);
//		if (resource != null) {
//			context.response().putHeader("Content-Disposition", "filename=\"" + resource.getName() + "\"");
//			Resource artefactAsResource = resource.getIODelegate().getSerializationArtefactAsResource();
//			try (InputStream inputStream = new BufferedInputStream(artefactAsResource.openInputStream())) {
//				Buffer buffer = Buffer.buffer();
//				int read = inputStream.read();
//				while (read >= 0) {
//					buffer.appendByte((byte) read);
//					read = inputStream.read();
//				}
//				HttpServerResponse response = context.response();
//				response.putHeader("Content-Length", Integer.toString(buffer.length()));
//				response.end(buffer);
//			} catch (IOException e) {
//				context.fail(e);
//			}
//		}
//		else {
//			notFound(context);
//		}
//	}
}
