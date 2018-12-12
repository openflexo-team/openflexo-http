package org.openflexo.http.connector;

import java.util.ArrayList;
import java.util.List;

import org.openflexo.foundation.fml.annotations.DeclareModelSlots;
import org.openflexo.foundation.fml.annotations.DeclareResourceFactory;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.FlexoResourceCenterService;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterBindingFactory;
import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.fml.HttpBindingFactory;
import org.openflexo.http.connector.fml.rest.RestModelSlot;
import org.openflexo.http.connector.fml.xmlrpc.XmlRpcModelSlot;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceRepository;
import org.openflexo.http.connector.rm.rest.RestVirtualModelInstanceResourceFactory;
import org.openflexo.http.connector.rm.xmlrpc.XmlRpcVirtualModelInstanceResourceFactory;

/**
 * Created by charlie on 02/02/2017.
 */
@DeclareModelSlots({ RestModelSlot.class, XmlRpcModelSlot.class })
@DeclareResourceFactory({ XmlRpcVirtualModelInstanceResourceFactory.class, RestVirtualModelInstanceResourceFactory.class })
public class HttpTechnologyAdapter extends TechnologyAdapter<HttpTechnologyAdapter> {

	private HttpBindingFactory bindingFactory;

	@Override
	public String getIdentifier() {
		return "HTTP";
	}

	@Override
	public String getName() {
		return "HTTP Technology Adapter";
	}

	@Override
	protected String getLocalizationDirectory() {
		return "FlexoLocalization/HTTPTechnologyAdapter";
	}

	@Override
	public TechnologyContextManager<HttpTechnologyAdapter> createTechnologyContextManager(
			FlexoResourceCenterService flexoResourceCenterService) {
		return new HttpTechnologyContextManager(this, flexoResourceCenterService);
	}

	@Override
	public TechnologyAdapterBindingFactory getTechnologyAdapterBindingFactory() {
		if (bindingFactory == null) {
			bindingFactory = new HttpBindingFactory();
		}
		return bindingFactory;
	}

	@Override
	public <I> boolean isIgnorable(FlexoResourceCenter<I> flexoResourceCenter, I i) {
		return false;
	}

	@Override
	public void ensureAllRepositoriesAreCreated(FlexoResourceCenter<?> rc) {
		super.ensureAllRepositoriesAreCreated(rc);
		getVirtualModelInstanceRepository(rc);
	}

	public <I> HttpVirtualModelInstanceRepository<I> getVirtualModelInstanceRepository(FlexoResourceCenter<I> resourceCenter) {
		HttpVirtualModelInstanceRepository<I> returned = resourceCenter.retrieveRepository(HttpVirtualModelInstanceRepository.class, this);
		if (returned == null) {
			returned = HttpVirtualModelInstanceRepository.instanciateNewRepository(this, resourceCenter);
			resourceCenter.registerRepository(returned, HttpVirtualModelInstanceRepository.class, this);
		}
		return returned;
	}

	public List<HttpVirtualModelInstanceRepository<?>> getVirtualModelInstanceRepositories() {
		List<HttpVirtualModelInstanceRepository<?>> returned = new ArrayList<>();
		for (FlexoResourceCenter<?> rc : getServiceManager().getResourceCenterService().getResourceCenters()) {
			returned.add(getVirtualModelInstanceRepository(rc));
		}
		return returned;
	}

}
