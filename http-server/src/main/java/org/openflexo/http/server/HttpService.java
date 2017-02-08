package org.openflexo.http.server;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import org.openflexo.foundation.FlexoService;
import org.openflexo.foundation.FlexoServiceImpl;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

/**
 * HTTP Service for OpenFlexo
 */
public class HttpService extends FlexoServiceImpl implements FlexoService {

	private static final String JSON = "application/json";

	private static Logger logger = Logger.getLogger(HttpService.class.getPackage().getName());

	public static class Options {
		public int port = 8080;

		public String host = "localhost";

		public String webDirectory = "./webroot";
	}

	private final int port;
	private final String host;

	private final Path webPath;

	private final Vertx vertx = Vertx.vertx();
	private final HttpServerOptions serverOptions;

	private HttpServer server = null;
	private Router router = null;

	public HttpService(Options options) {
		this.port = options.port;
		this.host = options.host;
		serverOptions = new HttpServerOptions();

		this.webPath = Paths.get(options.webDirectory);
	}

	@Override
	public void initialize() {
		router = Router.router(vertx);
		router.get("/rc").produces(JSON).handler(this::serveCenterList);
		router.get("/rc/:rcid").produces(JSON).handler(this::serveCenter);

		// TODO add support for path
		router.get("/rc/:rcid/resource").produces(JSON).handler(this::serveCenterResourceList);

		router.get("/resource").produces(JSON).handler(this::serveResourceList);
		router.get("/resource/:rid").produces(JSON).handler(this::serveResource);

		router.get("/resource/:rid/contents").handler(this::serveResourceContents);

		router.get("/ta").produces(JSON).handler(this::serveTechnologyAdapterList);
		router.get("/ta/:taid").produces(JSON).handler(this::serveTechnologyAdapter);

		router.get("/*").handler(StaticHandler.create());

		server = vertx.createHttpServer(serverOptions);
		server.requestHandler(router::accept);

		logger.info("Starting HTTP Server on " + host + ":" + port);
		server.listen(port, host);
	}

	private Path resolveWebPath(String relativePath) {
		// trim "/" a the beginning
		Path result = webPath.resolve(relativePath.substring(1));
		// ensure that result is child of web path and that the file exists
		if (!result.startsWith(webPath) || !Files.exists(result)) return null;
		return result;
	}

	private void serveCenterList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (FlexoResourceCenter<?> center : getServiceManager().getResourceCenterService().getResourceCenters()) {
			result.add(JsonUtils.getCenterDescription(center));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveCenter(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String uri = IdUtils.decodeId(centerId);

		FlexoResourceCenter<?> resourceCenter = getServiceManager().getResourceCenterService().getFlexoResourceCenter(uri);
		if (resourceCenter != null) {
			context.response().end(JsonUtils.getCenterDescription(resourceCenter).encodePrettily());
		} else {
			notFound(context);
		}
	}

	private void serveCenterResourceList(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String centerUri = IdUtils.decodeId(centerId);

		FlexoResourceCenter<?> resourceCenter = getServiceManager().getResourceCenterService().getFlexoResourceCenter(centerUri);
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

	private void serveResourceList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (FlexoResource<?> resource : getServiceManager().getResourceManager().getRegisteredResources()) {
			result.add(JsonUtils.getResourceDescription(resource));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveResource(RoutingContext context) {
		String id = context.request().getParam(("rid"));
		String uri = IdUtils.decodeId(id);

		FlexoResource<?> resource = getServiceManager().getResourceManager().getResource(uri);
		if (resource != null) {
			context.response().end(JsonUtils.getResourceDescription(resource).encodePrettily());
		} else {
			notFound(context);
		}
	}

	private void serveResourceContents(RoutingContext context) {
		String id = context.request().getParam(("rid"));
		String uri = IdUtils.decodeId(id);

		FlexoResource<?> resource = getServiceManager().getResourceManager().getResource(uri);
		if (resource != null) {
			context.response().end("TODO contents");
		} else {
			notFound(context);
		}
	}

	private void serveTechnologyAdapterList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (TechnologyAdapter technologyAdapter : getServiceManager().getTechnologyAdapterService().getTechnologyAdapters()) {
			result.add(JsonUtils.getTechnologyAdapterDescription(technologyAdapter));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveTechnologyAdapter(RoutingContext context) {
		String id = context.request().getParam(("taid"));
		try {
			Class<? extends TechnologyAdapter> taClass = (Class<? extends TechnologyAdapter>) getClass().getClassLoader().loadClass(id);
			TechnologyAdapter technologyAdapter = getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(taClass);
			if (technologyAdapter != null) {
				context.response().end(JsonUtils.getTechnologyAdapterDescription(technologyAdapter).encodePrettily());
			}
			else {
				notFound(context);
			}
		} catch (ClassNotFoundException e) {
			notFound(context);
		}
	}

	private void notFound(RoutingContext context) {
		context.response().setStatusCode(404).close();
	}

	@Override
	public void stop() {
		server.close();
	}


}
