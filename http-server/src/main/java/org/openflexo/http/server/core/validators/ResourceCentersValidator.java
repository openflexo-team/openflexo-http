package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.FileUpload;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import java.util.Iterator;
import java.util.Set;

public class ResourceCentersValidator extends GenericValidator{

    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String rcPath;

    public ResourceCentersValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    public JsonArray validate(){
        String rRcPath  = request.getFormAttribute("rc_path");
        errors          = new JsonArray();

        JsonObject errorLine;

        try{
            rcPath = validatePath(rRcPath);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("rc_path", e);
            errors.add(errorLine);
        }

        if(errors.isEmpty())
            isValid = true;

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
                try{
                    validateFileUpload(fileUploadIterator);
                } catch (BadValidationException e){
                    errorLine = new JsonObject();
                    errorLine.put("File "+ counter, e);
                    errors.add(errorLine);
                }

                counter++;
            }
        }

        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    public boolean isValid() {
        return isValid;
    }

    public String getRcPath() {
        return rcPath;
    }
}
