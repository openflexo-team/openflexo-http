package org.openflexo.http.server.fml;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import javassist.util.proxy.ProxyObject;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.resource.PamelaResource;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.http.server.RestService;
import org.openflexo.http.server.core.IdUtils;
import org.openflexo.http.server.core.JsonUtils;
import org.openflexo.model.ModelEntity;
import org.openflexo.model.ModelProperty;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.exceptions.InvalidDataException;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.EmbeddingType;
import org.openflexo.model.factory.ModelFactory;
import org.openflexo.model.factory.ProxyMethodHandler;

/**
 * Creates REST entry point to serveRoot Pamela models of a given root type.
 */
public class PamelaResourceRestService<D extends ResourceData<D>, R extends PamelaResource<D, ?>> {

	private final String prefix;

	private final Supplier<Collection<R>> supplier;
	private final Function<String, R> finder;
	private final Consumer<D> postLoader;

	private final ModelFactory factory;

	private final Class<?> rootClass;

	public PamelaResourceRestService(
			String prefix,
			Supplier<Collection<R>> supplier,
			Function<String, R> finder,
			Consumer<D> postLoader,
			Class<D> rootClass, ModelFactory factory
		) throws ModelDefinitionException
	{
		this.prefix = prefix;
		this.supplier = supplier;
		this.finder = finder;
		this.postLoader = postLoader;
		this.rootClass = rootClass;
		this.factory = factory;
	}

	public void addRoutes(Router router) {
		router.get(prefix).produces(RestService.JSON).handler(this::serveResourceList);
		router.get(prefix + "/:id").produces(RestService.JSON).handler(this::serveRoot);

		ModelEntity<?> rootEntity = factory.getModelContext().getModelEntity(rootClass);
		Iterator<ModelEntity> entities = factory.getModelContext().getEntities();
		while (entities.hasNext()) {
			ModelEntity<?> entity = entities.next();
			if (entity != rootEntity && entity.getXMLTag() != null) {
				String path = prefix + "/:id/" + entity.getXMLTag().toLowerCase();
				router.get(path).produces(RestService.JSON).handler((context) -> serveEntityList(entity, context));
				router.get(path + "/:eid").produces(RestService.JSON).handler((context) -> serveEntity(entity, context));
			}

		}
	}

	private void serveResourceList(RoutingContext context) {
		try {
			JsonArray result = new JsonArray();
			for (R served : supplier.get()) {
				String id = IdUtils.encoreUri(served.getURI());
				String url = context.request().path() + "/" + id;
				Object vpJson = toJson(served, id, url);
				result.add(vpJson);
			}
			context.response().end(result.encodePrettily());

		} catch (Exception e) {
			context.fail(e);
		}
	}

	/**
	 * Retrieves and loads (if not already loaded) resource with given id
	 * then returns the resource.
	 *
	 * @param id resource id
	 * @return the loaded resource
	 * @throws Exception if resource can't be loaded
	 */
	private R getLoadedResource(String id) throws Exception {
		String uri = IdUtils.decodeId(id);

		R served = finder.apply(uri);
		if (served != null) {
			if (!served.isLoaded()) {
				// load data if needed
				served.loadResourceData(null);
				postLoader.accept(served.getLoadedResourceData());
			}
		}

		return served;
	}

	private void serveRoot(RoutingContext context) {
		try {
			String id = context.request().getParam(("id"));
			R resource = getLoadedResource(id);
			if (resource != null) {
				D data = resource.getResourceData(null);
				JsonObject vpJson = (JsonObject) toJson(data, id, context.request().path());
				context.response().end(vpJson.encodePrettily());
			} else {
				notFound(context);
			}
		} catch (Exception e) {
			context.fail(e);
		}
	}

	private void serveEntityList(ModelEntity entity, RoutingContext context) {
		try {
			String id = context.request().getParam(("id"));
			PamelaResource resource = getLoadedResource(id);
			if (resource != null) {
				List<Object> embeddedObjects = resource.getFactory().getEmbeddedObjects(resource.getLoadedResourceData(), EmbeddingType.CLOSURE);
				JsonArray result = new JsonArray();
				for (Object object : embeddedObjects) {
					// TODO check type
					result.add(toJson(object, null, null));

				}
				context.response().end(result.encodePrettily());

			} else {
				notFound(context);
			}
			JsonObject vpJson = (JsonObject) toJson(resource, id, context.request().path());
			context.response().end(vpJson.encodePrettily());
		} catch (NumberFormatException e) {
			notFound(context);
		} catch (Exception e) {
			context.fail(e);
		}

		//context.response().end("{ 'message': 'complete entity list not supported' }");
	}

	private void serveEntity(ModelEntity entity, RoutingContext context) {
		try {
			String id = context.request().getParam(("id"));
			String eid = context.request().getParam(("eid"));
			PamelaResource resource = getLoadedResource(id);
			if (resource != null) {
				long entityId = Long.parseLong(eid);
				// TODO what to do with user
				FlexoObject object = resource.getFlexoObject(entityId, "FLX");
				if (object != null) {
					// TODO check type
					JsonObject vpJson = (JsonObject) toJson(object, id, /*context.request().path()*/ null);
					context.response().end(vpJson.encodePrettily());
				} else {
					notFound(context);
				}

			} else {
				notFound(context);
			}
			JsonObject vpJson = (JsonObject) toJson(resource, id, context.request().path());
			context.response().end(vpJson.encodePrettily());
		} catch (NumberFormatException e) {
			notFound(context);
		} catch (Exception e) {
			context.fail(e);
		}
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
			ModelEntity<?> modelEntity = handler.getModelEntity();
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

			Iterator<ModelProperty<?>> iterator = (Iterator<ModelProperty<?>>) modelEntity.getProperties();
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
			return JsonUtils.getResourceDescription(((ResourceData) value).getResource());
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

	private void notFound(RoutingContext context) {
		context.response().setStatusCode(404).close();
	}
}
