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

package org.openflexo.http.connector.rm.rest;

import org.openflexo.foundation.IOFlexoException;
import org.openflexo.foundation.InconsistentDataException;
import org.openflexo.foundation.InvalidModelDefinitionException;
import org.openflexo.foundation.InvalidXMLException;
import org.openflexo.foundation.resource.FlexoFileNotFoundException;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.http.connector.model.rest.JsonSupportFactory;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstance;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResource;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.XMLElement;

/**
 * This is the {@link FlexoResource} encoding a {@link RestVirtualModelInstance}
 * 
 * @author sylvain
 * 
 */
@ModelEntity
@ImplementationClass(RestVirtualModelInstanceResource.RestVirtualModelInstanceResourceImpl.class)
@XMLElement
public interface RestVirtualModelInstanceResource extends HttpVirtualModelInstanceResource<RestVirtualModelInstance> {

	/**
	 * Default implementation for {@link RestVirtualModelInstanceResource}
	 * 
	 * 
	 * @author Sylvain
	 * 
	 */
	public abstract class RestVirtualModelInstanceResourceImpl extends HttpVirtualModelInstanceResourceImpl<RestVirtualModelInstance>
			implements RestVirtualModelInstanceResource {

		@Override
		public String getSuffix() {
			return RestVirtualModelInstanceResourceFactory.HTTP_REST_SUFFIX;
		}

		@Override
		public Class<RestVirtualModelInstance> getResourceDataClass() {
			return RestVirtualModelInstance.class;
		}

		@Override
		public RestVirtualModelInstance loadResourceData() throws FlexoFileNotFoundException, IOFlexoException, InvalidXMLException,
				InconsistentDataException, InvalidModelDefinitionException {
			RestVirtualModelInstance returned = super.loadResourceData();
			returned.setSupportFactory(new JsonSupportFactory("url"));
			performHttpInitializerWhenRequired(returned);
			return returned;
		}
	}
}
