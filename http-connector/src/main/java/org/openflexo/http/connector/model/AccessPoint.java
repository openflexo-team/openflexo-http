package org.openflexo.http.connector.model;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
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

	String VIRTUAL_MODEL_KEY = "virtualModel";
	String VIRTUAL_MODEL_URI_KEY = "virtualModelUri";
	String VIRTUAL_MODEL_INSTANCE_KEY = "instance";
	String URL_KEY = "url";

	@Getter(URL_KEY) @XMLAttribute
	String getURL();

	@Setter(URL_KEY)
	void setUrl(String url);

	@Getter(VIRTUAL_MODEL_URI_KEY) @XMLAttribute
	String getVirtualModelURI();

	@Setter(VIRTUAL_MODEL_URI_KEY)
	void setVirtualModelURI(String virtualModelURI);

	@Getter(VIRTUAL_MODEL_KEY)
	VirtualModel getVirtualModel();

	@Setter(VIRTUAL_MODEL_KEY)
	void setVirtualModel(VirtualModel virtualModel);

	@Getter(VIRTUAL_MODEL_INSTANCE_KEY)
	HttpVirtualModelInstance getInstance();

	@Setter(VIRTUAL_MODEL_INSTANCE_KEY)
	void setInstance(HttpVirtualModelInstance instance);

	abstract class AccessPointImpl extends FlexoObjectImpl implements AccessPoint {

		private static final Logger logger = Logger.getLogger(AccessPoint.class.getPackage().getName());

		private VirtualModel virtualModel;

		@Override
		public VirtualModel getVirtualModel() {
			String virtualModelURI = getVirtualModelURI();
			if (virtualModel == null && virtualModelURI != null) {
				try {
					TechnologyAdapterService adapterService = getResource().getServiceManager().getTechnologyAdapterService();
					FMLTechnologyAdapter technologyAdapter = adapterService.getTechnologyAdapter(FMLTechnologyAdapter.class);
					this.virtualModel = technologyAdapter.getViewPointLibrary().getVirtualModel(virtualModelURI);
				} catch (Exception e) {
					logger.log(Level.SEVERE, "Can't find virtual model '"+ virtualModelURI +"'", e);
				}
			}
			return virtualModel;
		}

		@Override
		public void setVirtualModel(VirtualModel virtualModel) {
			VirtualModel oldVirtualModel = this.virtualModel;
			if (oldVirtualModel != virtualModel) {
				this.virtualModel = virtualModel;
				getPropertyChangeSupport().firePropertyChange(VIRTUAL_MODEL_KEY, oldVirtualModel, virtualModel);
				setVirtualModelURI(virtualModel != null ? virtualModel.getURI() : null);
			}

		}

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
