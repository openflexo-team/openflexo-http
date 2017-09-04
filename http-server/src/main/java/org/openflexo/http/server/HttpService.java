package org.openflexo.http.server;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import java.util.ArrayList;
import java.util.List;
import java.util.ServiceLoader;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openflexo.foundation.FlexoService;
import org.openflexo.foundation.FlexoServiceImpl;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.http.server.connie.ConnieHandler;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;

/**
 * HTTP Service for OpenFlexo
 */
public class HttpService extends FlexoServiceImpl implements FlexoService {

	private static Logger logger = Logger.getLogger(HttpService.class.getPackage().getName());

	private final int port;
	private final String host;

	private final Vertx vertx = Vertx.vertx();
	private final HttpServerOptions serverOptions;

	private HttpServer server = null;

	private TechnologyAdapterRouteService technologyAdapterRestService = null;

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
			logger.info("Activating " + ta.getName());
			ta.activate();
		}

		// TODO Why do I need to do this ?
		for (FlexoResourceCenter<?> resourceCenter : serviceManager.getResourceCenterService().getResourceCenters()) {
			for (TechnologyAdapter technologyAdapter : technologyAdapters) {
				logger.info("Activating ta " + technologyAdapter.getName() + " for rc " + resourceCenter.getName());
				resourceCenter.activateTechnology(technologyAdapter);
			}
		}

		Router router = Router.router(vertx);

		// gets REST services
		ServiceLoader<RouteService> restServices = ServiceLoader.load(RouteService.class);

		// searches for technology adapter service
		for (RouteService routeService : restServices) {
			if (routeService instanceof TechnologyAdapterRouteService) {
				technologyAdapterRestService = (TechnologyAdapterRouteService) routeService;
			}
		}

		if (technologyAdapterRestService == null) {
			throw new RuntimeException("Fatal error: TechnologyAdapterRouteService isn't present in the classpath");
		}

		// initializes REST services
		List<RouteService> initializedServices = new ArrayList<>();
		for (RouteService routeService : restServices) {
			String name = routeService.getClass().getName();
			try {
				logger.log(Level.INFO, "Initializing REST service " + name);
				routeService.initialize(this, serviceManager);
				initializedServices.add(routeService);

				if (routeService instanceof TechnologyAdapterRouteService) {
					technologyAdapterRestService = (TechnologyAdapterRouteService) routeService;
				}
			} catch (Exception e) {
				logger.log(Level.SEVERE, "Unable to initialize REST service " + name, e);
			}
		}

		// adds routes for initialized service
		for (RouteService routeService : initializedServices) {
			routeService.addRoutes(vertx, router);
		}

		// adds static content
		StaticHandler staticHandler = StaticHandler.create();
		router.get("/*").handler(staticHandler);

		server = vertx.createHttpServer(serverOptions);
		server.requestHandler(router::accept);
		server.websocketHandler(new ConnieHandler(serviceManager, technologyAdapterRestService));

		logger.info("Starting HTTP Server on " + host + ":" + port);
		server.listen(port, host);
	}

	private void failed(RoutingContext context) {

	}

	public TechnologyAdapterRouteService getTechnologyAdapterRestService() {
		return technologyAdapterRestService;
	}

	@Override
	public void stop() {
		server.close();
	}



}
