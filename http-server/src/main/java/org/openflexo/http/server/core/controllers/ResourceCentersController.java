package org.openflexo.http.server.core.controllers;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.FileUpload;
import io.vertx.ext.web.RoutingContext;
import org.apache.commons.io.FileUtils;
import org.openflexo.foundation.resource.*;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.core.validators.ProjectsValidator;
import org.openflexo.http.server.core.validators.ResourceCentersValidator;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.toolbox.ZipUtils;
import org.python.jline.internal.Log;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Resource centers rest apis controller.
 *
 * @author Ihab Benamer
 */
public class ResourceCentersController extends GenericController {

    private final FlexoResourceCenterService resourceCenterService;
    private final TechnologyAdapterRouteService technologyAdapterRestService;
    private final static String resourceCentersLocation = "/Users/mac/openflexo/2.0.1/openflexo-http/http-connector-rc/src/main/resources/API/";

    /**
     * Instantiates a new Resource centers controller.
     *
     * @param resourceCenterService        the resource center service
     * @param technologyAdapterRestService the technology adapter rest service
     */
    public ResourceCentersController(FlexoResourceCenterService resourceCenterService, TechnologyAdapterRouteService technologyAdapterRestService){
        this.resourceCenterService          = resourceCenterService;
        this.technologyAdapterRestService   = technologyAdapterRestService;
    }

    /**
     * It creates a JSON array, iterates over all the resource centers, and adds a JSON object to the array for each
     * resource center
     *
     * @param context the routing context
     */
    public void list(RoutingContext context) {
        JsonArray result = new JsonArray();
        for (FlexoResourceCenter<?> center : resourceCenterService.getResourceCenters()) {
            result.add(JsonUtils.getCenterDescription(center));
        }
        context.response().end(result.encodePrettily());
    }

    /**
     * It gets the resource center id from the request, decodes it, gets the resource center from the service, and returns
     * a JSON representation of the resource center
     *
     * @param context the context of the request
     */
    public void get(RoutingContext context) {
        String centerId = context.request().getParam(("rcid"));
        String uri      = IdUtils.decodeId(centerId);

        FlexoResourceCenter<?> resourceCenter = resourceCenterService.getFlexoResourceCenter(uri);
        if (resourceCenter != null) {
            context.response().end(JsonUtils.getCenterDescription(resourceCenter).encodePrettily());
        }
        else {
            notFound(context);
        }
    }

    /**
     * It gets the resource center from the request, and returns a JSON array of all the resources in that resource center
     *
     * @param context the context of the request
     */
    public void resources(RoutingContext context) {
        String centerId     = context.request().getParam(("rcid"));
        String centerUri    = IdUtils.decodeId(centerId);

        FlexoResourceCenter<?> resourceCenter = resourceCenterService.getFlexoResourceCenter(centerUri);
        if (resourceCenter != null) {
            JsonArray result = new JsonArray();
            for (FlexoResource<?> resource : resourceCenter.getAllResources()) {
                result.add(JsonUtils.getResourceDescription(resource, technologyAdapterRestService));
            }
            context.response().end(result.encodePrettily());
        }
        else {
            notFound(context);
        }
    }

    /**
     * It takes a path, and returns a list of resources and folders contained in the folder corresponding to the path
     *
     * @param context the routing context
     */
    public void resourceFolder(RoutingContext context) {
        String centerId     = context.request().getParam(("rcid"));
        String centerUri    = IdUtils.decodeId(centerId);

        String path         = context.request().path();
        String pathFragment = "resource";
        String folder       = path.substring(path.lastIndexOf(pathFragment) + pathFragment.length());

        String[] fragments  = IdUtils.decodeUrlSpecialCharacters(folder).split("/");

        FlexoResourceCenter<Object> resourceCenter = (FlexoResourceCenter<Object>) resourceCenterService.getFlexoResourceCenter(centerUri);
        if (resourceCenter != null) {
            Object current = resourceCenter.getBaseArtefact();
            if (fragments.length > 0) {
                for (String fragment : fragments) {
                    if (fragment.length() == 0)
                        continue;

                    List<Object> children = resourceCenter.getContents(current);
                    boolean found = false;
                    for (Object child : children) {
                        if (fragment.equals(resourceCenter.retrieveName(child))) {
                            current = child;
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        current = null;
                        break;
                    }
                }
            }

            if (current != null) {
                JsonArray result = new JsonArray();
                List<Object> children = resourceCenter.getContents(current);
                for (Object child : children) {
                    String name = resourceCenter.retrieveName(child);
                    if (resourceCenter.isDirectory(child)) {
                        result.add(JsonUtils.getFolderDescription(name, folder, centerId));
                    }
                    else {
                        FlexoResource resource = resourceCenter.getResource(child, FlexoResource.class);
                        if (resource != null) {
                            result.add(JsonUtils.getResourceDescription(resource, technologyAdapterRestService));
                        }
                    }
                }
                context.response().end(result.encodePrettily());
            }
            else {
                notFound(context);
            }
        }
        else {
            notFound(context);
        }
    }

    /**
     * > The function validates the request, if the request is valid, it creates a new resource center and adds it to the
     * resource center service
     *
     * @param context the routing context
     */
    public void add(RoutingContext context){
        ResourceCentersValidator validator  = new ResourceCentersValidator(context.request());
        JsonArray errors                    = validator.validate();

        if(validator.isValide()){
            DirectoryResourceCenter center  = null;
            try {
                center = DirectoryResourceCenter.instanciateNewDirectoryResourceCenter(new File(validator.getRcPath()), resourceCenterService);
                resourceCenterService.addToResourceCenters(center);
                context.response().end(JsonUtils.getCenterDescription(center).encodePrettily());
            } catch (IOException e) {
                badRequest(context);
            }
        } else {
            badValidation(context, errors);
        }
    }

    /**
     * It takes a zip file, unzips it, deletes the unnecessary files, and adds the resource center to the resource center
     * service
     *
     * @param context the context of the request
     */
    public void upload(RoutingContext context){
        ResourceCentersValidator validator  = new ResourceCentersValidator(context.request());
        JsonArray errors                    = validator.validateUpload(context.fileUploads());

        if(validator.isValide()){
            Set<FileUpload> fileUploadSet 			= context.fileUploads();
            Iterator<FileUpload> fileUploadIterator = fileUploadSet.iterator();
            JsonObject response 					= new JsonObject();
            int counter								= 1;

            while (fileUploadIterator.hasNext()){
                FileUpload fileUpload 	= fileUploadIterator.next();
                Buffer uploadedFile 	= context.vertx().fileSystem().readFileBlocking(fileUpload.uploadedFileName());
                byte[] buffredBytes 	= uploadedFile.getBytes();

                try {
                    String targetDir    = resourceCentersLocation + "uploaded_rc/";
                    File uploadedRc     = new File(resourceCentersLocation + "uploaded_rc.zip");

                    FileUtils.writeByteArrayToFile(uploadedRc, buffredBytes);
                    ZipUtils.unzipFile(resourceCentersLocation + "uploaded_rc.zip",targetDir);

                    //Delete unnecessary files
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

                    if(files != null && files.length > 0 && files[0].getName().endsWith(".prj")){
                        targetDir += files[0].getName();
                    }

                    DirectoryResourceCenter center = DirectoryResourceCenter.instanciateNewDirectoryResourceCenter(new File(targetDir), resourceCenterService);
                    resourceCenterService.addToResourceCenters(center);
                    response.put("rc" + counter, JsonUtils.getCenterDescription(center));

                    counter++;
                } catch (IOException e) {
                    badRequest(context);
                }
            }
            context.response().end(response.encodePrettily());
        } else {
            badValidation(context, errors);
        }
    }
}
