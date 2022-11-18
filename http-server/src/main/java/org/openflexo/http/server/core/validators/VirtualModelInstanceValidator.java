package org.openflexo.http.server.core.validators;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.repositories.ProjectsRepository;
import org.openflexo.http.server.util.IdUtils;

import java.io.FileNotFoundException;

public class VirtualModelInstanceValidator extends GenericValidator{
    private final VirtualModelLibrary virtualModelLibrary;
    private final HttpServerRequest request;
    private boolean isValid;
    private JsonArray errors;
    private String name;
    private String title;
    private String virtualModelId;

    public VirtualModelInstanceValidator(HttpServerRequest request, VirtualModelLibrary virtualModelLibrary) {
        this.request                = request;
        this.virtualModelLibrary    = virtualModelLibrary;
        isValid                     = false;
    }

    public String validateVirtualModelId(String id) throws BadValidationException {
        if(id == null || id.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            try{
                if(virtualModelLibrary.getVirtualModel(IdUtils.decodeId(id)) == null){
                    throw new BadValidationException("Invalid value");
                } else {
                    return id;
                }
            } catch (ResourceLoadingCancelledException | FlexoException | FileNotFoundException e){
                throw new BadValidationException("Invalid value");
            }
        }
    }

    public JsonArray validate(){
        String rName    = request.getFormAttribute("name");
        String rTitle   = request.getFormAttribute("title");
        String rVmId    = request.getFormAttribute("virtual_model_id");
        errors          = new JsonArray();

        JsonObject errorLine;

        try{
            name = validateName(rName);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("name", e);
            errors.add(errorLine);
        }

        try{
            title = validateName(rTitle);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("title", e);
            errors.add(errorLine);
        }

        try{
            virtualModelId = validateVirtualModelId(rVmId);
        } catch (BadValidationException e){
            errorLine = new JsonObject();
            errorLine.put("virtual_model_id", e);
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

    public String getTitle() {
        return title;
    }

    public String getVirtualModelId() {
        return virtualModelId;
    }
}
