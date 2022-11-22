package org.openflexo.http.server.core.repositories;

import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.http.server.util.IdUtils;

/**
 * A repository for managing the Virtual Model resource.
 *
 * @author Ihab Benamer
 */
public class VirtualModelsRepository {

    /**
     * This function returns a VirtualModel object from a VirtualModelLibrary object, given the id of the VirtualModel
     *
     * @param virtualModelLibrary the VirtualModelLibrary object that contains the VirtualModel you want to retrieve
     * @param id the id of the virtual model to be retrieved
     * @return A VirtualModel
     */
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
