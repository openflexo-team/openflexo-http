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
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.task.Progress;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.fml.rest.RestModelSlot;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.model.rest.JsonSupport.JsonResponse;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.Import;
import org.openflexo.pamela.annotations.Imports;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.XMLElement;

/**
 * REST implementatation for HTTP-specific {@link VirtualModelInstance} reflecting distants objects accessible through a
 * {@link RestModelSlot} configured with a {@link VirtualModel}
 */
@ModelEntity
@ImplementationClass(RestVirtualModelInstance.RestVirtualModelInstanceImpl.class)
@Imports(@Import(RestFlexoConceptInstance.class))
@XMLElement
public interface RestVirtualModelInstance extends HttpVirtualModelInstance<RestVirtualModelInstance> {

	String ACCESS_POINT = "accessPoint";

	List<RestFlexoConceptInstance> getFlexoConceptInstances(String path, String pointer, FlexoConceptInstance container,
			FlexoConcept concept);

	RestFlexoConceptInstance getFlexoConceptInstance(String url, String pointer, FlexoConceptInstance container, FlexoConcept concept);

	public JsonSupport retrieveSupport(String url, String pointer);

	public RestFlexoConceptInstance makeFlexoConceptInstance(String key, FlexoConceptInstance container, FlexoConcept concept);

	abstract class RestVirtualModelInstanceImpl extends HttpVirtualModelInstanceImpl<RestVirtualModelInstance>
			implements RestVirtualModelInstance {

		private static final Logger logger = FlexoLogger.getLogger(HttpVirtualModelInstance.class.getPackage().toString());

		private final Map<String, RestFlexoConceptInstance> instances = new HashMap<>();

		@Override
		public void initialize(FlexoServiceManager serviceManager, ContentSupportFactory<?, ?> supportFactory) {

			super.initialize(serviceManager, supportFactory);

			System.out.println("Initializing RestVirtualModelInstance");
		}

		@Override
		public RestVirtualModelInstanceModelFactory getFactory() {
			return (RestVirtualModelInstanceModelFactory) super.getFactory();
		}

		@Override
		public ContentSupportFactory<JsonSupport, JsonResponse> getSupportFactory() {
			return (ContentSupportFactory<JsonSupport, JsonResponse>) super.getSupportFactory();
		}

		@Override
		public JsonSupport retrieveSupport(String url, String pointer) {
			Progress.progress("Executing REST request: " + url);
			JsonResponse response = new JsonResponse(url, null, pointer);
			Progress.progress("Receiving response from: " + url);
			return getSupportFactory().newSupport(this, response);
		}

		@Override
		public RestFlexoConceptInstance getFlexoConceptInstance(String path, String pointer, FlexoConceptInstance container,
				FlexoConcept concept) {
			JsonResponse response = new JsonResponse(path, null, pointer);
			return instances.computeIfAbsent(path, (newPath) -> {
				JsonSupport support = getSupportFactory().newSupport(this, response);
				return (RestFlexoConceptInstance) getFactory().newFlexoConceptInstance(this, container, support, concept);
			});
		}

		@Override
		public List<RestFlexoConceptInstance> getFlexoConceptInstances(String path, String pointer, FlexoConceptInstance container,
				FlexoConcept concept) {
			HttpGet httpGet = new HttpGet(getUrl() + path);
			contributeHeaders(httpGet);
			try (CloseableHttpResponse httpResponse = getHttpclient().execute(httpGet);
					InputStream stream = httpResponse.getEntity().getContent()) {
				JsonResponse response = new JsonResponse(path, stream, pointer);
				// System.out.println("Receiving " + response);
				// System.out.println("path=" + path);
				// System.out.println("pointer=" + pointer);
				List<JsonSupport> supports = getSupportFactory().newSupports(this, response);
				/*for (JsonSupport support : supports) {
					System.out.println(" > " + support.getIdentifier() + " support=" + support);
				}*/
				// return supports.stream().map((s) -> getFactory().newFlexoConceptInstance(this, s, concept)).collect(Collectors.toList());
				return supports.stream().map((s) -> retrieveFlexoConceptInstance(s, container, concept)).collect(Collectors.toList());

			} catch (IOException e) {
				logger.log(Level.SEVERE, "Can't read '" + httpGet.getURI(), e);
			}
			return Collections.emptyList();
		}

		@Override
		public RestFlexoConceptInstance makeFlexoConceptInstance(String key, FlexoConceptInstance container, FlexoConcept concept) {
			RestFlexoConceptInstance returned = (RestFlexoConceptInstance) getFactory().newFlexoConceptInstance(this, container,
					(JsonSupport) null, concept);
			returned.initializeIdentifiers(key);
			return returned;
		}

		private RestFlexoConceptInstance retrieveFlexoConceptInstance(JsonSupport support, FlexoConceptInstance container,
				FlexoConcept concept) {
			RestFlexoConceptInstance returned = instances.get(support.getIdentifier());
			if (returned == null) {
				// System.out.println("Creating new FCI for " + support.getIdentifier() + " container=" + container);
				returned = (RestFlexoConceptInstance) getFactory().newFlexoConceptInstance(this, container, support, concept);
				instances.put(support.getIdentifier(), returned);
			}
			else {
				// System.out.println("Identifying existing FCI " + support.getIdentifier() + " : " + returned);
			}
			return returned;
		}

		@Override
		public void addToFlexoConceptInstances(FlexoConceptInstance fci) {
			if (fci instanceof RestFlexoConceptInstance) {
				RestFlexoConceptInstance restFCI = (RestFlexoConceptInstance) fci;
				instances.put(restFCI.getIdentifier(), restFCI);
			}
			super.addToFlexoConceptInstances(fci);
		}

		@Override
		public void removeFromFlexoConceptInstances(FlexoConceptInstance fci) {
			if (fci instanceof RestFlexoConceptInstance) {
				RestFlexoConceptInstance restFCI = (RestFlexoConceptInstance) fci;
				instances.remove(restFCI.getIdentifier());
			}
			super.removeFromFlexoConceptInstances(fci);
		}

		@Override
		public HttpTechnologyAdapter getTechnologyAdapter() {
			if (getServiceManager() != null) {
				return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class);
			}
			return null;
		}

	}
}
