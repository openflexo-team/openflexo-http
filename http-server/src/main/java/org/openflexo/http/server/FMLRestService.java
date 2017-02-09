package org.openflexo.http.server;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLModelFactory;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.rm.ViewPointResource;
import org.openflexo.model.exceptions.ModelDefinitionException;

/**
 * Created by charlie on 08/02/2017.
 */
public class FMLRestService {

	private final FlexoServiceManager serviceManager;
	private final FMLTechnologyAdapter technologyAdapter;

	private final PamelaJsonSerializer viewPointConverter;

	public FMLRestService(FMLTechnologyAdapter technologyAdapter) throws ModelDefinitionException {
		this.technologyAdapter = technologyAdapter;
		this.serviceManager = technologyAdapter.getServiceManager();
		this.viewPointConverter = new PamelaJsonSerializer(new FMLModelFactory(null, serviceManager));
	}

	public void addRoutes(String prefix, Router router) {
		router.get(prefix + "/viewpoint").produces(HttpService.JSON).handler(this::serveViewPointList);
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
