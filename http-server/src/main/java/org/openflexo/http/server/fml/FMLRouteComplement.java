package org.openflexo.http.server.fml;

import java.util.ArrayList;
import java.util.List;

import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.core.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.PamelaResourceRestService;

/**
 * Route complements for FML technology adapter
 */
public class FMLRouteComplement implements TechnologyAdapterRouteComplement {

	private FMLTechnologyAdapter technologyAdapter;

	@Override
	public Class<FMLTechnologyAdapter> getTechnologyAdapterClass() {
		return FMLTechnologyAdapter.class;
	}

	@Override
	public void initialize(HttpService service, TechnologyAdapterRouteService taRouteService) throws Exception {
		technologyAdapter = service.getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(getTechnologyAdapterClass());
		VirtualModelLibrary virtualModelLibrary = technologyAdapter.getVirtualModelLibrary();
		TechnologyAdapterRouteService taService = service.getTechnologyAdapterRestService();

		// TODO: Jean-Charles, could you check this ???

		// Adds pamela rest service for ViewPoint resources
		PamelaResourceRestService<VirtualModel, VirtualModelResource> viewPointConverter = new PamelaResourceRestService<>("/virtualmodel",
				virtualModelLibrary::getVirtualModels, virtualModelLibrary::getVirtualModelResource, VirtualModelResource.class, taService);
		viewPointConverter.setPostLoader((VirtualModel vp) -> vp.loadContainedVirtualModelsWhenUnloaded());
		taRouteService.registerPamelaResourceRestService(technologyAdapter, viewPointConverter);

		// Adds pamela rest service for VirtualModel resources
		PamelaResourceRestService<VirtualModel, VirtualModelResource> virtualModelConverter = new PamelaResourceRestService<>(
				"/containedvirtualmodel", this::getViewResources, virtualModelLibrary::getVirtualModelResource, VirtualModelResource.class,
				taService);
		taRouteService.registerPamelaResourceRestService(technologyAdapter, virtualModelConverter);
	}

	private List<VirtualModelResource> getViewResources() {
		ArrayList<VirtualModelResource> result = new ArrayList<>();
		for (VirtualModelResource viewPointResource : technologyAdapter.getVirtualModelLibrary().getVirtualModels()) {
			result.addAll(viewPointResource.getContainedVirtualModelResources());
		}
		return result;
	}
}
