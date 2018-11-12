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

package org.openflexo.http.connector.fml.xmlrpc;

import org.openflexo.connie.BindingEvaluationContext;
import org.openflexo.http.connector.fml.HttpRequestBehaviour;
import org.openflexo.http.connector.model.xmlrpc.MapSupport;
import org.openflexo.http.connector.model.xmlrpc.XmlRpcVirtualModelInstance;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.XMLElement;

/**
 * A behaviour that natively execute an XML/RPC request using FML parameters of that behaviour.<br>
 * Then the underlying control graph is executed
 * 
 */
@ModelEntity
@XMLElement
@ImplementationClass(XmlRpcRequestBehaviour.XmlRpcRequestBehaviourImpl.class)
public interface XmlRpcRequestBehaviour extends HttpRequestBehaviour<XmlRpcVirtualModelInstance, MapSupport> {

	abstract class XmlRpcRequestBehaviourImpl extends HttpRequestBehaviourImpl<XmlRpcVirtualModelInstance, MapSupport>
			implements XmlRpcRequestBehaviour {
		@Override
		public Object execute(XmlRpcVirtualModelInstance modelInstance, BindingEvaluationContext context) throws Exception {
			return null;
		}

	}
}
