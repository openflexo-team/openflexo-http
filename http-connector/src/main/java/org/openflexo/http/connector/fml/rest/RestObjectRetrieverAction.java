/**
 * 
 * Copyright (c) 2014-2015, Openflexo
 * 
 * This file is part of Flexodiagram, a component of the software infrastructure 
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

import java.lang.reflect.InvocationTargetException;
import java.util.Vector;
import java.util.logging.Logger;

import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.foundation.FlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.action.FlexoAction;
import org.openflexo.foundation.action.InvalidParametersException;
import org.openflexo.foundation.action.NotImplementedException;
import org.openflexo.foundation.fml.rt.VirtualModelInstanceObject;
import org.openflexo.foundation.fml.rt.action.AbstractActionSchemeAction;
import org.openflexo.http.connector.model.rest.JsonSupport;
import org.openflexo.http.connector.model.rest.RestFlexoConceptInstance;

/**
 * Provides execution environment of a {@link RestObjectRetriever} on a given {@link RestFlexoConceptInstance} as a {@link FlexoAction}
 *
 * An {@link RestObjectRetrieverAction} represents the execution (in the "instances" world) of an {@link RestObjectRetriever}.<br>
 * To be used and executed on Openflexo platform, it is wrapped in a {@link FlexoAction}.<br>
 * 
 * @author sylvain
 */
public class RestObjectRetrieverAction
		extends AbstractActionSchemeAction<RestObjectRetrieverAction, RestObjectRetriever, RestFlexoConceptInstance> {

	private static final Logger logger = Logger.getLogger(RestObjectRetrieverAction.class.getPackage().getName());

	/**
	 * Constructor to be used for creating a new action without factory
	 * 
	 * @param flexoBehaviour
	 * @param focusedObject
	 * @param globalSelection
	 * @param editor
	 */
	public RestObjectRetrieverAction(RestObjectRetriever behaviour, RestFlexoConceptInstance focusedObject,
			Vector<VirtualModelInstanceObject> globalSelection, FlexoEditor editor) {
		super(behaviour, focusedObject, globalSelection, editor);
	}

	/**
	 * Constructor to be used for creating a new action as an action embedded in another one
	 * 
	 * @param flexoBehaviour
	 * @param focusedObject
	 * @param globalSelection
	 * @param ownerAction
	 *            Action in which action to be created will be embedded
	 */
	public RestObjectRetrieverAction(RestObjectRetriever behaviour, RestFlexoConceptInstance focusedObject,
			Vector<VirtualModelInstanceObject> globalSelection, FlexoAction<?, ?, ?> ownerAction) {
		super(behaviour, focusedObject, globalSelection, ownerAction);
	}

	/*@Override
	public LocalizedDelegate getLocales() {
		if (getServiceManager() != null) {
			return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class).getLocales();
		}
		return super.getLocales();
	}*/

	@Override
	protected void doAction(Object context) throws NotImplementedException, InvalidParametersException, FlexoException {
		// logger.info("Performing REST request to reinstantiate " + getFlexoBehaviour().getFlexoConcept());

		try {
			String url = getFlexoBehaviour().getUrl().getBindingValue(getFocusedObject());
			logger.info("Executing REST request " + url);

			JsonSupport retrievedSupport = getFocusedObject().getVirtualModelInstance().retrieveSupport(url,
					getFlexoBehaviour().getPointer());

			getFocusedObject().setSupport(retrievedSupport);

		} catch (TypeMismatchException e) {
			e.printStackTrace();
		} catch (NullReferenceException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}

	}

	/*@Override
	public RestVirtualModelInstance retrieveVirtualModelInstance() {
		return getFocusedObject().getVirtualModelInstance();
	}*/

}
