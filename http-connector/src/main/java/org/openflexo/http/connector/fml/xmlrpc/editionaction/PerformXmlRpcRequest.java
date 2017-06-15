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

package org.openflexo.http.connector.fml.xmlrpc.editionaction;

import java.lang.reflect.Type;
import java.util.List;
import java.util.logging.Logger;

import org.openflexo.connie.DataBinding;
import org.openflexo.connie.DataBinding.BindingDefinitionType;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.annotations.FML;
import org.openflexo.foundation.fml.editionaction.EditionAction;
import org.openflexo.foundation.fml.editionaction.TechnologySpecificAction;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext.ReturnException;
import org.openflexo.http.connector.XmlRpcModelSlot;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.model.annotations.Adder;
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

	@Getter(value = PARAMETERS_KEY, cardinality = Cardinality.LIST, inverse = XmlRpcParameter.OWNER_KEY)
	@Embedded
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

		@Override
		public Type getAssignableType() {
			if (getType() != null) {
				return getType();
			}
			return Object.class;
		}

		@Override
		public T execute(RunTimeEvaluationContext evaluationContext) throws ReturnException, FlexoException {

			System.out.println("PerformXmlRpcRequest for :" + getAssignedFlexoProperty());

			System.out.println("receiver=" + getReceiver(evaluationContext));

			return null;

		}
	}
}
