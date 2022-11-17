package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.repositories.ResourceCentersRepository;

public class ProjectsValidator extends GenericValidator{
    private final ProjectLoader projectLoader;
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private String rcId;

    public ProjectsValidator(ProjectLoader projectLoader, HttpServerRequest request) {
        this.projectLoader  = projectLoader;
        this.request        = request;
        isValid             = false;
    }

    public String validateResourceCenterID(String id) throws BadValidationException {
        if(id == null || id.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            if(ResourceCentersRepository.getResourceCenterById(projectLoader, id) == null){
                throw new BadValidationException("Field required");
            } else {
                return id;
            }
        }
    }

    public JsonArray validate(){
        String rName    = request.getFormAttribute("name");
        String rRcId    = request.getFormAttribute("rc_id");
        errors          = new JsonArray();

        JsonObject errorLine;

        try{
            name = validateProjectName(rName);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("name", e);
            errors.add(errorLine);
        }

        try{
            rcId = validateResourceCenterID(rRcId);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("rc_id", e);
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

    public String getRcId() {
        return rcId;
    }
}
