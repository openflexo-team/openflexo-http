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

package org.openflexo.http.connector.fml.editionaction;

import java.io.FileNotFoundException;
import java.lang.reflect.Type;
import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.InvalidArgumentException;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.annotations.FML;
import org.openflexo.foundation.fml.editionaction.AbstractCreateResource;
import org.openflexo.foundation.fml.editionaction.EditionAction;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.RestModelSlot;
import org.openflexo.http.connector.fml.editionaction.CreateAccessPointResource.CreateAccessPointResourceImpl;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.rm.AccessPointResource;
import org.openflexo.http.connector.rm.AccessPointResourceFactory;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.exceptions.ModelDefinitionException;

/**
 * {@link EditionAction} used to create an empty AccessPoint resource
 * 
 * @author charlie
 *
 */
@ModelEntity
@ImplementationClass(CreateAccessPointResourceImpl.class)
@XMLElement
@FML("CreateHTTPResource")
public interface CreateAccessPointResource extends AbstractCreateResource<RestModelSlot, AccessPoint, HttpTechnologyAdapter> {

	String URL = "url";
	String VIRTUAL_MODEL = "virtualModel";

	@Getter(URL)
	DataBinding<String> getURL();

	@Setter(URL)
	void setURL(DataBinding<String> url);

	abstract class CreateAccessPointResourceImpl
			extends AbstractCreateResourceImpl<RestModelSlot, AccessPoint, HttpTechnologyAdapter>
			implements CreateAccessPointResource
	{
		private DataBinding<String> address;

		@Override
		public Type getAssignableType() {
			return AccessPoint.class;
		}

		@Override
		public DataBinding<String> getURL() {
			if (address == null) {
				address = new DataBinding<>(this, String.class, DataBinding.BindingDefinitionType.GET);
				address.setBindingName(URL);
			}
			return address;
		}

		@Override
		public void setURL(DataBinding<String> address) {
			if (address != null) {
				address.setOwner(this);
				address.setDeclaredType(String.class);
				address.setBindingDefinitionType(DataBinding.BindingDefinitionType.GET);
				address.setBindingName(URL);
			}
			this.address = address;
		}


		@Override
		public AccessPoint execute(RunTimeEvaluationContext evaluationContext) throws FlexoException {
			try {
				String resourceName = getResourceName(evaluationContext);
				String resourceURI = getResourceURI(evaluationContext);
				FlexoResourceCenter<?> rc = getResourceCenter(evaluationContext);

				AccessPointResource newResource = createResource(
						getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class),
						AccessPointResourceFactory.class, rc,
						resourceName, resourceURI, getRelativePath(), ".url", true
					);
				AccessPoint data = newResource.getResourceData(null);

				FlexoProperty<AccessPoint> flexoProperty = getAssignedFlexoProperty();
				if (flexoProperty instanceof RestModelSlot) {
					RestModelSlot restModelSlot = (RestModelSlot) flexoProperty;
					data.setUrl(restModelSlot.getUrl());
					data.setVirtualModel(restModelSlot.getAccessedVirtualModel());
					newResource.getFactory().initializeModel(data);
				} else {
					throw new InvalidArgumentException("AccessPoint creation must be affected to a RestModelSlot");
				}

				return data;
			} catch (ModelDefinitionException |FileNotFoundException | ResourceLoadingCancelledException e) {
				throw new FlexoException(e);
			}


		}
	}
}
