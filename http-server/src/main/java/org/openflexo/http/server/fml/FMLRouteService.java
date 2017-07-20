package org.openflexo.http.server.fml;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.openflexo.foundation.fml.FMLModelFactory;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.PamelaResourceRestService;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRouteService implements TechnologyAdapterRouteComplement<FMLTechnologyAdapter> {

	private FMLTechnologyAdapter technologyAdapter;

	private PamelaResourceRestService<VirtualModel, VirtualModelResource> topLevelVirtualModelConverter;
	private PamelaResourceRestService<VirtualModel, VirtualModelResource> virtualModelConverter;

	@Override
	public Class<FMLTechnologyAdapter> getTechnologyAdapterClass() {
		return FMLTechnologyAdapter.class;
	}

	@Override
	public void initialize(HttpService service, FMLTechnologyAdapter technologyAdapter) throws Exception {
		this.technologyAdapter = technologyAdapter;
		VirtualModelLibrary virtualModelLibrary = technologyAdapter.getVirtualModelLibrary();
		FMLModelFactory factory = new FMLModelFactory(null, technologyAdapter.getServiceManager());

		// TODO: ask Jean-Charles: i don't understand this
		TechnologyAdapterRouteService taService = service.getTechnologyAdapterRestService();
		topLevelVirtualModelConverter = new PamelaResourceRestService<>("/viewpoint", virtualModelLibrary::getVirtualModels,
				virtualModelLibrary::getVirtualModelResource, VirtualModelResource.class, taService);
		topLevelVirtualModelConverter.setPostLoader((VirtualModel vm) -> vm.loadContainedVirtualModelsWhenUnloaded());

		virtualModelConverter = new PamelaResourceRestService<>("/virtualmodel", () -> Collections.emptyList(),
				virtualModelLibrary::getVirtualModelResource, VirtualModelResource.class, taService);
	}

	@Override
	public void addRoutes(Vertx vertx, Router router) {
		topLevelVirtualModelConverter.addRoutes(router);
		virtualModelConverter.addRoutes(router);
	}

	@Override
	public Map<Class<? extends FlexoResource<?>>, String> getResourceRoots() {
		Map<Class<? extends FlexoResource<?>>, String> result = new HashMap<>();
		result.put(topLevelVirtualModelConverter.getResourceClass(), topLevelVirtualModelConverter.getPrefix());
		result.put(virtualModelConverter.getResourceClass(), virtualModelConverter.getPrefix());
		return result;
	}

}
