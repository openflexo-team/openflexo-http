package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;

import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.action.AddRepositoryFolder;
import org.openflexo.foundation.action.CreateProject;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rm.VirtualModelResourceFactory;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.foundation.resource.*;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.FolderValidator;
import org.openflexo.http.server.core.validators.ProjectsValidator;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.python.jline.internal.Log;

import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.Enumeration;

/**
 *  Projects rest apis controller.
 * @author Ihab Benamer
 */
public class ProjectsController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;
    private final ProjectLoader projectLoader;
    private final DefaultFlexoEditor editor;

    /**
     * Instantiates a new Projects controller.
     *
     * @param projectLoader the project loader
     */
    public ProjectsController(VirtualModelLibrary virtualModelLibrary, ProjectLoader projectLoader) {
        this.virtualModelLibrary    = virtualModelLibrary;
        this.projectLoader          = projectLoader;
        editor                      = Helpers.getDefaultFlexoEditor(virtualModelLibrary);
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
        String id               = context.request().getParam("id").trim();
        FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);

        if (project != null){
            context.response().end(JsonSerializer.projectSerializer(project).encodePrettily());
        } else {
            notFound(context);
        }

    }

    public void edit(RoutingContext context) {}
    public void delete(RoutingContext context) {}


    public void folders(RoutingContext context) {
        String id               = context.request().getParam("id").trim();
        FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);

        JsonArray result = new JsonArray();

        for (RepositoryFolder folder: project.getRootFolder().getChildren()) {
            result.add(JsonSerializer.folderSerializer(folder));
        }
        context.response().end(result.encodePrettily());
    }

    public void addFolder(RoutingContext context) {
        String id                   = context.request().getParam("id").trim();
        FlexoProject<?> project     = ProjectsRepository.getProjectById(virtualModelLibrary, id);
        FolderValidator validator   = new FolderValidator(context.request());
        JsonArray errors            = validator.validate();

        if(validator.isValid()){
            // TODO: add validation rule for the parent field
            RepositoryFolder parent = Helpers.getFolderFromPath(validator.getParent(), project);

            if (parent == null) {
                parent = project.getRootFolder();
            }

            AddRepositoryFolder addRepositoryFolder = AddRepositoryFolder.actionType.makeNewAction(parent, null, editor);
            addRepositoryFolder.setNewFolderName(validator.getName());
            addRepositoryFolder.doAction();

            context.response().end(JsonSerializer.folderSerializer(addRepositoryFolder.getNewFolder()).encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }

}
