package org.openflexo.http.server.core.helpers;

import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.PropertyEntry;

import java.lang.reflect.Type;

public class Helpers {

    public static String createVirtualModelUri(FlexoProject<?> project, String name) {
        return project.getProjectURI() + "/" + name + ".fml";
    }

    public static Visibility getVisibility(String visibility) {
        if (visibility == null)
            visibility = "";

        switch (visibility) {
            case "public":
                return Visibility.Public;
            case "protected":
                return Visibility.Public;
            case "private":
                return Visibility.Public;
            default:
                return Visibility.Default;
        }
    }

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
}
