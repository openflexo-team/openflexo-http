package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.fml.PropertyCardinality;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ResourceCentersRepository;

import java.util.Arrays;

public class PrimitivePropertyValidator {

    private final HttpServerRequest request;
    private final String[] primitiveTypes = {"String", "Date", "Boolean", "Integer", "Byte", "Long", "Short", "Float", "Double"};
    private final String[] cardinalities = {"One", "ZeroMany", "OneMany", "ZeroOne"};
    private boolean isValide;
    private JsonArray errors;
    private String name;
    private PrimitiveType type;
    private PropertyCardinality cardinality;
    private String description;

    public PrimitivePropertyValidator(HttpServerRequest request) {
        this.request                = request;
        isValide                    = false;
    }

    public JsonArray validate(){
        String rName        = request.getFormAttribute("name").trim();
        String rType        = request.getFormAttribute("type");
        String rCardinality = request.getFormAttribute("cardinality");
        String rDescription = request.getFormAttribute("description");
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

        if(rType != null && !rType.isEmpty()){
            if(!Arrays.asList(primitiveTypes).contains(rType)){
                errorLine = new JsonObject();
                errorLine.put("type", "Invalid value");
                errors.add(errorLine);
            } else {
                type = Helpers.createPrimitiveType(rType);
            }
        } else {
            errorLine = new JsonObject();
            errorLine.put("type", "field required");
            errors.add(errorLine);
        }

        if(rCardinality != null && !rCardinality.isEmpty()){
            if(!Arrays.asList(cardinalities).contains(rCardinality)){
                errorLine = new JsonObject();
                errorLine.put("cardinality", "Invalid value");
                errors.add(errorLine);
            } else {
                cardinality = Helpers.createCardinality(rCardinality);
            }
        } else {
            errorLine = new JsonObject();
            errorLine.put("cardinality", "field required");
            errors.add(errorLine);
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
