package org.openflexo.http.server.core.validators;

import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.FileUpload;
import org.openflexo.connie.DataBinding;
import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.fml.FlexoBehaviour;
import org.openflexo.foundation.fml.PropertyCardinality;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.http.server.core.exceptions.BadValidationException;
import org.openflexo.http.server.core.helpers.Helpers;
import org.python.jline.internal.Log;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Iterator;

public abstract class GenericValidator {
    private final String[] primitiveTypes   = {"string", "date", "boolean", "integer", "byte", "long", "short", "float", "double"};
    private final String[] visibilities     = {"public", "protected", "default", "private"};
    private final String[] behaviourTypes   = {"action", "cloning", "creation", "deletion", "event", "synchronization", "navigation"};
    private final String[] cardinalities    = {"one", "zeromany", "onemany", "zeroone"};
    private final String[] formats          = {"application/zip"};
    private final long MAX_UPLOAD_SIZE      = 50 * 1000 * 1000;

    public boolean validateBoolean(String field) throws BadValidationException {
        if(field != null && !field.isEmpty()){
            if(field.equalsIgnoreCase("true") || field.equals("1")){
                return true;
            } else if(field.equalsIgnoreCase("false") || field.equals("0")){
                return false;
            } else {
                throw new BadValidationException("Invalid value");
            }
        } else {
            return false;
        }
    }

    public String validateName(String name) throws BadValidationException {
        if(!name.isEmpty()){
            if(name.contains(" ")){
                throw new BadValidationException("Invalid value");
            } else {
                return name;
            }
        } else {
            throw new BadValidationException("Field required");
        }
    }

    public String validateProjectName(String name) throws BadValidationException {
        if(!name.isEmpty()){
            return name;
        } else {
            throw new BadValidationException("Field required");
        }
    }

    public PrimitiveType validatePrimitiveType(String field) throws BadValidationException {
        if(field != null && !field.isEmpty()){
            if(!Arrays.asList(primitiveTypes).contains(field.toLowerCase())){
                throw new BadValidationException("Invalid value");
            } else {
                return Helpers.getPrimitiveType(field);
            }
        } else {
            throw new BadValidationException("Field required");
        }
    }

    public PropertyCardinality validateCardinality(String field) throws BadValidationException {
        if(field != null && !field.isEmpty()){
            if(!Arrays.asList(cardinalities).contains(field.toLowerCase())){
                throw new BadValidationException("Invalid value");
            } else {
                return Helpers.getCardinality(field);
            }
        } else {
            throw new BadValidationException("Field required");
        }
    }

    public Visibility validateVisibility(String field) throws BadValidationException {

        if(field != null && !field.isEmpty()){
            if(!Arrays.asList(visibilities).contains(field.toLowerCase())){
                throw new BadValidationException("Invalid value");
            } else {
                return Helpers.getVisibility(field);
            }
        } else {
            throw new BadValidationException("Field required");
        }
    }
    public Class<? extends FlexoBehaviour> validateBehaviourType(String field) throws BadValidationException {
        if(field != null && !field.isEmpty()){
            if(!Arrays.asList(behaviourTypes).contains(field.toLowerCase())){
                throw new BadValidationException("Invalid value");
            } else {
                return Helpers.getBehaviourType(field);
            }
        } else {
            throw new BadValidationException("Field required");
        }
    }

    public String validatePath(String path) throws BadValidationException {
        if(path == null || path.isEmpty()){
            throw new BadValidationException("Field required");
        } else {
            if(!Files.exists(Paths.get(path))){
                throw new BadValidationException("invalid value");
            } else {
                return path;
            }
        }
    }

    public void validateFileUpload(Iterator<FileUpload> fileUploadIterator) throws  BadValidationException {
        FileUpload fileUpload = fileUploadIterator.next();
        try {
            URLDecoder.decode(fileUpload.fileName(), "UTF-8");

            if(fileUpload.size() > MAX_UPLOAD_SIZE){
                throw new BadValidationException("File too large (files must be smaller than " + MAX_UPLOAD_SIZE + " byte)");
            }

            if(!Arrays.asList(formats).contains(fileUpload.contentType())){
                throw new BadValidationException("Unsupported file format");
            }
        } catch (UnsupportedEncodingException e) {
            throw new BadValidationException("Unsupported file name encoding");
        }
    }

    public String validateDescription(String description){
        if (description != null && !description.isEmpty())
            return description.trim();
        return description;
    }

    public DataBinding<Object> validateObjectValue(String field, String type) throws BadValidationException {
        // TODO: cast default value to other formats
        return null;
    }
}
