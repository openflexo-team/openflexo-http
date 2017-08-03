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

package org.openflexo.http.connector.fml.rest;

import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.annotations.DeclareActorReferences;
import org.openflexo.foundation.fml.annotations.DeclareEditionActions;
import org.openflexo.foundation.fml.annotations.DeclareFlexoBehaviours;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstanceModelFactory;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.http.connector.fml.rest.RestModelSlot.RestModelSlotImpl;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpObjectActorReference;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstance;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstanceModelFactory;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.exceptions.ModelDefinitionException;

/**
 * REST model slot for Http technology adapter
 *
 */
@ModelEntity
@XMLElement
@ImplementationClass(RestModelSlotImpl.class)
@DeclareEditionActions({ CreateHttpRestResource.class })
@DeclareFlexoBehaviours({ RestObjectRetriever.class, JsonRequestBehaviour.class })
@DeclareActorReferences({ HttpObjectActorReference.class })
public interface RestModelSlot extends HttpModelSlot<RestVirtualModelInstance> {

	abstract class RestModelSlotImpl extends HttpModelSlotImpl<RestVirtualModelInstance> implements RestModelSlot {

		@Override
		public Format getFormat() {
			Format returned = (Format) performSuperGetter(FORMAT_KEY);
			if (returned == null) {
				return Format.json;
			}
			return returned;
		}

		private RestVirtualModelInstanceModelFactory factory;

		@Override
		public AbstractVirtualModelInstanceModelFactory<?> getVirtualModelInstanceModelFactory(FlexoServiceManager serviceManager) {

			if (factory == null) {
				try {
					factory = new RestVirtualModelInstanceModelFactory(null, serviceManager.getEditingContext(),
							serviceManager.getTechnologyAdapterService());
				} catch (ModelDefinitionException e) {
					e.printStackTrace();
				}
			}
			return factory;
		}

		@Override
		public RestVirtualModelInstance makeHttpVirtualModelInstance(AccessPoint accessPoint, ContentSupportFactory<?, ?> supportFactory,
				FlexoServiceManager serviceManager) {

			RestVirtualModelInstance returned = getVirtualModelInstanceModelFactory(serviceManager)
					.newInstance(RestVirtualModelInstance.class, accessPoint, serviceManager, supportFactory);
			returned.setVirtualModel(getAccessedVirtualModel());
			return returned;
		}

	}
}
