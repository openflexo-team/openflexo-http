package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.connie.DataBinding;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import java.lang.reflect.Type;

public class BehaviourParameterValidator extends GenericValidator{

    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private Type type;
    private DataBinding<?> defaultValue;
    private boolean isRequired;
    private String description;

    public BehaviourParameterValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    public JsonArray validate(){
        String rName        = request.getFormAttribute("name").trim();
        String rType        = request.getFormAttribute("type");
        String rDefValue    = request.getFormAttribute("default_Value");
        String rDescription = request.getFormAttribute("description");
        String rIsRequired  = request.getFormAttribute("is_required");
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
            type = validatePrimitiveType(rType).getType();
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("type", e);
            errors.add(errorLine);
        }

        try{
            isRequired = validateBoolean(rIsRequired);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("is_Required", e);
            errors.add(errorLine);
        }

        try{
            defaultValue = validateObjectValue(rDefValue, rType);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("default_value", e);
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

    public Type getType() {
        return type;
    }

    public Object getDefaultValue() {
        return defaultValue;
    }

    public boolean isRequired() {
        return isRequired;
    }

    public String getDescription() {
        return description;
    }
}
