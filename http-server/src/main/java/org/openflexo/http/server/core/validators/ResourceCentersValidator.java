package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.FileUpload;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Set;


/**
 * The Resource centers validator class.
 *
 * @author Ihab Benamer
 */
public class ResourceCentersValidator {
    private final static long MAX_UPLOAD_SIZE = 50 * 1000 * 1000;
    private final static String[] formats = {"application/zip"};
    private final HttpServerRequest request;
    private boolean isValide;
    private JsonArray errors;
    private String rcPath;

    /**
     * Instantiates a new Resource centers validator.
     *
     * @param request the request
     */
    public ResourceCentersValidator(HttpServerRequest request) {
        this.request  = request;
        isValide      = false;
    }

    /**
     * The function validates the form data and returns a JsonArray of errors
     *
     * @return A JsonArray of JsonObjects.
     */
    public JsonArray validate(){
        String rRcPath  = request.getFormAttribute("rc_path");
        errors          = new JsonArray();

        JsonObject errorLine;

        if(rRcPath == null || rRcPath.isEmpty()){
            errorLine = new JsonObject();
            errorLine.put("rc_path", "field required");
            errors.add(errorLine);
        } else {
            if(!Files.exists(Paths.get(rRcPath))){
                errorLine = new JsonObject();
                errorLine.put("rc_path", "invalid value");
                errors.add(errorLine);
            } else {
                rcPath = rRcPath;
            }

        }

        if(errors.isEmpty())
            isValide = true;

        return errors;
    }

    /**
     * It takes a set of file uploads, checks if the file name is valid, if the file size is smaller than the maximum
     * allowed size and if the file format is supported. If any of these conditions is not met, an error is added to the
     * error array
     *
     * @param fileUploadSet The set of files uploaded by the user
     * @return A JsonArray of errors
     */
    public JsonArray validateUpload(Set<FileUpload> fileUploadSet){
        Iterator<FileUpload> fileUploadIterator = fileUploadSet.iterator();
        errors                                  = new JsonArray();

        JsonObject errorLine;

        if(fileUploadSet.isEmpty()){
            errorLine = new JsonObject();
            errorLine.put("uploads", "No file uploaded");
            errors.add(errorLine);
        } else {
            int counter =1;
            while (fileUploadIterator.hasNext()){
                FileUpload fileUpload = fileUploadIterator.next();
                try {
                    URLDecoder.decode(fileUpload.fileName(), "UTF-8");

                    if(fileUpload.size() > MAX_UPLOAD_SIZE){
                        errorLine = new JsonObject();
                        errorLine.put("File "+ counter, "file too large (files must be smaller than " + MAX_UPLOAD_SIZE + " byte)");
                        errors.add(errorLine);
                    }

                    if(!Arrays.asList(formats).contains(fileUpload.contentType())){
                        errorLine = new JsonObject();
                        errorLine.put("File "+ counter, "Unsupported file format");
                        errors.add(errorLine);
                    }
                } catch (UnsupportedEncodingException e) {
                    errorLine = new JsonObject();
                    errorLine.put("File "+ counter, "Unsupported file name encoding");
                    errors.add(errorLine);
                }
                counter++;
            }
        }

        if(errors.isEmpty())
            isValide = true;

        return errors;
    }

    /**
     * This function checks if the user inputs are valid
     *
     * @return isValide
     */
    public boolean isValide() {
        return isValide;
    }

    /**
     * This function returns the resource center path
     *
     * @return The rcId is being returned.
     */
    public String getRcPath() {
        return rcPath;
    }
}
