package org.openflexo.http.server;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javassist.util.proxy.ProxyObject;
import org.openflexo.model.ModelEntity;
import org.openflexo.model.ModelProperty;
import org.openflexo.model.exceptions.InvalidDataException;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.ModelFactory;
import org.openflexo.model.factory.ProxyMethodHandler;

/**
 * Created by charlie on 08/02/2017.
 */
public class PamelaJsonSerializer {

	private final ModelFactory factory;

	public PamelaJsonSerializer(ModelFactory factory) {
		this.factory = factory;
	}

	public Object toJson(Object object, boolean complete) throws ModelDefinitionException, InvalidDataException {
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
			ModelEntity<?> modelEntity = handler.getModelEntity();
			JsonObject result = new JsonObject();
			Iterator<ModelProperty<?>> iterator = (Iterator<ModelProperty<?>>) modelEntity.getProperties();
			while (iterator.hasNext()) {
				ModelProperty property = iterator.next();
				if (property.isSerializable()) {
					// TODO handle embedded
					// TODO handle non terminal types using flexoId
					// TODO handle convertible to string types
					// TODO handle multiple types
					// TODO handle complete

					Object propertyValue = handler.invokeGetter(property);
					Object transformed = null;
					switch (property.getCardinality()) {
						case SINGLE: {
							transformed = toJson(propertyValue, complete);
							break;
						}
						case LIST: {
							List<Object> collected = new ArrayList<>();
							for (Object child : (List) propertyValue) {
								collected.add(toJson(child, complete));
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
					String propertyName = property.getPropertyIdentifier(); //property.getXMLAttribute().xmlTag();
					result.put(propertyName, transformed);
				}
			}
			return result;
		}
		else {
			throw new InvalidDataException("Can't transform " + object + " to JSON");
		}
	}
}
