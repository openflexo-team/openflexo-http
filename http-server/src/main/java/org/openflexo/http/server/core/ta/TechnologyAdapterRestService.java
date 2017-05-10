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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.ServiceLoader;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.server.RestService;
import org.openflexo.http.server.core.IdUtils;
import org.openflexo.http.server.core.JsonUtils;

/**
 * Created by charlie on 11/02/2017.
 */
public class TechnologyAdapterRestService implements RestService<FlexoServiceManager> {

	private static Logger logger = Logger.getLogger(TechnologyAdapterRestService.class.getPackage().getName());

	private TechnologyAdapterService technologyAdapterService;

	private final Map<String, TechnologyAdapter> technologyAdapterMap = new HashMap<>();
	private final Map<String, TechnologyAdapterRestComplement<TechnologyAdapter>> complementMap = new LinkedHashMap<>();

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		technologyAdapterService = serviceManager.getTechnologyAdapterService();

		Map<TechnologyAdapter, String> ids = new HashMap<>();
		for (TechnologyAdapter technologyAdapter : technologyAdapterService.getTechnologyAdapters()) {
			String identifier = IdUtils.getTechnologyAdapterId(technologyAdapter);
			technologyAdapterMap.put(identifier, technologyAdapter);
			ids.put(technologyAdapter, identifier);
		}

		ServiceLoader<TechnologyAdapterRestComplement> complements = ServiceLoader.load(TechnologyAdapterRestComplement.class);

		// initializes complements
		List<TechnologyAdapterRestComplement> initializedServices = new ArrayList<>();
		for (TechnologyAdapterRestComplement<TechnologyAdapter> complement : complements) {

			String name = complement.getClass().getName();
			try {

				Class<? extends TechnologyAdapter> technologyAdapterClass = complement.getTechnologyAdapterClass();
				TechnologyAdapter technologyAdapter = technologyAdapterService.getTechnologyAdapter(technologyAdapterClass);
				if (technologyAdapter != null) {
					logger.log(Level.INFO, "Initializing Technology Adapter complement " + name);
					complement.initialize(technologyAdapter);

					complementMap.put(ids.get(technologyAdapter), complement);
				}
			} catch (Exception e) {
				logger.log(Level.SEVERE, "Unable to initialize Technology Adapter complement " + name, e);
			}
		}
	}

	@Override
	public void addRoutes(Vertx vertx, Router router) {
		router.get("/ta").produces(JSON).handler(this::serveTechnologyAdapterList);
		router.get("/ta/:taid").produces(JSON).handler(this::serveTechnologyAdapter);

		for (Map.Entry<String, TechnologyAdapterRestComplement<TechnologyAdapter>> entry : complementMap.entrySet()) {
			Router subRouter = Router.router(vertx);
			router.mountSubRouter("/ta/" + entry.getKey(), subRouter);
			entry.getValue().addRoutes(vertx, subRouter);
		}
	}

	private void serveTechnologyAdapterList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (TechnologyAdapter technologyAdapter : technologyAdapterService.getTechnologyAdapters()) {
			result.add(JsonUtils.getTechnologyAdapterDescription(technologyAdapter));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveTechnologyAdapter(RoutingContext context) {
		String id = context.request().getParam(("taid"));
		TechnologyAdapter technologyAdapter = technologyAdapterMap.get(id);
		if (technologyAdapter != null) {
			JsonObject object = JsonUtils.getTechnologyAdapterDescription(technologyAdapter);
			TechnologyAdapterRestComplement complement = complementMap.get(id);
			object.put("complemented", complement != null);
			if (complement != null) {
				complement.complementRoot(context.request().path(), object);
			}
			context.response().end(object.encodePrettily());
		}
		else {
			notFound(context);
		}
	}
}
