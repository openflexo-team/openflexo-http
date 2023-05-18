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

import java.beans.PropertyChangeSupport;
import java.lang.reflect.Type;

import org.openflexo.foundation.fml.TechnologySpecificType;
import org.openflexo.foundation.fml.VirtualModelInstanceType;
import org.openflexo.foundation.technologyadapter.SpecificTypeInfo;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.AccessPoint;

/**
 * Type for an access point
 */
public class AccessPointType implements TechnologySpecificType<HttpTechnologyAdapter> {

	private final VirtualModelInstanceType instanceType;

	private final PropertyChangeSupport pcSupport;

	public AccessPointType(VirtualModelInstanceType instanceType) {
		pcSupport = new PropertyChangeSupport(this);
		this.instanceType = instanceType;
	}

	@Override
	public PropertyChangeSupport getPropertyChangeSupport() {
		return pcSupport;
	}

	@Override
	public String getDeletedProperty() {
		// TODO Auto-generated method stub
		return null;
	}

	public VirtualModelInstanceType getInstanceType() {
		return instanceType;
	}

	@Override
	public boolean isTypeAssignableFrom(Type aType, boolean permissive) {
		return aType instanceof AccessPointType && ((AccessPointType) aType).instanceType.isTypeAssignableFrom(instanceType, permissive);
	}

	@Override
	public boolean isOfType(Object object, boolean permissive) {
		if (object instanceof AccessPoint) {
			VirtualModelInstanceType instanceType = VirtualModelInstanceType
					.getVirtualModelInstanceType(((AccessPoint) object).getInstance().getVirtualModel());
			return instanceType.isTypeAssignableFrom(instanceType, permissive);
		}
		return false;
	}

	@Override
	public String simpleRepresentation() {
		return "AccessPoint<" + instanceType.simpleRepresentation() + ">";
	}

	@Override
	public String fullQualifiedRepresentation() {
		return "org.openflexo.http.connector.model." + simpleRepresentation();
	}

	@Override
	public Class<?> getBaseClass() {
		return AccessPoint.class;
	}

	@Override
	public String getSerializationRepresentation() {
		return fullQualifiedRepresentation();
	}

	@Override
	public boolean isResolved() {
		return instanceType != null;
	}

	@Override
	public HttpTechnologyAdapter getSpecificTechnologyAdapter() {
		if (instanceType != null && instanceType.getVirtualModel() != null
				&& instanceType.getVirtualModel().getTechnologyAdapterService() != null) {
			return instanceType.getVirtualModel().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class);
		}
		return null;
	}

	@Override
	public void resolve() {
		System.out.println("-------> Resolving " + instanceType);
	}

	@Override
	public void registerSpecificTypeInfo(SpecificTypeInfo<HttpTechnologyAdapter> typeInfo) {
		this.typeInfo = typeInfo;
	}

	public SpecificTypeInfo<HttpTechnologyAdapter> getSpecificTypeInfo() {
		return typeInfo;
	}

	private SpecificTypeInfo<HttpTechnologyAdapter> typeInfo;

}
