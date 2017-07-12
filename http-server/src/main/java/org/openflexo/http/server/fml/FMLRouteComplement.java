package org.openflexo.http.server.fml;

import java.util.Collections;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.ViewPointLibrary;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rm.ViewPointResource;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.core.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.PamelaResourceRestService;

/**
 * Route complements for FML technology adapter
 */
public class FMLRouteComplement implements TechnologyAdapterRouteComplement {

	@Override
	public Class<FMLTechnologyAdapter> getTechnologyAdapterClass() {
		return FMLTechnologyAdapter.class;
	}

	@Override
	public void initialize(HttpService service, TechnologyAdapterRouteService taRouteService) throws Exception {
		FMLTechnologyAdapter ta = service.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(getTechnologyAdapterClass());
		ViewPointLibrary viewPointLibrary = ta.getViewPointLibrary();
		TechnologyAdapterRouteService taService = service.getTechnologyAdapterRestService();

		// Adds pamela rest service for ViewPoint resources
		PamelaResourceRestService<ViewPoint, ViewPointResource> viewPointConverter = new PamelaResourceRestService<>(
			"/viewpoint",
			viewPointLibrary::getViewPoints,
			viewPointLibrary::getViewPointResource,
			ViewPointResource.class, taService
		);
		viewPointConverter.setPostLoader((ViewPoint vp) -> vp.loadVirtualModelsWhenUnloaded());
		taRouteService.registerPamelaResourceRestService(ta, viewPointConverter);

		// Adds pamela rest service for VirtualModel resources
		PamelaResourceRestService<VirtualModel, VirtualModelResource> virtualModelConverter = new PamelaResourceRestService<>(
			"/virtualmodel",
			() -> Collections.emptyList(),
			viewPointLibrary::getVirtualModelResource,
			VirtualModelResource.class, taService
		);
		taRouteService.registerPamelaResourceRestService(ta, virtualModelConverter);
	}
}
