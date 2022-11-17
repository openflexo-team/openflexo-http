package org.openflexo.http.server.core.exceptions;

public class BadValidationException extends Exception{
    public BadValidationException(String errorMessage) {
        super(errorMessage);
    }
}
