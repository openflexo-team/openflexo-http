package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.fml.PropertyCardinality;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.helpers.Helpers;

import java.util.Arrays;

public class PrimitivePropertyValidator extends GenericValidator {

    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private PrimitiveType type;
    private PropertyCardinality cardinality;
    private String description;

    public PrimitivePropertyValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    public JsonArray validate(){
        String rName        = request.getFormAttribute("name").trim();
        String rType        = request.getFormAttribute("type");
        String rCardinality = request.getFormAttribute("cardinality");
        String rDescription = request.getFormAttribute("description");
        errors              = new JsonArray();

        JsonObject errorLine;

        try{
            name = validateName(rName);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("name", e);
            errors.add(errorLine);
        }

        try{
            type = validatePrimitiveType(rType);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("type", e);
            errors.add(errorLine);
        }

        try{
            cardinality = validateCardinality(rCardinality);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("cardinality", e);
            errors.add(errorLine);
        }

        description = validateDescription(rDescription);

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

    public PrimitiveType getType() {
        return type;
    }

    public PropertyCardinality getCardinality() {
        return cardinality;
    }

    public String getDescription() {
        return description;
    }
}
