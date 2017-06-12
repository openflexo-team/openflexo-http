package org.openflexo.http.connector;

import java.util.List;

import org.openflexo.connie.binding.BindingPathElement;
import org.openflexo.connie.binding.SimplePathElement;
import org.openflexo.foundation.fml.TechnologySpecificType;
import org.openflexo.foundation.fml.annotations.DeclareModelSlots;
import org.openflexo.foundation.fml.annotations.DeclareResourceTypes;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.FlexoResourceCenterService;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterBindingFactory;
import org.openflexo.foundation.technologyadapter.TechnologyContextManager;
import org.openflexo.http.connector.fml.AccessPointType;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.rm.AccessPointResourceFactory;

/**
 * Created by charlie on 02/02/2017.
 */
@DeclareModelSlots({ RestModelSlot.class, XMLRPCModelSlot.class })
@DeclareResourceTypes({ AccessPointResourceFactory.class })
public class HttpTechnologyAdapter extends TechnologyAdapter {

	private TechnologyAdapterBindingFactory bindingFactory;

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
		bindingFactory = new TechnologyAdapterBindingFactory() {
			@Override
			protected SimplePathElement makeSimplePathElement(Object object, BindingPathElement parent) {
				return null;
			}

			@Override
			public boolean handleType(TechnologySpecificType<?> technologySpecificType) {
				return technologySpecificType instanceof AccessPointType;
			}

			@Override
			public List<? extends SimplePathElement> getAccessibleSimplePathElements(BindingPathElement parent) {
				List<? extends SimplePathElement> elements = super.getAccessibleSimplePathElements(parent);
				if (parent.getType() instanceof AccessPointType) {
					AccessPointType parentType = (AccessPointType) parent.getType();
					elements.stream().filter((e) -> e.getType() == HttpVirtualModelInstance.class)
							.forEach((e) -> e.setType(parentType.getInstanceType()));
				}
				return elements;
			}

		};
		return bindingFactory;
	}

	@Override
	public <I> boolean isIgnorable(FlexoResourceCenter<I> flexoResourceCenter, I i) {
		return false;
	}

}
