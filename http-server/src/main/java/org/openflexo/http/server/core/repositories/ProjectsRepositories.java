package org.openflexo.http.server.core.repositories;

import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.http.server.util.IdUtils;

public class ProjectsRepositories {

    public static FlexoProject<?> getProjectById(VirtualModelLibrary virtualModelLibrary, String projectId) {
        FlexoProject<?> project = null;

        for (FlexoProject<?> prj : virtualModelLibrary.getServiceManager().getProjectLoaderService().getRootProjects()) {
            if (prj.getProjectURI().equals(IdUtils.decodeId(projectId))) {
                project = prj;
            }
        }

        return project;
    }

}
