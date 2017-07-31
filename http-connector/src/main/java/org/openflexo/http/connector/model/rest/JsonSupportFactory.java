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

package org.openflexo.http.connector.model.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.openflexo.http.connector.model.ContentSupportFactory;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.model.rest.JsonSupport.JsonResponse;
import org.openflexo.logging.FlexoLogger;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class JsonSupportFactory implements ContentSupportFactory<JsonSupport, JsonResponse> {

	private static final Logger logger = FlexoLogger.getLogger(HttpFlexoConceptInstance.class.getPackage().toString());

	private final String urlPropertyName;

	public JsonSupportFactory(String urlPropertyName) {
		this.urlPropertyName = urlPropertyName;
	}

	@Override
	public List<JsonSupport> newSupports(HttpVirtualModelInstance owner, JsonResponse response) {

		List<JsonSupport> result = new ArrayList<>();

		// if the support contains the stream
		if (response.getStream() != null) {
			try {
				ObjectMapper mapper = new ObjectMapper();
				JsonNode source = mapper.readTree(response.getStream());
				JsonNode node = source;

				if (response.getPointer() != null) {
					node = node.at(response.getPointer());
				}

				if (node instanceof ArrayNode) {
					for (JsonNode child : node) {
						if (child instanceof ObjectNode) {
							ObjectNode childNode = (ObjectNode) child;
							String childPath = getPath(owner, childNode);
							result.add(new JsonSupport(owner, childPath, childNode, null));
						}
					}

				}
				else {
					logger.severe("Read json from '" + response + "(" + response.getPointer() + ")' isn't an array (" + source + ")");
				}
			} catch (IOException e) {
				logger.log(Level.SEVERE, "Read json from stream failed", e);
			}
		}
		return result;
	}

	@Override
	public JsonSupport newSupport(HttpVirtualModelInstance owner, JsonResponse response) {
		return new JsonSupport(owner, response);
	}

	private String getPath(HttpVirtualModelInstance owner, ObjectNode node) {
		JsonNode urlNode = node.get(urlPropertyName);
		if (urlNode == null)
			return null;

		String url = urlNode.asText();
		String baseUrl = owner.getUrl();
		if (url.startsWith(baseUrl)) {
			url = url.substring(baseUrl.length());
		}
		return url;
	}

}
