package org.openflexo.http.server;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

/**
 * Interface allowing to extends HTTP REST service
 */
public interface RouteService<Context> {

	String JSON = "application/json";

	void initialize(HttpService service, Context context) throws Exception;

	default void addRoutes(Vertx vertx, Router router) { /* Do nothing by default. */ }

//	default void notFound(RoutingContext context) {
//		context.response().setStatusCode(404).close();
//	}
//
//	default void error(RoutingContext context, Exception e) {
//		HttpServerResponse response = context.response();
//		response.write("{ error: '"+ e.getClass().getSimpleName() +"'; message: '" + e.getMessage() +"'; stackTrace: ''}");
//		response.setStatusCode(500);
//		response.close();
//	}
//
//	default void badRequest(RoutingContext context) {
//		HttpServerResponse response = context.response();
//		response.setStatusCode(400);
//		response.close();
//	}

}
