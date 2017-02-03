package org.openflexo.http.connector.rm;

import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.PamelaResourceFactory;
import org.openflexo.foundation.resource.RepositoryFolder;
import org.openflexo.foundation.resource.SaveResourceException;
import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.HttpFactory;
import org.openflexo.http.connector.model.UrlModel;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.toolbox.StringUtils;

/**
 *
 */
public class HttpResourceFactory
    extends PamelaResourceFactory<HttpResource, UrlModel, HttpTechnologyAdapter, HttpFactory>
{

    public static final String JDBC_EXTENSION = ".jdbc";

    public HttpResourceFactory() throws ModelDefinitionException {
        super(HttpResource.class);
    }

    @Override
    public HttpFactory makeResourceDataFactory(HttpResource resource, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager) throws ModelDefinitionException {
        return new HttpFactory(resource, technologyContextManager.getServiceManager().getEditingContext()) ;
    }

    @Override
    public UrlModel makeEmptyResourceData(HttpResource resource) {
		return resource.getFactory().makeEmptyModel();
	}

    @Override
    public <I> boolean isValidArtefact(I serializationArtefact, FlexoResourceCenter<I> resourceCenter) {
        String name = resourceCenter.retrieveName(serializationArtefact);
        return StringUtils.hasExtension(name, JDBC_EXTENSION);
    }

    public <I> HttpResource makeJDBCResource(String baseName, RepositoryFolder<HttpResource, I> folder, TechnologyContextManager<HttpTechnologyAdapter> technologyContextManager)
        throws SaveResourceException, ModelDefinitionException {

        FlexoResourceCenter<I> rc = folder.getResourceRepository().getResourceCenter();
        String artefactName = baseName.endsWith(JDBC_EXTENSION) ? baseName : baseName + JDBC_EXTENSION;
        I serializationArtefact = rc.createEntry(artefactName, folder.getSerializationArtefact());
        HttpResource newHttpResource = makeResource(serializationArtefact, rc, technologyContextManager, true);

        return newHttpResource;
    }
}
