package org.openflexo.http.server.core.repositories;

import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.http.server.util.IdUtils;

public class VirtualModelsRepository {

    public static VirtualModel getVirtualModelById(VirtualModelLibrary virtualModelLibrary, String id) {
        VirtualModel newVirtualModel = null;

        for (VirtualModelResource virtualModel : virtualModelLibrary.getVirtualModels()) {
            if(IdUtils.encodeuri(virtualModel.getVirtualModel().getURI()).equals(id)){
                newVirtualModel = virtualModel.getVirtualModel();
            }
        }

        return newVirtualModel;
    }
}
