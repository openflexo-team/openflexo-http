/*
 * (c) Copyright 2013- Openflexo
 *
 * This file is part of OpenFlexo.
 *
 * OpenFlexo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OpenFlexo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenFlexo. If not, see <http://www.gnu.org/licenses/>.
 *
 */

package org.openflexo.http.connector;

import org.openflexo.foundation.fml.annotations.DeclareEditionActions;
import org.openflexo.foundation.fml.annotations.DeclareFlexoBehaviours;
import org.openflexo.http.connector.RestModelSlot.RestModelSlotImpl;
import org.openflexo.http.connector.fml.HttpVirtualModelInitializer;
import org.openflexo.http.connector.fml.editionaction.CreateAccessPointResource;
import org.openflexo.http.connector.fml.editionaction.JsonRequestBehaviour;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.XMLElement;

/**
 * REST model slot for Http technology adapter
 *
 */
@ModelEntity
@XMLElement
@ImplementationClass(RestModelSlotImpl.class)
@DeclareEditionActions({ CreateAccessPointResource.class })
@DeclareFlexoBehaviours({ HttpVirtualModelInitializer.class, JsonRequestBehaviour.class })
public interface RestModelSlot extends HttpModelSlot {

	abstract class RestModelSlotImpl extends HttpModelSlotImpl implements RestModelSlot {

	}
}
