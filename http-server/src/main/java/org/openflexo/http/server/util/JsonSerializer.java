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

package org.openflexo.http.server.util;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javassist.util.proxy.ProxyObject;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.model.ModelEntity;
import org.openflexo.model.ModelProperty;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.exceptions.InvalidDataException;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.ModelFactory;
import org.openflexo.model.factory.ProxyMethodHandler;

/**
 * An instance of JsonSerializer transforms Pamela object to JSON object.
 * The JSON result only contains the object destined to a REST service.
 */
public class JsonSerializer {

	private final TechnologyAdapterRouteService service;

	private final ModelFactory factory;

	public JsonSerializer(TechnologyAdapterRouteService service, ModelFactory factory) {
		this.service = service;
		this.factory = factory;
	}

	public Object toJson(Object object, String id, String url) throws ModelDefinitionException, InvalidDataException {
		if (object == null) return null;

		Class<?> type = object.getClass();
		if (type.isPrimitive() || type.isAssignableFrom(String.class)) {
			// no transformation needed
			return object;
		}
		else if (factory.getStringEncoder().isConvertable(type)) {
			return factory.getStringEncoder().toString(object);
		}
		else if (type.isEnum() || type.getSuperclass().isEnum()) {
			return object.toString();
		}
		else if (object instanceof ProxyObject) {
			ProxyMethodHandler<?> handler = (ProxyMethodHandler<?>) ((ProxyObject) object).getHandler();
			@SuppressWarnings({"unchecked", "rawtype"}) ModelEntity<Object> modelEntity = (ModelEntity<Object>) handler.getModelEntity();
			JsonObject result = new JsonObject();

			// adds id and url for object
			if (id != null) result.put("id", id);

			String xmlTag = modelEntity.getXMLTag();
			if (xmlTag != null) {
				xmlTag = xmlTag.toLowerCase();
				result.put("type", xmlTag);
			}
			if (url != null) {
				result.put("url", url);
			} else {
				result.put("url", xmlTag + "/" + id);
			}

			Iterator<ModelProperty<? super Object>> iterator = modelEntity.getProperties();
			while (iterator.hasNext()) {
				ModelProperty property = iterator.next();
				if (true || property.isSerializable()) {
					XMLAttribute xmlAttribute = property.getXMLAttribute();
					XMLElement xmlElement = property.getXMLElement();

					boolean reference = xmlAttribute == null;
					Object propertyValue = handler.invokeGetter(property);
					Object transformed = null;
					switch (property.getCardinality()) {
						case SINGLE: {
							transformed = toJsonInternalObject(propertyValue, reference);
							break;
						}
						case LIST: {
							List<Object> collected = new ArrayList<>();
							for (Object child : (List) propertyValue) {
								collected.add(toJsonInternalObject(child, reference));
							}
							transformed = new JsonArray(collected);
							break;
						}
						case MAP: {
							//TODO
							break;
						}
						default:
							break;
					}

					String propertyName = property.getPropertyIdentifier();
					if (xmlAttribute != null && xmlAttribute.xmlTag().length() > 0) propertyName = xmlAttribute.xmlTag();
					if (xmlElement != null && xmlElement.xmlTag().length() > 0) propertyName = xmlElement.xmlTag();
					result.put(propertyName, transformed);
				}
			}
			return result;
		}
		else {
			throw new InvalidDataException("Can't transform " + object + " to JSON");
		}
	}

	private Object toJsonInternalObject(Object value, boolean reference) throws InvalidDataException, ModelDefinitionException {
		if (value instanceof ResourceData) {
			/*JsonObject result = new JsonObject();
			ResourceData data = (ResourceData) value;*/
			return JsonUtils.getResourceDescription(((ResourceData) value).getResource(), service);
		} else if (value instanceof FlexoObject) {
			FlexoObject flexoObject = (FlexoObject) value;
			String id = Long.toString(flexoObject.getFlexoID());
			String url = "";
			return reference ? flexoObject.getFlexoID() : toJson(value, id, url);
		} else if (!reference) {
			return toJson(value, null, null);
		} else if (value == null) {
			return null;
		} else {
			//throw new InvalidDataException("Can't reference '" + value + "'");
			return null;
		}
	}
}
