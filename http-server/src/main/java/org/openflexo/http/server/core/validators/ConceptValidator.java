package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import java.util.List;

public class ConceptValidator extends GenericValidator{
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private Visibility visibility;
    private boolean isAbstract;
    private String description;
    private List<FlexoConcept> parentConcepts;

    public ConceptValidator(HttpServerRequest request) {
        this.request    = request;
        isValid         = false;
    }

    public JsonArray validate(){
        String rName            = request.getFormAttribute("name").trim();
        String rVisibility      = request.getFormAttribute("visibility");
        String rDescription     = request.getFormAttribute("description");
        String rIsAbstract      = request.getFormAttribute("is_abstract");
        String rParentConcepts  = request.getFormAttribute("parent_concepts[]");
        errors                  = new JsonArray();

        JsonObject errorLine;

        try{
            name = validateName(rName);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("name", e);
            errors.add(errorLine);
        }

        try{
            visibility = validateVisibility(rVisibility);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("visibility", e);
            errors.add(errorLine);
        }

        try{
            isAbstract = validateBoolean(rIsAbstract);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("is_abstract", e);
            errors.add(errorLine);
        }

        // TODO: validate parent concepts

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

    public Visibility getVisibility() {
        return visibility;
    }

    public boolean isAbstract() {
        return isAbstract;
    }

    public String getDescription() {
        return description;
    }

    public List<FlexoConcept> getParentConcepts() {
        return parentConcepts;
    }
}
