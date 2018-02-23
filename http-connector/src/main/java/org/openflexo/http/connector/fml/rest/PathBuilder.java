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

import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openflexo.connie.Bindable;
import org.openflexo.connie.BindingEvaluationContext;
import org.openflexo.connie.DataBinding;
import org.openflexo.connie.DataBinding.BindingDefinitionType;
import org.openflexo.foundation.fml.FlexoConceptObject;
import org.openflexo.model.annotations.Adder;
import org.openflexo.model.annotations.Embedded;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.Getter.Cardinality;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PastingPoint;
import org.openflexo.model.annotations.Remover;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;
import org.openflexo.model.exceptions.ModelDefinitionException;
import org.openflexo.model.factory.ModelFactory;

/**
 * Allows to build an URL from a template and a series of binding
 */
@ModelEntity
@XMLElement
public interface PathBuilder {

	String TEMPLATE_KEY = "template";
	String PARAMETER_KEY = "parameter";
	String OWNER = "owner";

	@Getter(TEMPLATE_KEY)
	@XMLAttribute
	String getTemplate();

	@Setter(TEMPLATE_KEY)
	void setTemplate(String template);

	@Getter(value = PARAMETER_KEY, cardinality = Cardinality.LIST, inverse = PathParameter.BUILDER_KEY)
	@Embedded
	@XMLElement
	List<PathParameter> getParameters();

	@Setter(PARAMETER_KEY)
	void setParameters(List<PathParameter> parameters);

	@Adder(PARAMETER_KEY)
	@PastingPoint
	void addToParameters(PathParameter aParameter);

	@Remover(PARAMETER_KEY)
	void removeFromParameters(PathParameter aParameter);

	@Getter(OWNER)
	@XMLElement
	FlexoConceptObject getOwner();

	@Setter(OWNER)
	void setOwner(FlexoConceptObject model);

	default void addNewParameter() {
		try {
			PathParameter parameter = new ModelFactory(PathBuilder.class).newInstance(PathParameter.class);
			parameter.setName(new DataBinding<>("\"param1\"", getOwner(), String.class, BindingDefinitionType.GET));
			parameter.setValue(new DataBinding<>("\"value1\"", getOwner(), String.class, BindingDefinitionType.GET));
			addToParameters(parameter);
		} catch (ModelDefinitionException e) {
			// todo
		}
	}

	default String evaluateUrl(Bindable bindable, BindingEvaluationContext context) throws Exception {
		StringBuilder url = new StringBuilder();
		// evaluates pattern
		Pattern pattern = Pattern.compile("\\{([^\\}]+)\\}");
		String template = getTemplate();
		if (template != null) {
			Matcher matcher = pattern.matcher(template);
			int current = 0;
			while (matcher.find(current)) {
				url.append(template.substring(current, matcher.start()));

				String expression = matcher.group(1);
				DataBinding<String> binding = new DataBinding<>(expression, bindable, String.class, BindingDefinitionType.GET);
				String value = binding.getBindingValue(context);
				url.append(Objects.toString(value, expression));

				current = matcher.end();
			}
			url.append(template.substring(current));
		}

		StringBuilder parameters = new StringBuilder("?");
		for (PathParameter parameter : getParameters()) {
			String name = parameter.getName().getBindingValue(context);
			String value = parameter.getValue().getBindingValue(context);
			if (name != null && name.length() > 0 && value != null && value.length() > 0) {
				if (parameters.length() > 1) {
					parameters.append("&");
				}
				parameters.append(name);
				parameters.append("=");
				parameters.append(value);
			}
		}

		if (parameters.length() > 1) {
			url.append(parameters);
		}
		return url.toString();
	}
}
