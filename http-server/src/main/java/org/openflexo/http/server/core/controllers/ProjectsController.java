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

    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();

        for (FlexoProject<?> project : projectLoader.getRootProjects()) {
            result.add(JsonSerializer.projectSerializer(project));
        }

        context.response().end(result.encodePrettily());
    }

    public void add(RoutingContext context) {

        String name                 = context.request().getFormAttribute("name");
        String rcid                 = context.request().getFormAttribute("rcid");
        FlexoResourceCenter<?> rc   = projectLoader.getServiceManager().getResourceCenterService().getFlexoResourceCenter(IdUtils.decodeId(rcid));
        CreateProject action        = CreateProject.actionType.makeNewAction((RepositoryFolder) rc.getRootFolder(), null, projectLoader.getServiceManager().getDefaultEditor());

        action.setNewProjectName(name);
        action.doAction();

        FlexoProject<?> project = action.getNewProject();

        projectLoader.getRootProjects().add(project);
        context.response().end(JsonSerializer.projectSerializer(project).encodePrettily());
    }

    public void get(RoutingContext context) {
        String projectId    = context.request().getParam(("id"));
        String uri          = IdUtils.decodeId(projectId);

        FlexoProject<?> project = null;

        for (FlexoProject<?> prj : projectLoader.getRootProjects()) {
            if(prj.getProjectURI().equals(uri)){
                project = prj;
            }
        }

        if (project != null){
            context.response().end(JsonSerializer.projectSerializer(project).encodePrettily());
        } else {
            notFound(context);
        }

    }
    public void edit(RoutingContext context) {}
    public void delete(RoutingContext context) {}

}
