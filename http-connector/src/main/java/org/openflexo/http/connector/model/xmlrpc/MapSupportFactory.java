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

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.logging.FlexoLogger;

public class MapSupportFactory implements ContentSupportFactory<MapSupport, Map<?, ?>> {

	private static final Logger logger = FlexoLogger.getLogger(HttpFlexoConceptInstance.class.getPackage().toString());

	public MapSupportFactory() {
	}

	@Override
	public List<MapSupport> newSupports(HttpVirtualModelInstance<MapSupport> owner, Map<?, ?> supportObject) {
		System.out.println("On retourne une liste de MapSupport avec " + supportObject);
		System.out.println("Not implemented yet !!!!");
		return null;
	}

	@Override
	public MapSupport newSupport(HttpVirtualModelInstance<MapSupport> owner, Map<?, ?> supportObject) {
		System.out.println("On retourne un MapSupport avec " + supportObject);
		return new MapSupport(owner, supportObject);
	}

}
