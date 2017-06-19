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

package org.openflexo.http.connector.model;

import java.lang.reflect.Type;

/**
 * A {@link ContentSupport} instance provides value storage for an {@link org.openflexo.http.connector.model.HttpFlexoConceptInstance}.
 *
 * It must be able to update it's values using an {@link org.apache.http.client.HttpClient}.
 */
public interface ContentSupport<T extends Object> {

	/**
	 * Distant object identifier, relative the owning {@link org.openflexo.http.connector.model.HttpVirtualModelInstance}. It's used to
	 * serialize the object as a reference.
	 *
	 * The instance must be able to retrieve the object using this identifier and the owner.
	 */
	String getIdentifier();

	/**
	 * Gets the value for the property with the given name and type.
	 * 
	 * @param name
	 *            name for the value
	 * @param type
	 *            type for the value
	 * @param <T>
	 *            the returned type
	 * @return the typed value for the given name or null.
	 */
	<T> T getValue(String name, Type type);

	/**
	 * Sets the value for the property with the given name.
	 *
	 * TODO This doesn't not currently affect the distant value.
	 *
	 * @param name
	 *            name for the value
	 * @param value
	 *            new value
	 */
	void setValue(String name, Object value);

}
