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

import java.lang.reflect.Type;

import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstanceModelFactory;
import org.openflexo.foundation.fml.rt.InferedFMLRTModelSlot;
import org.openflexo.foundation.technologyadapter.ModelSlot;
import org.openflexo.http.connector.HttpModelSlot.HttpModelSlotImpl;
import org.openflexo.http.connector.fml.HttpVirtualModelInstanceType;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.pamela.annotations.Getter;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.PropertyIdentifier;
import org.openflexo.pamela.annotations.Setter;
import org.openflexo.pamela.annotations.XMLAttribute;

/**
 * A {@link ModelSlot} provided by {@link HttpTechnologyAdapter} which allows to access data through http technologies<br>
 * 
 * Accessed resource data is a {@link HttpVirtualModelInstance} configured with a {@link VirtualModel} (the contract)
 * 
 * @author sylvain
 *
 * @param <VMI>
 *            type of {@link HttpVirtualModelInstance} presented by this model slot
 */
@ModelEntity(isAbstract = true)
@ImplementationClass(HttpModelSlotImpl.class)
public interface HttpModelSlot<VMI extends HttpVirtualModelInstance<VMI>> extends InferedFMLRTModelSlot<VMI, HttpTechnologyAdapter> {

	/**
	 * General format of responses for requests in that HttpModelSlot
	 * 
	 * @author sylvain
	 *
	 */
	public enum Format {
		json, xml, map
	}

	@PropertyIdentifier(type = Format.class)
	String FORMAT_KEY = "format";

	@PropertyIdentifier(type = DataBinding.class)
	String URL_KEY = "url";

	@PropertyIdentifier(type = DataBinding.class)
	String USER_KEY = "user";

	@PropertyIdentifier(type = DataBinding.class)
	String PASSWORD_KEY = "password";

	/*@PropertyIdentifier(type = String.class)
	public static final String CREATION_SCHEME_URI_KEY = "creationSchemeURI";
	
	@PropertyIdentifier(type = List.class)
	public static final String PARAMETERS_KEY = "parameters";
	
	public static final String CREATION_SCHEME_KEY = "creationScheme";*/

	@Getter(FORMAT_KEY)
	@XMLAttribute
	Format getFormat();

	@Setter(FORMAT_KEY)
	void setFormat(Format format);

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

	/*@Getter(value = CREATION_SCHEME_URI_KEY)
	@XMLAttribute
	public String _getCreationSchemeURI();
	
	@Setter(CREATION_SCHEME_URI_KEY)
	public void _setCreationSchemeURI(String creationSchemeURI);
	
	public HttpInitializer getCreationScheme();
	
	public void setCreationScheme(HttpInitializer creationScheme);
	
	@Getter(value = PARAMETERS_KEY, cardinality = Cardinality.LIST, inverse = CreateParameter.OWNER_KEY)
	@XMLElement
	@Embedded
	@CloningStrategy(StrategyType.CLONE)
	public List<CreateParameter> getParameters();
	
	@Setter(PARAMETERS_KEY)
	public void setParameters(List<CreateParameter> parameters);
	
	@Adder(PARAMETERS_KEY)
	public void addToParameters(CreateParameter aParameter);
	
	@Remover(PARAMETERS_KEY)
	public void removeFromParameters(CreateParameter aParameter);
	
	public List<HttpInitializer> getAvailableCreationSchemes();*/

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

	abstract class HttpModelSlotImpl<VMI extends HttpVirtualModelInstance<VMI>>
			extends InferedFMLRTModelSlotImpl<VMI, HttpTechnologyAdapter> implements HttpModelSlot<VMI> {

		private DataBinding<String> url;
		private DataBinding<String> user;
		private DataBinding<String> password;

		/*private HttpInitializer creationScheme;
		private String _creationSchemeURI;
		private List<CreateParameter> parameters = null;*/

		@Override
		public Class<HttpTechnologyAdapter> getTechnologyAdapterClass() {
			return HttpTechnologyAdapter.class;
		}

		@Override
		public HttpTechnologyAdapter getModelSlotTechnologyAdapter() {
			return (HttpTechnologyAdapter) super.getModelSlotTechnologyAdapter();
		}

		@Override
		public <PR extends FlexoRole<?>> String defaultFlexoRoleName(Class<PR> flexoRoleClass) {
			return "";
		}

		/*@Override
		public Type getType() {
			VirtualModelInstanceType instanceType = VirtualModelInstanceType.getVirtualModelInstanceType(getAccessedVirtualModel());
			return new AccessPointType(instanceType);
		}*/

		/*@Override
		public HttpTechnologyAdapter getModelSlotTechnologyAdapter() {
			return (HttpTechnologyAdapter) super.getModelSlotTechnologyAdapter();
		}*/

		/*@Override
		public HttpModelSlotInstanceConfiguration createConfiguration(FlexoConceptInstance fci, FlexoResourceCenter<?> rc) {
			return new HttpModelSlotInstanceConfiguration(this, fci, rc);
		}
		
		@Override
		public AccessPointResource createProjectSpecificEmptyResource(VirtualModelInstance<?, ?> view, String filename, String modelUri) {
			// TODO create empty resource
			return null;
		}
		
		@Override
		public AccessPointResource createSharedEmptyResource(FlexoResourceCenter<?> resourceCenter, String relativePath, String filename,
				String modelUri) {
			// TODO create empty resource
			return null;
		}*/

		/*@Override
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
		}*/

		/**
		 * Return addressed virtual model (the virtual model this model slot specifically addresses, not the one in which it is defined)
		 *
		 * @return
		 */
		/*@Override
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
		}*/

		/*@Override
		public String _getCreationSchemeURI() {
			if (getCreationScheme() != null) {
				return getCreationScheme().getURI();
			}
			return _creationSchemeURI;
		}
		
		@Override
		public void _setCreationSchemeURI(String uri) {
			if (getVirtualModelLibrary() != null) {
				creationScheme = (HttpInitializer) getVirtualModelLibrary().getFlexoBehaviour(uri, true);
			}
			_creationSchemeURI = uri;
		}
		
		@Override
		public HttpInitializer getCreationScheme() {
		
			if (creationScheme == null && _creationSchemeURI != null && getVirtualModelLibrary() != null) {
				creationScheme = (HttpInitializer) getVirtualModelLibrary().getFlexoBehaviour(_creationSchemeURI, true);
				updateParameters();
			}
			return creationScheme;
		}
		
		@Override
		public void setCreationScheme(HttpInitializer creationScheme) {
			if (this.creationScheme != creationScheme) {
				HttpInitializer oldValue = this.creationScheme;
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
		public List<HttpInitializer> getAvailableCreationSchemes() {
		
			if (getAccessedVirtualModel() != null) {
				return getAccessedVirtualModel().getFlexoBehaviours(HttpInitializer.class);
			}
			return null;
		}
		
		// private Vector<AddFlexoConceptInstanceParameter> parameters = new Vector<AddFlexoConceptInstanceParameter>();
		
		@Override
		public List<CreateParameter> getParameters() {
			// Comment this because of an infinite loop with updateParameters() method
			if (parameters == null) {
				parameters = new ArrayList<>();
				updateParameters();
			}
			return parameters;
		}
		
		public void setParameters(Vector<CreateParameter> parameters) {
			this.parameters = parameters;
		}
		
		@Override
		public void addToParameters(CreateParameter parameter) {
			parameter.setOwner(this);
			if (parameters == null) {
				parameters = new ArrayList<>();
			}
			parameters.add(parameter);
		}
		
		@Override
		public void removeFromParameters(CreateParameter parameter) {
			parameter.setOwner(null);
			if (parameters == null) {
				parameters = new ArrayList<>();
			}
			parameters.remove(parameter);
		}
		
		public CreateParameter getParameter(FlexoBehaviourParameter p) {
			for (CreateParameter addEPParam : getParameters()) {
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
			List<CreateParameter> oldValue = new ArrayList<>(parameters);
			List<CreateParameter> parametersToRemove = new ArrayList<>(parameters);
			if (creationScheme != null) {
				for (FlexoBehaviourParameter p : creationScheme.getParameters()) {
					CreateParameter existingParam = getParameter(p);
					if (existingParam != null) {
						parametersToRemove.remove(existingParam);
					}
					else {
						if (getFMLModelFactory() != null) {
							CreateParameter newParam = getFMLModelFactory().newInstance(CreateParameter.class);
							newParam.setParam(p);
							addToParameters(newParam);
						}
					}
				}
			}
			for (CreateParameter removeThis : parametersToRemove) {
				removeFromParameters(removeThis);
			}
			getPropertyChangeSupport().firePropertyChange(PARAMETERS_KEY, oldValue, parameters);
		}*/

		private HttpVirtualModelInstanceType type;

		@Override
		public Type getType() {
			if (type == null || type.getVirtualModel() != getAccessedVirtualModel()) {
				type = new HttpVirtualModelInstanceType(getAccessedVirtualModel());
			}
			return type;
		}

		@Override
		public void setAccessedVirtualModel(VirtualModel aVirtualModel) {
			if (aVirtualModel != getAccessedVirtualModel()) {
				super.setAccessedVirtualModel(aVirtualModel);
				type = new HttpVirtualModelInstanceType(getAccessedVirtualModel());
			}
		}

		@Override
		public DataBinding<String> getUrl() {
			if (url == null) {
				url = new DataBinding<>(this, String.class, DataBinding.BindingDefinitionType.GET);
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
				user = new DataBinding<>(this, String.class, DataBinding.BindingDefinitionType.GET);
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
				password = new DataBinding<>(this, String.class, DataBinding.BindingDefinitionType.GET);
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
