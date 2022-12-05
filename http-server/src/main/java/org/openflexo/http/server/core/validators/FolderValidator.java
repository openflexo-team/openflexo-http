package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.http.server.core.exceptions.BadValidationException;

public class FolderValidator extends GenericValidator {
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String  name;

    public FolderValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    public JsonArray validate(){
        String rName        = request.getFormAttribute("name").trim();
        errors              = new JsonArray();

        JsonObject errorLine;

        try{
            name = validateName(rName);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("name", e.getMessage());
            errors.add(errorLine);
        }

        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    public boolean isValid() {
        return isValid;
    }

    public String getName() {
        return name;
    }
}
