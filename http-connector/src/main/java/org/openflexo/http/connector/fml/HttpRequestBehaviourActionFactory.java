/**
 * 
 * Copyright (c) 2014, Openflexo
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

import java.util.Vector;

import org.openflexo.foundation.FlexoEditor;
import org.openflexo.foundation.action.FlexoAction;
import org.openflexo.foundation.action.FlexoActionFactory;
import org.openflexo.foundation.fml.ActionScheme;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstanceObject;
import org.openflexo.foundation.fml.rt.action.AbstractActionSchemeActionFactory;
import org.openflexo.foundation.fml.rt.action.ActionSchemeAction;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;

/**
 * Factory for {@link ActionSchemeAction} (an execution environment of a {@link ActionScheme} on a given {@link FlexoConceptInstance} as a
 * {@link FlexoAction})
 * 
 * @author sylvain
 *
 */
public class HttpRequestBehaviourActionFactory
		extends AbstractActionSchemeActionFactory<HttpRequestBehaviourAction, HttpRequestBehaviour<?, ?>, HttpVirtualModelInstance<?>> {

	public HttpRequestBehaviourActionFactory(HttpRequestBehaviour<?, ?> behaviour, HttpVirtualModelInstance<?> vmi) {
		super(behaviour, vmi, FlexoActionFactory.defaultGroup, FlexoActionFactory.NORMAL_ACTION_TYPE);
	}

	@Override
	public HttpRequestBehaviourAction makeNewAction(HttpVirtualModelInstance<?> focusedObject,
			Vector<VirtualModelInstanceObject> globalSelection, FlexoEditor editor) {
		return new HttpRequestBehaviourAction(this, focusedObject, globalSelection, editor);
	}

}