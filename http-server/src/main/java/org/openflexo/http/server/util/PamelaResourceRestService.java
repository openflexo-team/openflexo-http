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

import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import java.util.Collection;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.resource.PamelaResource;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.http.server.RouteService;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.json.JsonError;
import org.openflexo.http.server.json.JsonSerializer;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.EmbeddingType;

/**
 * Creates REST entry point to serveRoot Pamela models of a given root type.
 */
public class PamelaResourceRestService<D extends ResourceData<D>, R extends PamelaResource<D, ?>> {

	public static final String DETAILED_PARAM = "detailed";

	private final String prefix;

	private final Supplier<Collection<R>> supplier;

	private final Function<String, R> finder;

	private final Class<R> resourceClass;

	private final JsonSerializer serializer;

	private Consumer<D> postLoader = null;

	public PamelaResourceRestService(
		String prefix,
		Supplier<Collection<R>> supplier,
		Function<String, R> finder,
		Class<R> resourceClass,
		TechnologyAdapterRouteService service
	) throws ModelDefinitionException {
		this.prefix = prefix;
		this.supplier = supplier;
		this.finder = finder;
		this.resourceClass = resourceClass;
		this.serializer = service.getSerializer();
	}

	public String getPrefix() {
		return prefix;
	}

	public Class<R> getResourceClass() {
		return resourceClass;
	}

	public void setPostLoader(Consumer<D> postLoader) {
		this.postLoader = postLoader;
	}

	public void addRoutes(Router router) {
		router.get(prefix).produces(RouteService.JSON).handler(this::serveResourceList);
		router.get(prefix + "/:id").produces(RouteService.JSON).handler(this::serveRoot);
		router.get(prefix + "/:id/object").produces(RouteService.JSON).handler(this::serveEntityList);
		router.get(prefix + "/:id/object/:eid").produces(RouteService.JSON).handler(this::serveEntity);
	}

	private void serveResourceList(RoutingContext context) {
		try {
			boolean detailed = context.request().getParam(DETAILED_PARAM) != null;
			JsonArray result = new JsonArray();
			for (R served : supplier.get()) {
				result.add(serializer.toJson(served, detailed));
			}
			context.response().end(result.encodePrettily());

		} catch (Exception e) {
			error(context,e);
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
				boolean detailed = context.request().getParam(DETAILED_PARAM) != null;
				JsonObject vpJson = (JsonObject) serializer.toJson(resource, detailed);
				context.response().end(vpJson.encodePrettily());
			} else {
				notFound(context);
			}
		} catch (Exception e) {
			error(context,e);
		}
	}

	private void serveEntityList(RoutingContext context) {
		try {
			String id = context.request().getParam(("id"));
			PamelaResource resource = getLoadedResource(id);
			if (resource != null) {
				boolean detailed = context.request().getParam(DETAILED_PARAM) != null;
				List<Object> embeddedObjects = resource.getFactory().getEmbeddedObjects(resource.getLoadedResourceData(), EmbeddingType.CLOSURE);
				JsonArray result = new JsonArray();
				for (Object object : embeddedObjects) {
					result.add(serializer.toJson(object, detailed));
				}
				context.response().end(result.encodePrettily());

			} else {
				notFound(context);
			}
		} catch (NumberFormatException e) {
			notFound(context);
		} catch (Exception e) {
			error(context,e);
		}
	}

	private void serveEntity(RoutingContext context) {
		try {
			String id = context.request().getParam(("id"));
			String eid = context.request().getParam(("eid"));
			PamelaResource resource = getLoadedResource(id);
			if (resource != null) {
				long entityId = Long.parseLong(eid);
				// TODO what to do with user
				FlexoObject object = resource.getFlexoObject(entityId, "FLX");
				if (object != null) {
					boolean detailed = context.request().getParam(DETAILED_PARAM) != null;
					JsonObject vpJson = (JsonObject) serializer.toJson(object, detailed);
					context.response().end(vpJson.encodePrettily());
				} else {
					notFound(context);
				}

			} else {
				notFound(context);
			}
		} catch (NumberFormatException e) {
			notFound(context);
		} catch (Exception e) {
			error(context, e);
		}
	}

	private void notFound(RoutingContext context) {
		context.response().setStatusCode(404).close();
	}

	private void error(RoutingContext context, Throwable e) {
		HttpServerResponse response = context.response();
		response.end(new JsonError(e).toString());
	}
}
