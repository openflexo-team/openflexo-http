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

package org.openflexo.http.connector.fml;

import java.util.Vector;
import java.util.logging.Logger;

import org.openflexo.connie.BindingVariable;
import org.openflexo.foundation.FlexoEditor;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.FlexoObject.FlexoObjectImpl;
import org.openflexo.foundation.action.FlexoAction;
import org.openflexo.foundation.action.FlexoActionType;
import org.openflexo.foundation.action.InvalidParametersException;
import org.openflexo.foundation.action.NotImplementedException;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstanceObject;
import org.openflexo.foundation.fml.rt.action.FlexoBehaviourAction;
import org.openflexo.http.connector.HttpModelSlot.Format;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.AccessPointFactory;
import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.model.rest.JsonSupportFactory;
import org.openflexo.http.connector.model.xmlrpc.MapSupportFactory;
import org.openflexo.localization.LocalizedDelegate;

/**
 * Tooling for HttpVirtualModelInitializer in HTTP connector<br>
 * This feature is wrapped into a {@link FlexoAction}<br>
 * The focused object is an AccessPoint
 * 
 * @author sylvain
 * 
 */
public class HttpVirtualModelInitializerAction
		extends FlexoBehaviourAction<HttpVirtualModelInitializerAction, HttpVirtualModelInitializer, AccessPoint> {

	private static final Logger logger = Logger.getLogger(HttpVirtualModelInitializerAction.class.getPackage().getName());

	public static FlexoActionType<HttpVirtualModelInitializerAction, AccessPoint, VirtualModelInstanceObject> actionType = new FlexoActionType<HttpVirtualModelInitializerAction, AccessPoint, VirtualModelInstanceObject>(
			"initialize_http_access_point", FlexoActionType.newMenu, FlexoActionType.defaultGroup, FlexoActionType.ADD_ACTION_TYPE) {

		/**
		 * Factory method
		 */
		@Override
		public HttpVirtualModelInitializerAction makeNewAction(AccessPoint focusedObject,
				Vector<VirtualModelInstanceObject> globalSelection, FlexoEditor editor) {
			return new HttpVirtualModelInitializerAction(focusedObject, globalSelection, editor);
		}

		@Override
		public boolean isVisibleForSelection(AccessPoint object, Vector<VirtualModelInstanceObject> globalSelection) {
			return false;
		}

		@Override
		public boolean isEnabledForSelection(AccessPoint object, Vector<VirtualModelInstanceObject> globalSelection) {
			return true;
		}

	};

	static {
		FlexoObjectImpl.addActionForClass(actionType, AccessPoint.class);
	}

	HttpVirtualModelInitializerAction(AccessPoint focusedObject, Vector<VirtualModelInstanceObject> globalSelection, FlexoEditor editor) {
		super(actionType, focusedObject, globalSelection, editor);
	}

	@Override
	public LocalizedDelegate getLocales() {
		if (getServiceManager() != null) {
			return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class).getLocales();
		}
		return super.getLocales();
	}

	private HttpVirtualModelInstance<?> httpVirtualModelInstance;
	private HttpVirtualModelInitializer initializer;
	private AccessPointFactory factory;

	@Override
	protected void doAction(Object context) throws NotImplementedException, InvalidParametersException, FlexoException {
		logger.info("On initialise un HTTPVirtualModelInstance avec " + getFlexoBehaviour());

		ContentSupportFactory<?, ?> supportFactory = null;
		Format format = getFocusedObject().getFormat();
		if (format == null || format == Format.json) {
			supportFactory = new JsonSupportFactory("url");
		}
		else if (format == Format.map) {
			supportFactory = new MapSupportFactory();
		}
		else {
			throw new RuntimeException("AccessPoint ModelSlot format " + format + " isn't supported");
		}

		if (getFocusedObject().getModelSlot() != null) {
			httpVirtualModelInstance = getFocusedObject().getModelSlot().makeHttpVirtualModelInstance(getFocusedObject(), supportFactory,
					getServiceManager());
			getFocusedObject().setInstance(httpVirtualModelInstance);
			executeControlGraph();
		}

		else {
			logger.warning("No model slot defined for access point");
		}

		// httpVirtualModelInstance = factory.newInstance(HttpVirtualModelInstance.class, getFocusedObject(), getServiceManager(),
		// supportFactory);
		// httpVirtualModelInstance.setVirtualModel(getFocusedObject().getModelSlot().getAccessedVirtualModel());

	}

	@Override
	public VirtualModelInstance retrieveVirtualModelInstance() {
		return httpVirtualModelInstance;
	}

	@Override
	public Object getValue(BindingVariable variable) {
		if (variable.getVariableName().equals(HttpVirtualModelInitializerBindingModel.ACCESS_POINT)) {
			System.out.println("Tiens faudrait retourner le AccessPoint");
			return getFocusedObject();
		}
		return super.getValue(variable);
	}

	public AccessPointFactory getFactory() {
		return factory;
	}

	public void setFactory(AccessPointFactory factory) {
		if ((factory == null && this.factory != null) || (factory != null && !factory.equals(this.factory))) {
			AccessPointFactory oldValue = this.factory;
			this.factory = factory;
			getPropertyChangeSupport().firePropertyChange("factory", oldValue, factory);
		}
	}

	public HttpVirtualModelInitializer getInitializer() {
		return initializer;
	}

	public void setInitializer(HttpVirtualModelInitializer initializer) {
		if ((initializer == null && this.initializer != null) || (initializer != null && !initializer.equals(this.initializer))) {
			HttpVirtualModelInitializer oldValue = this.initializer;
			this.initializer = initializer;
			getPropertyChangeSupport().firePropertyChange("initializer", oldValue, initializer);
		}
	}

	@Override
	public HttpVirtualModelInitializer getFlexoBehaviour() {
		return getInitializer();
	}

	@Override
	public FlexoConceptInstance getFlexoConceptInstance() {
		// TODO Auto-generated method stub
		return null;
	}

}
