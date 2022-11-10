package org.openflexo.http.server.core.helpers;

import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.http.server.util.IdUtils;

/**
 *  Generic Helpers.
 *
 * @author Ihab Benamer
 */
public class Helpers {

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
     * If the visibility is null, set it to an empty string. Then, if the visibility is public, return Visibility.Public.
     * If the visibility is protected, return Visibility.Protected. If the visibility is private, return
     * Visibility.Private. Otherwise, return Visibility.Default.
     *
     * @param visibility The visibility of the method.
     * @return A Visibility object.
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
}
