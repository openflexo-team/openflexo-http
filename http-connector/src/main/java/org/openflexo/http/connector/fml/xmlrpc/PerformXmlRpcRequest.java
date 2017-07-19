/**
 * 
 * Copyright (c) 2014-2015, Openflexo
 * 
 * This file is part of Excelconnector, a component of the software infrastructure 
 * developed at Openflexo.
 * 
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
 *          Additional permission under GNU GPL version 3 section 7
 *
 *          If you modify this Program, or any covered work, by linking or 
 *          combining it with software containing parts covered by the terms 
 *          of EPL 1.0, the licensors of this Program grant you additional permission
 *          to convey the resulting work. * 
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

package org.openflexo.http.connector.fml.xmlrpc;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.openflexo.connie.DataBinding;
import org.openflexo.connie.DataBinding.BindingDefinitionType;
import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.connie.type.ParameterizedTypeImpl;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.FlexoConceptInstanceType;
import org.openflexo.foundation.fml.annotations.FML;
import org.openflexo.foundation.fml.editionaction.EditionAction;
import org.openflexo.foundation.fml.editionaction.TechnologySpecificAction;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext.ReturnException;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.xmlrpc.XmlRpcVirtualModelInstance;
import org.openflexo.model.annotations.Adder;
import org.openflexo.model.annotations.CloningStrategy;
import org.openflexo.model.annotations.CloningStrategy.StrategyType;
import org.openflexo.model.annotations.Embedded;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.Getter.Cardinality;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PastingPoint;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Remover;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

import de.timroes.axmlrpc.XMLRPCClient;
import de.timroes.axmlrpc.XMLRPCException;

/**
 * {@link EditionAction} used to configure a {@link FIBComponentModelSlot}
 * 
 * @author sylvain
 *
 */
@ModelEntity
@ImplementationClass(PerformXmlRpcRequest.PerformXmlRpcRequestImpl.class)
@XMLElement
@FML("PerformXmlRpcRequest")
public interface PerformXmlRpcRequest<T> extends TechnologySpecificAction<XmlRpcModelSlot, AccessPoint, T> {

	@PropertyIdentifier(type = String.class)
	public static final String END_POINT_NAME_KEY = "endPointName";
	@PropertyIdentifier(type = String.class)
	public static final String METHOD_NAME_KEY = "methodName";
	@PropertyIdentifier(type = Type.class)
	public static final String TYPE_KEY = "type";
	@PropertyIdentifier(type = String.class)
	public static final String MAPPED_FLEXO_CONCEPT_URI_KEY = "mappedFlexoConceptURI";
	@PropertyIdentifier(type = FlexoConcept.class)
	public static final String MAPPED_FLEXO_CONCEPT_KEY = "mappedFlexoConcept";
	@PropertyIdentifier(type = DataBinding.class)
	public static final String DYNAMIC_MAPPED_FLEXO_CONCEPT_KEY = "dynamicMappedFlexoConcept";
	@PropertyIdentifier(type = Boolean.class)
	public static final String MULTIPLE_KEY = "multiple";

	@PropertyIdentifier(type = XmlRpcParameter.class, cardinality = Cardinality.LIST)
	public static final String PARAMETERS_KEY = "parameters";

	@Getter(value = END_POINT_NAME_KEY)
	@XMLAttribute
	public String getEndPointName();

	@Setter(END_POINT_NAME_KEY)
	public void setEndPointName(String endPointName);

	@Getter(value = METHOD_NAME_KEY)
	@XMLAttribute
	public String getMethodName();

	@Setter(METHOD_NAME_KEY)
	public void setMethodName(String methodName);

	@Getter(value = TYPE_KEY, isStringConvertable = true)
	@XMLAttribute
	public Type getType();

	@Setter(TYPE_KEY)
	public void setType(Type type);

	@Getter(MAPPED_FLEXO_CONCEPT_URI_KEY)
	@XMLAttribute
	String getMappedFlexoConceptURI();

	@Setter(MAPPED_FLEXO_CONCEPT_URI_KEY)
	void setMappedFlexoConceptURI(String flexoConceptURI);

	@Getter(MAPPED_FLEXO_CONCEPT_KEY)
	FlexoConcept getMappedFlexoConcept();

	@Setter(MAPPED_FLEXO_CONCEPT_KEY)
	void setMappedFlexoConcept(FlexoConcept flexoConcept);

	@Getter(DYNAMIC_MAPPED_FLEXO_CONCEPT_KEY)
	@XMLAttribute
	DataBinding<FlexoConcept> getDynamicMappedFlexoConcept();

	@Setter(DYNAMIC_MAPPED_FLEXO_CONCEPT_KEY)
	void setDynamicMappedFlexoConcept(DataBinding<FlexoConcept> flexoConceptBinding);

	@Getter(value = MULTIPLE_KEY, defaultValue = "false")
	@XMLAttribute
	boolean isMultiple();

	@Setter(MULTIPLE_KEY)
	void setMultiple(boolean multiple);

	@Getter(value = PARAMETERS_KEY, cardinality = Cardinality.LIST, inverse = XmlRpcParameter.OWNER_KEY)
	@Embedded
	@CloningStrategy(StrategyType.CLONE)
	@XMLElement
	List<XmlRpcParameter> getParameters();

	@Setter(PARAMETERS_KEY)
	void setParameters(List<XmlRpcParameter> parameters);

	@Adder(PARAMETERS_KEY)
	@PastingPoint
	void addToParameters(XmlRpcParameter aParameter);

	@Remover(PARAMETERS_KEY)
	void removeFromParameters(XmlRpcParameter aParameter);

	default XmlRpcParameter addNewParameter() {
		if (getFMLModelFactory() != null) {
			XmlRpcParameter parameter = getFMLModelFactory().newInstance(XmlRpcParameter.class);
			parameter.setName("param");
			parameter.setValue(new DataBinding(getOwner(), String.class, BindingDefinitionType.GET));
			addToParameters(parameter);
			return parameter;
		}
		return null;
	}

	default XmlRpcParameter deleteParameter(XmlRpcParameter parameter) {
		removeFromParameters(parameter);
		parameter.delete();
		return parameter;
	}

	public static abstract class PerformXmlRpcRequestImpl<T> extends TechnologySpecificActionImpl<XmlRpcModelSlot, AccessPoint, T>
			implements PerformXmlRpcRequest<T> {

		private static final Logger logger = Logger.getLogger(PerformXmlRpcRequestImpl.class.getPackage().getName());

		private FlexoConcept flexoConcept;

		@Override
		public Type getAssignableType() {
			if (getType() != null) {
				return getType();
			}
			return Object.class;
		}

		@Override
		public Type getType() {
			if (getMappedFlexoConcept() != null) {
				FlexoConceptInstanceType type = FlexoConceptInstanceType.getFlexoConceptInstanceType(getMappedFlexoConcept());
				return isMultiple() ? new ParameterizedTypeImpl(List.class, type) : type;
			}
			else {
				return (Type) performSuperGetter(PerformXmlRpcRequest.TYPE_KEY);
			}
		}

		@Override
		public FlexoConcept getMappedFlexoConcept() {
			String flexoConceptURI = getMappedFlexoConceptURI();
			if (flexoConcept == null && flexoConceptURI != null && !isDeserializing() && getServiceManager() != null) {
				try {
					TechnologyAdapterService adapterService = getServiceManager().getTechnologyAdapterService();
					FMLTechnologyAdapter technologyAdapter = adapterService.getTechnologyAdapter(FMLTechnologyAdapter.class);
					this.flexoConcept = technologyAdapter.getVirtualModelLibrary().getFlexoConcept(flexoConceptURI, false);
				} catch (Exception e) {
					logger.log(Level.SEVERE, "Can't find virtual model '" + flexoConceptURI + "'", e);
				}
			}
			return flexoConcept;
		}

		@Override
		public void setMappedFlexoConcept(FlexoConcept flexoConcept) {
			FlexoConcept oldVirtualModel = this.flexoConcept;
			if (oldVirtualModel != flexoConcept) {
				this.flexoConcept = flexoConcept;
				setMappedFlexoConceptURI(flexoConcept != null ? flexoConcept.getURI() : null);
				getPropertyChangeSupport().firePropertyChange(MAPPED_FLEXO_CONCEPT_KEY, oldVirtualModel, flexoConcept);
				getPropertyChangeSupport().firePropertyChange(PerformXmlRpcRequest.TYPE_KEY, null, getType());
			}
		}

		private DataBinding<FlexoConcept> flexoConceptBinding;

		@Override
		public DataBinding<FlexoConcept> getDynamicMappedFlexoConcept() {
			if (flexoConceptBinding == null) {
				flexoConceptBinding = new DataBinding<>(this, FlexoConcept.class, DataBinding.BindingDefinitionType.GET);
				flexoConceptBinding.setBindingName("dynamicMappedFlexoConcept");
			}
			flexoConceptBinding.setOwner(this);
			return flexoConceptBinding;
		}

		@Override
		public void setDynamicMappedFlexoConcept(DataBinding<FlexoConcept> flexoConceptBinding) {
			if (flexoConceptBinding != null) {
				this.flexoConceptBinding = new DataBinding<>(flexoConceptBinding.toString(), this, FlexoConcept.class,
						DataBinding.BindingDefinitionType.GET);
				this.flexoConceptBinding.setBindingName("dynamicMappedFlexoConcept");
			}
		}

		private FlexoConcept getMappedFlexoConcept(RunTimeEvaluationContext evaluationContext) {
			if (getDynamicMappedFlexoConcept().isValid()) {
				try {
					return getDynamicMappedFlexoConcept().getBindingValue(evaluationContext);
				} catch (TypeMismatchException | NullReferenceException | InvocationTargetException e) {
					e.printStackTrace();
					return null;
				}
			}
			if (getMappedFlexoConcept() != null) {
				return getMappedFlexoConcept();
			}
			if (getType() instanceof FlexoConceptInstanceType) {
				return ((FlexoConceptInstanceType) getType()).getFlexoConcept();
			}
			return null;
		}

		@Override
		public T execute(RunTimeEvaluationContext evaluationContext) throws ReturnException, FlexoException {

			System.out.println("PerformXmlRpcRequest" + getEndPointName() + " " + getMethodName());

			AccessPoint accessPoint = getReceiver(evaluationContext);

			System.out.println("receiver: " + getReceiver() + " = " + accessPoint);
			System.out.println("valid: " + getReceiver().isValid() + " reason: " + getReceiver().invalidBindingReason());

			if (accessPoint == null) {
				logger.warning("Could not perform XML/RPC request on null AccessPoint");
				return null;
			}

			String relativePath = getEndPointName();
			if (accessPoint.getUrl().endsWith("/")) {
				if (relativePath.startsWith("/")) {
					relativePath = relativePath.substring(1);
				}
			}
			else {
				if (!relativePath.startsWith("/")) {
					relativePath = "/" + relativePath;
				}
			}

			String urlString = accessPoint.getUrl() + relativePath;

			System.out.println("Requesting " + urlString);

			URL urlObject;
			try {
				urlObject = new URL(urlString);
			} catch (MalformedURLException e) {
				throw new FlexoException(e);
			}
			XMLRPCClient object = new XMLRPCClient(urlObject);

			try {

				System.out.println("Calling XMLRPC " + getMethodName());

				Object[] params = new Object[getParameters().size()];

				int i = 0;
				for (XmlRpcParameter p : getParameters()) {
					if (p.getValue().isValid()) {
						params[i] = p.getValue().getBindingValue(evaluationContext);
					}
					else {
						// Caution: hacking section
						// This should be replaced by a better code
						if (p.getName().equals("map")) {
							params[i] = Collections.emptyMap();
						}
					}
					System.out.println(p.getName() + "=" + params[i]);
					i++;
				}

				Object result = object.call(getMethodName(), params);
				System.out.println("Resultat de l'appel: " + result);

				System.out.println("accessPoint=" + accessPoint);
				System.out.println("accessPoint.getInstance()=" + accessPoint.getInstance());

				System.out.println("mapped concept : " + getMappedFlexoConcept(evaluationContext));

				if (getMappedFlexoConcept(evaluationContext) != null) {

					if (result instanceof Map) {
						return (T) ((XmlRpcVirtualModelInstance) accessPoint.getInstance()).getFlexoConceptInstance((Map<?, ?>) result,
								getMappedFlexoConcept(evaluationContext));
					}

					else if (result.getClass().isArray()) {
						System.out.println("Tiens c'est bien un array de " + result.getClass().getComponentType());
						Object[] objects = (Object[]) result;
						for (int j = 0; j < objects.length; j++) {
							System.out.println("objects[" + j + "]=" + objects[j]);
							if (objects[j] instanceof Map) {
								T mappedObject = (T) ((XmlRpcVirtualModelInstance) accessPoint.getInstance())
										.getFlexoConceptInstance((Map<?, ?>) objects[j], getMappedFlexoConcept(evaluationContext));
								System.out.println("mappedObject=" + mappedObject);
							}
						}
						return null;
					}
					else {
						return null;
					}
				}

				else {
					System.out.println("Hop, je retourne " + result + " of " + result.getClass());
					return (T) result;
				}

			} catch (XMLRPCException e) {
				throw new FlexoException(e);
			} catch (TypeMismatchException e) {
				e.printStackTrace();
				throw new FlexoException(e);
			} catch (NullReferenceException e) {
				e.printStackTrace();
				throw new FlexoException(e);
			} catch (InvocationTargetException e) {
				e.printStackTrace();
				throw new FlexoException(e);
			}

		}
	}
}
