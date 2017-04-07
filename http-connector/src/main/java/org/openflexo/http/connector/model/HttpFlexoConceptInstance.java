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

import com.fasterxml.jackson.core.JsonPointer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import java.io.IOException;
import java.io.InputStream;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.openflexo.connie.type.TypeUtils;
import org.openflexo.foundation.fml.AbstractProperty;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.utils.FlexoObjectReference;
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
public interface HttpFlexoConceptInstance<T> extends FlexoConceptInstance {

	@Initializer
	void initialize(
		@Parameter(OWNING_VIRTUAL_MODEL_INSTANCE_KEY) HttpVirtualModelInstance owner,
		T support, String path, String pointer,
		@Parameter(FLEXO_CONCEPT_URI_KEY) FlexoConcept concept
	);

	abstract class HttpFlexoConceptInstanceImpl
			extends FlexoConceptInstanceImpl
			implements HttpFlexoConceptInstance<ObjectNode>
	{
		private ObjectNode source;
		private JsonPointer pointer;
		private String path;

		private boolean notComplete = false;
		private long lastUpdated = -1l;

		public boolean needUpdate() {
			return (System.nanoTime() - lastUpdated) > (60 * 1_000_000_000l);
		}

		@Override
		public <T> T getFlexoPropertyValue(FlexoProperty<T> flexoProperty) {
			if (flexoProperty instanceof AbstractProperty) {
				update(false);
				if (source != null) {
					JsonNode node = source.get(flexoProperty.getName());
					if (node != null) {
						return convertNode(flexoProperty, node);
					} else if (notComplete) {
						update(true);
						node = source.get(flexoProperty.getName());
						if (node != null) {
							return convertNode(flexoProperty, node);
						}
					}
				}
			}
			return super.getFlexoPropertyValue(flexoProperty);
		}

		private <T> T convertNode(FlexoProperty<T> flexoProperty, JsonNode node) {
			// TODO work on conversion
			Object value = node.textValue();
			return TypeUtils.isAssignableTo(value, flexoProperty.getType()) ? (T) value : null;
		}

		@Override
		public <T> void setFlexoPropertyValue(FlexoProperty<T> flexoProperty, T value) {
			// TODO create patch action
			if (flexoProperty instanceof AbstractProperty) {
				T oldValue = getFlexoPropertyValue(flexoProperty);
				if ((value == null && oldValue != null) || (value != null && !value.equals(oldValue))) {
					source.set(flexoProperty.getName(), value != null ? TextNode.valueOf(value.toString()) : NullNode.getInstance());
					setIsModified();
					getPropertyChangeSupport().firePropertyChange(flexoProperty.getPropertyName(), oldValue, value);
				}
			} else {
				super.setFlexoPropertyValue(flexoProperty, value);
			}
		}

		@Override
		public HttpVirtualModelInstance getVirtualModelInstance() {
			return (HttpVirtualModelInstance) super.getVirtualModelInstance();
		}

		@Override
		public String toString() {
			return super.toString();
		}

		@Override
		public void initialize(HttpVirtualModelInstance owner, ObjectNode support, String path, String pointer, FlexoConcept concept)  {
			setOwningVirtualModelInstance(owner);
			setFlexoConcept(concept);
			this.source = support;
			this.path = path;
			this.pointer = pointer != null ? JsonPointer.compile(pointer) : null;
			if (source != null) {
				lastUpdated = System.nanoTime();
			}
			notComplete = source != null;
		}

		private void update(boolean force) {
			if (needUpdate() || force) {
				synchronized (this) {
					if (needUpdate() || force) {
						AccessPoint accessPoint = getVirtualModelInstance().getAccessPoint();

						HttpGet httpGet = new HttpGet(accessPoint.getUrl() + path);
						accessPoint.contributeHeaders(httpGet);
						try (
							CloseableHttpResponse response = getVirtualModelInstance().getHttpclient().execute(httpGet);
							InputStream stream = response.getEntity().getContent()
						) {

							ObjectMapper mapper = new ObjectMapper();
							JsonNode node = mapper.readTree(stream);
							if (pointer != null) {
								node = node.at(pointer);
							}

							if (node instanceof ObjectNode) {
								source = (ObjectNode) node;
							} else {
								log("Read json isn't an object (" + node + ")", LogLevel.SEVERE, this, null);
							}

						} catch (IOException e) {
							e.printStackTrace();
							log("Can't read '"+ httpGet.getURI() +"': [" + e.getClass().getSimpleName() + "] " + e.getMessage(), LogLevel.SEVERE, this, null);
						} finally {
							notComplete = true;
							lastUpdated = System.nanoTime();
						}
					}
				}
			}
		}

		@Override
		public String getReferenceForSerialization(boolean serializeClassName) {
			AccessPoint accessPoint = getVirtualModelInstance().getAccessPoint();
			String resourceURI = accessPoint.getResource().getURI();
			String conceptName = getFlexoConcept().getName();
			return FlexoObjectReference.constructSerializationRepresentation(null, resourceURI, getUserIdentifier(), path, conceptName);
		}
	}
}