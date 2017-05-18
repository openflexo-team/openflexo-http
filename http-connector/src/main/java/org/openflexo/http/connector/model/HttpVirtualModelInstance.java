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

package org.openflexo.http.connector.model;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.rt.View;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.fml.rt.rm.ViewResource;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.http.connector.model.HttpVirtualModelInstance.HttpVirtualModelInstanceImpl;
import org.openflexo.http.connector.model.support.ContentSupport;
import org.openflexo.http.connector.model.support.ContentSupportFactory;
import org.openflexo.http.connector.rm.AccessPointResource;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.Import;
import org.openflexo.model.annotations.Imports;
import org.openflexo.model.annotations.Initializer;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Parameter;
import org.openflexo.model.annotations.Setter;

/**
 * VirtualModel instance that represents a distant object set through an AccessPoint
 */
@ModelEntity
@ImplementationClass(HttpVirtualModelInstanceImpl.class)
@Imports( @Import(HttpFlexoConceptInstance.class) )
public interface HttpVirtualModelInstance<S extends ContentSupport> extends VirtualModelInstance {

	String ACCESS_POINT = "accessPoint";

	@Initializer
	void initialize(@Parameter(ACCESS_POINT) AccessPoint accessPoint, ContentSupportFactory<S> supportFactory);

	@Getter(ACCESS_POINT)
	AccessPoint getAccessPoint();

	@Setter(ACCESS_POINT)
	void setAccessPoint(AccessPoint accessPoint);

	List<HttpFlexoConceptInstance> getFlexoConceptInstances(String path, String pointer, FlexoConcept concept);

	HttpFlexoConceptInstance getFlexoConceptInstance(String url, String pointer, FlexoConcept concept);

	CloseableHttpClient getHttpclient();

	abstract class HttpVirtualModelInstanceImpl<S extends ContentSupport> extends VirtualModelInstanceImpl implements HttpVirtualModelInstance<S> {

		private final CloseableHttpClient httpclient = HttpClients.createDefault();

		private final Map<String, HttpFlexoConceptInstance> instances = new HashMap<>();

		private ContentSupportFactory supportFactory;

		@Override
		public void initialize(AccessPoint accessPoint, ContentSupportFactory<S> supportFactory) {
			performSuperSetter(ACCESS_POINT, accessPoint);
			this.supportFactory = supportFactory;
		}

		@Override
		public HttpFlexoConceptInstance getFlexoConceptInstance(String path, String pointer, FlexoConcept concept) {
			return instances.computeIfAbsent(
				path, (newPath) -> {
					ContentSupport support = supportFactory.newSupport(this, concept, path, null, pointer);
					return getAccessPointFactory().newFlexoConceptInstance(this, support, path, concept);
				});
		}

		public CloseableHttpClient getHttpclient() {
			return httpclient;
		}

		public List<HttpFlexoConceptInstance> getFlexoConceptInstances(String path, String pointer, FlexoConcept concept) {
			AccessPoint accessPoint = getAccessPoint();
			HttpGet httpGet = new HttpGet(accessPoint.getUrl() + path);
			accessPoint.contributeHeaders(httpGet);
			try (
				CloseableHttpResponse response = httpclient.execute(httpGet);
				InputStream stream = response.getEntity().getContent()
			) {

				List<S> supports = supportFactory.newSupports(this, concept, path, stream, pointer);
				return supports.stream().map((s) ->
					getAccessPointFactory().newFlexoConceptInstance(this, s, null, concept)
				).collect(Collectors.toList());

			} catch (IOException e) {
				log("Can't read '"+ httpGet.getURI() +"': [" + e.getClass().getSimpleName() + "] " + e.getMessage(), LogLevel.SEVERE, this, null);
			}
			return Collections.emptyList();
		}

		public AccessPointResource getAccessPointResource() {
			return (AccessPointResource) this.getAccessPoint().getResource();
		}

		public AccessPointFactory getAccessPointFactory() {
			return getAccessPointResource().getFactory();
		}

		@Override
		public ViewPoint getViewPoint() {
			return getView().getViewPoint();
		}

		@Override
		public View getView() {
			AccessPointResource resource = getAccessPointResource();
			if (resource != null && resource.getContainer() instanceof ViewResource) {
				return ((ViewResource) resource.getContainer()).getView();
			}
			return null;
		}

		@Override
		public FlexoResourceCenter<?> getResourceCenter() {
			FlexoResource<AccessPoint> resource = getAccessPoint().getResource();
			return resource != null ? resource.getResourceCenter() :  null;
		}

		@Override
		public String toString() {
			return "HttpVirtualModelInstance:" + super.toString();
		}

	}
}
