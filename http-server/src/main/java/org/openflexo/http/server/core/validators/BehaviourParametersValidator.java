package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.connie.DataBinding;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import java.lang.reflect.Type;

/**
 * The Behaviour Parameters validator class.
 *
 * @author Ihab Benamer
 */
public class BehaviourParametersValidator extends GenericValidator{

    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private Type type;
    private DataBinding<?> defaultValue;
    private boolean isRequired;
    private String description;

    /**
     * Instantiates a new Behaviour parameter validator.
     *
     * @param request the request
     */
    public BehaviourParametersValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    /**
     * It validates the form data and returns a JsonArray of errors
     * 
     * @return A JsonArray of JsonObjects. Each JsonObject contains a key-value pair of the form:
     * ```
     * {
     *     "name": "error message"
     * }
     * ```
     */
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
            errorLine.put("name", e.getMessage());
            errors.add(errorLine);
        }

        try{
            type = validatePrimitiveType(rType).getType();
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("type", e.getMessage());
            errors.add(errorLine);
        }

        try{
            isRequired = validateBoolean(rIsRequired);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("is_Required", e.getMessage());
            errors.add(errorLine);
        }

        try{
            defaultValue = validateObjectValue(rDefValue, rType);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("default_value", e.getMessage());
            errors.add(errorLine);
        }

        description = validateDescription(rDescription);

        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    /**
     * Returns true if the object is valid, false otherwise.
     * 
     * @return The boolean value of isValid.
     */
    public boolean isValid() {
        return isValid;
    }

    /**
     * This method returns the name of the parameter.
     * 
     * @return The name of the person.
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the type of the parameter.
     * 
     * @return The type of the variable.
     */
    public Type getType() {
        return type;
    }

    /**
     * Returns the default value of the parameter.
     * 
     * @return The default value of the field.
     */
    public Object getDefaultValue() {
        return defaultValue;
    }

    /**
     * Returns true if the field is required
     * 
     * @return The value of the isRequired variable.
     */
    public boolean isRequired() {
        return isRequired;
    }

    /**
     * This method returns the description of the object
     * 
     * @return The description of the item.
     */
    public String getDescription() {
        return description;
    }
}
