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

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstanceModelFactory;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstanceRepository;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.fml.rt.rm.FMLRTVirtualModelInstanceResource;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.PamelaResourceRestService;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRtRouteService implements TechnologyAdapterRouteComplement<FMLRTTechnologyAdapter> {

	private FMLRTTechnologyAdapter technologyAdapter;

	private PamelaResourceRestService<VirtualModelInstance, FMLRTVirtualModelInstanceResource> viewConverter;
	private PamelaResourceRestService<VirtualModelInstance, FMLRTVirtualModelInstanceResource> virtualModelInstanceConverter;

	@Override
	public Class<FMLRTTechnologyAdapter> getTechnologyAdapterClass() {
		return FMLRTTechnologyAdapter.class;
	}

	@Override
	public void initialize(HttpService service, FMLRTTechnologyAdapter technologyAdapter) throws Exception {
		this.technologyAdapter = technologyAdapter;

		TechnologyAdapterRouteService taService = service.getTechnologyAdapterRestService();
		TechnologyAdapterService technologyAdapterService = technologyAdapter.getServiceManager().getTechnologyAdapterService();
		FMLRTVirtualModelInstanceModelFactory viewFactory = new FMLRTVirtualModelInstanceModelFactory(null, null, technologyAdapterService);
		viewConverter = new PamelaResourceRestService<>("/view", this::getFMLRTVirtualModelInstanceResources,
				this::getFMLRTVirtualModelInstanceResource, FMLRTVirtualModelInstanceResource.class, taService);

		FMLRTVirtualModelInstanceModelFactory vmiFactory = new FMLRTVirtualModelInstanceModelFactory(null, null, technologyAdapterService);
		virtualModelInstanceConverter = new PamelaResourceRestService<>("/vmi", this::getVirtualModelInstanceResources,
				this::getVirtualModelInstanceResource, FMLRTVirtualModelInstanceResource.class, taService);

	}

	private List<FMLRTVirtualModelInstanceResource> getFMLRTVirtualModelInstanceResources() {
		return Collections.emptyList();
	}

	private FMLRTVirtualModelInstanceResource getFMLRTVirtualModelInstanceResource(String uri) {
		for (FMLRTVirtualModelInstanceRepository<?> viewLibrary : technologyAdapter.getVirtualModelInstanceRepositories()) {
			FMLRTVirtualModelInstanceResource view = viewLibrary.getVirtualModelInstance(uri);
			if (view != null)
				return view;
		}
		return null;
	}

	private List<FMLRTVirtualModelInstanceResource> getVirtualModelInstanceResources() {
		return Collections.emptyList();
	}

	private FMLRTVirtualModelInstanceResource getVirtualModelInstanceResource(String uri) {
		for (FMLRTVirtualModelInstanceRepository<?> viewLibrary : technologyAdapter.getVirtualModelInstanceRepositories()) {
			FMLRTVirtualModelInstanceResource virtualModelInstance = viewLibrary.getVirtualModelInstance(uri);
			if (virtualModelInstance instanceof FMLRTVirtualModelInstanceResource) {
				return virtualModelInstance;
			}
		}
		return null;
	}

	@Override
	public void addRoutes(Vertx vertx, Router router) {
		viewConverter.addRoutes(router);
		virtualModelInstanceConverter.addRoutes(router);
	}

	@Override
	public Map<Class<? extends FlexoResource<?>>, String> getResourceRoots() {
		Map<Class<? extends FlexoResource<?>>, String> result = new HashMap<>();
		result.put(viewConverter.getResourceClass(), viewConverter.getPrefix());
		result.put(virtualModelInstanceConverter.getResourceClass(), virtualModelInstanceConverter.getPrefix());
		return result;
	}

}
