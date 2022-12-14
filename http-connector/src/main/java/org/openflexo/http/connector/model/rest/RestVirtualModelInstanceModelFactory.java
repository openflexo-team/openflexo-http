/**
 * 
 * Copyright (c) 2014-2015, Openflexo
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

package org.openflexo.http.connector.model.rest;

import java.util.logging.Logger;

import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.connector.model.ContentSupport;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.http.connector.model.HttpVirtualModelInstanceModelFactory;
import org.openflexo.http.connector.rm.rest.RestVirtualModelInstanceResource;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.pamela.exceptions.ModelDefinitionException;
import org.openflexo.pamela.factory.EditingContext;
import org.openflexo.pamela.factory.PamelaModelFactory;

/**
 * {@link PamelaModelFactory} used to handle RestVirtualModelInstance models<br>
 * 
 * @author sylvain
 * 
 */
public class RestVirtualModelInstanceModelFactory extends HttpVirtualModelInstanceModelFactory<RestVirtualModelInstance> {

	private static final Logger logger = FlexoLogger.getLogger(RestVirtualModelInstanceModelFactory.class.getPackage().toString());

	public RestVirtualModelInstanceModelFactory(RestVirtualModelInstanceResource virtualModelInstanceResource,
			EditingContext editingContext, TechnologyAdapterService taService) throws ModelDefinitionException {
		super(virtualModelInstanceResource, RestVirtualModelInstance.class, editingContext, taService);
	}

	@Override
	public <S extends ContentSupport<?>> HttpFlexoConceptInstance<S> newFlexoConceptInstance(RestVirtualModelInstance owner,
			FlexoConceptInstance container, S support, FlexoConcept concept) {
		if (support == null || support instanceof JsonSupport) {
			RestFlexoConceptInstance returned = newInstance(RestFlexoConceptInstance.class, owner, support, concept);
			// logger.info("Instantiate new RestFlexoConceptInstance with " + support);
			if (container == null || container == owner) {
				owner.addToFlexoConceptInstances(returned);
			}
			else {
				container.addToEmbeddedFlexoConceptInstances(returned);
			}
			return (HttpFlexoConceptInstance<S>) returned;
		}
		logger.warning("Unexpected support for RestVirtualModelInstanceModelFactory: " + support);
		return null;
	}

}
