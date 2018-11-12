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

package org.openflexo.http.connector.rm.rest;

import java.util.logging.Logger;

import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpVirtualModelInstanceModelFactory;
import org.openflexo.http.connector.model.rest.JsonSupportFactory;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstance;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstanceModelFactory;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResource;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResourceFactory;
import org.openflexo.pamela.exceptions.ModelDefinitionException;
import org.openflexo.toolbox.FlexoVersion;

/**
 * The resource factory for {@link RestVirtualModelInstanceResource}
 * 
 * @author sylvain
 *
 */
public class RestVirtualModelInstanceResourceFactory extends HttpVirtualModelInstanceResourceFactory<RestVirtualModelInstance> {

	private static final Logger logger = Logger.getLogger(RestVirtualModelInstanceResourceFactory.class.getPackage().getName());

	public static final FlexoVersion CURRENT_FML_RT_VERSION = new FlexoVersion("1.0");
	public static final String HTTP_REST_SUFFIX = ".http.rest";
	public static final String HTTP_REST_XML_SUFFIX = ".http.rest.xml";

	public RestVirtualModelInstanceResourceFactory() throws ModelDefinitionException {
		super(RestVirtualModelInstanceResource.class);
	}

	@Override
	public RestVirtualModelInstance makeEmptyResourceData(HttpVirtualModelInstanceResource<RestVirtualModelInstance> resource) {
		return resource.getFactory().newInstance(RestVirtualModelInstance.class, resource.getServiceManager(),
				new JsonSupportFactory("url"));
	}

	@Override
	public String getExpectedDirectorySuffix() {
		return HTTP_REST_SUFFIX;
	}

	@Override
	public String getExpectedXMLFileSuffix() {
		return HTTP_REST_XML_SUFFIX;
	}

	/**
	 * Build and return model factory to use for resource data managing
	 */
	@Override
	public HttpVirtualModelInstanceModelFactory makeResourceDataFactory(HttpVirtualModelInstanceResource<RestVirtualModelInstance> resource,
			TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager) throws ModelDefinitionException {
		return new RestVirtualModelInstanceModelFactory((RestVirtualModelInstanceResource) resource,
				technologyContextManager.getTechnologyAdapter().getServiceManager().getEditingContext(),
				technologyContextManager.getTechnologyAdapter().getServiceManager().getTechnologyAdapterService());
	}

	/*	@Override
		protected <I> HttpVirtualModelInstanceResource<RestVirtualModelInstance> initResourceForCreation(I serializationArtefact,
				FlexoResourceCenter<I> resourceCenter, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager, String name,
				String uri) throws ModelDefinitionException {
			HttpVirtualModelInstanceResource<RestVirtualModelInstance> returned =  super.initResourceForCreation(serializationArtefact, resourceCenter, technologyContextManager, name, uri);
			returned.set
			return returned;
		}
		
		@Override
		protected <I> HttpVirtualModelInstanceResource<RestVirtualModelInstance> initResourceForRetrieving(I serializationArtefact,
				FlexoResourceCenter<I> resourceCenter, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager)
				throws ModelDefinitionException, IOException {
			HttpVirtualModelInstanceResource<RestVirtualModelInstance> returned = super.initResourceForRetrieving(serializationArtefact, resourceCenter, technologyContextManager);
			return returned;
		}*/

}
