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

import java.io.IOException;

import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterResourceRepository;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.ModelFactory;

@ModelEntity
public interface HttpResourceRepository<I>
		extends TechnologyAdapterResourceRepository<AccessPointResource, HttpTechnologyAdapter, AccessPoint, I> {

	public static <I> HttpResourceRepository<I> instanciateNewRepository(HttpTechnologyAdapter technologyAdapter,
			FlexoResourceCenter<I> resourceCenter) throws IOException {
		ModelFactory factory;
		try {
			factory = new ModelFactory(HttpResourceRepository.class);
			HttpResourceRepository<I> newRepository = factory.newInstance(HttpResourceRepository.class);
			newRepository.setTechnologyAdapter(technologyAdapter);
			newRepository.setResourceCenter(resourceCenter);
			newRepository.setBaseArtefact(resourceCenter.getBaseArtefact());
			newRepository.getRootFolder().setRepositoryContext(null);
			return newRepository;
		} catch (ModelDefinitionException e) {
			e.printStackTrace();
		}
		return null;
	}

}
