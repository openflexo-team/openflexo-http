package org.openflexo.http.connector;

import org.openflexo.foundation.fml.annotations.DeclareModelSlots;
import org.openflexo.foundation.fml.annotations.DeclareResourceTypes;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.FlexoResourceCenterService;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterBindingFactory;
import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.rm.AccessPointResourceFactory;

/**
 * Created by charlie on 02/02/2017.
 */
@DeclareModelSlots({XmlRpcModelSlot.class})
@DeclareResourceTypes({AccessPointResourceFactory.class})
public class HttpTechnologyAdapter extends TechnologyAdapter {

	@Override
	public String getIdentifier() {
		return "HTTP";
	}

	@Override
	public String getName() {
		return "HTTP Technology Adapter";
	}

	@Override
	public String getLocalizationDirectory() {
		return "FlexoLocalization/HTTPTechnologyAdapter";
	}

	@Override
	public TechnologyContextManager<?> createTechnologyContextManager(FlexoResourceCenterService flexoResourceCenterService) {
		return new HttpTechnologyContextManager(this, flexoResourceCenterService);
	}

	@Override
	public TechnologyAdapterBindingFactory getTechnologyAdapterBindingFactory() {
		return null;
	}

	@Override
	public <I> boolean isIgnorable(FlexoResourceCenter<I> flexoResourceCenter, I i) {
		return false;
	}

}
