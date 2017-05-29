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

package org.openflexo.http.server.core.ta;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.ServiceLoader;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.RouteService;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.http.server.util.JsonUtils;

/**
 * Created by charlie on 11/02/2017.
 */
public class TechnologyAdapterRouteService implements RouteService<FlexoServiceManager> {

	private static Logger logger = Logger.getLogger(TechnologyAdapterRouteService.class.getPackage().getName());

	private TechnologyAdapterService technologyAdapterService;

	private final Map<String, TechnologyAdapter> technologyAdapterMap = new LinkedHashMap<>();
	private final Map<TechnologyAdapter, TechnologyAdapterRouteComplement<TechnologyAdapter>> complementMap = new LinkedHashMap<>();
	private final Map<Class<? extends FlexoResource<?>>, String> resourcePrefixes = new TreeMap<>(Comparator.comparing(Class::getSimpleName));

	@Override
	public void initialize(HttpService service,FlexoServiceManager serviceManager) throws Exception {
		technologyAdapterService = serviceManager.getTechnologyAdapterService();

		Map<TechnologyAdapter, String> ids = new HashMap<>();
		for (TechnologyAdapter technologyAdapter : technologyAdapterService.getTechnologyAdapters()) {
			String identifier = IdUtils.getTechnologyAdapterId(technologyAdapter);
			technologyAdapterMap.put(identifier, technologyAdapter);
			ids.put(technologyAdapter, identifier);
		}

		ServiceLoader<TechnologyAdapterRouteComplement> complements = ServiceLoader.load(TechnologyAdapterRouteComplement.class);

		// initializes complements
		for (TechnologyAdapterRouteComplement<TechnologyAdapter> complement : complements) {

			String name = complement.getClass().getName();
			try {

				Class<? extends TechnologyAdapter> technologyAdapterClass = complement.getTechnologyAdapterClass();
				TechnologyAdapter technologyAdapter = technologyAdapterService.getTechnologyAdapter(technologyAdapterClass);
				if (technologyAdapter != null) {
					logger.log(Level.INFO, "Initializing Technology Adapter complement " + name);
					complement.initialize(service, technologyAdapter);

					complementMap.put(technologyAdapter, complement);

					String prefix = "/ta/" + IdUtils.getTechnologyAdapterId(technologyAdapter);
					for (Map.Entry<Class<? extends FlexoResource<?>>, String> entry : complement.getResourceRoots().entrySet()) {
						resourcePrefixes.put(entry.getKey(), prefix + entry.getValue());
					}

				}
			} catch (Exception e) {
				logger.log(Level.SEVERE, "Unable to initialize Technology Adapter complement " + name, e);
			}
		}
	}

	public TechnologyAdapterRouteComplement<TechnologyAdapter> getComplement(TechnologyAdapter adapter) {
		if (adapter == null) return null;
		return complementMap.get(adapter);
	}

	@Override
	public void addRoutes(Vertx vertx, Router router) {
		router.get("/ta").produces(JSON).handler(this::serveTechnologyAdapterList);
		router.get("/ta/:taid").produces(JSON).handler(this::serveTechnologyAdapter);

		for (Map.Entry<TechnologyAdapter, TechnologyAdapterRouteComplement<TechnologyAdapter>> entry : complementMap.entrySet()) {
			Router subRouter = Router.router(vertx);
			String route = "/ta/" + IdUtils.getTechnologyAdapterId(entry.getKey());
			router.mountSubRouter(route, subRouter);
			entry.getValue().addRoutes(vertx, subRouter);
		}
	}

	public String getPrefix(FlexoResource resource) {
		if (resource == null) return null;
		return getPrefix(resource.getClass());
	}

	public String getPrefix(Class<? extends FlexoResource> resourceClass) {
		for (Map.Entry<Class<? extends FlexoResource<?>>, String> entry : resourcePrefixes.entrySet()) {
			if (entry.getKey().isAssignableFrom(resourceClass)) {
				return entry.getValue();
			}
		}
		return null;
	}

	private void serveTechnologyAdapterList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (Map.Entry<String, TechnologyAdapter> entry : technologyAdapterMap.entrySet()) {
			TechnologyAdapter technologyAdapter = entry.getValue();
			result.add(JsonUtils.getTechnologyAdapterDescription(entry.getKey(), technologyAdapter, this));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveTechnologyAdapter(RoutingContext context) {
		String id = context.request().getParam(("taid"));
		TechnologyAdapter technologyAdapter = technologyAdapterMap.get(id);
		if (technologyAdapter != null) {
			JsonObject object = JsonUtils.getTechnologyAdapterDescription(id, technologyAdapter, this);
			context.response().end(object.encodePrettily());
		}
		else {
			notFound(context);
		}
	}
}
