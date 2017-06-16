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
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.ViewPoint;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.ActorReference;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.View;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.JsonSerializer;
import org.openflexo.model.factory.ModelFactory;

/**
 * Created by charlie on 09/06/2017.
 */
public class FMLRtJsonSerializer extends JsonSerializer {

	public FMLRtJsonSerializer(TechnologyAdapterRouteService service, ModelFactory factory) {
		super(service, factory);
	}

	private void describeFlexoConceptInstance(FlexoConceptInstance instance, JsonObject result, boolean detailed) {

		FlexoConcept flexoConcept = instance.getFlexoConcept();
		if (flexoConcept instanceof ViewPoint) {
			result.put("viewPoint", toReference(flexoConcept));
		} else if (flexoConcept instanceof VirtualModel) {
			result.put("virtualModel", toReference(flexoConcept));
		} else {
			result.put("flexoConcept", toReference(flexoConcept));
		}

		result.put("container", toReference(instance.getContainerFlexoConceptInstance()));
		result.put("actors", toArray(instance.getActors(), detailed));
		result.put("embeddedFlexoConceptInstance", toReferenceArray(instance.getEmbeddedFlexoConceptInstances()));
	}

	@Override
	public void describeObject(Object object, JsonObject result, boolean detailed) {
		if (object instanceof View) {
			View view = (View) object;
			describeFlexoConceptInstance(view, result, detailed);

		} else if (object instanceof VirtualModelInstance) {
			VirtualModelInstance instance = (VirtualModelInstance) object;
			describeFlexoConceptInstance(instance, result, detailed);
			result.put("flexoConceptInstances", toArray(instance.getFlexoConceptInstances(), detailed));


		} else if (object instanceof FlexoConceptInstance) {
			describeFlexoConceptInstance((FlexoConceptInstance) object, result, detailed);

		} else if (object instanceof ActorReference) {
			result.put("value", ((ActorReference) object).getModellingElement());
		}
		super.describeObject(object, result, detailed);
	}
}
