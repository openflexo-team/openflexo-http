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

package org.openflexo.http.connector.model.xmlrpc;

import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.FlexoConceptInstanceRole;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstanceModelFactory;
import org.openflexo.foundation.fml.rt.ActorReference;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.Initializer;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.Parameter;
import org.openflexo.pamela.annotations.XMLElement;

/**
 * XML/RPC implementation for {@link HttpFlexoConceptInstance}<br>
 * 
 * Such {@link XmlRpcFlexoConceptInstance} retrieve its informations through a {@link MapSupport} object.<br>
 * 
 */
@ModelEntity
@ImplementationClass(XmlRpcFlexoConceptInstance.XmlRpcFlexoConceptInstanceImpl.class)
@XMLElement
public interface XmlRpcFlexoConceptInstance extends HttpFlexoConceptInstance<MapSupport> {

	@Initializer
	void initialize(@Parameter(OWNING_VIRTUAL_MODEL_INSTANCE_KEY) XmlRpcVirtualModelInstance owner, MapSupport support,
			@Parameter(FLEXO_CONCEPT_URI_KEY) FlexoConcept concept);

	@Override
	public XmlRpcVirtualModelInstance getVirtualModelInstance();

	abstract class XmlRpcFlexoConceptInstanceImpl extends HttpFlexoConceptInstanceImpl<MapSupport> implements XmlRpcFlexoConceptInstance {

		@Override
		public void initialize(XmlRpcVirtualModelInstance owner, MapSupport support, FlexoConcept concept) {
			setOwningVirtualModelInstance(owner);
			setFlexoConcept(concept);
			setSupport(support);
		}

		@Override
		public XmlRpcVirtualModelInstance getVirtualModelInstance() {
			return (XmlRpcVirtualModelInstance) super.getVirtualModelInstance();
		}

		@Override
		public ActorReference<? extends FlexoConceptInstance> makeActorReference(FlexoConceptInstanceRole role, FlexoConceptInstance fci) {
			AbstractVirtualModelInstanceModelFactory<?> factory = getFactory();
			XmlRpcObjectActorReference returned = factory.newInstance(XmlRpcObjectActorReference.class);
			returned.setFlexoRole((FlexoRole) role);
			returned.setFlexoConceptInstance(fci);
			returned.setModellingElement(this);
			return returned;
		}

	}
}
