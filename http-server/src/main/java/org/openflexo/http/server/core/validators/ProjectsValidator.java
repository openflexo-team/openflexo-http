package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.http.server.core.repositories.ResourceCentersRepository;

/**
 * The Projects validator class.
 *
 * @author Ihab Benamer
 */
public class ProjectsValidator {
    private final ProjectLoader projectLoader;
    private final HttpServerRequest request;
    private boolean isValide;
    private JsonArray errors;
    private String name;
    private String rcId;

    /**
     * Instantiates a new Projects validator.
     *
     * @param projectLoader the project loader
     * @param request       the request
     */
    public ProjectsValidator(ProjectLoader projectLoader, HttpServerRequest request) {
        this.projectLoader  = projectLoader;
        this.request        = request;
        isValide            = false;
    }

    /**
     * It checks if the form fields are valid, and if they are, it sets the corresponding class attributes
     *
     * @return A JsonArray of JsonObjects.
     */
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

    /**
     * This function checks if the user inputs are valid
     *
     * @return isValide
     */
    public boolean isValide() {
        return isValide;
    }

    /**
     * This function returns the name of the project.
     *
     * @return The name of the person.
     */
    public String getName() {
        return name;
    }

    /**
     * This function returns the resource center id
     *
     * @return The rcId is being returned.
     */
    public String getRcId() {
        return rcId;
    }
}
