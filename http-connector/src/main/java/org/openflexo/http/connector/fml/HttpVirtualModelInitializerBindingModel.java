/**
 * 
 * Copyright (c) 2014, Openflexo
 * 
 * This file is part of Flexodiagram, a component of the software infrastructure 
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

import java.beans.PropertyChangeEvent;

import org.openflexo.connie.BindingModel;
import org.openflexo.connie.BindingVariable;
import org.openflexo.foundation.fml.FlexoBehaviour;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelInstanceType;
import org.openflexo.foundation.fml.binding.FlexoBehaviourBindingModel;

/**
 * This is the {@link BindingModel} exposed by a {@link HttpVirtualModelInitializer}<br>
 * 
 * @author sylvain
 * 
 */
@Deprecated
public class HttpVirtualModelInitializerBindingModel extends FlexoBehaviourBindingModel {

	public static final String ACCESS_POINT = "initializingAccessPoint";

	private BindingVariable accessPointBindingVariable;

	public HttpVirtualModelInitializerBindingModel(HttpVirtualModelInitializer behaviour) {
		super(behaviour);

		updateAccessPointBindingVariable();
	}

	private void updateAccessPointBindingVariable() {
		if (getFlexoBehaviour() != null && getFlexoBehaviour().getFlexoConcept() instanceof VirtualModel) {
			VirtualModelInstanceType instanceType = VirtualModelInstanceType
					.getVirtualModelInstanceType((VirtualModel) getFlexoBehaviour().getFlexoConcept());
			AccessPointType accessPointType = new AccessPointType(instanceType);
			if (accessPointBindingVariable == null) {
				accessPointBindingVariable = new BindingVariable(HttpVirtualModelInitializerBindingModel.ACCESS_POINT, accessPointType);
				addToBindingVariables(accessPointBindingVariable);
			}
			else {
				accessPointBindingVariable.setType(accessPointType);
			}
		}
		else {
			if (accessPointBindingVariable != null) {
				removeFromBindingVariables(accessPointBindingVariable);
				accessPointBindingVariable.delete();
			}
		}
	}

	@Override
	public HttpVirtualModelInitializer getFlexoBehaviour() {
		return (HttpVirtualModelInitializer) super.getFlexoBehaviour();
	}

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		super.propertyChange(evt);

		if (evt.getSource() == getFlexoBehaviour()) {
			if (evt.getPropertyName().equals(FlexoBehaviour.FLEXO_CONCEPT_KEY)) {
				updateAccessPointBindingVariable();
			}
		}
	}

	public BindingVariable getAccessPointBindingVariable() {
		return accessPointBindingVariable;
	}
}
