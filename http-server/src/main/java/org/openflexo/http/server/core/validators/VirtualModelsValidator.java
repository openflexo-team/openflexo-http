package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.repositories.ProjectsRepository;

public class VirtualModelsValidator extends GenericValidator{

    private final VirtualModelLibrary virtualModelLibrary;
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private String description;
    private Visibility visibility;
    private boolean isAbstract;
    private String projectId;

    public VirtualModelsValidator(HttpServerRequest request, VirtualModelLibrary virtualModelLibrary){
        this.request                = request;
        this.virtualModelLibrary    = virtualModelLibrary;
        isValid                     = false;
    }

    public String validateProjectID(String id) throws BadValidationException {
        if(id == null || id.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            try{
                if(ProjectsRepository.getProjectById(virtualModelLibrary, id) == null){
                    throw new BadValidationException("Invalid value");
                } else {
                    return id;
                }
            } catch (IllegalArgumentException e){
                throw new BadValidationException("Invalid value");
            }
        }
    }

    public JsonArray validate(){
        String rName        = request.getFormAttribute("name");
        String rDescription = request.getFormAttribute("description");
        String rVisibility  = request.getFormAttribute("visibility");
        String rIsAbstract  = request.getFormAttribute("is_abstract");
        String rProjectId   = request.getFormAttribute("project_id");
        errors              = new JsonArray();

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

        try{
            projectId = validateProjectID(rProjectId);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("project_id", e);
            errors.add(errorLine);
        }

        description = validateDescription(rDescription);

        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    public boolean isValid(){
        return isValid;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Visibility getVisibility() {
        return visibility;
    }

    public boolean isAbstract() {
        return isAbstract;
    }

    public String getProjectId() {
        return projectId;
    }
}
