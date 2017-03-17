/*
 * (c) Copyright 2013- Openflexo
 *
 * This file is part of OpenFlexo.
 *
 * OpenFlexo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OpenFlexo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenFlexo. If not, see <http://www.gnu.org/licenses/>.
 *
 */

package org.openflexo.http.connector;

import java.lang.reflect.Type;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstance;
import org.openflexo.foundation.fml.rt.View;
import org.openflexo.foundation.fml.rt.action.ModelSlotInstanceConfiguration;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.FreeModelSlot;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.rm.AccessPointResource;

/**
 * REST model slot for Http technology adapter
 *
 *
 *
 */
public interface RestModelSlot extends FreeModelSlot<AccessPoint> {

    @Override
    HttpTechnologyAdapter getModelSlotTechnologyAdapter();

    abstract class RestModelSlotImpl extends FreeModelSlotImpl<AccessPoint> implements RestModelSlot {

        @Override
        public Class<HttpTechnologyAdapter> getTechnologyAdapterClass() {
            return HttpTechnologyAdapter.class;
        }

        @Override
        public <PR extends FlexoRole<?>> String defaultFlexoRoleName(Class<PR> patternRoleClass) {
            // TODO What to do here ?
            return "";
        }

        @Override
        public Type getType() {
            return AccessPoint.class;
        }

        @Override
        public HttpTechnologyAdapter getModelSlotTechnologyAdapter() {
            return (HttpTechnologyAdapter) super.getModelSlotTechnologyAdapter();
        }

        @Override
        public ModelSlotInstanceConfiguration<? extends FreeModelSlot<AccessPoint>, AccessPoint> createConfiguration(
                AbstractVirtualModelInstance<?, ?> virtualModelInstance, FlexoResourceCenter<?> rc
        ) {
            return new HttpModelSlotInstanceConfiguration(this, virtualModelInstance, rc);
        }

        @Override
        public AccessPointResource createProjectSpecificEmptyResource(View view, String filename, String modelUri) {
            // TODO create empty resource
            return null;
        }

        @Override
        public AccessPointResource createSharedEmptyResource(
                FlexoResourceCenter<?> resourceCenter,
                String relativePath, String filename, String modelUri
        ) {
            // TODO create empty resource
            return null;
        }
    }
}
