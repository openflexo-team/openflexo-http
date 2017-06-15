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

package org.openflexo.http.connector.fml.rest;

import org.openflexo.connie.Bindable;
import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.http.connector.fml.rest.PathParameter.PathParameterImpl;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * Parameter for an PathBuilder
 */
@ModelEntity
@XMLElement
@ImplementationClass(PathParameterImpl.class)
public interface PathParameter extends FlexoObject {

	String BUILDER_KEY = "builder";
	String NAME_KEY = "name";
	String VALUE_KEY = "value";

	@Getter(BUILDER_KEY)
	PathBuilder getBuilder();

	@Setter(BUILDER_KEY)
	void setBuilder(PathBuilder builder);

	@Getter(NAME_KEY)
	@XMLAttribute
	DataBinding<String> getName();

	@Setter(NAME_KEY)
	void setName(DataBinding<String> name);

	@Getter(VALUE_KEY)
	@XMLAttribute
	DataBinding<String> getValue();

	@Setter(VALUE_KEY)
	void setValue(DataBinding<String> value);

	public Bindable getOwner();

	abstract class PathParameterImpl extends FlexoObjectImpl implements PathParameter {

		private DataBinding<String> name;
		private DataBinding<String> value;

		@Override
		public Bindable getOwner() {
			return getBuilder() != null ? getBuilder().getOwner() : null;
		}

		@Override
		public DataBinding<String> getName() {
			if (name == null) {
				name = new DataBinding<>(getOwner(), String.class, DataBinding.BindingDefinitionType.GET);
				name.setBindingName("name");
			}
			name.setOwner(getOwner());
			return name;
		}

		@Override
		public void setName(DataBinding<String> name) {
			if (name != null) {
				this.name = new DataBinding<>(name.toString(), getOwner(), String.class, DataBinding.BindingDefinitionType.GET);
				this.name.setBindingName("name");
			}
		}

		@Override
		public DataBinding<String> getValue() {
			if (value == null) {
				value = new DataBinding<>(getOwner(), String.class, DataBinding.BindingDefinitionType.GET);
				value.setBindingName("value");
			}
			value.setOwner(getOwner());
			return value;
		}

		@Override
		public void setValue(DataBinding<String> value) {
			if (value != null) {
				this.value = new DataBinding<>(value.toString(), getOwner(), String.class, DataBinding.BindingDefinitionType.GET);
				this.value.setBindingName("value");
			}
		}

	}
}
