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

package org.openflexo.http.server.util;

import java.util.Collection;
import java.util.function.Function;
import java.util.function.Supplier;
import org.openflexo.foundation.resource.PamelaResource;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.EmbeddingType;

/**
 * Creates REST entry point to serveRoot Pamela models of a given root type.
 */
public class PamelaResourceRestService<D extends ResourceData<D>, R extends PamelaResource<D, ?>> extends ResourceRestService<D,R> {

	public PamelaResourceRestService(
		String prefix,
		Supplier<Collection<R>> supplier,
		Function<String, R> finder,
		Class<R> resourceClass,
		TechnologyAdapterRouteService service
	) throws ModelDefinitionException {
		super(prefix, supplier, finder, resourceClass, service);
	}

	@Override
	protected boolean isLoaded(R resource) {
		return resource.isLoaded();
	}

	@Override
	protected D loadResource(R resource) throws Exception {
		resource.loadResourceData(null);
		return resource.getLoadedResourceData();
	}

	@Override
	protected Collection<Object> allObjects(R resource) {
		return resource.getFactory().getEmbeddedObjects(resource.getLoadedResourceData(), EmbeddingType.CLOSURE);
	}

	@Override
	protected Object findObject(R resource, String id) {
		long entityId = Long.parseLong(id);
		return resource.getFlexoObject(entityId, "FLX");
	}
}
