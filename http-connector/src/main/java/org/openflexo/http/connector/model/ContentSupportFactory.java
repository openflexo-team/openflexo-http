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

import java.io.InputStream;
import java.util.List;

/**
 * A {@link ContentSupportFactory} instance is able to create {@link ContentSupport} for a given technology (JSON, XMLRPC, ...). A owning
 * {@link HttpVirtualModelInstance} uses the factory to create {@link ContentSupport} for it's
 * {@link org.openflexo.http.connector.model.HttpFlexoConceptInstance}.
 */
public interface ContentSupportFactory<S extends ContentSupport<T>, T extends Object> {

	/**
	 * Creates a list of supports using the given stream.
	 *
	 * @param owner
	 *            the {@link HttpVirtualModelInstance} owner (never null).
	 * @param path
	 *            the request path (never null).
	 * @param stream
	 *            the {@link InputStream} to read (never null).
	 * @param pointer
	 *            when the result is read as a tree (like JSON or XML) the pointer allows to get a specific node in the tree for the result
	 *            (may be null).
	 * @return a list of {@link ContentSupport}, never null, may be empty.
	 */
	List<S> newSupports(HttpVirtualModelInstance<S> owner, T supportObject);

	/**
	 * Creates a support for the given support object. The support may be empty if the stream is null.
	 *
	 * @param owner
	 *            the {@link HttpVirtualModelInstance} owner (never null).
	 * @param identifier
	 *            the identifier for the object.
	 * @param stream
	 *            {@link InputStream} to read (<b>may be null</b>).
	 * @param pointer
	 *            when the result is read as a tree (like JSON or XML) the pointer allows to get a specific node in the tree for the result
	 *            (may be null).
	 * @return a support for the given object, never null.
	 */
	S newSupport(HttpVirtualModelInstance<S> owner, T supportObject);

}
