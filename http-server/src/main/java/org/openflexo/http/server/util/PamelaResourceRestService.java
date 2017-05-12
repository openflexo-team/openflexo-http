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
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.resource.PamelaResource;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.http.server.RouteService;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.model.ModelEntity;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.EmbeddingType;
import org.openflexo.model.factory.ModelFactory;

/**
 * Creates REST entry point to serveRoot Pamela models of a given root type.
 */
public class PamelaResourceRestService<D extends ResourceData<D>, R extends PamelaResource<D, ?>> {

	private final String prefix;

	private final Supplier<Collection<R>> supplier;

	private final Function<String, R> finder;

	private final ModelFactory factory;

	private final Class<?> rootClass;

	private final JsonSerializer serializer;

	private Consumer<D> postLoader = null;

	public PamelaResourceRestService(
		String prefix,
		Supplier<Collection<R>> supplier,
		Function<String, R> finder,
		Class<D> rootClass,
		TechnologyAdapterRouteService service,
		ModelFactory factory
	) throws ModelDefinitionException {
		this.prefix = prefix;
		this.supplier = supplier;
		this.finder = finder;
		this.rootClass = rootClass;
		this.factory = factory;
		this.serializer = new JsonSerializer(service, factory);
	}

	public void setPostLoader(Consumer<D> postLoader) {
		this.postLoader = postLoader;
	}

	public void addRoutes(Router router) {
		router.get(prefix).produces(RouteService.JSON).handler(this::serveResourceList);
		router.get(prefix + "/:id").produces(RouteService.JSON).handler(this::serveRoot);

		ModelEntity<?> rootEntity = factory.getModelContext().getModelEntity(rootClass);
		Iterator<ModelEntity> entities = factory.getModelContext().getEntities();
		while (entities.hasNext()) {
			ModelEntity<?> entity = entities.next();
			if (entity != rootEntity && entity.getXMLTag() != null) {
 				String path = prefix + "/:id/" + entity.getXMLTag().toLowerCase();
				router.get(path).produces(RouteService.JSON).handler((context) -> serveEntityList(entity, context));
				router.get(path + "/:eid").produces(RouteService.JSON).handler((context) -> serveEntity(entity, context));
			}

		}
	}

	private void serveResourceList(RoutingContext context) {
		try {
			JsonArray result = new JsonArray();
			for (R served : supplier.get()) {
				String id = IdUtils.encoreUri(served.getURI());
				String url = context.request().path() + "/" + id;
				Object vpJson = serializer.toJson(served, id, url);
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
				if (postLoader != null) {
					postLoader.accept(served.getLoadedResourceData());
				}
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
				JsonObject vpJson = (JsonObject) serializer.toJson(data, id, context.request().path());
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
					result.add(serializer.toJson(object, null, null));

				}
				context.response().end(result.encodePrettily());

			} else {
				notFound(context);
			}
			JsonObject vpJson = (JsonObject) serializer.toJson(resource, id, context.request().path());
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
					JsonObject vpJson = (JsonObject) serializer.toJson(object, id, /*context.request().path()*/ null);
					context.response().end(vpJson.encodePrettily());
				} else {
					notFound(context);
				}

			} else {
				notFound(context);
			}
			JsonObject vpJson = (JsonObject) serializer.toJson(resource, id, context.request().path());
			context.response().end(vpJson.encodePrettily());
		} catch (NumberFormatException e) {
			notFound(context);
		} catch (Exception e) {
			context.fail(e);
		}
	}



	private void notFound(RoutingContext context) {
		context.response().setStatusCode(404).close();
	}
}
