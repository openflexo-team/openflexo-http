/**
 * 
 * Copyright (c) 2014, Openflexo
 * 
 * This file is part of Flexo-foundation, a component of the software infrastructure 
 * developed at Openflexo.
 * 
 * 
 * Openflexo is dual-licensed under the European Union Public License (EUPL, either 
 * version 1.1 of the License, or any later version ), which is available at 
 * https://joinup.ec.europa.eu/software/page/eupl/licence-eupl
 * and the GNU General Public License (GPL, either version 3 of the License, or any 
 * later version), which is available at http://www.gnu.org/licenses/gpl.html .
 * 
 * You can redistribute it and/or modify under the terms of either of these licenses
 * 
 * If you choose to redistribute it and/or modify under the terms of the GNU GPL, you
 * must include the following additional permission.
 *
 *          Additional permission under GNU GPL version 3 section 7
 *
 *          If you modify this Program, or any covered work, by linking or 
 *          combining it with software containing parts covered by the terms 
 *          of EPL 1.0, the licensors of this Program grant you additional permission
 *          to convey the resulting work. * 
 * 
 * This software is distributed in the hope that it will be useful, but WITHOUT ANY 
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A 
 * PARTICULAR PURPOSE. 
 *
 * See http://www.openflexo.org/license.html for details.
 * 
 * 
 * Please contact Openflexo (openflexo-contacts@openflexo.org)
 * or visit www.openflexo.org if you need additional information.
 * 
 */

package org.openflexo.http.connector.rm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.ResourceRepository;
import org.openflexo.foundation.resource.ResourceRepositoryImpl;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.ModelFactory;

/**
 * A repository storing {@link HttpVirtualModelInstanceResource} for a resource center
 * 
 * @author sylvain
 * 
 */
@ModelEntity
@ImplementationClass(HttpVirtualModelInstanceRepository.HttpVirtualModelInstanceRepositoryImpl.class)
public interface HttpVirtualModelInstanceRepository<I> extends ResourceRepository<HttpVirtualModelInstanceResource<?>, I> {

	public static <I> HttpVirtualModelInstanceRepository<I> instanciateNewRepository(HttpTechnologyAdapter adapter,
			FlexoResourceCenter<I> resourceCenter) throws IOException {
		ModelFactory factory;
		try {
			factory = new ModelFactory(HttpVirtualModelInstanceRepository.class);
			HttpVirtualModelInstanceRepository<I> newRepository = factory.newInstance(HttpVirtualModelInstanceRepository.class);
			newRepository.setResourceCenter(resourceCenter);
			newRepository.setBaseArtefact(resourceCenter.getBaseArtefact());
			newRepository.getRootFolder().setRepositoryContext(null);
			return newRepository;
		} catch (ModelDefinitionException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static abstract class HttpVirtualModelInstanceRepositoryImpl<I>
			extends ResourceRepositoryImpl<HttpVirtualModelInstanceResource<?>, I> implements HttpVirtualModelInstanceRepository<I> {

		@Override
		public FlexoServiceManager getServiceManager() {
			if (getResourceCenter() != null) {
				return getResourceCenter().getServiceManager();
			}
			return null;
		}

		public List<HttpVirtualModelInstance<?>> getVirtualModelInstancesConformToVirtualModel(String virtualModelURI) {
			List<HttpVirtualModelInstance<?>> views = new ArrayList<>();
			for (HttpVirtualModelInstanceResource<?> vmiRes : getAllResources()) {
				if (vmiRes.getVirtualModelResource() != null && vmiRes.getVirtualModelResource().getURI().equals(virtualModelURI)) {
					views.add((HttpVirtualModelInstance) vmiRes.getVirtualModelInstance());
				}
			}
			return views;
		}

		public boolean isValidForANewVirtualModelInstanceName(String value) {
			if (value == null) {
				return false;
			}
			return getRootFolder().isValidResourceName(value);
		}

		public HttpVirtualModelInstanceResource getVirtualModelInstanceResourceNamed(String value) {
			if (value == null) {
				return null;
			}
			return getRootFolder().getResourceWithName(value);
		}

		public HttpVirtualModelInstanceResource getVirtualModelInstance(String virtualModelInstanceURI) {
			if (virtualModelInstanceURI == null) {
				return null;
			}
			return getResource(virtualModelInstanceURI);
		}

		@Override
		public final String getDefaultBaseURI() {
			return getResourceCenter().getDefaultBaseURI() /*+ "/" + getTechnologyAdapter().getIdentifier()*/;
		}

		@Override
		public String getDisplayableName() {
			return getResourceCenter().getDisplayableName();
		}
	}
}
