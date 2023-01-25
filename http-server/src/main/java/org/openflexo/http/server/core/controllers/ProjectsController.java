package org.openflexo.http.server.core.controllers;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.FileUpload;
import io.vertx.ext.web.RoutingContext;

import org.apache.commons.io.FileUtils;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoEditor;
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
import org.openflexo.foundation.utils.ProjectInitializerException;
import org.openflexo.foundation.utils.ProjectLoadingCancelledException;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.FolderValidator;
import org.openflexo.http.server.core.validators.ProjectsValidator;
import org.openflexo.http.server.core.validators.ResourceCentersValidator;
import org.openflexo.http.server.core.validators.VirtualModelsValidator;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.toolbox.ZipUtils;
import org.python.jline.internal.Log;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

/**
 *  Projects rest apis controller.
 * @author Ihab Benamer
 */
public class ProjectsController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;
    private final TechnologyAdapterRouteService technologyAdapterRestService;
    private final ProjectLoader projectLoader;
    private final DefaultFlexoEditor editor;
    private final static String resourceCentersLocation = "/Users/mac/openflexo/2.0.1/openflexo-http/http-connector-rc/src/main/resources/API/";

    /**
     * Instantiates a new Projects controller.
     *
     * @param projectLoader the project loader
     */
    public ProjectsController(VirtualModelLibrary virtualModelLibrary, ProjectLoader projectLoader, TechnologyAdapterRouteService technologyAdapterRestService) {
        this.virtualModelLibrary            = virtualModelLibrary;
        this.projectLoader                  = projectLoader;
        this.technologyAdapterRestService   = technologyAdapterRestService;
        editor                              = Helpers.getDefaultFlexoEditor(virtualModelLibrary);
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

    /**
     * It deletes a project
     *
     * @param context the routing context
     */
    public void delete(RoutingContext context) {
        String id               = context.request().getParam("id").trim();
        FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);

        if (project != null){
            virtualModelLibrary.getServiceManager().getProjectLoaderService().removeFromRootProjects(project);
            project.delete();

            emptyResponse(context);
        } else {
            notFound(context);
        }
    }

    /**
     * It gets the project id from the request, gets the project from the repository, creates a new JsonArray, iterates
     * over the project's root folder's children, and adds each child to the JsonArray
     *
     * @param context the context of the request
     */
    public void folders(RoutingContext context) {
        String id               = context.request().getParam("id").trim();
        FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);
        JsonArray result        = new JsonArray();

        for (RepositoryFolder folder: project.getRootFolder().getChildren()) {
            result.add(JsonSerializer.folderSerializer(folder));
        }
        context.response().end(result.encodePrettily());
    }

    /**
     * It adds a folder to a project
     *
     * @param context the routing context
     */
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

    /**
     *  It takes a file upload, unzips it, and loads the project contained in it
     *
     * @param context the routing context
     */
    public void upload(RoutingContext context) {
        ProjectsValidator validator = new ProjectsValidator(projectLoader, context.request());
        JsonArray errors            = validator.validateUpload(context.fileUploads());

        if(validator.isValid()){
            List<FileUpload> fileUploadSet          = context.fileUploads();
            Iterator<FileUpload> fileUploadIterator = fileUploadSet.iterator();
            JsonArray results 					    = new JsonArray();

            while (fileUploadIterator.hasNext()){
                FileUpload fileUpload 	                = fileUploadIterator.next();
                Buffer uploadedFile 	                = context.vertx().fileSystem().readFileBlocking(fileUpload.uploadedFileName());
                byte[] buffredBytes 	                = uploadedFile.getBytes();
                FlexoResourceCenter<?> resourceCenter   = projectLoader.getServiceManager().getResourceCenterService().getFlexoResourceCenter(IdUtils.decodeId(validator.getRcId()));


                try {
                    String targetDir 	= resourceCenter.getRootFolder().getFullQualifiedPath();

                    File uploadedRc 	= new File(resourceCentersLocation + "uploaded_rc.zip");

                    FileUtils.writeByteArrayToFile(uploadedRc, buffredBytes);
                    ZipUtils.unzipFile(resourceCentersLocation + "uploaded_rc.zip", targetDir);

//                    //Delete unnecessary files
                    uploadedRc.delete();

                    try{
                        Files.walk(Paths.get(resourceCentersLocation + "uploaded_rc/__MACOSX/")).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
                    } catch(NoSuchFileException e){
                        Log.warn("No __MACOSX folder to delete");
                    }

                    try{
                        Files.walk(Paths.get(resourceCentersLocation + "uploaded_rc/.DS_Store")).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
                    } catch(NoSuchFileException e){
                        Log.warn("No DS_Store file to delete");
                    }

                    File[] files = new File(targetDir).listFiles();

                    for (File containedResource: files) {
                        if (containedResource.getName().endsWith(".prj")){
                            String projectPath = targetDir + "/" + containedResource.getName();

                            try {
                                FlexoEditor project = projectLoader.loadProject(new File(projectPath));
                                results.add(JsonSerializer.projectSerializer(project.getProject()));
                            } catch (ProjectLoadingCancelledException | ProjectInitializerException e) {
                                Log.error(e.getMessage());
                            }
                        }
                    }

                } catch (IOException e) {
                    badRequest(context);
                }
            }
            Log.info("request status : " + context.request().isEnded());
            context.response().end(results.encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }

    /**
     * It gets the project id from the request, gets the project from the repository, and then returns a JSON array of all
     * the resources in the project
     *
     * @param context the context of the request
     */
    public void resources(RoutingContext context) {
        String id               = context.request().getParam("id").trim();
        FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);

        if (project != null){
            JsonArray result = new JsonArray();
            for (FlexoResource<?> resource : project.getAllResources()) {
                result.add(JsonUtils.getResourceDescription(resource, technologyAdapterRestService));
            }
            context.response().end(result.encodePrettily());

        } else {
            notFound(context);
        }
    }

    /**
     * It loads all the resources of a project
     *
     * @param context the routing context
     */
    public void loadResources(RoutingContext context){
        String id               = context.request().getParam("id").trim();
        FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, id);
        JsonArray loaded        = new JsonArray();
        JsonArray failed        = new JsonArray();
        JsonObject results      = new JsonObject();

        if (project != null){

            for (FlexoResource<?> resource : project.getAllResources()) {
                try {
                    resource.loadResourceData();
                    loaded.add(JsonSerializer.getResourceDescription(resource, technologyAdapterRestService));
                } catch (ResourceLoadingCancelledException | FileNotFoundException | FlexoException e) {
                    failed.add(JsonSerializer.getResourceDescription(resource, technologyAdapterRestService));
                }
            }

            results.put("Loaded", loaded);
            results.put("Failed", failed);
            context.response().end(results.encodePrettily());
        } else {
            notFound(context);
        }
    }
}