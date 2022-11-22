package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstance;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.python.jline.internal.Log;

public class ConceptInstanceValidator extends GenericValidator{
    private final VirtualModelLibrary virtualModelLibrary;
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String creationScheme;
    private FlexoConcept concept;
    private String container;
    
    public FlexoBehaviour validateCreationScheme(FlexoConcept container, String signature) throws BadValidationException {
        if(signature.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            for (FlexoBehaviour creationScheme: container.getCreationSchemes()) {
                if(creationScheme.getSignature().equals(signature)){
                    return creationScheme;
                }
            }
            throw new BadValidationException("Invalid value");
        }
    }

    public FlexoConcept validateConcept(String conceptUri) throws BadValidationException {
        if(conceptUri.isEmpty()){
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

//    public FlexoConceptInstance validateContainer(String containerUri) throws BadValidationException {
//        if(containerUri.isEmpty()){
//            throw new BadValidationException("Field required");
//        } else {
//            FlexoConceptInstance flexoConcept = (FlexoConceptInstance) virtualModelLibrary.getFlexoConcept(containerUri);
//
//            if (flexoConcept != null) {
//                return flexoConcept;
//            } else {
//                throw new BadValidationException("Invalid value");
//            }
//        }
//    }

    public ConceptInstanceValidator(HttpServerRequest request, VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
        this.request             = request;
        isValid                  = false;
    }

    public JsonArray validate(){
        String rContainerUri    = request.getFormAttribute("container_uri");
        String rCreationScheme  = request.getFormAttribute("creation_scheme");
        String rConceptUri      = request.getFormAttribute("concept_uri");
        errors                  = new JsonArray();

        JsonObject errorLine;

//        try{
//            container = validateContainer(rContainerUri);
//        } catch (BadValidationException e){
//            errorLine = new JsonObject();
//            errorLine.put("container_uri", e);
//            errors.add(errorLine);
//        }
        container = rContainerUri;
        creationScheme = rCreationScheme;

        try{
            concept = validateConcept(rConceptUri);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("concept_uri", e);
            errors.add(errorLine);
        }

//        try{
//            creationScheme = validateCreationScheme(concept, rCreationScheme);
//        } catch (BadValidationException e){
//            errorLine = new JsonObject();
//            errorLine.put("creation_scheme", e);
//            errors.add(errorLine);
//        }

        if(errors.isEmpty())
            isValid = true;

        return errors;
    }

    public boolean isValid() {
        return isValid;
    }

    public String getCreationScheme() {
        return creationScheme;
    }

    public FlexoConcept getConcept() {
        return concept;
    }

    public String getContainer() {
        return container;
    }
}
