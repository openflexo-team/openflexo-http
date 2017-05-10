package org.openflexo.http.server.fml;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import java.util.Collections;
import org.openflexo.foundation.fml.FMLModelFactory;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.ViewPointLibrary;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rm.ViewPointResource;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.http.server.core.ta.TechnologyAdapterRestComplement;
import org.openflexo.http.server.util.PamelaResourceRestService;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRestService implements TechnologyAdapterRestComplement<FMLTechnologyAdapter> {

	private FMLTechnologyAdapter technologyAdapter;

	private PamelaResourceRestService<ViewPoint, ViewPointResource> viewPointConverter;
	private PamelaResourceRestService<VirtualModel, VirtualModelResource> virtualModelConverter;

	@Override
	public Class<FMLTechnologyAdapter> getTechnologyAdapterClass() {
		return FMLTechnologyAdapter.class;
	}

	@Override
	public void initialize(FMLTechnologyAdapter technologyAdapter) throws Exception {
		this.technologyAdapter = technologyAdapter;
		ViewPointLibrary viewPointLibrary = technologyAdapter.getViewPointLibrary();
		FMLModelFactory factory = new FMLModelFactory(null, technologyAdapter.getServiceManager());
		viewPointConverter = new PamelaResourceRestService<>(
			"/viewpoint",
			viewPointLibrary::getViewPoints,
			viewPointLibrary::getViewPointResource,
			ViewPoint.class, factory
		);
		viewPointConverter.setPostLoader((ViewPoint vp) -> vp.loadVirtualModelsWhenUnloaded());

		virtualModelConverter = new PamelaResourceRestService<>(
			"/virtualmodel",
			() -> Collections.emptyList(),
			viewPointLibrary::getVirtualModelResource,
			VirtualModel.class, factory
		);
	}

	public void addRoutes(Vertx vertx, Router router) {
		viewPointConverter.addRoutes(router);
		virtualModelConverter.addRoutes(router);
	}

	@Override
	public void complementRoot(String url, JsonObject object) {
		object.put("viewpointUrl", url + "/viewpoint");
		object.put("virtualmodelUrl", url + "/virtualmodel");
	}
}
