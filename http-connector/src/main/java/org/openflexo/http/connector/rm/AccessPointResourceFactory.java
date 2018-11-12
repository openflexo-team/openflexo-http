package org.openflexo.http.connector.rm;

import org.apache.commons.io.FilenameUtils;
import org.openflexo.foundation.FlexoEditingContext;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.RepositoryFolder;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.foundation.resource.TechnologySpecificPamelaResourceFactory;
import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.AccessPointFactory;
import org.openflexo.pamela.exceptions.ModelDefinitionException;

/**
 *
 */
public class AccessPointResourceFactory
		extends TechnologySpecificPamelaResourceFactory<AccessPointResource, AccessPoint, HttpTechnologyAdapter, AccessPointFactory> {

	public static final String URL_EXTENSION = "url";

	public AccessPointResourceFactory() throws ModelDefinitionException {
		super(AccessPointResource.class);
	}

	@Override
	public AccessPointFactory makeResourceDataFactory(AccessPointResource resource,
			TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager) throws ModelDefinitionException {
		FlexoEditingContext editingContext = technologyContextManager.getServiceManager().getEditingContext();
		return new AccessPointFactory(resource, editingContext);
	}

	@Override
	public AccessPoint makeEmptyResourceData(AccessPointResource resource) {
		return resource.getFactory().makeEmptyModel();
	}

	@Override
	public <I> boolean isValidArtefact(I serializationArtefact, FlexoResourceCenter<I> resourceCenter) {
		String name = resourceCenter.retrieveName(serializationArtefact);
		return FilenameUtils.isExtension(name, URL_EXTENSION);
	}

	public <I> AccessPointResource makeAccessPointResource(String baseName, RepositoryFolder<AccessPointResource, I> folder)
			throws SaveResourceException, ModelDefinitionException {

		FlexoResourceCenter<I> rc = folder.getResourceRepository().getResourceCenter();
		String artefactName = baseName.endsWith(URL_EXTENSION) ? baseName : baseName + URL_EXTENSION;
		I serializationArtefact = rc.createEntry(artefactName, folder.getSerializationArtefact());
		AccessPointResource newAccessPointResource = makeResource(serializationArtefact, rc, true);

		return newAccessPointResource;
	}

}
