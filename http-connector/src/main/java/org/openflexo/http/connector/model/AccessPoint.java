package org.openflexo.http.connector.model;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.http.client.methods.HttpUriRequest;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.fml.rt.rm.VirtualModelInstanceResource;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.foundation.technologyadapter.TechnologyObject;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.http.connector.HttpModelSlot.Format;
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

	// String VIRTUAL_MODEL_KEY = "virtualModel";
	// String VIRTUAL_MODEL_URI_KEY = "virtualModelUri";
	String VIRTUAL_MODEL_INSTANCE_KEY = "instance";
	String URL_KEY = "url";
	String USER_KEY = "user";
	String PASSWORD_KEY = "password";
	String HTTP_MODEL_SLOT_URI_KEY = "httpModelSlotUri";
	String HTTP_MODEL_SLOT_KEY = "httpModelSlot";
	String OWNER_VIRTUAL_MODEL_INSTANCE_KEY = "ownerVirtualModelInstance";
	String OWNER_VIRTUAL_MODEL_INSTANCE_URI_KEY = "ownerVirtualModelInstanceURI";

	@Getter(URL_KEY)
	@XMLAttribute
	String getUrl();

	@Setter(URL_KEY)
	void setUrl(String url);

	@Getter(USER_KEY)
	@XMLAttribute
	String getUser();

	@Setter(USER_KEY)
	void setUser(String user);

	@Getter(PASSWORD_KEY)
	@XMLAttribute
	String getPassword();

	@Setter(PASSWORD_KEY)
	void setPassword(String password);

	/*@Getter(VIRTUAL_MODEL_URI_KEY)
	@XMLAttribute
	String getVirtualModelURI();
	
	@Setter(VIRTUAL_MODEL_URI_KEY)
	void setVirtualModelURI(String virtualModelURI);
	
	@Getter(VIRTUAL_MODEL_KEY)
	VirtualModel getVirtualModel();
	
	@Setter(VIRTUAL_MODEL_KEY)
	void setVirtualModel(VirtualModel virtualModel);*/

	@Getter(HTTP_MODEL_SLOT_URI_KEY)
	@XMLAttribute
	String getModelSlotURI();

	@Setter(HTTP_MODEL_SLOT_URI_KEY)
	void setModelSlotURI(String modelSlotURI);

	@Getter(HTTP_MODEL_SLOT_KEY)
	HttpModelSlot getModelSlot();

	@Setter(HTTP_MODEL_SLOT_KEY)
	void setModelSlot(HttpModelSlot modelSlot);

	@Getter(VIRTUAL_MODEL_INSTANCE_KEY)
	HttpVirtualModelInstance<?> getInstance();

	@Setter(VIRTUAL_MODEL_INSTANCE_KEY)
	void setInstance(HttpVirtualModelInstance<?> instance);

	/**
	 * Return the VirtualModelInstance in which this AccessPoint has been defined<br>
	 * Related VirtualModel is the VirtualModel where the HttpModelSlot has been declared
	 * 
	 * @return
	 */
	@Getter(OWNER_VIRTUAL_MODEL_INSTANCE_KEY)
	AbstractVirtualModelInstance<?, ?> getOwnerInstance();

	@Setter(OWNER_VIRTUAL_MODEL_INSTANCE_KEY)
	void setOwnerInstance(AbstractVirtualModelInstance<?, ?> instance);

	@Getter(OWNER_VIRTUAL_MODEL_INSTANCE_URI_KEY)
	@XMLAttribute
	String getOwnerInstanceURI();

	@Setter(OWNER_VIRTUAL_MODEL_INSTANCE_URI_KEY)
	void setOwnerInstanceURI(String vmiURI);

	void contributeHeaders(HttpUriRequest request);

	public Format getFormat();

	abstract class AccessPointImpl extends FlexoObjectImpl implements AccessPoint {

		private static final Logger logger = Logger.getLogger(AccessPoint.class.getPackage().getName());

		private HttpModelSlot modelSlot;
		private AbstractVirtualModelInstance<?, ?> ownerInstance;

		@Override
		public Format getFormat() {
			if (modelSlot != null) {
				return modelSlot.getFormat();
			}
			return Format.json;
		}

		@Override
		public HttpModelSlot getModelSlot() {
			String modelSlotURI = getModelSlotURI();
			if (modelSlot == null && modelSlotURI != null) {
				try {
					TechnologyAdapterService adapterService = getResource().getServiceManager().getTechnologyAdapterService();
					FMLTechnologyAdapter technologyAdapter = adapterService.getTechnologyAdapter(FMLTechnologyAdapter.class);
					modelSlot = (HttpModelSlot) technologyAdapter.getVirtualModelLibrary().getFlexoProperty(modelSlotURI, true);
				} catch (Exception e) {
					logger.log(Level.SEVERE, "Can't find model slot'" + modelSlotURI + "'", e);
				}
			}
			return modelSlot;
		}

		@Override
		public void setModelSlot(HttpModelSlot modelSlot) {
			HttpModelSlot oldModelSlot = this.modelSlot;
			if (oldModelSlot != modelSlot) {
				this.modelSlot = modelSlot;
				getPropertyChangeSupport().firePropertyChange(HTTP_MODEL_SLOT_KEY, oldModelSlot, modelSlot);
				setModelSlotURI(modelSlot != null ? modelSlot.getURI() : null);
			}

		}

		/*private VirtualModel virtualModel;
		
		@Override
		public VirtualModel getVirtualModel() {
			String virtualModelURI = getVirtualModelURI();
			if (virtualModel == null && virtualModelURI != null) {
				try {
					TechnologyAdapterService adapterService = getResource().getServiceManager().getTechnologyAdapterService();
					FMLTechnologyAdapter technologyAdapter = adapterService.getTechnologyAdapter(FMLTechnologyAdapter.class);
					this.virtualModel = technologyAdapter.getViewPointLibrary().getVirtualModel(virtualModelURI);
				} catch (Exception e) {
					logger.log(Level.SEVERE, "Can't find virtual model '" + virtualModelURI + "'", e);
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
		*/
		@Override
		public HttpTechnologyAdapter getTechnologyAdapter() {
			FlexoResource<AccessPoint> resource = getResource();
			if (resource != null && resource.getServiceManager() != null) {
				FlexoServiceManager serviceManager = resource.getServiceManager();
				return serviceManager.getService(TechnologyAdapterService.class).getTechnologyAdapter(HttpTechnologyAdapter.class);
			}
			return null;
		}

		/**
		 * Return the VirtualModelInstance in which this AccessPoint has been defined<br>
		 * Related VirtualModel is the VirtualModel where the HttpModelSlot has been declared
		 * 
		 * @return
		 */
		@Override
		public AbstractVirtualModelInstance<?, ?> getOwnerInstance() {
			String ownerInstanceURI = getOwnerInstanceURI();
			System.out.println("Et hop, je dois trouver le VMI: " + ownerInstanceURI);
			if (ownerInstance == null && ownerInstanceURI != null) {
				try {
					VirtualModelInstanceResource<?, ?> vmiResource = (VirtualModelInstanceResource<?, ?>) getResource()
							.getServiceManager().getResourceManager().getResource(ownerInstanceURI);
					ownerInstance = vmiResource.getResourceData(null);
				} catch (Exception e) {
					logger.log(Level.SEVERE, "Can't find vmi'" + ownerInstanceURI + "'", e);
				}
			}
			return ownerInstance;
		}

		@Override
		public void setOwnerInstance(AbstractVirtualModelInstance<?, ?> ownerInstance) {
			AbstractVirtualModelInstance<?, ?> oldOwnerInstance = this.ownerInstance;
			if (oldOwnerInstance != ownerInstance) {
				this.ownerInstance = ownerInstance;
				getPropertyChangeSupport().firePropertyChange(OWNER_VIRTUAL_MODEL_INSTANCE_KEY, oldOwnerInstance, ownerInstance);
				setOwnerInstanceURI(ownerInstance != null ? ownerInstance.getURI() : null);
			}
		}

		@Override
		public void contributeHeaders(HttpUriRequest request) {
			String user = getUser();
			String password = getPassword();
			if (user != null && user.length() > 0 && password != null && password.length() > 0) {
				StringBuilder value = new StringBuilder();
				value.append("Basic ");
				String authentication = user + ":" + password;
				value.append(Base64.getEncoder().encodeToString(authentication.getBytes(StandardCharsets.UTF_8)));
				request.addHeader("Authorization", value.toString());
			}
		}

	}
}
