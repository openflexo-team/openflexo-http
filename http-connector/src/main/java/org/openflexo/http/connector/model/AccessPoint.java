package org.openflexo.http.connector.model;

import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.foundation.technologyadapter.TechnologyObject;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.AccessPoint.AccessPointImpl;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * AccessPoint to an HTTP service
 */
@ModelEntity
@XMLElement
@ImplementationClass(AccessPointImpl.class)
public interface AccessPoint extends TechnologyObject<HttpTechnologyAdapter>, ResourceData<AccessPoint> {

	String VIRTUAL_MODEL_INSTANCE_KEY = "instance";
	String URL_KEY = "url";

	@Getter(value = URL_KEY) @XMLAttribute
	String getURL();

	@Setter(URL_KEY)
	void setURL(String url);

	@Getter(VIRTUAL_MODEL_INSTANCE_KEY)
	HttpVirtualModelInstance getInstance();

	@Setter(VIRTUAL_MODEL_INSTANCE_KEY)
	void setInstance(HttpVirtualModelInstance instance);

	abstract class AccessPointImpl extends FlexoObjectImpl implements AccessPoint {
		@Override
		public HttpTechnologyAdapter getTechnologyAdapter() {
			FlexoResource<AccessPoint> resource = getResource();
			if (resource != null && resource.getServiceManager() != null) {
				FlexoServiceManager serviceManager = resource.getServiceManager();
				return serviceManager.getService(TechnologyAdapterService.class).getTechnologyAdapter(HttpTechnologyAdapter.class);
			}
			return null;
		}
	}
}
