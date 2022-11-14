package org.openflexo.http.server.core.helpers;

import org.openflexo.connie.type.PrimitiveType;
import org.openflexo.connie.type.TypeUtils;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.action.FlexoAction;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.action.CreatePrimitiveRole;
import org.openflexo.foundation.fml.action.PropertyEntry;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.ModelSlot;
import org.openflexo.http.server.util.IdUtils;

import java.lang.reflect.Type;
import java.util.Date;

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

    public static PropertyCardinality createCardinality(String cardinality) {
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
    
    public static PrimitiveType createPrimitiveType(String  type){
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
}
