package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstance;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.python.jline.internal.Log;

/**
 * The Concept Instances validator class.
 *
 * @author Ihab Benamer
 */
public class ConceptInstanceValidator extends GenericValidator{
    private final VirtualModelLibrary virtualModelLibrary;
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private FlexoConcept concept;
    private FMLRTVirtualModelInstance container;

    /**
     * Instantiates a new Concept instance validator.
     *
     * @param request             the request
     * @param virtualModelLibrary the virtual model library
     */
    public ConceptInstanceValidator(HttpServerRequest request, VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary    = virtualModelLibrary;
        this.request                = request;
        isValid                     = false;
    }

    /**
     * If the conceptUri is empty, throw an exception, otherwise, if the conceptUri is valid, return the FlexoConcept,
     * otherwise throw an exception
     *
     * @param conceptUri the value of the field
     * @return A FlexoConcept
     */
    public FlexoConcept validateConcept(String conceptUri) throws BadValidationException {
        if(conceptUri == null || conceptUri.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            FlexoConcept tContainer = virtualModelLibrary.getFlexoConcept(conceptUri, true);
            if (tContainer != null) {
                return tContainer;
            } else {
                throw new BadValidationException("Invalid value");
            }
        }
    }

    /**
     * It validates a project id and returns the corresponding project
     *
     * @param projectId the name of the parameter that will be passed to the method.
     * @return A FlexoProject
     */
    public FlexoProject<?> validateProject(String projectId) throws BadValidationException {
        if(projectId == null || projectId.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            FlexoProject<?> project = ProjectsRepository.getProjectById(virtualModelLibrary, projectId);

            if (project != null) {
                return project;
            } else {
                throw new BadValidationException("Invalid value");
            }
        }
    }

    /**
     * It takes a string and a project, and returns a virtual model instance. If the string is empty, it throws a
     * BadValidationException. If the string is not empty, it tries to get the virtual model instance from the project. If
     * it succeeds, it returns the virtual model instance. If it fails, it throws a BadValidationException
     *
     * @param vmiUri the value of the field
     * @param project the project in which the validation is performed
     * @return A VirtualModelInstance
     */
    public FMLRTVirtualModelInstance validateVirtualModelInstanceUri(String vmiUri, FlexoProject<?> project) throws BadValidationException {
        if(vmiUri == null || vmiUri.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            FMLRTVirtualModelInstance vmi = project.getVirtualModelInstanceRepository().getVirtualModelInstance(vmiUri).getVirtualModelInstance();
            if (vmi != null) {
                return vmi;
            } else {
                throw new BadValidationException("Invalid value");
            }
        }
    }

    /**
     * It validates the parameters of the request and returns a JsonArray of errors
     *
     * @return A JsonArray of JsonObjects. Each JsonObject contains a key/value pair. The key is the name of the parameter
     * that failed validation. The value is the error message.
     */
    public JsonArray validate(){
        String rConceptUri      = request.getFormAttribute("concept_uri");
        String rProjectId       = request.getFormAttribute("project_id");
        String rContainerUri    = request.getFormAttribute("container_uri");

        errors                  = new JsonArray();

        JsonObject errorLine;

        try{
            concept = validateConcept(rConceptUri);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("concept_uri", e.getMessage());
            errors.add(errorLine);
        }

        try{
            FlexoProject<?> project = validateProject(rProjectId);
            try{
                container = validateVirtualModelInstanceUri(rContainerUri, project);
            } catch (BadValidationException e){
                errorLine = new JsonObject();
                errorLine.put("container_uri", e.getMessage());
                errors.add(errorLine);
            }
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("project_id", e.getMessage());
            errors.add(errorLine);
        }

        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    /**
     * This method returns true if the object is valid, and false otherwise.
     *
     * @return The boolean value of isValid.
     */
    public boolean isValid() {
        return isValid;
    }



    /**
     * This method returns the FlexoConcept of this object
     *
     * @return The concept of the current object.
     */
    public FlexoConcept getConcept() {
        return concept;
    }

    /**
     * This method returns the FMLRTVirtualModelInstance of this object
     *
     * @return The container of the virtual model instance.
     */
    public FMLRTVirtualModelInstance getContainer() {
        return container;
    }
}
