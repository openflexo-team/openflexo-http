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

package org.openflexo.http.server.fml;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter;
import org.openflexo.foundation.fml.rt.ViewLibrary;
import org.openflexo.http.server.RestService;
import org.openflexo.http.server.core.IdUtils;
import org.openflexo.http.server.util.JsonSerializer;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRtRestService implements RestService {

	private final String namespace = "/ta/fmlrt";

	private FMLRTTechnologyAdapter technologyAdapter;

	private JsonSerializer serializer;

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		technologyAdapter = serviceManager.getTechnologyAdapterService().getTechnologyAdapter(FMLRTTechnologyAdapter.class);
		if (technologyAdapter == null) throw new FlexoException("FML RT Technology adpater must be present to start FML Rest service");
		serializer = new JsonSerializer(technologyAdapter.getViewResourceFactory());
	}

	public void addRoutes(Vertx vertx, Router router) {
		Router subRouter = Router.router(vertx);
		router.mountSubRouter(namespace, subRouter);
		router.get("/libraries").produces(RestService.JSON).handler(this::serveLibraryList);
	}


	private void serveLibraryList(RoutingContext context) {
		try {
			JsonArray result = new JsonArray();
			for (ViewLibrary served : technologyAdapter.getViewLibraries()) {
				String id = IdUtils.encoreUri(served.getDefaultBaseURI());
				String url = context.request().path() + "/" + id;
				Object vpJson = serializer.toJson(served, id, url);
				result.add(vpJson);
			}
			context.response().end(result.encodePrettily());

		} catch (Exception e) {
			context.fail(e);
		}
	}

}
