package org.openflexo.http.server;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLModelFactory;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.rm.ViewPointResource;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRestService implements RestService {

	private final String namespace = "/ta/" + FMLTechnologyAdapter.class.getName();

	private FMLTechnologyAdapter technologyAdapter;

	private PamelaJsonSerializer viewPointConverter;

	@Override
	public void initialize(FlexoServiceManager serviceManager) throws Exception {
		technologyAdapter = serviceManager.getTechnologyAdapterService().getTechnologyAdapter(FMLTechnologyAdapter.class);
		if (technologyAdapter == null) throw new FlexoException("FML Technology adpater must be present to start FML Rest service");
		viewPointConverter = new PamelaJsonSerializer(new FMLModelFactory(null, serviceManager));
	}

	public void addRoutes(Router router) {
		router.get(namespace + "/viewpoint").produces(JSON).handler(this::serveViewPointList);
	}

	private void serveViewPointList(RoutingContext context) {
		try {
			JsonArray result = new JsonArray();
			for (ViewPointResource viewPointResource : technologyAdapter.getViewPointLibrary().getViewPoints()) {
				Object vpJson = viewPointConverter.toJson(viewPointResource.getViewPoint(), false);
				result.add(vpJson);
			}
			context.response().end(result.encodePrettily());

		} catch (Exception e) {
			context.fail(e);
		}
	}
}
