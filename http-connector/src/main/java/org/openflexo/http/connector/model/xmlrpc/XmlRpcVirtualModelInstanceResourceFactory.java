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

package org.openflexo.http.connector.model.xmlrpc;

import java.util.logging.Logger;

import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpVirtualModelInstanceModelFactory;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResource;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResourceFactory;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.toolbox.FlexoVersion;

/**
 * The resource factory for {@link XmlRpcVirtualModelInstanceResource}
 * 
 * @author sylvain
 *
 */
public class XmlRpcVirtualModelInstanceResourceFactory extends HttpVirtualModelInstanceResourceFactory<XmlRpcVirtualModelInstance> {

	private static final Logger logger = Logger.getLogger(XmlRpcVirtualModelInstanceResourceFactory.class.getPackage().getName());

	public static final FlexoVersion CURRENT_FML_RT_VERSION = new FlexoVersion("1.0");
	public static final String HTTP_XMLRPC_SUFFIX = ".http.xmlrpc";
	public static final String HTTP_XMLRPC_XML_SUFFIX = ".http.xmlrpc.xml";

	public XmlRpcVirtualModelInstanceResourceFactory() throws ModelDefinitionException {
		super(XmlRpcVirtualModelInstanceResource.class);
	}

	@Override
	public XmlRpcVirtualModelInstance makeEmptyResourceData(HttpVirtualModelInstanceResource<XmlRpcVirtualModelInstance> resource) {
		return resource.getFactory().newInstance(XmlRpcVirtualModelInstance.class);
	}

	@Override
	public String getExpectedDirectorySuffix() {
		return HTTP_XMLRPC_SUFFIX;
	}

	@Override
	public String getExpectedXMLFileSuffix() {
		return HTTP_XMLRPC_XML_SUFFIX;
	}

	/**
	 * Build and return model factory to use for resource data managing
	 */
	@Override
	public HttpVirtualModelInstanceModelFactory makeResourceDataFactory(
			HttpVirtualModelInstanceResource<XmlRpcVirtualModelInstance> resource,
			TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager) throws ModelDefinitionException {
		return new XmlRpcVirtualModelInstanceModelFactory((XmlRpcVirtualModelInstanceResource) resource,
				technologyContextManager.getTechnologyAdapter().getServiceManager().getEditingContext(),
				technologyContextManager.getTechnologyAdapter().getServiceManager().getTechnologyAdapterService());
	}

}
