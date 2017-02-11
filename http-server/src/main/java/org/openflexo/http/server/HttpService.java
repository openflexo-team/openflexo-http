package org.openflexo.http.server;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openflexo.foundation.FlexoService;
import org.openflexo.foundation.FlexoServiceImpl;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;

/**
 * HTTP Service for OpenFlexo
 */
public class HttpService extends FlexoServiceImpl implements FlexoService {

	public static final String JSON = "application/json";

	private static Logger logger = Logger.getLogger(HttpService.class.getPackage().getName());

	private final int port;
	private final String host;

	private final Vertx vertx = Vertx.vertx();
	private final HttpServerOptions serverOptions;

	private HttpServer server = null;

	public static class Options {
		public int port = 8080;

		public String host = "localhost";
	}

	public HttpService(Options options) {
		this.port = options.port;
		this.host = options.host;
		serverOptions = new HttpServerOptions();
	}

	@Override
	public void initialize() {

		// initializes technology adapter standalone and for each resource center.
		FlexoServiceManager serviceManager = getServiceManager();
		List<TechnologyAdapter> technologyAdapters = serviceManager.getTechnologyAdapterService().getTechnologyAdapters();
		for (TechnologyAdapter ta : technologyAdapters) {
			System.out.println("Activating " + ta.getName());
			ta.activate();
		}

		for (FlexoResourceCenter<?> resourceCenter : serviceManager.getResourceCenterService().getResourceCenters()) {
			for (TechnologyAdapter technologyAdapter : technologyAdapters) {
				System.out.println("Activating ta " + technologyAdapter.getName() + " for rc " + resourceCenter.getName());
				resourceCenter.activateTechnology(technologyAdapter);
			}
		}

		Router router = Router.router(vertx);
		router.get("/rc").produces(JSON).handler(this::serveResourceCenterList);
		router.get("/rc/:rcid").produces(JSON).handler(this::serveResourceCenter);

		// TODO add support for path
		router.get("/rc/:rcid/resource").produces(JSON).handler(this::serveResourceCenterResourceList);
		router.get("/rc/:rcid/resource/*").produces(JSON).handler(this::serveResourceCenterResourceFolderList);

		router.get("/resource").produces(JSON).handler(this::serveResourceList);
		router.get("/resource/:rid").produces(JSON).handler(this::serveResource);

		router.get("/resource/:rid/contents").handler(this::serveResourceContents);

		router.get("/ta").produces(JSON).handler(this::serveTechnologyAdapterList);
		router.get("/ta/:taid").produces(JSON).handler(this::serveTechnologyAdapter);

		try {
			FMLTechnologyAdapter fmlTechnologyAdapter = serviceManager.getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
			FMLRestService fmlRestService = new FMLRestService(fmlTechnologyAdapter);
			fmlRestService.addRoutes("/ta/" + FMLTechnologyAdapter.class.getName(), router);
		} catch (Exception e) {
			logger.log(Level.SEVERE, "Could not start FML REST services", e);
		}

		router.get("/*").handler(StaticHandler.create());

		server = vertx.createHttpServer(serverOptions);
		server.requestHandler(router::accept);

		logger.info("Starting HTTP Server on " + host + ":" + port);
		server.listen(port, host);
	}

	private void serveResourceCenterList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (FlexoResourceCenter<?> center : getServiceManager().getResourceCenterService().getResourceCenters()) {
			result.add(JsonUtils.getCenterDescription(center));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveResourceCenter(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String uri = IdUtils.decodeId(centerId);

		FlexoResourceCenter<?> resourceCenter = getServiceManager().getResourceCenterService().getFlexoResourceCenter(uri);
		if (resourceCenter != null) {
			context.response().end(JsonUtils.getCenterDescription(resourceCenter).encodePrettily());
		} else {
			notFound(context);
		}
	}

	private void serveResourceCenterResourceList(RoutingContext context) {
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

	private void serveResourceCenterResourceFolderList(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String centerUri = IdUtils.decodeId(centerId);

		String path = context.request().path();
		String pathFragment = "resource/";
		String folder = path.substring(path.lastIndexOf(pathFragment) + pathFragment.length());
		String[] fragments = folder.split("/");

		FlexoResourceCenter<Object> resourceCenter = (FlexoResourceCenter<Object>) getServiceManager().getResourceCenterService().getFlexoResourceCenter(centerUri);
		if (resourceCenter != null) {
			Object current = resourceCenter.getBaseArtefact();
			if (folder.length() > 0) {
				for (String fragment : fragments) {
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
						result.add(JsonUtils.getFolderDescription(name, folder, "/rc/" + centerId + "/resource/"));
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
