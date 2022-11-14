package org.openflexo.http.server.core.repositories;

import org.openflexo.foundation.project.ProjectLoader;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.http.server.util.IdUtils;

public class ResourceCentersRepository {

    public static FlexoResourceCenter<?> getResourceCenterById(ProjectLoader projectLoader, String rcid){
        return projectLoader.getServiceManager().getResourceCenterService().getFlexoResourceCenter(IdUtils.decodeId(rcid));
    }

}
