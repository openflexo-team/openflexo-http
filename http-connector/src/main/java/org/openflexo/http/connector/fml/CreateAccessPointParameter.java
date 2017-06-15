/**
 * 
 * Copyright (c) 2014-2015, Openflexo
 * 
 * This file is part of Flexo-foundation, a component of the software infrastructure 
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

package org.openflexo.http.connector.fml;

import java.util.logging.Logger;

import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.fml.FlexoBehaviour;
import org.openflexo.foundation.fml.rt.editionaction.BehaviourParameter;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.model.annotations.DefineValidationRule;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.validation.ValidationIssue;

/**
 * A parameter used to instanciate a new AccessPoint and a new HttpVirtualModelInstance
 * 
 * @author sylvain
 *
 */
@ModelEntity
@ImplementationClass(CreateAccessPointParameter.CreateAccessPointParameterImpl.class)
@XMLElement
public interface CreateAccessPointParameter extends BehaviourParameter<HttpModelSlot> {

	public static abstract class CreateAccessPointParameterImpl extends BehaviourParameterImpl<HttpModelSlot>
			implements CreateAccessPointParameter {

		static final Logger logger = Logger.getLogger(CreateAccessPointParameter.class.getPackage().getName());

		@Override
		public FlexoBehaviour getAccessedBehaviour() {
			return getOwner().getCreationScheme();
		}
	}

	@DefineValidationRule
	public static class ValueBindingMustBeValid extends BindingIsRequiredAndMustBeValid<CreateAccessPointParameter> {
		public ValueBindingMustBeValid() {
			super("'value'_binding_is_required_and_must_be_valid", CreateAccessPointParameter.class);
		}

		@Override
		public DataBinding<?> getBinding(CreateAccessPointParameter object) {
			return object.getValue();
		}

		@Override
		public ValidationIssue<BindingIsRequiredAndMustBeValid<CreateAccessPointParameter>, CreateAccessPointParameter> applyValidation(
				CreateAccessPointParameter object) {
			// Should return an issue only if parameter is required
			if (object.getParam().getIsRequired()) {
				return super.applyValidation(object);
			}
			else
				return null;
		}

	}

}
