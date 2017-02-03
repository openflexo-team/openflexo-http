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

package org.openflexo.http.connector.rm;

import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterResourceRepository;
import org.openflexo.technologyadapter.jdbc.JDBCTechnologyAdapter;
import org.openflexo.technologyadapter.jdbc.model.JDBCConnection;

public class HttpResourceRepository<I> extends
        TechnologyAdapterResourceRepository<HttpResource, JDBCTechnologyAdapter, JDBCConnection, I>
{
    private static final String DEFAULT_BASE_URI = "http://www.openflexo.org/JDBCTechnologyAdapter/Models";

    public HttpResourceRepository(JDBCTechnologyAdapter adapter, FlexoResourceCenter<I> resourceCenter) {
        super(adapter, resourceCenter);
    }


}
