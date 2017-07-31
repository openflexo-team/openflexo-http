/**
 * 
 * Copyright (c) 2014, Openflexo
 * 
 * This file is part of Flexo-foundation, a component of the software infrastructure 
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

package org.openflexo.http.connector.rm;

import java.util.logging.Logger;

import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.fml.rt.rm.AbstractVirtualModelInstanceResource;
import org.openflexo.foundation.fml.rt.rm.AbstractVirtualModelInstanceResourceImpl;
import org.openflexo.foundation.resource.FileIODelegate;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.technologyadapter.FlexoModelResource;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.rm.FileSystemResourceLocatorImpl;
import org.openflexo.rm.Resource;
import org.openflexo.rm.ResourceLocator;

/**
 * This is the {@link FlexoResource} encoding a {@link FMLRTVirtualModelInstance}
 * 
 * @author sylvain
 * 
 */
@ModelEntity
@ImplementationClass(HttpVirtualModelInstanceResource.HttpVirtualModelInstanceResourceImpl.class)
@XMLElement
public interface HttpVirtualModelInstanceResource<VMI extends VirtualModelInstance<VMI, HttpTechnologyAdapter>>
		extends AbstractVirtualModelInstanceResource<VMI, HttpTechnologyAdapter>,
		FlexoModelResource<VMI, VirtualModel, HttpTechnologyAdapter, FMLTechnologyAdapter> {

	/**
	 * Default implementation for {@link HttpVirtualModelInstanceResource}
	 * 
	 * 
	 * @author Sylvain
	 * 
	 */
	public abstract class HttpVirtualModelInstanceResourceImpl<VMI extends VirtualModelInstance<VMI, HttpTechnologyAdapter>>
			extends AbstractVirtualModelInstanceResourceImpl<VMI, HttpTechnologyAdapter> implements HttpVirtualModelInstanceResource<VMI> {

		static final Logger logger = Logger.getLogger(HttpVirtualModelInstanceResourceImpl.class.getPackage().getName());

		@Override
		public HttpTechnologyAdapter getTechnologyAdapter() {
			if (getServiceManager() != null) {
				return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class);
			}
			return null;
		}

		/*@Override
		public List<RestVirtualModelInstanceResource> getVirtualModelInstanceResources() {
			return getContents(RestVirtualModelInstanceResource.class);
		}*/

		/**
		 * Return the list of all {@link VirtualModelInstanceResource} defined in this {@link ViewResource} conform to supplied
		 * {@link VirtualModel}
		 * 
		 * @return
		 */
		/*@Override
		public List<RestVirtualModelInstanceResource> getVirtualModelInstanceResources(VirtualModel virtualModel) {
			List<RestVirtualModelInstanceResource> returned = new ArrayList<>();
			for (RestVirtualModelInstanceResource vmiRes : getVirtualModelInstanceResources()) {
				if (virtualModel.isAssignableFrom(vmiRes.getVirtualModelResource().getVirtualModel())) {
					returned.add(vmiRes);
				}
			}
			return returned;
		}*/

		/*@Override
		public boolean delete(Object... context) {
			// gets service manager before deleting otherwise the service manager is null
			FlexoServiceManager serviceManager = getServiceManager();
			Object serializationArtefact = getIODelegate().getSerializationArtefact();
			if (super.delete(context)) {
				if (serializationArtefact instanceof File) {
					serviceManager.getResourceManager().addToFilesToDelete((File) serializationArtefact);
				}
				return true;
			}
			return false;
		}*/

		@Deprecated
		@Override
		public Resource getDirectory() {
			String parentPath = getDirectoryPath();
			if (ResourceLocator.locateResource(parentPath) == null) {
				FileSystemResourceLocatorImpl.appendDirectoryToFileSystemResourceLocator(parentPath);
			}
			return ResourceLocator.locateResource(parentPath);
		}

		@Deprecated
		public String getDirectoryPath() {
			if (getIODelegate() instanceof FileIODelegate) {
				FileIODelegate ioDelegate = (FileIODelegate) getIODelegate();
				return ioDelegate.getFile().getParentFile().getAbsolutePath();
			}
			return "";
		}

		@Override
		public VMI getModelData() {
			return getVirtualModelInstance();
		}

		@Override
		public VMI getModel() {
			return getVirtualModelInstance();
		}

		public abstract String getSuffix();

		@Override
		public String computeDefaultURI() {
			if (getContainer() != null) {
				return getContainer().getURI() + "/" + (getName().endsWith(getSuffix()) ? getName() : getName() + getSuffix());
			}
			if (getResourceCenter() != null) {
				return getResourceCenter().getDefaultBaseURI() + "/"
						+ (getName().endsWith(getSuffix()) ? getName() : getName() + getSuffix());
			}
			return null;
		}

		@Override
		public Class<HttpTechnologyAdapter> getTechnologyAdapterClass() {
			return HttpTechnologyAdapter.class;
		}

		private String virtualModelURI;

		@Override
		public String getVirtualModelURI() {
			if (getVirtualModelResource() != null) {
				return getVirtualModelResource().getURI();
			}
			return virtualModelURI;
		}

		@Override
		public void setVirtualModelURI(String virtualModelURI) {
			this.virtualModelURI = virtualModelURI;
		}

	}

}
