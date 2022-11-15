package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.fml.FlexoBehaviour;
import org.openflexo.foundation.fml.PropertyCardinality;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.http.server.core.helpers.Helpers;

import java.util.Arrays;

public class BehaviourValidator {
    private final HttpServerRequest request;
    private final String [] visibilities = {"public", "protected", "default", "private"};
    private final String [] behaviourType = {"action", "cloning", "creation", "deletion", "event", "synchronization", "navigation"};
    private boolean isValide;
    private JsonArray errors;
    private String name;
    private String description;
    private boolean isAbstract;
    private Class<? extends FlexoBehaviour> type;
    private Visibility visibility;

    public BehaviourValidator(HttpServerRequest request) {
        this.request                = request;
        isValide                    = false;
    }

    public JsonArray validate(){
        String rName        = request.getFormAttribute("name").trim();
        String rVisibility  = request.getFormAttribute("visibility");
        String rDescription = request.getFormAttribute("description");
        String rIsAbstract  = request.getFormAttribute("is_abstract");
        String rType        = request.getFormAttribute("type");
        errors              = new JsonArray();

        JsonObject errorLine;


        if(!rName.isEmpty()){
            if(rName.contains(" ")){
                errorLine = new JsonObject();
                errorLine.put("name", "Invalid value");
                errors.add(errorLine);
            } else {
                name = rName;
            }
        } else {
            errorLine = new JsonObject();
            errorLine.put("name", "field required");
            errors.add(errorLine);
        }

        if(rVisibility != null && !rVisibility.isEmpty()){
            if(!Arrays.asList(visibilities).contains(rVisibility)){
                errorLine = new JsonObject();
                errorLine.put("visibility", "Invalid value");
                errors.add(errorLine);
            } else {
                visibility = Helpers.getVisibility(rVisibility);
            }
        } else {
            errorLine = new JsonObject();
            errorLine.put("cardinality", "field required");
            errors.add(errorLine);
        }

        if(rType != null && !rType.isEmpty()){
            if(!Arrays.asList(behaviourType).contains(rType)){
                errorLine = new JsonObject();
                errorLine.put("type", "Invalid value");
                errors.add(errorLine);
            } else {
                type = Helpers.getBehaviourType(rType);
            }
        } else {
            errorLine = new JsonObject();
            errorLine.put("type", "Field required");
            errors.add(errorLine);
        }

        if(rIsAbstract != null && !rIsAbstract.isEmpty()){
            if(rIsAbstract.equalsIgnoreCase("true") || rIsAbstract.equals("1")){
                isAbstract = true;
            } else if(rIsAbstract.equalsIgnoreCase("false") || rIsAbstract.equals("0")){
                isAbstract = false;
            } else {
                errorLine = new JsonObject();
                errorLine.put("is_abstract", "Invalid value");
                errors.add(errorLine);
            }
        } else {
            isAbstract = false;
        }

        description = rDescription;

        if(errors.isEmpty())
            isValide = true;

        return errors;
    }

    public boolean isValide() {
        return isValide;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isAbstract() {
        return isAbstract;
    }

    public Class<? extends FlexoBehaviour> getType() {
        return type;
    }

    public Visibility getVisibility() {
        return visibility;
    }
}
