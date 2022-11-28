package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;

import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.action.CreateProject;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.foundation.resource.*;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.ProjectsValidator;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.python.jline.internal.Log;

/**
 *  Projects rest apis controller.
 * @author Ihab Benamer
 */
public class ProjectsController extends GenericController {

    private final ProjectLoader projectLoader;

    /**
     * Instantiates a new Projects controller.
     *
     * @param projectLoader the project loader
     */
    public ProjectsController(ProjectLoader projectLoader) {
        this.projectLoader = projectLoader;
    }

    /**
     * It creates a JSON array, iterates over all the projects in the project loader, and adds a JSON representation of
     * each project to the array
     *
     * @param context the routing context
     */
    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();

        for (FlexoProject<?> project : projectLoader.getRootProjects()) {
            result.add(JsonSerializer.projectSerializer(project));
        }

        context.response().end(result.encodePrettily());
    }

    /**
     * It creates a new project
     *
     * @param context The routing context is a wrapper around the request and response objects. It also contains the
     * request body and the parsed parameters.
     */
    public void add(RoutingContext context) {
        ProjectsValidator validator = new ProjectsValidator(projectLoader, context.request());
        JsonArray errors            = validator.validate();

        if(validator.isValid()){
            FlexoResourceCenter<?> rc   = projectLoader.getServiceManager().getResourceCenterService().getFlexoResourceCenter(IdUtils.decodeId(validator.getRcId()));
            CreateProject action        = CreateProject.actionType.makeNewAction((RepositoryFolder) rc.getRootFolder(), null, projectLoader.getServiceManager().getDefaultEditor());

            action.setNewProjectName(validator.getName());
            action.doAction();

            FlexoProject<?> project = action.getNewProject();

            projectLoader.getRootProjects().add(project);

            context.response().end(JsonSerializer.projectSerializer(project).encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }

    /**
     * It gets the project id from the request, decodes it, finds the project in the project loader, and if it exists,
     * serializes it and sends it back to the client
     *
     * @param context the routing context
     */
    public void get(RoutingContext context) {
        String projectId        = context.request().getParam("id").trim();
        String uri              = IdUtils.decodeId(projectId);
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
