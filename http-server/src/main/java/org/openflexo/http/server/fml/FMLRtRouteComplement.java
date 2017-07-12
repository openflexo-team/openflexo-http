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

import java.util.ArrayList;
import java.util.List;
import org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter;
import org.openflexo.foundation.fml.rt.View;
import org.openflexo.foundation.fml.rt.ViewLibrary;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstanceModelFactory;
import org.openflexo.foundation.fml.rt.rm.AbstractVirtualModelInstanceResource;
import org.openflexo.foundation.fml.rt.rm.ViewResource;
import org.openflexo.foundation.fml.rt.rm.VirtualModelInstanceResource;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.core.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.PamelaResourceRestService;

/**
 * Route complements for FML@RT technology adapter
 */
public class FMLRtRouteComplement implements TechnologyAdapterRouteComplement {

	private FMLRTTechnologyAdapter technologyAdapter;

	@Override
	public Class<FMLRTTechnologyAdapter> getTechnologyAdapterClass() {
		return FMLRTTechnologyAdapter.class;
	}

	@Override
	public void initialize(HttpService service, TechnologyAdapterRouteService taRouteService) throws Exception {
		technologyAdapter = service.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(getTechnologyAdapterClass());
		TechnologyAdapterRouteService taService = service.getTechnologyAdapterRestService();
		TechnologyAdapterService technologyAdapterService = technologyAdapter.getServiceManager().getTechnologyAdapterService();

		// Adds pamela rest service for View resources
		PamelaResourceRestService<View, ViewResource> viewConverter = new PamelaResourceRestService<>(
				"/view",
				this::getViewResources,
				this::getViewResource,
				ViewResource.class, taService
		);
		taRouteService.registerPamelaResourceRestService(technologyAdapter, viewConverter);

		// Adds pamela rest service for VirtualModelInstance resources
		VirtualModelInstanceModelFactory vmiFactory = new VirtualModelInstanceModelFactory(null, null, technologyAdapterService);
		PamelaResourceRestService<VirtualModelInstance, VirtualModelInstanceResource> virtualModelInstanceConverter = new PamelaResourceRestService<>(
				"/vmi",
				this::getVirtualModelInstanceResources,
				this::getVirtualModelInstanceResource,
				VirtualModelInstanceResource.class, taService
		);
		taRouteService.registerPamelaResourceRestService(technologyAdapter, virtualModelInstanceConverter);

	}

	private List<ViewResource> getViewResources() {
		ArrayList<ViewResource> result = new ArrayList<>();
		for (ViewLibrary<?> viewLibrary : technologyAdapter.getViewLibraries()) {
			result.addAll(viewLibrary.getAllResources());
		}
		return result;
	}

	private ViewResource getViewResource(String uri) {
		for (ViewLibrary<?> viewLibrary : technologyAdapter.getViewLibraries()) {
			ViewResource view = viewLibrary.getView(uri);
			if (view != null) return view;
		}
		return null;
	}

	private List<VirtualModelInstanceResource> getVirtualModelInstanceResources() {
		ArrayList<VirtualModelInstanceResource> result = new ArrayList<>();
		for (ViewResource viewResource : getViewResources()) {
			result.addAll(viewResource.getVirtualModelInstanceResources());
		}
		return result;
	}

	private VirtualModelInstanceResource getVirtualModelInstanceResource(String uri) {
		for (ViewLibrary<?> viewLibrary : technologyAdapter.getViewLibraries()) {
			AbstractVirtualModelInstanceResource<?, ?> virtualModelInstance = viewLibrary.getVirtualModelInstance(uri);
			if (virtualModelInstance instanceof VirtualModelInstanceResource) {
				return (VirtualModelInstanceResource) virtualModelInstance;
			}
		}
		return null;
	}
}
