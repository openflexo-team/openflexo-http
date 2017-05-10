package org.openflexo.http.server.fml;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import java.util.Collections;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLModelFactory;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.ViewPointLibrary;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rm.ViewPointResource;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.http.server.RestService;
import org.openflexo.http.server.core.IdUtils;
import org.openflexo.http.server.util.PamelaResourceRestService;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRestService implements RestService {

	private FMLTechnologyAdapter technologyAdapter;

	private PamelaResourceRestService<ViewPoint, ViewPointResource> viewPointConverter;
	private PamelaResourceRestService<VirtualModel, VirtualModelResource> virtualModelConverter;

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		technologyAdapter = serviceManager.getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
		if (technologyAdapter == null) throw new FlexoException("FML Technology adpater must be present to start FML Rest service");

		ViewPointLibrary viewPointLibrary = technologyAdapter.getViewPointLibrary();
		FMLModelFactory factory = new FMLModelFactory(null, serviceManager);
		viewPointConverter = new PamelaResourceRestService<>(
			"/viewpoint",
			viewPointLibrary::getViewPoints,
			viewPointLibrary::getViewPointResource,
			(ViewPoint vp) -> vp.loadVirtualModelsWhenUnloaded(),
			ViewPoint.class, factory
		);

		virtualModelConverter = new PamelaResourceRestService<>(
			"/virtualmodel",
			() -> Collections.emptyList(),
			viewPointLibrary::getVirtualModelResource,
			(VirtualModel vm) -> {},
			VirtualModel.class, factory
		);
	}

	public void addRoutes(Vertx vertx, Router router) {
		Router subRouter = Router.router(vertx);
		router.mountSubRouter("/ta/" + IdUtils.getTechnologyAdapterId(technologyAdapter), subRouter);

		viewPointConverter.addRoutes(subRouter);
		virtualModelConverter.addRoutes(subRouter);
	}


}
