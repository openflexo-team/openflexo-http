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

package org.openflexo.http.connector.fml.xmlrpc;

import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.annotations.DeclareActorReferences;
import org.openflexo.foundation.fml.annotations.DeclareEditionActions;
import org.openflexo.foundation.fml.annotations.DeclareFlexoBehaviours;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstanceModelFactory;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.http.connector.fml.HttpVirtualModelInitializer;
import org.openflexo.http.connector.fml.xmlrpc.XmlRpcModelSlot.XmlRpcModelSlotImpl;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.xmlrpc.XmlRpcObjectActorReference;
import org.openflexo.http.connector.model.xmlrpc.XmlRpcVirtualModelInstance;
import org.openflexo.http.connector.model.xmlrpc.XmlRpcVirtualModelInstanceModelFactory;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.exceptions.ModelDefinitionException;

/**
 * XML/RPC model slot for HTTP technology adapter
 *
 */
@ModelEntity
@XMLElement
@ImplementationClass(XmlRpcModelSlotImpl.class)
@DeclareEditionActions({ CreateHttpXmlRpcResource.class, PerformXmlRpcRequest.class })
@DeclareFlexoBehaviours({ HttpVirtualModelInitializer.class, XmlRpcRequestBehaviour.class })
@DeclareActorReferences({ XmlRpcObjectActorReference.class })
public interface XmlRpcModelSlot extends HttpModelSlot<XmlRpcVirtualModelInstance> {

	abstract class XmlRpcModelSlotImpl extends HttpModelSlotImpl<XmlRpcVirtualModelInstance> implements XmlRpcModelSlot {

		@Override
		public Format getFormat() {
			Format returned = (Format) performSuperGetter(FORMAT_KEY);
			if (returned == null) {
				return Format.json;
			}
			return returned;
		}

		private XmlRpcVirtualModelInstanceModelFactory factory;

		@Override
		public AbstractVirtualModelInstanceModelFactory<?> getVirtualModelInstanceModelFactory(FlexoServiceManager serviceManager) {

			if (factory == null) {
				try {
					factory = new XmlRpcVirtualModelInstanceModelFactory(null, serviceManager.getEditingContext(),
							serviceManager.getTechnologyAdapterService());
				} catch (ModelDefinitionException e) {
					e.printStackTrace();
				}
			}
			return factory;
		}

		@Override
		public XmlRpcVirtualModelInstance makeHttpVirtualModelInstance(AccessPoint accessPoint, ContentSupportFactory<?, ?> supportFactory,
				FlexoServiceManager serviceManager) {

			XmlRpcVirtualModelInstance returned = getVirtualModelInstanceModelFactory(serviceManager)
					.newInstance(XmlRpcVirtualModelInstance.class, accessPoint, serviceManager, supportFactory);
			returned.setVirtualModel(getAccessedVirtualModel());
			return returned;
		}

	}
}
