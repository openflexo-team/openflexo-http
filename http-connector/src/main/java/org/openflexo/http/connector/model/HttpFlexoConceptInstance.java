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

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.openflexo.connie.type.TypeUtils;
import org.openflexo.foundation.fml.AbstractProperty;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance.HttpFlexoConceptInstanceImpl;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.Initializer;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Parameter;

/**
 * VirtualModel instance that represents a distant object set through an AccessPoint
 */
@ModelEntity
@ImplementationClass(HttpFlexoConceptInstanceImpl.class)
public interface HttpFlexoConceptInstance extends FlexoConceptInstance {

	@Initializer
	void initialize(@Parameter(FLEXO_CONCEPT_URI_KEY) FlexoConcept concept, String url);

	abstract class HttpFlexoConceptInstanceImpl
			extends FlexoConceptInstanceImpl
			implements HttpFlexoConceptInstance
	{
		private final Map<String, Object> values = new HashMap<>();
		private String url;

		private long lastUpdated = System.currentTimeMillis();
		private final CloseableHttpClient httpclient = HttpClients.createDefault();

		public boolean needUpdate() {
			return System.currentTimeMillis() - lastUpdated > 20000;
		}

		@Override
		public <T> T getFlexoPropertyValue(FlexoProperty<T> flexoProperty) {
			if (flexoProperty instanceof AbstractProperty) {
				update();
				Object value = values.get(flexoProperty.getName());
				return TypeUtils.isAssignableTo(value, flexoProperty.getType()) ? (T) value : null;
			} else {
				return super.getFlexoPropertyValue(flexoProperty);
			}
		}

		@Override
		public <T> void setFlexoPropertyValue(FlexoProperty<T> flexoProperty, T value) {
			if (flexoProperty instanceof AbstractProperty) {
				T oldValue = getFlexoPropertyValue(flexoProperty);
				if ((value == null && oldValue != null) || (value != null && !value.equals(oldValue))) {
					values.put(flexoProperty.getName(), value);
					setIsModified();
					getPropertyChangeSupport().firePropertyChange(flexoProperty.getPropertyName(), oldValue, value);
				}
			} else {
				super.setFlexoPropertyValue(flexoProperty, value);
			}
		}

		@Override
		public String toString() {
			return super.toString();
		}

		@Override
		public void initialize(FlexoConcept concept,String url)  {
			this.url = url;
			setFlexoConcept(concept);
			update();
		}

		private void update() {
			if (needUpdate()) {
				HttpGet httpGet = new HttpGet(url);
				try (	CloseableHttpResponse response = httpclient.execute(httpGet);
						InputStream stream = response.getEntity().getContent()
				) {
					JsonParser parser = new JsonFactory().createParser(stream);

					// creates field stack to deserialize, it contains the root field
					Stack<String> fieldStack = new Stack<>();
					fieldStack.push("");

					while (!parser.isClosed()) {
						JsonToken token = parser.nextToken();

						if (token != null) {
							switch (token) {
								case START_OBJECT:
								case START_ARRAY:
									break;
								case END_OBJECT:
								case END_ARRAY:
									fieldStack.pop();
									break;
								case FIELD_NAME:
									fieldStack.push(parser.getValueAsString());
									break;
								default:
									values.put(fieldStack.pop(), /*parser.getCurrentValue()*/ parser.getValueAsString());
									break;
							}
						}
					}
				} catch (IOException e) {

				} finally {
					lastUpdated = System.currentTimeMillis();
				}
			}
		}
	}
}
