package org.openflexo.http.server.fml;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import java.util.function.Function;
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

	private FlexoServiceManager serviceManager;
	private FMLTechnologyAdapter technologyAdapter;

	private PamelaResourceRestService viewPointConverter;

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		this.serviceManager = serviceManager;
		technologyAdapter = serviceManager.getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
		if (technologyAdapter == null) throw new FlexoException("FML Technology adpater must be present to start FML Rest service");

		ViewPointLibrary viewPointLibrary = technologyAdapter.getViewPointLibrary();
		viewPointConverter = new PamelaResourceRestService(
				namespace + "/viewpoint",
				viewPointLibrary::getViewPoints,
				// FIXME Why the compiler doesn't want the function reference ?
				(Function<String, ViewPointResource>) viewPointLibrary::getViewPointResource,
				ViewPoint.class, new FMLModelFactory(null, serviceManager)
		);
	}

	public void addRoutes(Vertx vertx, Router router) {
		viewPointConverter.addRoutes(router);
	}


}
