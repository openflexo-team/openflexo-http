/**
 * 
 * Copyright (c) 2014, Openflexo
 * 
 * This file is part of Owlconnector, a component of the software infrastructure 
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

package org.openflexo.http.connector.fml;

import java.util.List;
import java.util.logging.Logger;

import org.openflexo.connie.DataBinding;
import org.openflexo.connie.binding.BindingPathElement;
import org.openflexo.connie.binding.Function;
import org.openflexo.connie.binding.FunctionPathElement;
import org.openflexo.connie.binding.SimplePathElement;
import org.openflexo.connie.type.TypeUtils;
import org.openflexo.foundation.fml.TechnologySpecificType;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterBindingFactory;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;

/**
 * Defines OWL-specific types binding path element strategy
 * 
 * @author sylvain
 *
 */
public final class HttpBindingFactory extends TechnologyAdapterBindingFactory {
	static final Logger logger = Logger.getLogger(HttpBindingFactory.class.getPackage().getName());

	public HttpBindingFactory() {
		super();
	}

	@Override
	public SimplePathElement makeSimplePathElement(BindingPathElement parent, String propertyName) {
		// We want to avoid code duplication, so iterate on all accessible simple path element and choose the right one
		for (SimplePathElement e : getAccessibleSimplePathElements(parent)) {
			if (e.getLabel().equals(propertyName)) {
				return e;
			}
		}
		return super.makeSimplePathElement(parent, propertyName);
	}

	@Override
	public FunctionPathElement makeFunctionPathElement(BindingPathElement father, Function function, List<DataBinding<?>> args) {
		return super.makeFunctionPathElement(father, function, args);
	}

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
			System.out.println("Hop, on a bien " + parent.getType());
			AccessPointType parentType = (AccessPointType) parent.getType();
			elements.stream().filter((e) -> TypeUtils.isTypeAssignableFrom(e.getType(), HttpVirtualModelInstance.class))
					.forEach((e) -> e.setType(parentType.getInstanceType()));
		}
		return elements;
	}

	@Override
	public List<? extends FunctionPathElement> getAccessibleFunctionPathElements(BindingPathElement parent) {
		return super.getAccessibleFunctionPathElements(parent);
	}

}
