package org.openflexo.server.http;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import j2html.tags.ContainerTag;
import org.openflexo.foundation.FlexoService;
import org.openflexo.foundation.FlexoServiceImpl;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.PamelaResource;
import org.openflexo.foundation.resource.ResourceManager;

import java.io.ByteArrayOutputStream;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

import static j2html.TagCreator.*;

/**
 * Created by charlie on 17/01/2017.
 */
public class HttpService extends FlexoServiceImpl implements FlexoService {

	public static final String RESOURCE_PREFIX = "/resource";
	private static Logger logger = Logger.getLogger(HttpService.class.getPackage().getName());

	public static class Options {
		public int port = 8080;

		public String host = "localhost";

		public String webDirectory = "./web";

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
		router.get("/resource").handler(this::serveResourcesRoot);
		router.get("/resource/*").handler(this::serveResource);
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

	private void serveResourcesRoot(RoutingContext context) {
		HttpServerRequest request = context.request();
		HttpServerResponse response = request.response();
		ContainerTag resourceCentersDiv = div();
		for (FlexoResourceCenter<?> resourceCenter : getServiceManager().getResourceCenterService().getResourceCenters()) {
			resourceCentersDiv.with(h3(resourceCenter.getName()));
			ContainerTag ul = ul();
			for (FlexoResource<?> flexoResource : resourceCenter.getAllResources(null)) {
				String link = "/resource/" + flexoResource.getURI();
				ul.with(
						li().with(a(flexoResource.getName()).withHref(link))
				);
			}
			resourceCentersDiv.with(ul);
		}

		ContainerTag body = body();
		body.with(h2("Resources")).with(resourceCentersDiv);

		response.end(html()
				.with(HtmlUtils.createHeader("Resources"))
				.with(body).render()
		);
	}

	private void serveResource(RoutingContext context) {
		try {
			HttpServerRequest request = context.request();
			String resourceId = URLDecoder.decode(context.request().path().substring("/resource/".length()), "UTF-8");
			HttpServerResponse response = request.response();

			// serves the resource
			ResourceManager resourceManager = getServiceManager().getResourceManager();
			FlexoResource<?> resource = resourceManager.getResource(resourceId);
			if (resource == null) {
				context.fail(404);
				return;
			}

			if (resource instanceof PamelaResource) {
				PamelaResource pamelaResource = (PamelaResource) resource;
				if (!resource.isLoaded()) {
					resource.loadResourceData(null);
				}

				ByteArrayOutputStream stream = new ByteArrayOutputStream();
				pamelaResource.getFactory().serialize(pamelaResource.getLoadedResourceData(), stream);
				stream.close();

				response.write(stream.toString("utf-8"));
			}

		} catch (Exception e) {
			context.fail(e);
		}
	}


	@Override
	public void stop() {
		server.close();
	}


}
