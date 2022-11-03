package org.openflexo.http.server.core.helpers;

import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.Visibility;
import org.openflexo.http.server.util.IdUtils;

public class Helpers {

    public static String createVirtualModelUri(FlexoProject<?> project, String name) {
        return project.getProjectURI() + "/" + name + ".fml";
    }

    public static FlexoProject<?> getProjectById(VirtualModelLibrary virtualModelLibrary, String projectId) {
        FlexoProject<?> project = null;

        for (FlexoProject<?> prj : virtualModelLibrary.getServiceManager().getProjectLoaderService().getRootProjects()) {
            if (prj.getProjectURI().equals(IdUtils.decodeId(projectId))) {
                project = prj;
            }
        }

        return project;
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
}
