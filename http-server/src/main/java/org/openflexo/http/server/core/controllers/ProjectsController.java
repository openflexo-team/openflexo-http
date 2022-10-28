package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;

import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.action.CreateProject;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.foundation.resource.*;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.python.jline.internal.Log;

public class ProjectsController extends GenericController {

    private final ProjectLoader projectLoader;
    public ProjectsController(ProjectLoader projectLoader) {
        this.projectLoader = projectLoader;
    }

    public void list(RoutingContext context) {}
    public void get(RoutingContext context) {}
    public void add(RoutingContext context) {}
    public void edit(RoutingContext context) {}
    public void delete(RoutingContext context) {}


}
