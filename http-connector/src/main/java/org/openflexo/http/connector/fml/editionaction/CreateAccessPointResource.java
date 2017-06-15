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

import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.InvalidArgumentException;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.VirtualModelInstanceType;
import org.openflexo.foundation.fml.annotations.FML;
import org.openflexo.foundation.fml.editionaction.AbstractCreateResource;
import org.openflexo.foundation.fml.editionaction.EditionAction;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.fml.AccessPointType;
import org.openflexo.http.connector.fml.editionaction.CreateAccessPointResource.CreateAccessPointResourceImpl;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.rm.AccessPointResource;
import org.openflexo.http.connector.rm.AccessPointResourceFactory;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
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
public interface CreateAccessPointResource extends AbstractCreateResource<HttpModelSlot, AccessPoint, HttpTechnologyAdapter> {

	@PropertyIdentifier(type = String.class)
	String URL_KEY = "url";
	@PropertyIdentifier(type = String.class)
	String USER_KEY = "user";
	@PropertyIdentifier(type = String.class)
	String PASSWORD_KEY = "password";

	@Getter(URL_KEY)
	@XMLAttribute
	String getUrl();

	@Setter(URL_KEY)
	void setUrl(String url);

	@Getter(USER_KEY)
	@XMLAttribute
	String getUser();

	@Setter(USER_KEY)
	void setUser(String user);

	@Getter(PASSWORD_KEY)
	@XMLAttribute
	String getPassword();

	@Setter(PASSWORD_KEY)
	void setPassword(String password);

	abstract class CreateAccessPointResourceImpl extends AbstractCreateResourceImpl<HttpModelSlot, AccessPoint, HttpTechnologyAdapter>
			implements CreateAccessPointResource {

		@Override
		public Type getAssignableType() {
			FlexoProperty<AccessPoint> flexoProperty = getAssignedFlexoProperty();
			if (flexoProperty instanceof HttpModelSlot) {
				HttpModelSlot httpModelSlot = (HttpModelSlot) flexoProperty;
				if (httpModelSlot != null && httpModelSlot.getAccessedVirtualModel() != null) {
					return new AccessPointType((VirtualModelInstanceType) httpModelSlot.getAccessedVirtualModel().getInstanceType());
				}
			}
			return AccessPoint.class;
		}

		@Override
		public AccessPoint execute(RunTimeEvaluationContext evaluationContext) throws FlexoException {
			try {
				String resourceName = getResourceName(evaluationContext);
				String resourceURI = getResourceURI(evaluationContext);
				FlexoResourceCenter<?> rc = getResourceCenter(evaluationContext);

				AccessPointResource newResource = createResource(
						getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class),
						AccessPointResourceFactory.class, rc, resourceName, resourceURI, getRelativePath(), ".url", true);
				AccessPoint data = newResource.getResourceData(null);

				FlexoProperty<AccessPoint> flexoProperty = getAssignedFlexoProperty();
				if (flexoProperty instanceof HttpModelSlot) {
					HttpModelSlot httpModelSlot = (HttpModelSlot) flexoProperty;
					data.setUrl(httpModelSlot.getUrl());
					data.setUser(httpModelSlot.getUser());
					data.setPassword(httpModelSlot.getPassword());
					data.setModelSlot(httpModelSlot);
					data.setOwnerInstance(evaluationContext.getVirtualModelInstance());
					newResource.getFactory().initializeModel(data, httpModelSlot.getCreationScheme(), httpModelSlot.getParameters(),
							evaluationContext);
				}
				else {
					throw new InvalidArgumentException("AccessPoint creation must be affected to a HTTPModelSlot");
				}

				return data;
			} catch (ModelDefinitionException | FileNotFoundException | ResourceLoadingCancelledException e) {
				throw new FlexoException(e);
			}

		}
	}
}
