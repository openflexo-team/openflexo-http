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

import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstance;
import org.openflexo.foundation.fml.rt.View;
import org.openflexo.foundation.fml.rt.action.ModelSlotInstanceConfiguration;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.FreeModelSlot;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterResource;

import java.lang.reflect.Type;

/**
 * Implementation of the ModelSlot class for the JDBC technology adapter<br>
 * We expect here to connect an JDBC model conform to an JDBCMetaModel
 * 
 * @author SomeOne
 * 
 */
public interface HttpModelSlot extends FreeModelSlot<UrlModel> {

    @Override
    HttpTechnologyAdapter getModelSlotTechnologyAdapter();

    abstract class JDBCModelSlotImpl extends FreeModelSlotImpl<UrlModel> implements HttpModelSlot {

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
            return UrlModel.class;
        }

        @Override
        public HttpTechnologyAdapter getModelSlotTechnologyAdapter() {
            return (HttpTechnologyAdapter) super.getModelSlotTechnologyAdapter();
        }

        @Override
        public ModelSlotInstanceConfiguration<? extends FreeModelSlot<UrlModel>, UrlModel> createConfiguration(AbstractVirtualModelInstance<?, ?> virtualModelInstance, FlexoResourceCenter<?> rc) {
            return new HttpModelSlotInstanceConfiguration(this, virtualModelInstance, rc);
        }

        @Override
        public TechnologyAdapterResource<UrlModel, ?> createProjectSpecificEmptyResource(View view, String filename, String modelUri) {
            // TODO create empty resource
            return null;
        }

        @Override
        public TechnologyAdapterResource<UrlModel, ?> createSharedEmptyResource(FlexoResourceCenter<?> resourceCenter,
                String relativePath, String filename, String modelUri) {
            // TODO create empty resource
            return null;
        }
    }
}
