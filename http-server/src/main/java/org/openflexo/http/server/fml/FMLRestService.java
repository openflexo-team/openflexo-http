package org.openflexo.http.server.fml;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLModelFactory;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.ViewPointLibrary;
import org.openflexo.foundation.fml.rm.ViewPointResource;
import org.openflexo.http.server.RestService;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRestService implements RestService {

	private final String namespace = "/ta/" + FMLTechnologyAdapter.class.getName();

	private FMLTechnologyAdapter technologyAdapter;

	private PamelaResourceRestService<ViewPoint, ViewPointResource> viewPointConverter;

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		technologyAdapter = serviceManager.getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
		if (technologyAdapter == null) throw new FlexoException("FML Technology adpater must be present to start FML Rest service");

		ViewPointLibrary viewPointLibrary = technologyAdapter.getViewPointLibrary();
		viewPointConverter = new PamelaResourceRestService<ViewPoint, ViewPointResource>(
			"/viewpoint",
			viewPointLibrary::getViewPoints,
			viewPointLibrary::getViewPointResource,
			(ViewPoint vp) -> vp.loadVirtualModelsWhenUnloaded(),
			ViewPoint.class, new FMLModelFactory(null, serviceManager)
		);

	}

	public void addRoutes(Vertx vertx, Router router) {
		Router subRouter = Router.router(vertx);
		router.mountSubRouter(namespace, subRouter);
		viewPointConverter.addRoutes(subRouter);
		//virtualModelConverter.addRoutes(subRouter);
	}


}
