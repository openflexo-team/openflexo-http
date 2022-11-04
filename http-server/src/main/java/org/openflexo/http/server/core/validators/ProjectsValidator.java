package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.http.server.core.repositories.ResourceCentersRepository;

public class ProjectsValidator {
    private final ProjectLoader projectLoader;
    private final HttpServerRequest request;
    private boolean isValide;
    private JsonArray errors;
    private String name;
    private String rcId;

    public ProjectsValidator(ProjectLoader projectLoader, HttpServerRequest request) {
        this.projectLoader  = projectLoader;
        this.request        = request;
        isValide            = false;
    }

    public JsonArray validate(){
        String rName    = request.getFormAttribute("name");
        String rRcId    = request.getFormAttribute("rc_id");
        errors          = new JsonArray();

        JsonObject errorLine;

        if(rName != null && !rName.isEmpty()){
            name = rName;
        } else {
            errorLine = new JsonObject();
            errorLine.put("name", "field required");
            errors.add(errorLine);
        }

        if(rRcId == null || rRcId.isEmpty()){
            errorLine = new JsonObject();
            errorLine.put("rc_id", "field required");
            errors.add(errorLine);
        } else {
            if(ResourceCentersRepository.getResourceCenterById(projectLoader, rRcId) == null){
                errorLine = new JsonObject();
                errorLine.put("rc_id", "invalid value");
                errors.add(errorLine);
            } else {
                rcId = rRcId;
            }
        }

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

    public String getRcId() {
        return rcId;
    }
}
