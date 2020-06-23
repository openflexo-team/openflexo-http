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

package org.openflexo.http.connector.fml.xmlrpc;

import org.openflexo.connie.Bindable;
import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.pamela.annotations.Getter;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.PropertyIdentifier;
import org.openflexo.pamela.annotations.Setter;
import org.openflexo.pamela.annotations.XMLAttribute;
import org.openflexo.pamela.annotations.XMLElement;

/**
 * Parameter used in a XML/RPC request
 */
@ModelEntity
@XMLElement
@ImplementationClass(XmlRpcParameter.XmlRpcParameterImpl.class)
public interface XmlRpcParameter extends FlexoObject {

	@PropertyIdentifier(type = Bindable.class)
	public static final String OWNER_KEY = "owner";
	@PropertyIdentifier(type = String.class)
	public static final String NAME_KEY = "name";
	@PropertyIdentifier(type = DataBinding.class)
	public static final String VALUE_KEY = "value";

	@Getter(value = OWNER_KEY, ignoreType = true)
	public Bindable getOwner();

	@Setter(OWNER_KEY)
	public void setOwner(Bindable owner);

	@Getter(NAME_KEY)
	@XMLAttribute
	public String getName();

	@Setter(NAME_KEY)
	void setName(String aName);

	@Getter(VALUE_KEY)
	@XMLAttribute
	DataBinding<Object> getValue();

	@Setter(VALUE_KEY)
	void setValue(DataBinding<Object> value);

	abstract class XmlRpcParameterImpl extends FlexoObjectImpl implements XmlRpcParameter {

		private DataBinding<Object> value;

		@Override
		public DataBinding<Object> getValue() {
			if (value == null) {
				value = new DataBinding<>(getOwner(), Object.class, DataBinding.BindingDefinitionType.GET);
				value.setBindingName("value");
			}
			value.setOwner(getOwner());
			return value;
		}

		@Override
		public void setValue(DataBinding<Object> value) {
			if (value != null) {
				this.value = new DataBinding<>(value.toString(), getOwner(), Object.class, DataBinding.BindingDefinitionType.GET);
				this.value.setBindingName("value");
			}
		}

	}
}
