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

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.logging.Logger;

import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpVirtualModelInstance.HttpVirtualModelInstanceImpl;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.pamela.annotations.Getter;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.Import;
import org.openflexo.pamela.annotations.Imports;
import org.openflexo.pamela.annotations.Initializer;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.Setter;
import org.openflexo.pamela.annotations.XMLAttribute;

/**
 * An HTTP-specific {@link VirtualModelInstance} reflecting distants objects accessible through a {@link HttpModelSlot} configured with a
 * {@link VirtualModel}
 * 
 */
@ModelEntity(isAbstract = true)
@ImplementationClass(HttpVirtualModelInstanceImpl.class)
@Imports(@Import(HttpFlexoConceptInstance.class))
public interface HttpVirtualModelInstance<VMI extends HttpVirtualModelInstance<VMI>>
		extends VirtualModelInstance<VMI, HttpTechnologyAdapter> {

	String URL_KEY = "url";
	String USER_KEY = "user";
	String PASSWORD_KEY = "password";

	@Getter(URL_KEY)
	@XMLAttribute
	String getUrl();

	@Setter(URL_KEY)
	void setUrl(String url);

	@Getter(USER_KEY)
	@XMLAttribute
	String getUser();

	@Setter(USER_KEY)
	void setUser(String user);

	@Getter(PASSWORD_KEY)
	@XMLAttribute
	String getPassword();

	@Setter(PASSWORD_KEY)
	void setPassword(String password);

	@Initializer
	void initialize(FlexoServiceManager serviceManager, ContentSupportFactory<?, ?> supportFactory);

	public CloseableHttpClient getHttpclient();

	void contributeHeaders(HttpUriRequest request);

	public ContentSupportFactory<?, ?> getSupportFactory();

	public void setSupportFactory(ContentSupportFactory<?, ?> supportFactory);

	abstract class HttpVirtualModelInstanceImpl<VMI extends HttpVirtualModelInstance<VMI>>
			extends VirtualModelInstanceImpl<VMI, HttpTechnologyAdapter> implements HttpVirtualModelInstance<VMI> {

		@SuppressWarnings("unused")
		private static final Logger logger = FlexoLogger.getLogger(HttpVirtualModelInstance.class.getPackage().toString());

		private final CloseableHttpClient httpclient = HttpClients.createDefault();

		private ContentSupportFactory<?, ?> supportFactory;

		@Override
		public void initialize(FlexoServiceManager serviceManager, ContentSupportFactory<?, ?> supportFactory) {
			this.supportFactory = supportFactory;
		}

		@Override
		public CloseableHttpClient getHttpclient() {
			return httpclient;
		}

		@Override
		public ContentSupportFactory<?, ?> getSupportFactory() {
			return supportFactory;
		}

		@Override
		public void setSupportFactory(ContentSupportFactory<?, ?> supportFactory) {
			if ((supportFactory == null && this.supportFactory != null)
					|| (supportFactory != null && !supportFactory.equals(this.supportFactory))) {
				ContentSupportFactory<?, ?> oldValue = this.supportFactory;
				this.supportFactory = supportFactory;
				getPropertyChangeSupport().firePropertyChange("supportFactory", oldValue, supportFactory);
			}
		}

		@Override
		public void contributeHeaders(HttpUriRequest request) {
			String user = getUser();
			String password = getPassword();
			if (user != null && user.length() > 0 && password != null && password.length() > 0) {
				StringBuilder value = new StringBuilder();
				value.append("Basic ");
				String authentication = user + ":" + password;
				value.append(Base64.getEncoder().encodeToString(authentication.getBytes(StandardCharsets.UTF_8)));
				request.addHeader("Authorization", value.toString());
			}
		}

		@Override
		public List<FlexoConceptInstance> getFlexoConceptInstances() {
			if (isSerializing()) {
				// FCI are not serialized
				return null;
			}
			return (List<FlexoConceptInstance>) performSuperGetter(FLEXO_CONCEPT_INSTANCES_KEY);
		}

	}
}
