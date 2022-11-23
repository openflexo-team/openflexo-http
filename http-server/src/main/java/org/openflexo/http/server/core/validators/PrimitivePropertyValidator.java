package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.fml.PropertyCardinality;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.helpers.Helpers;

import java.util.Arrays;

/**
 * The Properties validator class.
 *
 * @author Ihab Benamer
 */
public class PrimitivePropertyValidator extends GenericValidator {

    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private PrimitiveType type;
    private PropertyCardinality cardinality;
    private String description;

    /**
     * Instantiates a new Primitive property validator.
     *
     * @param request the request
     */
    public PrimitivePropertyValidator(HttpServerRequest request) {
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
        String rCardinality = request.getFormAttribute("cardinality");
        String rDescription = request.getFormAttribute("description");
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
            type = validatePrimitiveType(rType);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("type", e.getMessage());
            errors.add(errorLine);
        }

        try{
            cardinality = validateCardinality(rCardinality);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("cardinality", e.getMessage());
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
     * This method returns the name of the property.
     * 
     * @return The name of the person.
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the type of this primitive.
     * 
     * @return The type of the variable.
     */
    public PrimitiveType getType() {
        return type;
    }

    /**
     * > Returns the cardinality of the property
     * 
     * @return The cardinality of the property.
     */
    public PropertyCardinality getCardinality() {
        return cardinality;
    }

    /**
     * This method returns the description of the property
     * 
     * @return The description of the item.
     */
    public String getDescription() {
        return description;
    }
}
