package org.openflexo.http.server.fml;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;
import javassist.util.proxy.ProxyObject;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.resource.PamelaResource;
import org.openflexo.http.server.RestService;
import org.openflexo.http.server.core.IdUtils;
import org.openflexo.model.ModelEntity;
import org.openflexo.model.ModelProperty;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.exceptions.InvalidDataException;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.ModelFactory;
import org.openflexo.model.factory.ProxyMethodHandler;

/**
 * Creates REST entry point to serve Pamela models of a given root type.
 */
public class PamelaResourceRestService<T extends PamelaResource> {

	private final String prefix;

	private final Supplier<Collection<T>> supplier;
	private final Function<String, T> finder;

	private final ModelFactory factory;

	private final Class<?> rootClass;

	public PamelaResourceRestService(
			String prefix,
			Supplier<Collection<T>> supplier,
			Function<String, T> finder,
			Class<T> rootClass, ModelFactory factory
		) throws ModelDefinitionException
	{
		this.prefix = prefix;
		this.supplier = supplier;
		this.finder = finder;
		this.rootClass = rootClass;
		this.factory = factory;
	}

	public void addRoutes(Router router) {
		router.get(prefix).produces(RestService.JSON).handler(this::serveList);
		router.get(prefix + "/:id").produces(RestService.JSON).handler(this::serve);
	}

	private void serveList(RoutingContext context) {
		try {
			JsonArray result = new JsonArray();
			for (T served : supplier.get()) {
				String id = IdUtils.encoreUri(served.getURI());
				String url = context.request().path() + "/" + id;
				Object vpJson = toJson(served.getResourceData(null), id, url);
				result.add(vpJson);
			}
			context.response().end(result.encodePrettily());

		} catch (Exception e) {
			context.fail(e);
		}
	}

	private void serve(RoutingContext context) {
		String id = context.request().getParam(("id"));
		String uri = IdUtils.decodeId(id);

		T served = finder.apply(uri);
		try {
			JsonObject vpJson = toJson(served, id, context.request().path());
			context.response().end(vpJson.encodePrettily());

		} catch (Exception e) {
			context.fail(e);
		}
	}

	public JsonObject toJson(Object object, String id, String url) throws ModelDefinitionException, InvalidDataException {
		Object json = toJson(object);
		if (json instanceof JsonObject) {
			// adds id and url
			JsonObject jsonObject = (JsonObject) json;
			jsonObject.put("id", id);
			jsonObject.put("url", url);
			return jsonObject;
		}
		throw new InvalidDataException("");
	}

	private Object toJson(Object object) throws ModelDefinitionException, InvalidDataException {
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
					// TODO handle non terminal types using flexoId
					// TODO handle multiple types

					XMLElement xmlElement = property.getXMLElement();
					boolean reference = xmlElement != null;
					Object propertyValue = handler.invokeGetter(property);
					Object transformed = null;
					switch (property.getCardinality()) {
						case SINGLE: {
							if (reference && propertyValue instanceof FlexoObject) {
								transformed = ((FlexoObject) propertyValue).getFlexoID();
							} else {
								transformed = toJson(propertyValue);
							}
							break;
						}
						case LIST: {
							List<Object> collected = new ArrayList<>();
							for (Object child : (List) propertyValue) {
 								if (reference && child instanceof FlexoObject) {
									collected.add(((FlexoObject) child).getFlexoID());
								} else {
									collected.add(toJson(child));
								}
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
					XMLAttribute xmlAttribute = property.getXMLAttribute();
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
}
