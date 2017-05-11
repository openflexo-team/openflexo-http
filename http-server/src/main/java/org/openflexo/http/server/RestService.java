package org.openflexo.http.server;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

/**
 * Interface allowing to extends HTTP REST service
 */
public interface RestService<Context> {

	String JSON = "application/json";

	void initialize(HttpService service, Context context) throws Exception;

	void addRoutes(Vertx vertx, Router router);

	default void notFound(RoutingContext context) {
		context.response().setStatusCode(404).close();
	}

}
