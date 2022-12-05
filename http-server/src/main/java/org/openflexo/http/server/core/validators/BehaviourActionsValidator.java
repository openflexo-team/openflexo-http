package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.rt.logging.FMLConsole;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.pamela.annotations.Getter;

import java.util.List;

/**
 * The Behaviour Actions validator class.
 *
 * @author Ihab Benamer
 */
public class BehaviourActionsValidator extends GenericValidator {
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private FMLConsole.LogLevel logLevel;
    private String value;
    private String left;
    private String right;
    /**
     * Instantiates a new Behaviour parameter validator.
     *
     * @param request the request
     */
    public BehaviourActionsValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    /**
     * It validates that the given side is a valid side for the given behaviour
     *
     * @param side the value to validate
     * @param behaviour the behaviour that is being edited
     * @return The side
     */
    public String validateAssignationSide(String side, FlexoBehaviour behaviour) throws BadValidationException {
        side = validateName(side);

        if(side.startsWith("parameters.")){
            for (FlexoBehaviourParameter parameter: behaviour.getParameters()){
                if(parameter.getName().equals(side.replace("parameters.", ""))){
                    return side;
                }
            }
        } else {
            for (FlexoProperty property: behaviour.getDeclaringVirtualModel().getDeclaredProperties()) {
                if(property.getPropertyName().equals(side)){
                    return side;
                }
            }
        }

        throw new BadValidationException("Invalid value");
    }

    public String validateList(String list, FlexoBehaviour behaviour) throws  BadValidationException {
        for (FlexoProperty property: behaviour.getDeclaringVirtualModel().getDeclaredProperties()) {
            if(property.getPropertyName().equals(list) && (property.getCardinality() == PropertyCardinality.ZeroMany || property.getCardinality() == PropertyCardinality.OneMany)){
                return list;
            }
        }

        throw new BadValidationException("Invalid value");
    }

    /**
     * It validates the input from the user and returns a JsonArray of errors
     *
     * @return A JsonArray of JsonObjects.
     */
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

    /**
     * It validates the assignation action
     *
     * @param behaviour the behaviour that is being edited
     * @return A JsonArray of JsonObjects.
     */
    public JsonArray validateAssignationAction(FlexoBehaviour behaviour){
        String rLeft    = request.getFormAttribute("left").trim();
        String rRight   = request.getFormAttribute("right").trim();
        errors          = new JsonArray();

        JsonObject errorLine;

        try{
            left = validateAssignationSide(rLeft, behaviour);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("source", e.getMessage());
            errors.add(errorLine);
        }

        try{
            right = validateAssignationSide(rRight, behaviour);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("target", e.getMessage());
            errors.add(errorLine);
        }

        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    public JsonArray validateAddToListAction(FlexoBehaviour behaviour){
        String rLeft    = request.getFormAttribute("left").trim();
        String rRight   = request.getFormAttribute("right").trim();
        errors          = new JsonArray();

        JsonObject errorLine;

        try{
            left = validateList(rLeft, behaviour);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("list", e.getMessage());
            errors.add(errorLine);
        }

        try{
            right = validateAssignationSide(rRight, behaviour);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("target", e.getMessage());
            errors.add(errorLine);
        }

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
     * This function returns the log level.
     *
     * @return The logLevel variable.
     */
    public FMLConsole.LogLevel getLogLevel() {
        return logLevel;
    }

    /**
     * This function returns the value of the variable value.
     *
     * @return The value of the variable value.
     */
    public String getValue() {
        return value;
    }

    /**
     * This function returns the left string.
     *
     * @return The left variable is being returned.
     */
    public String getLeft() {
        return left;
    }

    /**
     * This function returns the right string
     *
     * @return The right side of the equation.
     */
    public String getRight() {
        return right;
    }
}
