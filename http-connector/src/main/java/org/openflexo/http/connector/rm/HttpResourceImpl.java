/*
 * (c) Copyright 2013 Openflexo
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

import org.openflexo.foundation.resource.PamelaResourceImpl;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpFactory;
import org.openflexo.http.connector.model.UrlModel;

public abstract class HttpResourceImpl
	extends PamelaResourceImpl<UrlModel, HttpFactory>
		implements HttpResource {
    
	@Override
	public HttpTechnologyAdapter getTechnologyAdapter() {
		if (getServiceManager() != null) {
			return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class);
		}
		return null;
	}

    @Override
    public Class<UrlModel> getResourceDataClass() {
        return UrlModel.class;
    }
}
