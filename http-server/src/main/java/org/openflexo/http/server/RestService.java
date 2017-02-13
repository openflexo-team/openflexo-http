package org.openflexo.http.server;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoServiceManager;

/**
 * Interface allowing to extends HTTP REST service
 */
public interface RestService {

	String JSON = "application/json";

	void initialize(FlexoServiceManager serviceManager) throws Exception;

	void addRoutes(Vertx vertx, Router router);

	default void notFound(RoutingContext context) {
		context.response().setStatusCode(404).close();
	}

}
