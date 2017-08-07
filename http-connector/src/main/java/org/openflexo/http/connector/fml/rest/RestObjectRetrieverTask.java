/**
 * 
 * Copyright (c) 2014, Openflexo
 * 
 * This file is part of Flexo-ui, a component of the software infrastructure 
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

package org.openflexo.http.connector.fml.rest;

import java.util.List;
import java.util.logging.Logger;

import org.openflexo.foundation.FlexoEditor;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.task.CoreFlexoTask;
import org.openflexo.foundation.task.Progress;
import org.openflexo.http.connector.model.rest.RestFlexoConceptInstance;

/**
 * An abstract task used in the context of application.<br>
 * Thrown exceptions are managed here
 * 
 * @author sylvain
 *
 */
public class RestObjectRetrieverTask extends CoreFlexoTask {

	private static final Logger logger = Logger.getLogger(RestObjectRetrieverTask.class.getPackage().getName());

	private RestFlexoConceptInstance restFlexoConceptInstance;

	public RestObjectRetrieverTask(RestFlexoConceptInstance restFlexoConceptInstance, FlexoEditor editor) {
		super("Retrieve REST object " + restFlexoConceptInstance.toString(), editor);
		this.restFlexoConceptInstance = restFlexoConceptInstance;
	}

	@Override
	public void performTask() throws InterruptedException {
		Progress.progress("Retrieve REST object");
		FlexoConcept concept = restFlexoConceptInstance.getFlexoConcept();
		List<RestObjectRetriever> retrievers = concept.getFlexoBehaviours(RestObjectRetriever.class);
		if (retrievers.size() > 1) {
			logger.warning("More than one RestObjectRetriever for " + concept + " Using first one.");
		}
		if (retrievers.size() > 0) {
			RestObjectRetrieverAction action = RestObjectRetrieverAction.actionType.makeNewAction(restFlexoConceptInstance, null,
					getEditor());
			action.setRetrieverBehaviour(retrievers.get(0));
			action.doAction();
		}

	}
}
