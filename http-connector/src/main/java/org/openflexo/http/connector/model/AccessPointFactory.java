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

import org.openflexo.fge.FGEModelFactoryImpl;
import org.openflexo.foundation.PamelaResourceModelFactory;
import org.openflexo.foundation.action.FlexoUndoManager;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.resource.PamelaResourceImpl.IgnoreLoadingEdits;
import org.openflexo.http.connector.rm.AccessPointResource;
import org.openflexo.model.converter.RelativePathResourceConverter;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.EditingContext;

/**
 * @author charlie
 *
 */
public class AccessPointFactory extends FGEModelFactoryImpl implements PamelaResourceModelFactory<AccessPointResource> {

	private final AccessPointResource resource;

	private FlexoUndoManager undoManager = null;
	private IgnoreLoadingEdits ignoreHandler = null;

	public AccessPointFactory() throws ModelDefinitionException {
		this(null, null);
	}

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
	 * @return the created model
	 */
	public AccessPoint makeEmptyModel() {
		return newInstance(AccessPoint.class);
	}

	public void initializeModel(AccessPoint accessPoint) {
		HttpVirtualModelInstance virtualModelInstance = newInstance(HttpVirtualModelInstance.class, accessPoint);
		virtualModelInstance.setVirtualModel(accessPoint.getVirtualModel());
		accessPoint.setInstance(virtualModelInstance);
	}

	public HttpFlexoConceptInstance newFlexoConceptInstance(HttpVirtualModelInstance owner, String url, String pointer, FlexoConcept concept) {
		if (owner != null && url != null) {
			String baseUrl = owner.getAccessPoint().getUrl();
			if (url.startsWith(baseUrl)) {
				url = url.substring(baseUrl.length());
			}
			return newInstance(HttpFlexoConceptInstance.class, owner, url, pointer, concept);
		}
		return null;
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
