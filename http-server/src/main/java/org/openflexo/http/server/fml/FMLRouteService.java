package org.openflexo.http.server.fml;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.openflexo.foundation.fml.FMLModelFactory;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.ViewPointLibrary;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rm.ViewPointResource;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.PamelaResourceRestService;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRouteService implements TechnologyAdapterRouteComplement<FMLTechnologyAdapter> {

	private FMLTechnologyAdapter technologyAdapter;

	private PamelaResourceRestService<ViewPoint, ViewPointResource> viewPointConverter;
	private PamelaResourceRestService<VirtualModel, VirtualModelResource> virtualModelConverter;

	@Override
	public Class<FMLTechnologyAdapter> getTechnologyAdapterClass() {
		return FMLTechnologyAdapter.class;
	}

	@Override
	public void initialize(HttpService service, FMLTechnologyAdapter technologyAdapter) throws Exception {
		this.technologyAdapter = technologyAdapter;
		ViewPointLibrary viewPointLibrary = technologyAdapter.getViewPointLibrary();
		FMLModelFactory factory = new FMLModelFactory(null, technologyAdapter.getServiceManager());

		TechnologyAdapterRouteService taService = service.getTechnologyAdapterRestService();
		viewPointConverter = new PamelaResourceRestService<>(
			"/viewpoint",
			viewPointLibrary::getViewPoints,
			viewPointLibrary::getViewPointResource,
			ViewPointResource.class, taService
		);
		viewPointConverter.setPostLoader((ViewPoint vp) -> vp.loadVirtualModelsWhenUnloaded());

		virtualModelConverter = new PamelaResourceRestService<>(
			"/virtualmodel",
			() -> Collections.emptyList(),
			viewPointLibrary::getVirtualModelResource,
			VirtualModelResource.class, taService
		);
	}

	public void addRoutes(Vertx vertx, Router router) {
		viewPointConverter.addRoutes(router);
		virtualModelConverter.addRoutes(router);
	}

	@Override
	public Map<Class<? extends FlexoResource<?>>, String> getResourceRoots() {
		Map<Class<? extends FlexoResource<?>>, String> result = new HashMap<>();
		result.put(viewPointConverter.getResourceClass(), viewPointConverter.getPrefix());
		result.put(virtualModelConverter.getResourceClass(), virtualModelConverter.getPrefix());
		return result;
	}

}
