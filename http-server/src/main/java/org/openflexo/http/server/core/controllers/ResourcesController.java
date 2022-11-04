package org.openflexo.http.server.core.controllers;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.ResourceManager;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.rm.Resource;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;

public class ResourcesController extends GenericController{

    private final ResourceManager resourceManager;
    private final TechnologyAdapterRouteService technologyAdapterRestService;

    public ResourcesController(ResourceManager resourceManager, TechnologyAdapterRouteService technologyAdapterRestService) {
        this.resourceManager                = resourceManager;
        this.technologyAdapterRestService   = technologyAdapterRestService;
    }

    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();
        for (FlexoResource<?> resource : resourceManager.getRegisteredResources()) {
            result.add(JsonUtils.getResourceDescription(resource, technologyAdapterRestService));
        }
        context.response().end(result.encodePrettily());
    }

    public void get(RoutingContext context) {
        String id = context.request().getParam(("rid"));
        String uri = IdUtils.decodeId(id);

        FlexoResource<?> resource = resourceManager.getResource(uri);
        if (resource != null) {
            context.response().end(JsonUtils.getResourceDescription(resource, technologyAdapterRestService).encodePrettily());
        }
        else {
            notFound(context);
        }
    }

    public void process(RoutingContext context) {
        String id = context.request().getParam(("rid"));
        String uri = IdUtils.decodeId(id);

        FlexoResource<?> resource = resourceManager.getResource(uri);
        if (resource != null) {
            try {
                resource.save();
                context.response().end(JsonUtils.getResourceDescription(resource, technologyAdapterRestService).encodePrettily());
            } catch (SaveResourceException e) {
                error(context, e);
            }
        }
        else {
            notFound(context);
        }
    }

    public void contents(RoutingContext context) {
        String id = context.request().getParam(("rid"));
        String uri = IdUtils.decodeId(id);

        FlexoResource<?> resource = resourceManager.getResource(uri);
        if (resource != null) {
            context.response().putHeader("Content-Disposition", "filename=\"" + resource.getName() + "\"");
            Resource artefactAsResource = resource.getIODelegate().getSerializationArtefactAsResource();
            try (InputStream inputStream = new BufferedInputStream(artefactAsResource.openInputStream())) {
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
        }
        else {
            notFound(context);
        }
    }
}
