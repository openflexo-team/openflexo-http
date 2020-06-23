/*
 * Copyright (c) 2013-2017, Openflexo
 *
 * This file is part of Flexo-foundation, a component of the software infrastructure
 * developed at Openflexo.
 *
 * Openflexo is dual-licensed under the European Union Public License (EUPL, either
 * version 1.1 of the License, or any later version ), which is available at
 * https://joinup.ec.europa.eu/software/page/eupl/licence-eupl
 * and the GNU General Public License (GPL, either version 3 of the License, or any
 * later version), which is available at http://www.gnu.org/licenses/gpl.html .
 *
 * You can redistribute it and/or modify under the terms of either of these licenses
 *
 * If you choose to redistribute it and/or modify under the terms of the GNU GPL, you
 * must include the following additional permission.
 *
 *           Additional permission under GNU GPL version 3 section 7
 *           If you modify this Program, or any covered work, by linking or
 *           combining it with software containing parts covered by the terms
 *           of EPL 1.0, the licensors of this Program grant you additional permission
 *           to convey the resulting work.
 *
 * This software is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE.
 *
 * See http://www.openflexo.org/license.html for details.
 *
 *
 * Please contact Openflexo (openflexo-contacts@openflexo.org)
 * or visit www.openflexo.org if you need additional information.
 *
 */

package org.openflexo.http.connector.fml;

import java.io.FileNotFoundException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.openflexo.connie.DataBinding;
import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.InvalidArgumentException;
import org.openflexo.foundation.fml.CreationScheme;
import org.openflexo.foundation.fml.FlexoBehaviourParameter;
import org.openflexo.foundation.fml.FlexoConceptInstanceRole;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.editionaction.AbstractCreateResource;
import org.openflexo.foundation.fml.editionaction.EditionAction;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext;
import org.openflexo.foundation.fml.rt.action.CreationSchemeAction;
import org.openflexo.foundation.fml.rt.action.FlexoBehaviourAction;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResource;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResourceFactory;
import org.openflexo.pamela.annotations.Adder;
import org.openflexo.pamela.annotations.CloningStrategy;
import org.openflexo.pamela.annotations.CloningStrategy.StrategyType;
import org.openflexo.pamela.annotations.Embedded;
import org.openflexo.pamela.annotations.Getter;
import org.openflexo.pamela.annotations.Getter.Cardinality;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.PropertyIdentifier;
import org.openflexo.pamela.annotations.Remover;
import org.openflexo.pamela.annotations.Setter;
import org.openflexo.pamela.annotations.XMLAttribute;
import org.openflexo.pamela.annotations.XMLElement;
import org.openflexo.pamela.exceptions.ModelDefinitionException;

/**
 * {@link EditionAction} used to create an empty {@link HttpVirtualModelInstance} resource
 * 
 * @author charlie, sylvain
 *
 */
@ModelEntity(isAbstract = true)
@ImplementationClass(CreateHttpResource.CreateHttpResourceImpl.class)
@XMLElement
public interface CreateHttpResource<VMI extends HttpVirtualModelInstance<VMI>>
		extends AbstractCreateResource<HttpModelSlot<VMI>, VMI, HttpTechnologyAdapter> {

	@PropertyIdentifier(type = String.class)
	public static final String CREATION_SCHEME_URI_KEY = "creationSchemeURI";
	@PropertyIdentifier(type = CreationScheme.class)
	public static final String CREATION_SCHEME_KEY = "creationScheme";
	@PropertyIdentifier(type = VirtualModel.class)
	public static final String VIRTUAL_MODEL_KEY = "virtualModel";
	@PropertyIdentifier(type = CreateHttpResourceParameter.class, cardinality = Cardinality.LIST)
	public static final String PARAMETERS_KEY = "parameters";

	@PropertyIdentifier(type = String.class)
	String URL_KEY = "url";
	@PropertyIdentifier(type = String.class)
	String USER_KEY = "user";
	@PropertyIdentifier(type = String.class)
	String PASSWORD_KEY = "password";

	public VirtualModelResource getVirtualModelResource();

	public void setVirtualModelResource(VirtualModelResource virtualModelResource);

	public VirtualModel getVirtualModel();

	public void setVirtualModel(VirtualModel virtualModel);

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

	public CreationScheme getCreationScheme();

	public void setCreationScheme(CreationScheme creationScheme);

	public List<CreationScheme> getAvailableCreationSchemes();

	@Getter(value = PARAMETERS_KEY, cardinality = Cardinality.LIST, inverse = CreateHttpResourceParameter.OWNER_KEY)
	@XMLElement
	@Embedded
	@CloningStrategy(StrategyType.CLONE)
	public List<CreateHttpResourceParameter> getParameters();

	@Setter(PARAMETERS_KEY)
	public void setParameters(List<CreateHttpResourceParameter> parameters);

	@Adder(PARAMETERS_KEY)
	public void addToParameters(CreateHttpResourceParameter aParameter);

	@Remover(PARAMETERS_KEY)
	public void removeFromParameters(CreateHttpResourceParameter aParameter);

	public abstract Class<? extends HttpVirtualModelInstanceResourceFactory<VMI>> getResourceFactoryClass();

	public abstract String getSuffix();

	abstract class CreateHttpResourceImpl<VMI extends HttpVirtualModelInstance<VMI>>
			extends AbstractCreateResourceImpl<HttpModelSlot<VMI>, VMI, HttpTechnologyAdapter> implements CreateHttpResource<VMI> {

		private DataBinding<String> url;
		private DataBinding<String> user;
		private DataBinding<String> password;

		private VirtualModel virtualModel;
		private VirtualModelResource virtualModelResource;

		private CreationScheme creationScheme;
		private String _creationSchemeURI;
		private List<CreateHttpResourceParameter> parameters = null;

		@Override
		public Type getAssignableType() {
			/*if (getAssignedFlexoProperty() != null) {
				return getAssignedFlexoProperty().getResultingType();
			}*/
			if (getVirtualModel() != null) {
				return getVirtualModel().getInstanceType();
			}
			/*FlexoProperty<VMI> flexoProperty = getAssignedFlexoProperty();
			if (flexoProperty instanceof HttpModelSlot) {
				HttpModelSlot<VMI> httpModelSlot = (HttpModelSlot<VMI>) flexoProperty;
				if (httpModelSlot != null && httpModelSlot.getAccessedVirtualModel() != null) {
					return new AccessPointType((VirtualModelInstanceType) httpModelSlot.getAccessedVirtualModel().getInstanceType());
				}
			}
			return AccessPoint.class;*/
			return HttpVirtualModelInstance.class;
		}

		@Override
		public VirtualModelResource getVirtualModelResource() {
			if (virtualModelResource != null) {
				return virtualModelResource;
			}
			if (getVirtualModel() != null) {
				return getVirtualModel().getVirtualModelResource();
			}
			return virtualModelResource;
		}

		@Override
		public void setVirtualModelResource(VirtualModelResource virtualModelResource) {
			if ((virtualModelResource == null && getVirtualModelResource() != null)
					|| (virtualModelResource != null && !virtualModelResource.equals(getVirtualModelResource()))) {
				VirtualModelResource oldValue = getVirtualModelResource();
				this.virtualModelResource = virtualModelResource;
				setVirtualModel(virtualModelResource.getVirtualModel());
				getPropertyChangeSupport().firePropertyChange("virtualModelResource", oldValue, virtualModelResource);
			}
		}

		@Override
		public VirtualModel getVirtualModel() {
			if (getCreationScheme() != null) {
				return (VirtualModel) getCreationScheme().getFlexoConcept();
			}
			if (getAssignedFlexoProperty() instanceof HttpModelSlot) {
				return ((HttpModelSlot<VMI>) getAssignedFlexoProperty()).getAccessedVirtualModel();
			}
			if (virtualModelResource != null) {
				return virtualModelResource.getVirtualModel();
			}
			return virtualModel;
		}

		@Override
		public void setVirtualModel(VirtualModel aVirtualModel) {
			if (this.virtualModel != aVirtualModel) {
				VirtualModel oldValue = this.virtualModel;
				this.virtualModel = aVirtualModel;
				this.virtualModelResource = aVirtualModel.getVirtualModelResource();
				if (getCreationScheme() != null && getCreationScheme().getFlexoConcept() != aVirtualModel) {
					if (aVirtualModel.getCreationSchemes().size() > 0) {
						setCreationScheme(aVirtualModel.getCreationSchemes().get(0));
					}
					else {
						setCreationScheme(null);
					}
				}
				getPropertyChangeSupport().firePropertyChange(CreateHttpResource.VIRTUAL_MODEL_KEY, oldValue, aVirtualModel);
				getPropertyChangeSupport().firePropertyChange("availableCreationSchemes", null, getAvailableCreationSchemes());
			}
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
				creationScheme = (CreationScheme) getVirtualModelLibrary().getFlexoBehaviour(uri, true);
			}
			_creationSchemeURI = uri;
		}

		@Override
		public CreationScheme getCreationScheme() {

			if (creationScheme == null && _creationSchemeURI != null && getVirtualModelLibrary() != null) {
				creationScheme = (CreationScheme) getVirtualModelLibrary().getFlexoBehaviour(_creationSchemeURI, true);
				updateParameters();
			}
			if (creationScheme == null && ((FlexoProperty) getAssignedFlexoProperty()) instanceof FlexoConceptInstanceRole) {
				creationScheme = ((FlexoConceptInstanceRole) (FlexoProperty) getAssignedFlexoProperty()).getCreationScheme();
				updateParameters();
			}
			return creationScheme;
		}

		@Override
		public void setCreationScheme(CreationScheme creationScheme) {
			if (this.creationScheme != creationScheme) {
				CreationScheme oldValue = this.creationScheme;
				this.creationScheme = creationScheme;
				if (creationScheme != null) {
					_creationSchemeURI = creationScheme.getURI();
				}
				else {
					_creationSchemeURI = null;
				}
				updateParameters();
				getPropertyChangeSupport().firePropertyChange(CREATION_SCHEME_KEY, oldValue, creationScheme);
				getPropertyChangeSupport().firePropertyChange(VIRTUAL_MODEL_KEY, null, getVirtualModel());
			}
		}

		@Override
		public List<CreationScheme> getAvailableCreationSchemes() {
			if (getVirtualModel() != null) {
				return getVirtualModel().getCreationSchemes();
			}
			return null;
		}

		@Override
		public List<CreateHttpResourceParameter> getParameters() {
			// Comment this because of an infinite loop with updateParameters() method
			if (parameters == null) {
				parameters = new ArrayList<>();
				updateParameters();
			}
			return parameters;
		}

		@Override
		public void setParameters(List<CreateHttpResourceParameter> parameters) {
			this.parameters = parameters;
		}

		@Override
		public void addToParameters(CreateHttpResourceParameter parameter) {
			parameter.setOwner(this);
			if (parameters == null) {
				parameters = new ArrayList<>();
			}
			parameters.add(parameter);
		}

		@Override
		public void removeFromParameters(CreateHttpResourceParameter parameter) {
			parameter.setOwner(null);
			if (parameters == null) {
				parameters = new ArrayList<>();
			}
			parameters.remove(parameter);
		}

		public CreateHttpResourceParameter getParameter(FlexoBehaviourParameter p) {
			for (CreateHttpResourceParameter addEPParam : getParameters()) {
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
			List<CreateHttpResourceParameter> oldValue = new ArrayList<>(parameters);
			List<CreateHttpResourceParameter> parametersToRemove = new ArrayList<>(parameters);
			if (creationScheme != null) {
				for (FlexoBehaviourParameter p : creationScheme.getParameters()) {
					CreateHttpResourceParameter existingParam = getParameter(p);
					if (existingParam != null) {
						parametersToRemove.remove(existingParam);
					}
					else {
						if (getFMLModelFactory() != null) {
							CreateHttpResourceParameter newParam = getFMLModelFactory().newInstance(CreateHttpResourceParameter.class);
							newParam.setParam(p);
							addToParameters(newParam);
						}
					}
				}
			}
			for (CreateHttpResourceParameter removeThis : parametersToRemove) {
				removeFromParameters(removeThis);
			}
			getPropertyChangeSupport().firePropertyChange(PARAMETERS_KEY, oldValue, parameters);
		}

		@Override
		public VMI execute(RunTimeEvaluationContext evaluationContext) throws FlexoException {
			try {
				String resourceName = getResourceName(evaluationContext);
				String resourceURI = getResourceURI(evaluationContext);
				FlexoResourceCenter<?> rc = getResourceCenter(evaluationContext);

				HttpVirtualModelInstanceResource<VMI> newResource = createResource(
						getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class),
						getResourceFactoryClass(), evaluationContext, getSuffix(), true);
				VMI data = newResource.getResourceData();
				data.setVirtualModel(getVirtualModel());

				FlexoProperty<VMI> flexoProperty = getAssignedFlexoProperty();
				if (flexoProperty instanceof HttpModelSlot) {
					HttpModelSlot<VMI> httpModelSlot = (HttpModelSlot<VMI>) flexoProperty;
					String url = null;
					try {
						if (getUrl().isValid()) {
							url = getUrl().getBindingValue(evaluationContext);
						}
						else if (httpModelSlot.getUrl().isValid()) {
							url = httpModelSlot.getUrl().getBindingValue(evaluationContext);
						}
					} catch (TypeMismatchException | NullReferenceException | InvocationTargetException e) {
						e.printStackTrace();
					}
					String user = null;
					try {
						if (getUser().isValid()) {
							user = getUser().getBindingValue(evaluationContext);
						}
						else if (httpModelSlot.getUser().isValid()) {
							user = httpModelSlot.getUser().getBindingValue(evaluationContext);
						}
					} catch (TypeMismatchException | NullReferenceException | InvocationTargetException e) {
						e.printStackTrace();
					}
					String password = null;
					try {
						if (getPassword().isValid()) {
							password = getPassword().getBindingValue(evaluationContext);
						}
						else if (httpModelSlot.getPassword().isValid()) {
							password = httpModelSlot.getPassword().getBindingValue(evaluationContext);
						}
					} catch (TypeMismatchException | NullReferenceException | InvocationTargetException e) {
						e.printStackTrace();
					}

					data.setUrl(url);
					data.setUser(user);
					data.setPassword(password);

					// Now we should execute CreationScheme
					// System.out.println("Executing FML: " + getCreationScheme().getFMLRepresentation());

					CreationSchemeAction creationSchemeAction = new CreationSchemeAction(getCreationScheme(), null, null,
							(FlexoBehaviourAction<?, ?, ?>) evaluationContext);
					creationSchemeAction.initWithFlexoConceptInstance(data);
					for (CreateHttpResourceParameter p : getParameters()) {
						// Unused FlexoBehaviourParameter param = p.getParam();
						Object value = p.evaluateParameterValue((FlexoBehaviourAction<?, ?, ?>) evaluationContext);
						// System.out.println("For parameter " + param + " value is " + value);
						if (value != null) {
							creationSchemeAction.setParameterValue(p.getParam(),
									p.evaluateParameterValue((FlexoBehaviourAction<?, ?, ?>) evaluationContext));
						}
					}
					creationSchemeAction.doAction();

					if (data.getVirtualModel().getFlexoBehaviours(HttpInitializer.class).size() > 0) {
						HttpInitializer initializer = data.getVirtualModel().getFlexoBehaviours(HttpInitializer.class).get(0);
						HttpInitializerAction action = new HttpInitializerAction(initializer, data, null,
								(FlexoBehaviourAction<?, ?, ?>) evaluationContext);
						action.doAction();
					}

				}
				else {
					throw new InvalidArgumentException("AccessPoint creation must be affected to a HTTPModelSlot");
				}

				return data;
			} catch (ModelDefinitionException | FileNotFoundException | ResourceLoadingCancelledException e) {
				throw new FlexoException(e);
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
