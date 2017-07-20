/*
 * (c) Copyright 2013- Openflexo
 *
 * This file is part of OpenFlexo.
 *
 * OpenFlexo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OpenFlexo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenFlexo. If not, see <http://www.gnu.org/licenses/>.
 *
 */

package org.openflexo.http.connector;

import java.io.FileNotFoundException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FlexoBehaviourParameter;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelInstanceType;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstance;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstanceModelFactory;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.technologyadapter.FreeModelSlot;
import org.openflexo.http.connector.HttpModelSlot.HttpModelSlotImpl;
import org.openflexo.http.connector.fml.AccessPointType;
import org.openflexo.http.connector.fml.CreateAccessPointParameter;
import org.openflexo.http.connector.fml.HttpVirtualModelInitializer;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.rm.AccessPointResource;
import org.openflexo.model.annotations.Adder;
import org.openflexo.model.annotations.CloningStrategy;
import org.openflexo.model.annotations.CloningStrategy.StrategyType;
import org.openflexo.model.annotations.Embedded;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.Getter.Cardinality;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Remover;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.toolbox.StringUtils;

/**
 * Abstract implementation of a model slot for HTTP technology adapter<br>
 * We manage here an URL, and
 * 
 * We don't manage here technology-specific details.
 *
 */
@ModelEntity(isAbstract = true)
@ImplementationClass(HttpModelSlotImpl.class)
public interface HttpModelSlot extends FreeModelSlot<AccessPoint> {

	/**
	 * General format of responses for requests in that HttpModelSlot
	 * 
	 * @author sylvain
	 *
	 */
	public enum Format {
		json, xml, map
	}

	@PropertyIdentifier(type = String.class)
	String ACCESSED_VIRTUAL_MODEL_URI_KEY = "accessedVirtualModelURI";

	@PropertyIdentifier(type = Format.class)
	String FORMAT_KEY = "format";

	@PropertyIdentifier(type = String.class)
	String ID_PROPERTY_NAME_KEY = "idPropertyName";

	@PropertyIdentifier(type = DataBinding.class)
	String URL_KEY = "url";

	@PropertyIdentifier(type = DataBinding.class)
	String USER_KEY = "user";

	@PropertyIdentifier(type = DataBinding.class)
	String PASSWORD_KEY = "password";

	@PropertyIdentifier(type = String.class)
	public static final String CREATION_SCHEME_URI_KEY = "creationSchemeURI";

	@PropertyIdentifier(type = List.class)
	public static final String PARAMETERS_KEY = "parameters";

	public static final String CREATION_SCHEME_KEY = "creationScheme";

	@Getter(value = ACCESSED_VIRTUAL_MODEL_URI_KEY)
	@XMLAttribute(xmlTag = "accessedVirtualModelURI")
	String getAccessedVirtualModelURI();

	@Setter(ACCESSED_VIRTUAL_MODEL_URI_KEY)
	void setAccessedVirtualModelURI(String virtualModelURI);

	VirtualModelResource getAccessedVirtualModelResource();

	void setAccessedVirtualModelResource(VirtualModelResource virtualModelResource);

	VirtualModel getAccessedVirtualModel();

	void setAccessedVirtualModel(VirtualModel aVirtualModel);

	@Getter(FORMAT_KEY)
	@XMLAttribute
	Format getFormat();

	@Setter(FORMAT_KEY)
	void setFormat(Format format);

	@Getter(value = ID_PROPERTY_NAME_KEY, defaultValue = "id")
	@XMLAttribute
	String getIdPropertyName();

	@Setter(ID_PROPERTY_NAME_KEY)
	void setIdPropertyName(String propertyName);

	@Getter(URL_KEY)
	@XMLAttribute
	DataBinding<String> getUrl();

	@Setter(URL_KEY)
	void setUrl(DataBinding<String> url);

	@Getter(USER_KEY)
	@XMLAttribute
	DataBinding<String> getUser();

	@Setter(USER_KEY)
	void setUser(DataBinding<String> user);

	@Getter(PASSWORD_KEY)
	@XMLAttribute
	DataBinding<String> getPassword();

	@Setter(PASSWORD_KEY)
	void setPassword(DataBinding<String> password);

	@Getter(value = CREATION_SCHEME_URI_KEY)
	@XMLAttribute
	public String _getCreationSchemeURI();

	@Setter(CREATION_SCHEME_URI_KEY)
	public void _setCreationSchemeURI(String creationSchemeURI);

	public HttpVirtualModelInitializer getCreationScheme();

	public void setCreationScheme(HttpVirtualModelInitializer creationScheme);

	@Getter(value = PARAMETERS_KEY, cardinality = Cardinality.LIST, inverse = CreateAccessPointParameter.OWNER_KEY)
	@XMLElement
	@Embedded
	@CloningStrategy(StrategyType.CLONE)
	public List<CreateAccessPointParameter> getParameters();

	@Setter(PARAMETERS_KEY)
	public void setParameters(List<CreateAccessPointParameter> parameters);

	@Adder(PARAMETERS_KEY)
	public void addToParameters(CreateAccessPointParameter aParameter);

	@Remover(PARAMETERS_KEY)
	public void removeFromParameters(CreateAccessPointParameter aParameter);

	public List<HttpVirtualModelInitializer> getAvailableCreationSchemes();

	@Override
	HttpTechnologyAdapter getModelSlotTechnologyAdapter();

	/**
	 * Called to build the infered HttpVirtualModelInstance attached to the AccessPoint
	 * 
	 * @param accessPoint
	 * @param supportFactory
	 * @param serviceManager
	 * @return
	 */
	public HttpVirtualModelInstance makeHttpVirtualModelInstance(AccessPoint accessPoint, ContentSupportFactory<?, ?> supportFactory,
			FlexoServiceManager serviceManager);

	/**
	 * Build and return a new ModelFactory used to build embedded HttpVirtualModelInstance
	 * 
	 * @param serviceManager
	 * @return
	 */
	public AbstractVirtualModelInstanceModelFactory<?> getVirtualModelInstanceModelFactory(FlexoServiceManager serviceManager);

	abstract class HttpModelSlotImpl extends FreeModelSlotImpl<AccessPoint> implements HttpModelSlot {

		private DataBinding<String> url;
		private DataBinding<String> user;
		private DataBinding<String> password;

		private VirtualModelResource virtualModelResource;
		private String virtualModelURI;

		private HttpVirtualModelInitializer creationScheme;
		private String _creationSchemeURI;
		private List<CreateAccessPointParameter> parameters = null;

		@Override
		public Class<HttpTechnologyAdapter> getTechnologyAdapterClass() {
			return HttpTechnologyAdapter.class;
		}

		@Override
		public <PR extends FlexoRole<?>> String defaultFlexoRoleName(Class<PR> patternRoleClass) {
			return "";
		}

		@Override
		public Type getType() {
			VirtualModelInstanceType instanceType = VirtualModelInstanceType.getVirtualModelInstanceType(getAccessedVirtualModel());
			return new AccessPointType(instanceType);
		}

		@Override
		public HttpTechnologyAdapter getModelSlotTechnologyAdapter() {
			return (HttpTechnologyAdapter) super.getModelSlotTechnologyAdapter();
		}

		@Override
		public HttpModelSlotInstanceConfiguration createConfiguration(FlexoConceptInstance fci, FlexoResourceCenter<?> rc) {
			return new HttpModelSlotInstanceConfiguration(this, fci, rc);
		}

		@Override
		public AccessPointResource createProjectSpecificEmptyResource(AbstractVirtualModelInstance<?, ?> view, String filename,
				String modelUri) {
			// TODO create empty resource
			return null;
		}

		@Override
		public AccessPointResource createSharedEmptyResource(FlexoResourceCenter<?> resourceCenter, String relativePath, String filename,
				String modelUri) {
			// TODO create empty resource
			return null;
		}

		@Override
		public VirtualModelResource getAccessedVirtualModelResource() {
			VirtualModelLibrary virtualModelLibrary = getVirtualModelLibrary();
			if (virtualModelResource == null && StringUtils.isNotEmpty(virtualModelURI) && virtualModelLibrary != null) {
				virtualModelResource = virtualModelLibrary.getVirtualModelResource(virtualModelURI);
			}
			return virtualModelResource;
		}

		@Override
		public void setAccessedVirtualModelResource(VirtualModelResource virtualModelResource) {
			this.virtualModelResource = virtualModelResource;
		}

		@Override
		public String getAccessedVirtualModelURI() {
			if (virtualModelResource != null) {
				return virtualModelResource.getURI();
			}
			return virtualModelURI;
		}

		@Override
		public void setAccessedVirtualModelURI(String metaModelURI) {
			this.virtualModelURI = metaModelURI;
		}

		/**
		 * Return addressed virtual model (the virtual model this model slot specifically addresses, not the one in which it is defined)
		 *
		 * @return
		 */
		@Override
		public final VirtualModel getAccessedVirtualModel() {
			if (getAccessedVirtualModelResource() != null) {
				try {
					return getAccessedVirtualModelResource().getResourceData(null);
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (ResourceLoadingCancelledException e) {
					e.printStackTrace();
				} catch (FlexoException e) {
					e.printStackTrace();
				}
			}
			return null;
		}

		@Override
		public void setAccessedVirtualModel(VirtualModel aVirtualModel) {
			this.virtualModelURI = aVirtualModel.getURI();
			notifyResultingTypeChanged();
		}

		@Override
		public String _getCreationSchemeURI() {
			if (getCreationScheme() != null) {
				return getCreationScheme().getURI();
			}
			return _creationSchemeURI;
		}

		@Override
		public void _setCreationSchemeURI(String uri) {
			if (getVirtualModelLibrary() != null) {
				creationScheme = (HttpVirtualModelInitializer) getVirtualModelLibrary().getFlexoBehaviour(uri, true);
			}
			_creationSchemeURI = uri;
		}

		@Override
		public HttpVirtualModelInitializer getCreationScheme() {

			if (creationScheme == null && _creationSchemeURI != null && getVirtualModelLibrary() != null) {
				creationScheme = (HttpVirtualModelInitializer) getVirtualModelLibrary().getFlexoBehaviour(_creationSchemeURI, true);
				updateParameters();
			}
			/*if (creationScheme == null && getAssignedFlexoProperty() instanceof FlexoConceptInstanceRole) {
				creationScheme = ((FlexoConceptInstanceRole) getAssignedFlexoProperty()).getCreationScheme();
				updateParameters();
			}*/
			return creationScheme;
		}

		@Override
		public void setCreationScheme(HttpVirtualModelInitializer creationScheme) {
			if (this.creationScheme != creationScheme) {
				HttpVirtualModelInitializer oldValue = this.creationScheme;
				this.creationScheme = creationScheme;
				if (creationScheme != null) {
					_creationSchemeURI = creationScheme.getURI();
				}
				else {
					_creationSchemeURI = null;
				}
				updateParameters();
				getPropertyChangeSupport().firePropertyChange(CREATION_SCHEME_KEY, oldValue, creationScheme);
				// getPropertyChangeSupport().firePropertyChange(FLEXO_CONCEPT_TYPE_KEY, null, getFlexoConceptType());
			}
		}

		@Override
		public List<HttpVirtualModelInitializer> getAvailableCreationSchemes() {

			if (getAccessedVirtualModel() != null) {
				return getAccessedVirtualModel().getFlexoBehaviours(HttpVirtualModelInitializer.class);
			}
			return null;
		}

		// private Vector<AddFlexoConceptInstanceParameter> parameters = new Vector<AddFlexoConceptInstanceParameter>();

		@Override
		public List<CreateAccessPointParameter> getParameters() {
			// Comment this because of an infinite loop with updateParameters() method
			if (parameters == null) {
				parameters = new ArrayList<>();
				updateParameters();
			}
			return parameters;
		}

		public void setParameters(Vector<CreateAccessPointParameter> parameters) {
			this.parameters = parameters;
		}

		@Override
		public void addToParameters(CreateAccessPointParameter parameter) {
			parameter.setOwner(this);
			if (parameters == null) {
				parameters = new ArrayList<>();
			}
			parameters.add(parameter);
		}

		@Override
		public void removeFromParameters(CreateAccessPointParameter parameter) {
			parameter.setOwner(null);
			if (parameters == null) {
				parameters = new ArrayList<>();
			}
			parameters.remove(parameter);
		}

		public CreateAccessPointParameter getParameter(FlexoBehaviourParameter p) {
			for (CreateAccessPointParameter addEPParam : getParameters()) {
				if (addEPParam.getParam() == p) {
					return addEPParam;
				}
			}
			return null;
		}

		private void updateParameters() {
			if (parameters == null) {
				parameters = new ArrayList<>();
			}
			List<CreateAccessPointParameter> oldValue = new ArrayList<>(parameters);
			List<CreateAccessPointParameter> parametersToRemove = new ArrayList<>(parameters);
			if (creationScheme != null) {
				for (FlexoBehaviourParameter p : creationScheme.getParameters()) {
					CreateAccessPointParameter existingParam = getParameter(p);
					if (existingParam != null) {
						parametersToRemove.remove(existingParam);
					}
					else {
						if (getFMLModelFactory() != null) {
							CreateAccessPointParameter newParam = getFMLModelFactory().newInstance(CreateAccessPointParameter.class);
							newParam.setParam(p);
							addToParameters(newParam);
						}
					}
				}
			}
			for (CreateAccessPointParameter removeThis : parametersToRemove) {
				removeFromParameters(removeThis);
			}
			getPropertyChangeSupport().firePropertyChange(PARAMETERS_KEY, oldValue, parameters);
		}

		@Override
		public DataBinding<String> getUrl() {
			if (url == null) {
				url = new DataBinding<String>(this, String.class, DataBinding.BindingDefinitionType.GET);
				url.setBindingName("url");
			}
			return url;
		}

		@Override
		public void setUrl(DataBinding<String> url) {
			if (url != null) {
				url.setOwner(this);
				url.setDeclaredType(String.class);
				url.setBindingDefinitionType(DataBinding.BindingDefinitionType.GET);
				url.setBindingName("url");
			}
			this.url = url;
		}

		@Override
		public DataBinding<String> getUser() {
			if (user == null) {
				user = new DataBinding<String>(this, String.class, DataBinding.BindingDefinitionType.GET);
				user.setBindingName("user");
			}
			return user;
		}

		@Override
		public void setUser(DataBinding<String> user) {
			if (user != null) {
				user.setOwner(this);
				user.setDeclaredType(String.class);
				user.setBindingDefinitionType(DataBinding.BindingDefinitionType.GET);
				user.setBindingName("user");
			}
			this.user = user;
		}

		@Override
		public DataBinding<String> getPassword() {
			if (password == null) {
				password = new DataBinding<String>(this, String.class, DataBinding.BindingDefinitionType.GET);
				password.setBindingName("password");
			}
			return password;
		}

		@Override
		public void setPassword(DataBinding<String> password) {
			if (password != null) {
				password.setOwner(this);
				password.setDeclaredType(String.class);
				password.setBindingDefinitionType(DataBinding.BindingDefinitionType.GET);
				password.setBindingName("password");
			}
			this.password = password;
		}

	}
}
