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

package org.openflexo.http.connector.model.rest;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.model.rest.JsonSupport.JsonResponse;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.Import;
import org.openflexo.model.annotations.Imports;
import org.openflexo.model.annotations.ModelEntity;

/**
 * VirtualModel instance that represents a distant object set through an AccessPoint
 */
@ModelEntity
@ImplementationClass(RestVirtualModelInstance.RestVirtualModelInstanceImpl.class)
@Imports(@Import(HttpFlexoConceptInstance.class))
public interface RestVirtualModelInstance extends HttpVirtualModelInstance<JsonSupport> {

	String ACCESS_POINT = "accessPoint";

	List<HttpFlexoConceptInstance<JsonSupport>> getFlexoConceptInstances(String path, String pointer, FlexoConcept concept);

	HttpFlexoConceptInstance<JsonSupport> getFlexoConceptInstance(String url, String pointer, FlexoConcept concept);

	abstract class RestVirtualModelInstanceImpl extends HttpVirtualModelInstanceImpl<JsonSupport> implements RestVirtualModelInstance {

		private static final Logger logger = FlexoLogger.getLogger(HttpVirtualModelInstance.class.getPackage().toString());

		private RestVirtualModelInstanceModelFactory modelFactory;

		private final Map<String, HttpFlexoConceptInstance<JsonSupport>> instances = new HashMap<>();

		@Override
		public void initialize(AccessPoint accessPoint, FlexoServiceManager serviceManager,
				ContentSupportFactory<JsonSupport, ?> supportFactory) {

			super.initialize(accessPoint, serviceManager, supportFactory);

			System.out.println("Hop, on initialise un RestVirtualModelInstance");

			modelFactory = (RestVirtualModelInstanceModelFactory) accessPoint.getModelSlot()
					.getVirtualModelInstanceModelFactory(serviceManager);

		}

		@Override
		public RestVirtualModelInstanceModelFactory getFactory() {
			return modelFactory;
		}

		@Override
		public ContentSupportFactory<JsonSupport, JsonResponse> getSupportFactory() {
			return (ContentSupportFactory<JsonSupport, JsonResponse>) super.getSupportFactory();
		}

		@Override
		public HttpFlexoConceptInstance<JsonSupport> getFlexoConceptInstance(String path, String pointer, FlexoConcept concept) {
			JsonResponse response = new JsonResponse(path, null, pointer);
			return instances.computeIfAbsent(path, (newPath) -> {
				JsonSupport support = getSupportFactory().newSupport(this, response);
				return getFactory().newFlexoConceptInstance(this, support, concept);
			});
		}

		@Override
		public List<HttpFlexoConceptInstance<JsonSupport>> getFlexoConceptInstances(String path, String pointer, FlexoConcept concept) {
			AccessPoint accessPoint = getAccessPoint();
			HttpGet httpGet = new HttpGet(accessPoint.getUrl() + path);
			accessPoint.contributeHeaders(httpGet);
			try (CloseableHttpResponse httpResponse = getHttpclient().execute(httpGet);
					InputStream stream = httpResponse.getEntity().getContent()) {
				JsonResponse response = new JsonResponse(path, stream, pointer);
				List<JsonSupport> supports = getSupportFactory().newSupports(this, response);
				return supports.stream().map((s) -> getFactory().newFlexoConceptInstance(this, s, concept)).collect(Collectors.toList());

			} catch (IOException e) {
				logger.log(Level.SEVERE, "Can't read '" + httpGet.getURI(), e);
			}
			return Collections.emptyList();
		}

	}
}
