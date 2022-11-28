package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.connie.DataBinding;
import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.fml.rt.logging.FMLConsole;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.helpers.Helpers;

import java.lang.reflect.Type;
import java.util.Arrays;

/**
 * The Behaviour Actions validator class.
 *
 * @author Ihab Benamer
 */
public class BehaviourActionValidator extends GenericValidator {
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private FMLConsole.LogLevel logLevel;
    private String value;

    /**
     * Instantiates a new Behaviour parameter validator.
     *
     * @param request the request
     */
    public BehaviourActionValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    public JsonArray validateLogAction(){
        String rValue   = request.getFormAttribute("value").trim();
        String rLevel   = request.getFormAttribute("level");
        errors          = new JsonArray();

        JsonObject errorLine;

        try{
            value = validateString(rValue);
            if (value.charAt(0) != '"')
                value = "\"" + value;
            if (value.charAt(value.length() - 1) != '"')
                value += "\"";

        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("value", e.getMessage());
            errors.add(errorLine);
        }

        try{
            logLevel = validateLogLevel(rLevel);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("level", e.getMessage());
            errors.add(errorLine);
        }


        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    public boolean isValid() {
        return isValid;
    }

    public FMLConsole.LogLevel getLogLevel() {
        return logLevel;
    }

    public String getValue() {
        return value;
    }
}
