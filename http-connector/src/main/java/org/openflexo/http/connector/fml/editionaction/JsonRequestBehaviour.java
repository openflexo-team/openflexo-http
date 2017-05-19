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

package org.openflexo.http.connector.fml.editionaction;

import org.openflexo.connie.BindingEvaluationContext;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.model.annotations.Embedded;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.Initialize;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * Action that requests concepts using a HTTP request
 */
@ModelEntity @XMLElement
@ImplementationClass(JsonRequestBehaviour.JsonRequestBehaviourImpl.class)
public interface JsonRequestBehaviour extends HttpRequestBehaviour {

	String PATH_BUILDER_KEY = "pathBuilder";
	String POINTER_KEY = "pointer";

	@Getter(PATH_BUILDER_KEY)
	@XMLElement @Embedded @Initialize
	PathBuilder getBuilder();

	@Setter(PATH_BUILDER_KEY)
	void setBuilder(PathBuilder builder);

	@Getter(POINTER_KEY) @XMLAttribute
	String getPointer();

	@Setter(POINTER_KEY)
	void setPointer(String pointer);

	abstract class JsonRequestBehaviourImpl extends HttpRequestBehaviourImpl implements JsonRequestBehaviour {

		@Override
		public PathBuilder getBuilder() {
			PathBuilder builder = (PathBuilder) performSuperGetter(PATH_BUILDER_KEY);
			if (builder != null) {
				builder.setOwner(this);
			}
			return builder;
		}

		public Object execute(HttpVirtualModelInstance modelInstance, BindingEvaluationContext context) throws Exception {
			PathBuilder builder = getBuilder();
			if (builder != null) {
				String url = builder.evaluateUrl(this, context);
				if (isMultiple()) {
					return modelInstance.getFlexoConceptInstances(url, getPointer(), getReturnedFlexoConcept());
				} else {
					return modelInstance.getFlexoConceptInstance(url, getPointer(), getReturnedFlexoConcept());
				}

			}
			return null;
		}
	}
}
