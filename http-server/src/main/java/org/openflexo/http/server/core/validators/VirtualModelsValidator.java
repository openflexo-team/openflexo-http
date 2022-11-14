package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.ProjectsRepository;

import java.util.Arrays;

public class VirtualModelsValidator {

    private final VirtualModelLibrary virtualModelLibrary;
    private final HttpServerRequest request;
    private final String [] visibilities = {"public", "protected", "default", "private"};
    private boolean isValide;
    private JsonArray errors;
    private String name;
    private String description;
    private Visibility visibility;
    private boolean isAbstract;
    private String projectId;

    public VirtualModelsValidator(HttpServerRequest request, VirtualModelLibrary virtualModelLibrary){
        this.request                = request;
        this.virtualModelLibrary    = virtualModelLibrary;
        isValide                    = false;
    }

    public JsonArray validate(){
        String rName        = request.getFormAttribute("name");
        String rDescription = request.getFormAttribute("description");
        String rVisibility  = request.getFormAttribute("visibility");
        String rIsAbstract  = request.getFormAttribute("is_abstract");
        String rProjectId   = request.getFormAttribute("project_id");
        errors              = new JsonArray();

        JsonObject errorLine;

        if(rName != null && !rName.isEmpty()){
            name = rName;
        } else {
            errorLine = new JsonObject();
            errorLine.put("name", "field required");
            errors.add(errorLine);
        }

        if(rVisibility != null && !rVisibility.isEmpty() && Arrays.asList(visibilities).contains(rVisibility.toLowerCase())) {
            visibility = Helpers.getVisibility(rVisibility);
        } else if (rVisibility == null || rVisibility.isEmpty()){
            visibility = Helpers.getVisibility(rVisibility);
        } else {
            errorLine = new JsonObject();
            errorLine.put("visibility", "invalid value");
            errors.add(errorLine);
        }

        if(rIsAbstract != null && !rIsAbstract.isEmpty()){
            if(rIsAbstract.equalsIgnoreCase("true") || rIsAbstract.equals("1")){
                isAbstract = true;
            } else if(rIsAbstract.equalsIgnoreCase("false") || rIsAbstract.equals("0")){
                isAbstract = false;
            } else {
                errorLine = new JsonObject();
                errorLine.put("is_abstract", "invalid value");
                errors.add(errorLine);
            }
        } else {
            isAbstract = false;
        }

        if(rProjectId == null || rProjectId.isEmpty()){
            errorLine = new JsonObject();
            errorLine.put("project_id", "field required");
            errors.add(errorLine);
        } else {
            try{
                if(ProjectsRepository.getProjectById(virtualModelLibrary, rProjectId) == null){
                    errorLine = new JsonObject();
                    errorLine.put("project_id", "invalid value");
                    errors.add(errorLine);
                } else {
                    projectId = rProjectId;
                }
            } catch (IllegalArgumentException e){
                errorLine = new JsonObject();
                errorLine.put("project_id", "invalid value");
                errors.add(errorLine);
            }
        }

        if (rDescription != null && !rDescription.isEmpty()){
            description = rDescription.trim();
        } else {
            description = rDescription;
        }

        if(errors.isEmpty())
            isValide = true;

        return errors;
    }

    public boolean isValide(){
        return isValide;
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
