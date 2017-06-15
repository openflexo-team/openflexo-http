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

package org.openflexo.http.server.fml;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.fml.FMLObject;
import org.openflexo.foundation.fml.FlexoBehaviour;
import org.openflexo.foundation.fml.FlexoBehaviourParameter;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.JsonSerializer;
import org.openflexo.model.factory.ModelFactory;

/**
 * Created by charlie on 09/06/2017.
 */
public class FMLJsonSerializer extends JsonSerializer {

	public FMLJsonSerializer(TechnologyAdapterRouteService service, ModelFactory factory) {
		super(service, factory);
	}

	@Override
	public boolean identifyObject(Object object, JsonObject result) {
		if (object instanceof FMLObject) {
			String name = ((FMLObject) object).getName();
			if (name != null) result.put("name", name);
		}
		return super.identifyObject(object, result);
	}

	private void describeFlexoConcept(FlexoConcept flexoConcept, JsonObject result, boolean detailed) {
		result.put("virtualModel", toReference(flexoConcept.getVirtualModel()));
		result.put("container", toReference(flexoConcept.getContainerFlexoConcept()));
		result.put("childFlexoConcepts", toReferenceArray(flexoConcept.getChildFlexoConcepts()));
		result.put("parents", toReferenceArray(flexoConcept.getParentFlexoConcepts()));
		result.put("properties", toArray(flexoConcept.getDeclaredProperties(), detailed));
		result.put("behaviors", toArray(flexoConcept.getDeclaredFlexoBehaviours(), detailed));
		result.put("childFlexoConcepts", toReferenceArray(flexoConcept.getChildFlexoConcepts()));
	}

	@Override
	public void describeObject(Object object, JsonObject result, boolean detailed) {
		if (object instanceof ViewPoint) {
			ViewPoint viewPoint = (ViewPoint) object;
			describeFlexoConcept(viewPoint, result, detailed);
			result.put("virtualModels", toReferenceArray(viewPoint.getVirtualModels()));

		} else if (object instanceof VirtualModel) {
			VirtualModel model = (VirtualModel) object;
			describeFlexoConcept(model, result, detailed);
			result.put("flexoConcepts", toReferenceArray(model.getFlexoConcepts()));

		} else if (object instanceof FlexoConcept) {
			FlexoConcept concept = (FlexoConcept) object;
			describeFlexoConcept(concept, result, detailed);

		} else if (object instanceof FlexoRole) {
			FlexoRole role= (FlexoRole) object;
			result.put("cardinality", toJson(role.getCardinality(), detailed));
			result.put("declaredType", toJson(role.getType(), detailed));
			result.put("flexoConcept", toReference(role.getFlexoConcept()));

		} else if (object instanceof FlexoBehaviour) {
			FlexoBehaviour behavior = (FlexoBehaviour) object;
			result.put("parameters", toArray(behavior.getParameters(), detailed));
			result.put("returnType", toJson(behavior.getReturnType(), detailed));
			result.put("controlGraph", toJson(behavior.getControlGraph(), detailed));
			result.put("flexoConcept", toReference(behavior.getFlexoConcept()));

		} else if (object instanceof FlexoBehaviourParameter) {
			FlexoBehaviourParameter parameter = (FlexoBehaviourParameter) object;
			result.put("declaredType", toJson(parameter.getType(), detailed));
			result.put("behavior", toReference(parameter.getBehaviour()));
			result.put("flexoConcept", toReference(parameter.getFlexoConcept()));
		}
		super.describeObject(object, result, detailed);
	}
}
