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

public class ResourceCentersValidator {
    private final static long MAX_UPLOAD_SIZE = 50 * 1000 * 1000;

    private final static String[] formats = {"application/zip"};
    private final HttpServerRequest request;
    private boolean isValide;
    private JsonArray errors;
    private String rcPath;

    public ResourceCentersValidator(HttpServerRequest request) {
        this.request    = request;
        isValide        = false;
    }

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

    public boolean isValide() {
        return isValide;
    }

    public String getRcPath() {
        return rcPath;
    }
}
