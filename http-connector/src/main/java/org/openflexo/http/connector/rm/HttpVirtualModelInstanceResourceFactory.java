/*
 * (c) Copyright 2013 Openflexo
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

package org.openflexo.http.connector.rm;

import java.io.IOException;
import java.util.logging.Logger;

import org.openflexo.foundation.fml.rm.VirtualModelResource;
import org.openflexo.foundation.fml.rt.FMLRTVirtualModelInstance;
import org.openflexo.foundation.fml.rt.rm.AbstractVirtualModelInstanceResource;
import org.openflexo.foundation.fml.rt.rm.AbstractVirtualModelInstanceResourceFactory;
import org.openflexo.foundation.resource.FlexoIODelegate;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.RepositoryFolder;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstanceResource;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.toolbox.FlexoVersion;
import org.openflexo.toolbox.StringUtils;
import org.openflexo.xml.XMLRootElementInfo;

/**
 * The resource factory for {@link RestVirtualModelInstanceResource}
 * 
 * @author sylvain
 *
 */
public abstract class HttpVirtualModelInstanceResourceFactory<VMI extends HttpVirtualModelInstance<VMI>>
		extends AbstractVirtualModelInstanceResourceFactory<VMI, HttpTechnologyAdapter, HttpVirtualModelInstanceResource<VMI>> {

	private static final Logger logger = Logger.getLogger(HttpVirtualModelInstanceResourceFactory.class.getPackage().getName());

	public static final FlexoVersion CURRENT_FML_RT_VERSION = new FlexoVersion("1.0");

	public HttpVirtualModelInstanceResourceFactory(Class<? extends HttpVirtualModelInstanceResource<VMI>> resourceClass)
			throws ModelDefinitionException {
		super((Class) resourceClass);
	}

	public abstract String getExpectedDirectorySuffix();

	public abstract String getExpectedXMLFileSuffix();

	/**
	 * Build a new {@link RestVirtualModelInstanceResource} with supplied baseName and URI, conform to supplied {@link VirtualModelResource}
	 * and located in supplied folder
	 * 
	 * @param baseName
	 * @param uri
	 * @param virtualModelResource
	 * @param folder
	 * @param technologyContextManager
	 * @param createEmptyContents
	 * @return
	 * @throws SaveResourceException
	 * @throws ModelDefinitionException
	 */
	public <I> HttpVirtualModelInstanceResource makeTopLevelFMLRTVirtualModelInstanceResource(String baseName, String uri,
			VirtualModelResource virtualModelResource, RepositoryFolder<HttpVirtualModelInstanceResource, I> folder,
			TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager, boolean createEmptyContents)
			throws SaveResourceException, ModelDefinitionException {

		FlexoResourceCenter<I> resourceCenter = folder.getResourceRepository().getResourceCenter();
		I serializationArtefact = resourceCenter.createDirectory(
				(baseName.endsWith(getExpectedDirectorySuffix()) ? baseName : baseName + getExpectedDirectorySuffix()),
				folder.getSerializationArtefact());

		HttpVirtualModelInstanceResource returned = initResourceForCreation(serializationArtefact, resourceCenter, technologyContextManager,
				baseName, uri);
		returned.setVirtualModelResource(virtualModelResource);
		registerResource(returned, resourceCenter, technologyContextManager);

		if (createEmptyContents) {
			HttpVirtualModelInstance resourceData = createEmptyContents(returned);
			resourceData.setVirtualModel(virtualModelResource.getVirtualModel());
			returned.save(null);
			if (resourceData.getFMLRunTimeEngine() != null) {
				// TODO: today FMLRTVirtualModelInstance is a RunTimeEvaluationContext
				// TODO: design issue, we should separate FlexoConceptInstance from RunTimeEvaluationContext
				// This inheritance should disappear
				resourceData.getFMLRunTimeEngine().addToExecutionContext(resourceData, resourceData);
			}
		}

		return returned;
	}

	/**
	 * Build a new {@link RestVirtualModelInstanceResource} with supplied baseName and URI, conform to supplied {@link VirtualModelResource}
	 * and located in supplied container {@link AbstractVirtualModelInstanceResource}
	 * 
	 * @param baseName
	 * @param virtualModelResource
	 * @param containerResource
	 * @param technologyContextManager
	 * @param createEmptyContents
	 * @return
	 * @throws SaveResourceException
	 * @throws ModelDefinitionException
	 */
	public <I> HttpVirtualModelInstanceResource makeContainedFMLRTVirtualModelInstanceResource(String baseName,
			VirtualModelResource virtualModelResource, AbstractVirtualModelInstanceResource<?, ?> containerResource,
			TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager, boolean createEmptyContents)
			throws SaveResourceException, ModelDefinitionException {

		FlexoResourceCenter<I> resourceCenter = (FlexoResourceCenter<I>) containerResource.getResourceCenter();
		I parentDir = resourceCenter.getContainer((I) containerResource.getIODelegate().getSerializationArtefact());
		I serializationArtefact = resourceCenter.createDirectory(
				(baseName.endsWith(getExpectedDirectorySuffix()) ? baseName : (baseName + getExpectedDirectorySuffix())), parentDir);

		String viewURI = containerResource.getURI() + "/"
				+ (baseName.endsWith(getExpectedDirectorySuffix()) ? baseName : (baseName + getExpectedDirectorySuffix()));

		HttpVirtualModelInstanceResource returned = initResourceForCreation(serializationArtefact, resourceCenter, technologyContextManager,
				baseName, viewURI);
		returned.setVirtualModelResource(virtualModelResource);
		registerResource(returned, resourceCenter, technologyContextManager);

		if (createEmptyContents) {
			HttpVirtualModelInstance resourceData = createEmptyContents(returned);
			resourceData.setVirtualModel(virtualModelResource.getVirtualModel());
			returned.save(null);
			if (resourceData.getFMLRunTimeEngine() != null) {
				// TODO: today FMLRTVirtualModelInstance is a RunTimeEvaluationContext
				// TODO: design issue, we should separate FlexoConceptInstance from RunTimeEvaluationContext
				// This inheritance should disappear
				resourceData.getFMLRunTimeEngine().addToExecutionContext(resourceData, resourceData);
			}
		}

		containerResource.addToContents(returned);
		containerResource.notifyContentsAdded(returned);
		return returned;
	}

	/**
	 * Used to retrieve from serialization artefact a top-level {@link RestVirtualModelInstanceResource}
	 * 
	 * @param serializationArtefact
	 * @param resourceCenter
	 * @param technologyContextManager
	 * @return
	 * @throws ModelDefinitionException
	 * @throws IOException
	 */
	public <I> HttpVirtualModelInstanceResource retrieveFMLRTVirtualModelInstanceResource(I serializationArtefact,
			FlexoResourceCenter<I> resourceCenter, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager)
			throws ModelDefinitionException, IOException {
		HttpVirtualModelInstanceResource returned = retrieveResource(serializationArtefact, resourceCenter, technologyContextManager);
		return returned;
	}

	/**
	 * Used to retrieve from serialization artefact a contained {@link RestVirtualModelInstanceResource} in supplied
	 * containerVirtualModelResource
	 * 
	 * @param serializationArtefact
	 * @param resourceCenter
	 * @param technologyContextManager
	 * @param containerResource
	 * @return
	 * @throws ModelDefinitionException
	 * @throws IOException
	 */
	public <I> HttpVirtualModelInstanceResource retrieveFMLRTVirtualModelInstanceResource(I serializationArtefact,
			FlexoResourceCenter<I> resourceCenter, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager,
			AbstractVirtualModelInstanceResource<?, ?> containerResource) throws ModelDefinitionException, IOException {
		HttpVirtualModelInstanceResource returned = retrieveResource(serializationArtefact, resourceCenter, technologyContextManager);
		containerResource.addToContents(returned);
		containerResource.notifyContentsAdded(returned);
		return returned;
	}

	/**
	 * Return boolean indicating is supplied serialization artefact seems to be a valid artefact encoding a
	 * {@link FMLRTVirtualModelInstance}<br>
	 * A valid {@link FMLRTVirtualModelInstance} is encoded in a directory ending with .fml.rt suffix
	 * 
	 * @param serializationArtefact
	 * @param resourceCenter
	 * @return
	 */
	@Override
	public <I> boolean isValidArtefact(I serializationArtefact, FlexoResourceCenter<I> resourceCenter) {

		if (resourceCenter.exists(serializationArtefact) && resourceCenter.isDirectory(serializationArtefact)
				&& resourceCenter.canRead(serializationArtefact)
				&& resourceCenter.retrieveName(serializationArtefact).endsWith(getExpectedDirectorySuffix())) {
			/*final String baseName = candidateFile.getName().substring(0,
					candidateFile.getName().length() - ViewPointResource.VIEW_SUFFIX.length());
			final File xmlFile = new File(candidateFile, baseName + ".xml");
			return xmlFile.exists();*/

			return true;
		}
		return false;
	}

	@Override
	protected <I> HttpVirtualModelInstanceResource<VMI> registerResource(HttpVirtualModelInstanceResource<VMI> resource,
			FlexoResourceCenter<I> resourceCenter, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager) {
		super.registerResource(resource, resourceCenter, technologyContextManager);

		// Register the resource in the VirtualModelInstanceRepository of supplied resource center
		registerResourceInResourceRepository((HttpVirtualModelInstanceResource) resource,
				(HttpVirtualModelInstanceRepository) technologyContextManager.getTechnologyAdapter()
						.getVirtualModelInstanceRepository(resourceCenter));

		// Now look for virtual model instances and sub-views
		// TODO: may be not required for HTTP ???
		exploreViewContents(resource, technologyContextManager);

		return resource;
	}

	@Override
	protected <I> HttpVirtualModelInstanceResource<VMI> initResourceForCreation(I serializationArtefact,
			FlexoResourceCenter<I> resourceCenter, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager, String name,
			String uri) throws ModelDefinitionException {
		HttpVirtualModelInstanceResource<VMI> returned = super.initResourceForCreation(serializationArtefact, resourceCenter,
				technologyContextManager, name, uri);
		returned.setVersion(INITIAL_REVISION);
		returned.setModelVersion(CURRENT_FML_RT_VERSION);
		return returned;
	}

	@Override
	protected <I> HttpVirtualModelInstanceResource<VMI> initResourceForRetrieving(I serializationArtefact,
			FlexoResourceCenter<I> resourceCenter, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager)
			throws ModelDefinitionException, IOException {

		HttpVirtualModelInstanceResource<VMI> returned = super.initResourceForRetrieving(serializationArtefact, resourceCenter,
				technologyContextManager);

		String artefactName = resourceCenter.retrieveName(serializationArtefact);

		String baseName = artefactName;
		if (artefactName.endsWith(getExpectedDirectorySuffix())) {
			baseName = artefactName.substring(0, artefactName.length() - getExpectedDirectorySuffix().length());
		}

		returned.initName(baseName);

		HttpVirtualModelInstanceInfo vmiInfo = findHttpVirtualModelInstanceInfo(returned, resourceCenter);
		if (vmiInfo != null) {
			returned.setURI(vmiInfo.uri);
			if (StringUtils.isNotEmpty(vmiInfo.version)) {
				returned.setVersion(new FlexoVersion(vmiInfo.version));
			}
			else {
				returned.setVersion(INITIAL_REVISION);
			}
			if (StringUtils.isNotEmpty(vmiInfo.modelVersion)) {
				returned.setModelVersion(new FlexoVersion(vmiInfo.modelVersion));
			}
			else {
				returned.setModelVersion(CURRENT_FML_RT_VERSION);
			}
			if (StringUtils.isNotEmpty(vmiInfo.virtualModelURI)) {
				VirtualModelResource vmResource = resourceCenter.getServiceManager().getVirtualModelLibrary()
						.getVirtualModelResource(vmiInfo.virtualModelURI);
				returned.setVirtualModelResource(vmResource);
				if (vmResource == null) {
					// In this case, serialize URI of virtual model, to give a chance to find it later
					returned.setVirtualModelURI(vmiInfo.virtualModelURI);
					logger.warning("Could not retrieve virtual model: " + vmiInfo.virtualModelURI);
				}
			}
		}
		else {
			// Unable to retrieve infos, just abort
			logger.warning("Cannot retrieve info from " + serializationArtefact);
			returned.setVersion(INITIAL_REVISION);
			returned.setModelVersion(CURRENT_FML_RT_VERSION);
		}

		return returned;

	}

	@Override
	protected <I> FlexoIODelegate<I> makeFlexoIODelegate(I serializationArtefact, FlexoResourceCenter<I> resourceCenter) {
		return resourceCenter.makeDirectoryBasedFlexoIODelegate(serializationArtefact, getExpectedDirectorySuffix(),
				getExpectedXMLFileSuffix(), this);
	}

	private void exploreViewContents(HttpVirtualModelInstanceResource<VMI> viewResource,
			TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager) {

		exploreResource(viewResource.getIODelegate().getSerializationArtefact(), viewResource, technologyContextManager);
	}

	private <I> void exploreResource(I serializationArtefact, HttpVirtualModelInstanceResource<VMI> containerResource,
			TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager) {
		if (serializationArtefact == null) {
			return;
		}

		FlexoResourceCenter<I> resourceCenter = (FlexoResourceCenter<I>) containerResource.getResourceCenter();

		for (I child : resourceCenter.getContents(resourceCenter.getContainer(serializationArtefact))) {
			if (isValidArtefact(child, resourceCenter)) {
				try {
					HttpVirtualModelInstanceResource<VMI> virtualModelInstanceResource = retrieveFMLRTVirtualModelInstanceResource(child,
							resourceCenter, technologyContextManager, containerResource);
				} catch (ModelDefinitionException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	private static class HttpVirtualModelInstanceInfo {
		public String virtualModelURI;
		@SuppressWarnings("unused")
		public String virtualModelVersion;
		public String name;
		public String uri;
		public String version;
		public String modelVersion;
	}

	private <I> HttpVirtualModelInstanceInfo findHttpVirtualModelInstanceInfo(HttpVirtualModelInstanceResource<VMI> resource,
			FlexoResourceCenter<I> resourceCenter) {

		HttpVirtualModelInstanceInfo returned = new HttpVirtualModelInstanceInfo();
		XMLRootElementInfo xmlRootElementInfo = resourceCenter
				.getXMLRootElementInfo((I) resource.getIODelegate().getSerializationArtefact());
		if (xmlRootElementInfo == null) {
			return null;
		}

		if (xmlRootElementInfo.getName().equals("FMLRTVirtualModelInstance")) {
			returned.name = xmlRootElementInfo.getAttribute("name");
			returned.uri = xmlRootElementInfo.getAttribute("uri");
			returned.virtualModelURI = xmlRootElementInfo.getAttribute("virtualModelURI");
			returned.virtualModelVersion = xmlRootElementInfo.getAttribute("virtualModelVersion");
			returned.version = xmlRootElementInfo.getAttribute("version");
			returned.modelVersion = xmlRootElementInfo.getAttribute("modelVersion");
		}
		return returned;
	}

	@Override
	public <I> I getConvertableArtefact(I serializationArtefact, FlexoResourceCenter<I> resourceCenter) {
		// TODO Auto-generated method stub
		return null;
	}

}
