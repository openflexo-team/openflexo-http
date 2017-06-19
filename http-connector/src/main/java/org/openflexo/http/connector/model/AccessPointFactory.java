/**
 * 
 * Copyright (c) 2014, Openflexo
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

package org.openflexo.http.connector.model;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.foundation.PamelaResourceModelFactory;
import org.openflexo.foundation.action.FlexoUndoManager;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext;
import org.openflexo.foundation.fml.rt.action.FlexoBehaviourAction;
import org.openflexo.foundation.resource.PamelaResourceImpl.IgnoreLoadingEdits;
import org.openflexo.http.connector.fml.CreateAccessPointParameter;
import org.openflexo.http.connector.fml.HttpVirtualModelInitializer;
import org.openflexo.http.connector.fml.HttpVirtualModelInitializerAction;
import org.openflexo.http.connector.rm.AccessPointResource;
import org.openflexo.model.converter.RelativePathResourceConverter;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.EditingContext;
import org.openflexo.model.factory.ModelFactory;

/**
 * @author charlie
 *
 */
public class AccessPointFactory extends ModelFactory implements PamelaResourceModelFactory<AccessPointResource> {

	private final AccessPointResource resource;

	private FlexoUndoManager undoManager = null;
	private IgnoreLoadingEdits ignoreHandler = null;

	public AccessPointFactory(AccessPointResource resource, EditingContext editingContext) throws ModelDefinitionException {
		super(AccessPoint.class);
		this.resource = resource;
		setEditingContext(editingContext);
		addConverter(new RelativePathResourceConverter(null));
	}

	@Override
	public AccessPointResource getResource() {
		return resource;
	}

	/**
	 * Creates empty model that needs to be initialized
	 * 
	 * @return the created model
	 */
	public AccessPoint makeEmptyModel() {
		return newInstance(AccessPoint.class);
	}

	/**
	 * This is the initialization method for an AccessPoint
	 * 
	 * @param accessPoint
	 * @param creationScheme
	 * @param evaluationContext
	 * @return
	 */
	public void initializeModel(AccessPoint accessPoint, HttpVirtualModelInitializer creationScheme,
			List<CreateAccessPointParameter> parameters, RunTimeEvaluationContext evaluationContext) {

		System.out.println("initializeModel for AccessPoint=" + accessPoint);

		HttpVirtualModelInitializerAction action;

		if (evaluationContext instanceof FlexoBehaviourAction) {
			action = HttpVirtualModelInitializerAction.actionType.makeNewEmbeddedAction(accessPoint, null,
					(FlexoBehaviourAction<?, ?, ?>) evaluationContext);
		}
		else {
			action = HttpVirtualModelInitializerAction.actionType.makeNewAction(accessPoint, null, evaluationContext.getEditor());
		}

		action.setFactory(this);
		action.setInitializer(creationScheme);

		if (creationScheme != null) {
			int i = 0;
			for (CreateAccessPointParameter parameter : parameters) {
				Object paramValue = null;
				try {
					paramValue = parameter.getValue().getBindingValue(evaluationContext);
				} catch (TypeMismatchException | NullReferenceException | InvocationTargetException e) {
					e.printStackTrace();
				}
				action.setParameterValue(creationScheme.getParameters().get(i), paramValue);
				i++;
			}

		}

		action.doAction();

		/*HttpVirtualModelInstance virtualModelInstance = newInstance(HttpVirtualModelInstance.class, accessPoint, supportFactory);
		virtualModelInstance.setVirtualModel(accessPoint.getVirtualModel());
		
		Object returned = null;
		
		if (creationScheme != null) {
			System.out.println("Tiens ce qui serait bien maintenant, c'est d'executer " + creationScheme);
			System.out.println("FML: " + creationScheme.getFMLRepresentation());
			for (Object p : parameters) {
				System.out.println("p=" + p);
			}
			try {
				returned = creationScheme.getControlGraph().execute(virtualModelInstance);
			} catch (ReturnException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (FlexoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		accessPoint.setInstance(virtualModelInstance);*/

		// return returned;
	}

	@Override
	public void startDeserializing() {
		startIgnoringEdits();
	}

	@Override
	public void stopDeserializing() {
		stopIgnoringEdits();
	}

	public void startIgnoringEdits() {
		EditingContext editingContext = getResource().getServiceManager().getEditingContext();

		if (editingContext != null && editingContext.getUndoManager() instanceof FlexoUndoManager) {
			undoManager = (FlexoUndoManager) editingContext.getUndoManager();
			ignoreHandler = new IgnoreLoadingEdits(resource);

			undoManager.addToIgnoreHandlers(ignoreHandler);
		}
	}

	public void stopIgnoringEdits() {
		if (ignoreHandler != null) {
			undoManager.removeFromIgnoreHandlers(ignoreHandler);
			ignoreHandler = null;
		}
	}

}
