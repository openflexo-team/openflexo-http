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

import java.util.logging.Logger;

import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.IOFlexoException;
import org.openflexo.foundation.InconsistentDataException;
import org.openflexo.foundation.InvalidModelDefinitionException;
import org.openflexo.foundation.InvalidXMLException;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.resource.FlexoFileNotFoundException;
import org.openflexo.foundation.resource.PamelaResource;
import org.openflexo.foundation.resource.PamelaResourceImpl;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterResource;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.HttpTechnologyContextManager;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.AccessPointFactory;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstance;
import org.openflexo.http.connector.rm.AccessPointResource.AccessPointResourceImpl;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.toolbox.IProgress;

@ModelEntity
@XMLElement
@ImplementationClass(AccessPointResourceImpl.class)
public interface AccessPointResource
		extends PamelaResource<AccessPoint, AccessPointFactory>, TechnologyAdapterResource<AccessPoint, HttpTechnologyAdapter> {

	String TECHNOLOGY_CONTEXT_MANAGER = "technologyContextManager";

	@Override
	@Getter(value = TECHNOLOGY_CONTEXT_MANAGER, ignoreType = true)
	HttpTechnologyContextManager getTechnologyContextManager();

	@Setter(TECHNOLOGY_CONTEXT_MANAGER)
	void setTechnologyContextManager(HttpTechnologyContextManager contextManager);

	// TODO connect to model
	@Getter("model")
	AccessPoint getModel();

	abstract class AccessPointResourceImpl extends PamelaResourceImpl<AccessPoint, AccessPointFactory> implements AccessPointResource {

		private static final Logger logger = FlexoLogger.getLogger(AccessPointResourceImpl.class.getPackage().toString());

		@Override
		public HttpTechnologyAdapter getTechnologyAdapter() {
			if (getServiceManager() != null) {
				return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class);
			}
			return null;
		}

		@Override
		public Class<AccessPoint> getResourceDataClass() {
			return AccessPoint.class;
		}

		@Override
		public AccessPoint loadResourceData(IProgress progress) throws FlexoFileNotFoundException, IOFlexoException, InvalidXMLException,
				InconsistentDataException, InvalidModelDefinitionException {
			AccessPoint accessPoint = super.loadResourceData(progress);
			if (accessPoint.getModelSlot() != null) {
				getFactory().initializeModel(accessPoint, accessPoint.getModelSlot().getCreationScheme(),
						accessPoint.getModelSlot().getParameters(), accessPoint.getOwnerInstance());
			}
			else {
				getFactory().initializeModel(accessPoint, null, null, accessPoint.getOwnerInstance());
			}
			return accessPoint;
		}

		@Override
		public FlexoObject findObject(String objectIdentifier, String userIdentifier, String typeIdentifier) {
			System.out.println(("Trying to find object '" + objectIdentifier + "'"));
			AccessPoint accessPoint = getLoadedResourceData();
			FlexoConcept concept = accessPoint.getModelSlot().getAccessedVirtualModel().getFlexoConcept(typeIdentifier);
			if (accessPoint.getInstance() instanceof RestVirtualModelInstance) {
				return ((RestVirtualModelInstance) accessPoint.getInstance()).getFlexoConceptInstance(objectIdentifier, null, concept);
			}
			else {
				logger.warning("Don't know how to find object for " + accessPoint.getInstance());
				return null;
			}
		}
	}
}
