/*
 * Copyright (c) 2013-2017, Openflexo
 *
 * This file is part of Flexo-foundation, a component of the software infrastructure
 * developed at Openflexo.
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
 *           Additional permission under GNU GPL version 3 section 7
 *           If you modify this Program, or any covered work, by linking or
 *           combining it with software containing parts covered by the terms
 *           of EPL 1.0, the licensors of this Program grant you additional permission
 *           to convey the resulting work.
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

package org.openflexo.http.connector.model.xmlrpc;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.http.connector.fml.xmlrpc.XmlRpcModelSlot;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.Import;
import org.openflexo.model.annotations.Imports;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * XML/RPC implementatation for HTTP-specific {@link VirtualModelInstance} reflecting distants objects accessible through a
 * {@link XmlRpcModelSlot} configured with a {@link VirtualModel}
 */
@ModelEntity
@ImplementationClass(XmlRpcVirtualModelInstance.XmlRpcVirtualModelInstanceImpl.class)
@Imports(@Import(XmlRpcFlexoConceptInstance.class))
@XMLElement
public interface XmlRpcVirtualModelInstance extends HttpVirtualModelInstance<XmlRpcVirtualModelInstance> {

	@PropertyIdentifier(type = String.class)
	String ID_PROPERTY_NAME_KEY = "idPropertyName";

	public XmlRpcFlexoConceptInstance getFlexoConceptInstance(Map<?, ?> map, FlexoConceptInstance container, FlexoConcept concept);

	public List<XmlRpcFlexoConceptInstance> getFlexoConceptInstances(List<Map<?, ?>> maps, FlexoConceptInstance container,
			FlexoConcept concept);

	@Getter(value = ID_PROPERTY_NAME_KEY, defaultValue = "id")
	@XMLAttribute
	String getIdPropertyName();

	@Setter(ID_PROPERTY_NAME_KEY)
	void setIdPropertyName(String propertyName);

	abstract class XmlRpcVirtualModelInstanceImpl extends HttpVirtualModelInstanceImpl<XmlRpcVirtualModelInstance>
			implements XmlRpcVirtualModelInstance {

		private static final Logger logger = FlexoLogger.getLogger(HttpVirtualModelInstance.class.getPackage().toString());

		private final Map<Object, XmlRpcFlexoConceptInstance> instances = new HashMap<>();

		@Override
		public void initialize(FlexoServiceManager serviceManager, ContentSupportFactory<?, ?> supportFactory) {

			super.initialize(serviceManager, supportFactory);

			System.out.println("Initializing XmlRpcVirtualModelInstance");

		}

		@Override
		public XmlRpcVirtualModelInstanceModelFactory getFactory() {
			return (XmlRpcVirtualModelInstanceModelFactory) super.getFactory();
		}

		@Override
		public ContentSupportFactory<MapSupport, Map<?, ?>> getSupportFactory() {
			return (ContentSupportFactory<MapSupport, Map<?, ?>>) super.getSupportFactory();
		}

		@Override
		public XmlRpcFlexoConceptInstance getFlexoConceptInstance(Map<?, ?> map, FlexoConceptInstance container, FlexoConcept concept) {
			Object id = map.get(getIdPropertyName());

			return instances.computeIfAbsent(id, (newId) -> {
				MapSupport support = getSupportFactory().newSupport(this, map);
				return (XmlRpcFlexoConceptInstance) getFactory().newFlexoConceptInstance(this, container, support, concept);
			});

		}

		@Override
		public List<XmlRpcFlexoConceptInstance> getFlexoConceptInstances(List<Map<?, ?>> maps, FlexoConceptInstance container,
				FlexoConcept concept) {
			// AccessPoint accessPoint = getAccessPoint();
			/*HttpGet httpGet = new HttpGet(accessPoint.getUrl() + path);
			accessPoint.contributeHeaders(httpGet);
			try (CloseableHttpResponse response = getHttpclient().execute(httpGet);
					InputStream stream = response.getEntity().getContent()) {
				List<MapSupport> supports = getSupportFactory().newSupports(this, path, stream, pointer);
				return supports.stream().map((s) -> getAccessPointFactory().newFlexoConceptInstance(this, s, concept))
						.collect(Collectors.toList());
			
			} catch (IOException e) {
				logger.log(Level.SEVERE, "Can't read '" + httpGet.getURI(), e);
			}*/
			System.out.println("Je dois retourner une liste de FCI " + concept + " pour " + maps);
			return Collections.emptyList();
		}

		@Override
		public String toString() {
			return "XmlRpcVirtualModelInstance[" + Integer.toHexString(hashCode()) + "]";
		}
	}
}
