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

package org.openflexo.http.connector;

import java.io.FileNotFoundException;
import java.lang.reflect.Type;
import org.openflexo.foundation.FlexoException;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.ViewPointLibrary;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.VirtualModelInstanceType;
import org.openflexo.foundation.fml.annotations.DeclareEditionActions;
import org.openflexo.foundation.fml.annotations.DeclareFlexoBehaviours;
import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.View;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.ResourceLoadingCancelledException;
import org.openflexo.foundation.technologyadapter.FreeModelSlot;
import org.openflexo.http.connector.HttpModelSlot.HttpModelSlotImpl;
import org.openflexo.http.connector.fml.AccessPointType;
import org.openflexo.http.connector.fml.editionaction.CreateAccessPointResource;
import org.openflexo.http.connector.fml.editionaction.JsonRequestBehaviour;
import org.openflexo.http.connector.fml.editionaction.XmlRpcRequestBehaviour;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.rm.AccessPointResource;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.toolbox.StringUtils;

/**
 * REST model slot for Http technology adapter
 *
 */
@ModelEntity
@XMLElement
@ImplementationClass(HttpModelSlotImpl.class)
@DeclareEditionActions({ CreateAccessPointResource.class })
@DeclareFlexoBehaviours({ JsonRequestBehaviour.class, XmlRpcRequestBehaviour.class })
public interface HttpModelSlot extends FreeModelSlot<AccessPoint> {

	@PropertyIdentifier(type = String.class)
	String ACCESSED_VIRTUAL_MODEL_URI_KEY = "accessedVirtualModelURI";

	@PropertyIdentifier(type = String.class)
	String URL_KEY = "url";

	@PropertyIdentifier(type = String.class)
	String USER_KEY = "user";

	@PropertyIdentifier(type = String.class)
	String PASSWORD_KEY = "password";

	@Getter(value = ACCESSED_VIRTUAL_MODEL_URI_KEY)
	@XMLAttribute(xmlTag = "accessedVirtualModelURI")
	String getAccessedVirtualModelURI();

	@Setter(ACCESSED_VIRTUAL_MODEL_URI_KEY)
	void setAccessedVirtualModelURI(String virtualModelURI);

	VirtualModelResource getAccessedVirtualModelResource();

	void setAccessedVirtualModelResource(VirtualModelResource virtualModelResource);

	VirtualModel getAccessedVirtualModel();

	void setAccessedVirtualModel(VirtualModel aVirtualModel);

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

	@Override
	HttpTechnologyAdapter getModelSlotTechnologyAdapter();

	abstract class HttpModelSlotImpl extends FreeModelSlotImpl<AccessPoint> implements HttpModelSlot {

		private VirtualModelResource virtualModelResource;
		private String virtualModelURI;

		@Override
		public Class<HttpTechnologyAdapter> getTechnologyAdapterClass() {
			return HttpTechnologyAdapter.class;
		}

		@Override
		public <PR extends FlexoRole<?>> String defaultFlexoRoleName(Class<PR> patternRoleClass) {
			return "";
		}

		@Override
		public Type getType() {
			VirtualModelInstanceType instanceType = VirtualModelInstanceType.getVirtualModelInstanceType(getAccessedVirtualModel());
			return new AccessPointType(getModelSlotTechnologyAdapter(), instanceType);
		}

		@Override
		public HttpTechnologyAdapter getModelSlotTechnologyAdapter() {
			return (HttpTechnologyAdapter) super.getModelSlotTechnologyAdapter();
		}

		@Override
		public HttpModelSlotInstanceConfiguration createConfiguration(FlexoConceptInstance fci, FlexoResourceCenter<?> rc) {
			return new HttpModelSlotInstanceConfiguration(this, fci, rc);
		}

		@Override
		public AccessPointResource createProjectSpecificEmptyResource(View view, String filename, String modelUri) {
			// TODO create empty resource
			return null;
		}

		@Override
		public AccessPointResource createSharedEmptyResource(FlexoResourceCenter<?> resourceCenter, String relativePath, String filename,
				String modelUri) {
			// TODO create empty resource
			return null;
		}

		@Override
		public VirtualModelResource getAccessedVirtualModelResource() {
			ViewPointLibrary viewPointLibrary = getViewPointLibrary();
			if (virtualModelResource == null && StringUtils.isNotEmpty(virtualModelURI) && viewPointLibrary != null) {
				virtualModelResource = viewPointLibrary.getVirtualModelResource(virtualModelURI);
			}
			return virtualModelResource;
		}

		@Override
		public void setAccessedVirtualModelResource(VirtualModelResource virtualModelResource) {
			this.virtualModelResource = virtualModelResource;
		}

		@Override
		public String getAccessedVirtualModelURI() {
			if (virtualModelResource != null) {
				return virtualModelResource.getURI();
			}
			return virtualModelURI;
		}

		@Override
		public void setAccessedVirtualModelURI(String metaModelURI) {
			this.virtualModelURI = metaModelURI;
		}

		/**
		 * Return addressed virtual model (the virtual model this model slot specifically addresses, not the one in which it is defined)
		 *
		 * @return
		 */
		@Override
		public final VirtualModel getAccessedVirtualModel() {
			if (getAccessedVirtualModelResource() != null) {
				try {
					return getAccessedVirtualModelResource().getResourceData(null);
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (ResourceLoadingCancelledException e) {
					e.printStackTrace();
				} catch (FlexoException e) {
					e.printStackTrace();
				}
			}
			return null;
		}

		@Override
		public void setAccessedVirtualModel(VirtualModel aVirtualModel) {
			this.virtualModelURI = aVirtualModel.getURI();
			notifyResultingTypeChanged();
		}

	}
}
