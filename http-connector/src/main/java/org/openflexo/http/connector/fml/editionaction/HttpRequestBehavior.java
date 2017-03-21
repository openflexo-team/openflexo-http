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

import java.util.Vector;
import org.openflexo.connie.BindingEvaluationContext;
import org.openflexo.foundation.FlexoEditor;
import org.openflexo.foundation.fml.AbstractActionScheme;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstanceObject;
import org.openflexo.foundation.fml.rt.action.ActionSchemeAction;
import org.openflexo.foundation.fml.rt.action.ActionSchemeActionType;
import org.openflexo.http.connector.fml.editionaction.HttpRequestBehavior.HttpRequestBehaviorImpl;
import org.openflexo.http.connector.model.UrlBuilder;
import org.openflexo.model.annotations.Embedded;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLElement;

/**
 * Action that requests concepts using a HTTP request
 */
@ModelEntity @XMLElement
@ImplementationClass(HttpRequestBehaviorImpl.class)
public interface HttpRequestBehavior extends AbstractActionScheme {

	String URLBUILDER_KEY = "urlbuilder";

	@Getter(URLBUILDER_KEY)
	@XMLElement @Embedded
	UrlBuilder getBuilder();

	@Setter(URLBUILDER_KEY)
	void setBuilder(UrlBuilder builder);

	Object execute(BindingEvaluationContext context) throws Exception;

	abstract class HttpRequestBehaviorImpl extends AbstractActionSchemeImpl implements HttpRequestBehavior {

		// TODO find a better method !!!!!!!!!!!!!!!!!!!!!!!!!
		private boolean builderBuilt = false;

		@Override
		public UrlBuilder getBuilder() {
			UrlBuilder builder = (UrlBuilder) performSuperGetter(URLBUILDER_KEY);
			if (builder == null && !builderBuilt) {
				builderBuilt = true;
				builder = getFMLModelFactory().newInstance(UrlBuilder.class);
				performSuperSetter(URLBUILDER_KEY, builder);
			}
			return builder;
		}

		@Override
		public ActionSchemeActionType getActionType(FlexoConceptInstance fci) {
			return new ActionSchemeActionType(this, fci) {
				@Override
				public ActionSchemeAction makeNewAction(
						FlexoConceptInstance focusedObject, Vector<VirtualModelInstanceObject> globalSelection, FlexoEditor editor
				) {
					return new HttpBehaviorAction(this, focusedObject, globalSelection, editor);
				}
			};
		}

		public Object execute(BindingEvaluationContext context) throws Exception {
			UrlBuilder builder = getBuilder();
			String url = builder.evaluateUrl(context);
			System.out.println("URL is '" + url + "'");
			return url;
		}

	}
}
