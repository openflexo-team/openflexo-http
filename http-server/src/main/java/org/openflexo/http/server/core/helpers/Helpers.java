package org.openflexo.http.server.core.helpers;

import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.PropertyEntry;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *  Generic Helpers.
 *
 * @author Ihab Benamer
 */
public class Helpers {

    private static DefaultFlexoEditor defaultFlexoEditor;

    /**
     * If the default editor is null, create a new one and return it.
     *
     * @param virtualModelLibrary the VirtualModelLibrary instance that will be used to load the VirtualModel
     * @return A new instance of DefaultFlexoEditor
     */
    public static DefaultFlexoEditor getDefaultFlexoEditor(VirtualModelLibrary virtualModelLibrary){
        if (defaultFlexoEditor == null)
            defaultFlexoEditor = new DefaultFlexoEditor(null, virtualModelLibrary.getServiceManager());

        return defaultFlexoEditor;
    }

    /**
     * It creates a URI for a virtual model in a project
     *
     * @param project the project in which the virtual model will be created
     * @param name the name of the virtual model
     * @return A string
     */
    public static String createVirtualModelUri(FlexoProject<?> project, String name) {
        return project.getProjectURI() + "/" + name + ".fml";
    }

    /**
     * If the visibility is null, set it to an empty string. If the visibility is public, protected, or private, return the
     * corresponding Visibility enum value. Otherwise, return the default Visibility enum value.
     *
     * @param visibility The visibility of the method.
     * @return A visibility object
     */
    public static Visibility getVisibility(String visibility) {
        if (visibility == null)
            visibility = "";

        switch (visibility) {
            case "public":
                return Visibility.Public;
            case "protected":
                return Visibility.Protected;
            case "private":
                return Visibility.Private;
            default:
                return Visibility.Default;
        }
    }

    /**
     * It takes a string and returns a PropertyEntry.PropertyType
     *
     * @param type the type of the property
     * @return A PropertyEntry.PropertyType
     */
    public static PropertyEntry.PropertyType getPropertyType(String type){
        switch (type){
            case "PRIMITIVE":
                return PropertyEntry.PropertyType.PRIMITIVE;
            case "ABSTRACT_PROPERTY":
                return PropertyEntry.PropertyType.ABSTRACT_PROPERTY;
            case "EXPRESSION_PROPERTY":
                return PropertyEntry.PropertyType.EXPRESSION_PROPERTY;
            case "GET_PROPERTY":
                return PropertyEntry.PropertyType.GET_PROPERTY;
            case "GET_SET_PROPERTY":
                return PropertyEntry.PropertyType.GET_SET_PROPERTY;
            case "FLEXO_CONCEPT_INSTANCE":
                return PropertyEntry.PropertyType.FLEXO_CONCEPT_INSTANCE;
            case "MODEL_SLOT":
                return PropertyEntry.PropertyType.MODEL_SLOT;
            case "TECHNOLOGY_ROLE":
                return PropertyEntry.PropertyType.TECHNOLOGY_ROLE;
            default:
                return null;
        }
    }

    /**
     * It takes a string and returns a PropertyCardinality enum
     *
     * @param cardinality The cardinality of the property.
     * @return The cardinality of the property.
     */
    public static PropertyCardinality getCardinality(String cardinality) {
        switch (cardinality){
            case "One":
                return PropertyCardinality.One;
            case "ZeroMany":
                return PropertyCardinality.ZeroMany;
            case "OneMany":
                return PropertyCardinality.OneMany;
            default:
                return PropertyCardinality.ZeroOne;
        }
    }
    
    /**
     * It returns the primitive type of given string
     *
     * @param type The type of the field.
     * @return The primitive type of the given string.
     */
    public static PrimitiveType getPrimitiveType(String  type){
        switch (type){
            case "String":
                return PrimitiveType.String;
            case "Date":
                return PrimitiveType.Date;
            case "Boolean":
                return PrimitiveType.Boolean;
            case "Integer":
            case "Byte":
            case "Long":
            case "Short":
                return PrimitiveType.Integer;
            case "Float":
                return PrimitiveType.Float;
            case "Double":
                return PrimitiveType.Double;
        }
        return null;
    }

    /**
     * It returns the class of the type passed as a parameter
     *
     * @param type the type of the property
     * @return The type of the object.
     */
    public static Type getAbstractType(String type) {
        switch (type){
            case "FlexoConcept":
                return FlexoConcept.class;
            case "VirtualModel":
                return VirtualModel.class;
            default:
                return (Type) getPrimitiveType(type);
        }
    }

    /**
     * It takes a string and returns the corresponding behaviour class
     *
     * @param type the type of the behaviour
     * @return The class of the behaviour type.
     */
    public static Class<? extends FlexoBehaviour> getBehaviourType(String type){
        switch (type){
            case "action":
                return ActionScheme.class;
            case "cloning":
                return CloningScheme.class;
            case "creation":
                return CreationScheme.class;
            case "deletion":
                return DeletionScheme.class;
            case "event":
                return EventListener.class;
            case "synchronization":
                return SynchronizationScheme.class;
            case "navigation":
                return NavigationScheme.class;
        }
        return null;
    }

    /**
     * It takes a String type and a String value and returns the value casted to the type
     *
     * @param type The type of the value to be casted.
     * @param value The value to be casted
     * @return The value of the primitive type.
     */
    public static Object castPrimitiveValue(String type, String value){
        switch (type){
            case "String":
                return value;
            case "Date":
                try {
                    return new SimpleDateFormat("dd-MM-yyyy").parse(value);
                } catch (ParseException e) {
                    return null;
                }
            case "Boolean":
                return Boolean.valueOf(value);
            case "Integer":
                return Integer.valueOf(value);
            case "Byte":
                return Byte.valueOf(value);
            case "Long":
                return Long.valueOf(value);
            case "Short":
                return Short.valueOf(value);
            case "Float":
                return Float.valueOf(value);
            case "Double":
                return Double.valueOf(value);
        }
        return null;
    }
}
