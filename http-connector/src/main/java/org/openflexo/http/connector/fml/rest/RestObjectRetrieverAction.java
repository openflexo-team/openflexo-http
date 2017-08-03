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
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;
import java.util.logging.Logger;

import org.openflexo.connie.BindingVariable;
import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.foundation.FlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoObject.FlexoObjectImpl;
import org.openflexo.foundation.action.FlexoAction;
import org.openflexo.foundation.action.FlexoActionType;
import org.openflexo.foundation.action.InvalidParametersException;
import org.openflexo.foundation.action.NotImplementedException;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.rt.VirtualModelInstanceObject;
import org.openflexo.foundation.fml.rt.action.FlexoBehaviourAction;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.http.connector.model.rest.JsonSupport;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstance;
import org.openflexo.localization.LocalizedDelegate;

/**
 * Tooling for HttpVirtualModelInitializer in HTTP connector<br>
 * This feature is wrapped into a {@link FlexoAction}<br>
 * The focused object is an AccessPoint
 * 
 * @author sylvain
 * 
 */
public class RestObjectRetrieverAction
		extends FlexoBehaviourAction<RestObjectRetrieverAction, RestObjectRetriever, RestVirtualModelInstance> {

	private static final Logger logger = Logger.getLogger(RestObjectRetrieverAction.class.getPackage().getName());

	public static FlexoActionType<RestObjectRetrieverAction, RestVirtualModelInstance, VirtualModelInstanceObject> actionType = new FlexoActionType<RestObjectRetrieverAction, RestVirtualModelInstance, VirtualModelInstanceObject>(
			"rest_object_retriever", FlexoActionType.newMenu, FlexoActionType.defaultGroup, FlexoActionType.ADD_ACTION_TYPE) {

		/**
		 * Factory method
		 */
		@Override
		public RestObjectRetrieverAction makeNewAction(RestVirtualModelInstance focusedObject,
				Vector<VirtualModelInstanceObject> globalSelection, FlexoEditor editor) {
			return new RestObjectRetrieverAction(focusedObject, globalSelection, editor);
		}

		@Override
		public boolean isVisibleForSelection(RestVirtualModelInstance object, Vector<VirtualModelInstanceObject> globalSelection) {
			return false;
		}

		@Override
		public boolean isEnabledForSelection(RestVirtualModelInstance object, Vector<VirtualModelInstanceObject> globalSelection) {
			return true;
		}

	};

	static {
		FlexoObjectImpl.addActionForClass(actionType, RestVirtualModelInstance.class);
	}

	private RestObjectRetriever retrieverBehaviour;
	private Map<String, String> identifiers;
	private HttpFlexoConceptInstance<JsonSupport> newFlexoConceptInstance;

	RestObjectRetrieverAction(RestVirtualModelInstance focusedObject, Vector<VirtualModelInstanceObject> globalSelection,
			FlexoEditor editor) {
		super(actionType, focusedObject, globalSelection, editor);
		identifiers = new HashMap<>();
	}

	@Override
	public LocalizedDelegate getLocales() {
		if (getServiceManager() != null) {
			return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class).getLocales();
		}
		return super.getLocales();
	}

	@Override
	protected void doAction(Object context) throws NotImplementedException, InvalidParametersException, FlexoException {
		// logger.info("Performing REST request to reinstantiate " + getFlexoBehaviour().getFlexoConcept());

		try {
			String url = getRetrieverBehaviour().getUrl().getBindingValue(this);
			logger.info("Executing REST request " + url);

			newFlexoConceptInstance = getFocusedObject().getFlexoConceptInstance(url, getRetrieverBehaviour().getPointer(),
					getFlexoBehaviour().getFlexoConcept());
			// System.out.println("Created: " + newFlexoConceptInstance);

		} catch (TypeMismatchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NullReferenceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public RestVirtualModelInstance retrieveVirtualModelInstance() {
		return getFocusedObject();
	}

	@Override
	public Object getValue(BindingVariable variable) {
		if (identifiers.get(variable.getVariableName()) != null) {
			return identifiers.get(variable.getVariableName());
		}
		return super.getValue(variable);
	}

	public RestObjectRetriever getRetrieverBehaviour() {
		return retrieverBehaviour;
	}

	public void setRetrieverBehaviour(RestObjectRetriever retriever) {
		if ((retriever == null && this.retrieverBehaviour != null) || (retriever != null && !retriever.equals(this.retrieverBehaviour))) {
			RestObjectRetriever oldValue = this.retrieverBehaviour;
			this.retrieverBehaviour = retriever;
			getPropertyChangeSupport().firePropertyChange("retriever", oldValue, retriever);
		}
	}

	@Override
	public RestObjectRetriever getFlexoBehaviour() {
		return getRetrieverBehaviour();
	}

	@Override
	public HttpFlexoConceptInstance<JsonSupport> getFlexoConceptInstance() {
		return newFlexoConceptInstance;
	}

	public void setKey(String key) {
		if (getRetrieverBehaviour().getFlexoConcept().getKeyProperties().size() == 1) {
			// Simple key
			FlexoProperty<?> keyProperty = getRetrieverBehaviour().getFlexoConcept().getKeyProperties().get(0);
			identifiers.put(keyProperty.getName(), key);
			// System.out.println("On retient que " + keyProperty.getName() + "=" + key);
		}
		else if (getRetrieverBehaviour().getFlexoConcept().getKeyProperties().size() > 1) {
			// TODO implement composite keys
		}
	}

}
