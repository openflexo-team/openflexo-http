package org.openflexo.http.server.core.controllers;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;

public class GenericController {

    public void notFound(RoutingContext context) {
        context.response().setStatusCode(404).close();
    }

    public void error(RoutingContext context, Exception e) {
        HttpServerResponse response = context.response();
        response.write("{ error: '"+ e.getClass().getSimpleName() +"'; message: '" + e.getMessage() +"'; stackTrace: ''}");
        response.setStatusCode(500);
        response.close();
    }

    public void badRequest(RoutingContext context) {
        HttpServerResponse response = context.response();
        response.setStatusCode(400);
        response.close();
    }

    public void badValidation(RoutingContext context, JsonArray errors) {
        HttpServerResponse response = context.response();
        response.setStatusCode(200);
        response.end(errors.encodePrettily());
    }
}
