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
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.Import;
import org.openflexo.model.annotations.Imports;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.exceptions.ModelDefinitionException;

/**
 * VirtualModel instance that represents a distant object set through an AccessPoint
 */
@ModelEntity
@ImplementationClass(XmlRpcVirtualModelInstance.XmlRpcVirtualModelInstanceImpl.class)
@Imports(@Import(HttpFlexoConceptInstance.class))
public interface XmlRpcVirtualModelInstance extends HttpVirtualModelInstance<MapSupport> {

	String ACCESS_POINT = "accessPoint";

	public HttpFlexoConceptInstance getFlexoConceptInstance(Map<?, ?> map, FlexoConcept concept);

	public List<HttpFlexoConceptInstance> getFlexoConceptInstances(List<Map<?, ?>> maps, FlexoConcept concept);

	abstract class XmlRpcVirtualModelInstanceImpl extends HttpVirtualModelInstanceImpl<MapSupport> implements XmlRpcVirtualModelInstance {

		private static final Logger logger = FlexoLogger.getLogger(HttpVirtualModelInstance.class.getPackage().toString());

		private XmlRpcVirtualModelInstanceModelFactory modelFactory;

		// private final Map<String, HttpFlexoConceptInstance> instances = new HashMap<>();

		@Override
		public void initialize(AccessPoint accessPoint, FlexoServiceManager serviceManager,
				ContentSupportFactory<MapSupport> supportFactory) {

			super.initialize(accessPoint, serviceManager, supportFactory);

			System.out.println("Hop, on initialise un XmlRpcVirtualModelInstance");

			try {
				modelFactory = new XmlRpcVirtualModelInstanceModelFactory(null, serviceManager.getEditingContext(),
						serviceManager.getTechnologyAdapterService());
			} catch (ModelDefinitionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

		@Override
		public XmlRpcVirtualModelInstanceModelFactory getFactory() {
			return modelFactory;
		}

		@Override
		public HttpFlexoConceptInstance getFlexoConceptInstance(Map<?, ?> map, FlexoConcept concept) {
			/*return instances.computeIfAbsent(path, (newPath) -> {
				ContentSupport support = getSupportFactory().newSupport(this, path, null, pointer);
				return getAccessPointFactory().newFlexoConceptInstance(this, support, concept);
			});*/
			System.out.println("Je dois retourner le FCI " + concept + " pour " + map);
			return null;
		}

		@Override
		public List<HttpFlexoConceptInstance> getFlexoConceptInstances(List<Map<?, ?>> maps, FlexoConcept concept) {
			AccessPoint accessPoint = getAccessPoint();
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

	}
}
