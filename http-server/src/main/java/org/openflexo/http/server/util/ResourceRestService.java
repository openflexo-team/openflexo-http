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
import org.openflexo.http.server.RouteService;
import org.openflexo.http.server.json.JsonError;
import org.openflexo.http.server.json.JsonSerializer;

/**
 * Creates REST entry point to serve resources associated with data.
 */
public abstract class ResourceRestService<D, R> {

	public static final String DETAILED_PARAM = "detailed";

	protected final String prefix;

	protected final Class<R> resourceClass;

	protected final JsonSerializer serializer;

	public ResourceRestService(
		String prefix,
		Class<R> resourceClass,
		JsonSerializer serializer
	) {
		this.prefix = prefix;
		this.resourceClass = resourceClass;
		this.serializer = serializer;
	}

	public String getPrefix() {
		return prefix;
	}

	public Class<R> getResourceClass() {
		return resourceClass;
	}

	protected abstract Collection<R> allResources();

	protected abstract R findResource(String id);

	protected abstract D loadResource(R resource) throws Exception;

	protected abstract Collection<Object> allObjects(R resource);

	protected abstract Object findObject(R resource, String id);

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
			for (R served : allResources()) {
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
	protected R getLoadedResource(String id) throws Exception {
		String uri = IdUtils.decodeId(id);
		R served = findResource(id);
		if (served != null) {
			// load data if needed
			loadResource(served);
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
			R resource = getLoadedResource(id);
			if (resource != null) {
				boolean detailed = context.request().getParam(DETAILED_PARAM) != null;
				Collection<Object> embeddedObjects = allObjects(resource);
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
			R resource = getLoadedResource(id);
			if (resource != null) {
				Object object = findObject(resource, eid);
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
