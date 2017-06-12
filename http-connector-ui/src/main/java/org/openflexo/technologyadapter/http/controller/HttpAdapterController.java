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

/*
 * (c) Copyright 2013- Openflexo
 *
 * This file is part of OpenFlexo.
 *
 * OpenFlexo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OpenFlexo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenFlexo. If not, see <http://www.gnu.org/licenses/>.
 *
 */

package org.openflexo.technologyadapter.http.controller;

import javax.swing.ImageIcon;

import org.openflexo.foundation.fml.FlexoBehaviour;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.technologyadapter.TechnologyObject;
import org.openflexo.gina.utils.InspectorGroup;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.fml.editionaction.JsonRequestBehaviour;
import org.openflexo.http.connector.fml.editionaction.XmlRpcRequestBehaviour;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.technologyadapter.http.library.HttpIconLibrary;
import org.openflexo.technologyadapter.http.view.AccessPointModuleView;
import org.openflexo.view.EmptyPanel;
import org.openflexo.view.ModuleView;
import org.openflexo.view.controller.ControllerActionInitializer;
import org.openflexo.view.controller.FlexoController;
import org.openflexo.view.controller.TechnologyAdapterController;
import org.openflexo.view.controller.model.FlexoPerspective;

public class HttpAdapterController extends TechnologyAdapterController<HttpTechnologyAdapter> {

	private InspectorGroup httpInspectorGroup;

	@Override
	public Class<HttpTechnologyAdapter> getTechnologyAdapterClass() {
		return HttpTechnologyAdapter.class;
	}

	@Override
	public void initializeActions(ControllerActionInitializer actionInitializer) {
	}

	@Override
	protected void initializeInspectors(FlexoController controller) {
		httpInspectorGroup = controller.loadInspectorGroup("HTTP", getTechnologyAdapter().getLocales(),
				getFMLTechnologyAdapterInspectorGroup());

	}

	@Override
	public InspectorGroup getTechnologyAdapterInspectorGroup() {
		return httpInspectorGroup;
	}

	@Override
	public ImageIcon getTechnologyBigIcon() {
		return HttpIconLibrary.ACCESSPOINT_TECHNOLOGY_BIG_ICON;
	}

	@Override
	public ImageIcon getTechnologyIcon() {
		return HttpIconLibrary.ACCESSPOINT_TECHNOLOGY_ICON;
	}

	@Override
	public ImageIcon getModelIcon() {
		return HttpIconLibrary.ACCESSPOINT_TECHNOLOGY_ICON;
	}

	@Override
	public ImageIcon getMetaModelIcon() {
		return HttpIconLibrary.ACCESSPOINT_TECHNOLOGY_ICON;
	}

	@Override
	public ImageIcon getIconForTechnologyObject(final Class<? extends TechnologyObject<?>> objectClass) {
		return HttpIconLibrary.ACCESSPOINT_TECHNOLOGY_ICON;
	}

	@Override
	public ModuleView<?> createModuleViewForObject(final TechnologyObject<HttpTechnologyAdapter> object, final FlexoController controller,
			final FlexoPerspective perspective) {
		// TODO Auto-generated method stub : update your moduleView code to have something represented
		if (object instanceof AccessPoint) {
			return new AccessPointModuleView((AccessPoint) object, controller, perspective);
		}
		return new EmptyPanel<>(controller, perspective, object);
	}

	@Override
	public ImageIcon getIconForFlexoRole(Class<? extends FlexoRole<?>> flexoRoleClass) {
		return HttpIconLibrary.ACCESSPOINT_TECHNOLOGY_ICON;
	}

	@Override
	public String getWindowTitleforObject(TechnologyObject<HttpTechnologyAdapter> obj, FlexoController controller) {
		// TODO Auto-generated method stub
		return "AccessPoint";
	}

	@Override
	public boolean hasModuleViewForObject(TechnologyObject<HttpTechnologyAdapter> obj, FlexoController controller) {
		return obj instanceof AccessPoint;
	}

	@Override
	public ImageIcon getIconForFlexoBehaviour(Class<? extends FlexoBehaviour> flexoBehaviourClass) {
		if (XmlRpcRequestBehaviour.class.isAssignableFrom(flexoBehaviourClass)) {
			return HttpIconLibrary.REQUEST_BEHAVIOUR_ICON;
		}
		if (JsonRequestBehaviour.class.isAssignableFrom(flexoBehaviourClass)) {
			return HttpIconLibrary.REQUEST_BEHAVIOUR_ICON;
		}
		return super.getIconForFlexoBehaviour(flexoBehaviourClass);
	}

}
