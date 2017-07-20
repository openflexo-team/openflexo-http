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
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.openflexo.connie.type.TypeUtils;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupport;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.http.connector.model.rest.JsonSupport.JsonResponse;
import org.openflexo.logging.FlexoLogger;

import com.fasterxml.jackson.core.JsonPointer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;

/**
 * Created by charlie on 17/05/2017.
 */
public class JsonSupport implements ContentSupport<JsonResponse> {

	private static final Logger logger = FlexoLogger.getLogger(JsonSupport.class.getPackage().toString());

	private final HttpVirtualModelInstance owner;

	// private final String path;
	// private ObjectNode source;
	// private JsonPointer pointer;

	private JsonResponse response;

	private JsonPointer jsonPointer;
	private ObjectNode source;
	private JsonNode node;

	private String identifier;

	private boolean complete = false;
	private long lastUpdated = -1l;

	/**
	 * A Json response to a Json request<br>
	 * Such object will be used by JsonSupport
	 * <ul>
	 * <li>identifier is the identifier for the object</li>
	 * <li>stream is the{@link InputStream} to read (<b>may be null</b>)</li>
	 * <li>pointer when the result is read as a tree (like JSON or XML) the pointer allows to get a specific node in the tree for the result
	 * (may be null).</li>
	 * </ul>
	 * 
	 * 
	 * @author sylvain
	 *
	 */
	public static class JsonResponse {

		private String identifier;
		private InputStream stream;
		private String pointer;

		/**
		 * Build a new JsonResponse
		 * 
		 * @param identifier
		 *            the identifier for the object.
		 * @param stream
		 *            {@link InputStream} to read (<b>may be null</b>).
		 * @param pointer
		 *            when the result is read as a tree (like JSON or XML) the pointer allows to get a specific node in the tree for the
		 *            result (may be null).
		 */
		public JsonResponse(String identifier, InputStream stream, String pointer) {
			super();
			this.identifier = identifier;
			this.stream = stream;
			this.pointer = pointer;
		}

		public String getIdentifier() {
			return identifier;
		}

		public InputStream getStream() {
			return stream;
		}

		public String getPointer() {
			return pointer;
		}
	}

	public JsonSupport(HttpVirtualModelInstance owner, JsonResponse response) {
		this.owner = owner;
		this.response = response;

		this.identifier = response.getIdentifier();

		// if the support contains the stream
		if (response.getStream() != null) {
			try {
				ObjectMapper mapper = new ObjectMapper();
				JsonNode source = mapper.readTree(response.getStream());

				node = source;
				if (response.getPointer() != null) {
					node = node.at(response.getPointer());
				}

				if (!(node instanceof ObjectNode)) {
					logger.severe("Read json from '" + response.getIdentifier() + "(" + response.getPointer() + ")' isn't an object ("
							+ source + ")");
				}
			} catch (IOException e) {
				logger.log(Level.SEVERE, "Read json from stream failed", e);
			}
		}

		if (response.getPointer() != null) {
			jsonPointer = JsonPointer.compile(response.getPointer());
		}

		if (source != null) {
			lastUpdated = System.nanoTime();
		}
		complete = source != null;

	}

	public JsonSupport(HttpVirtualModelInstance owner, String identifier, ObjectNode source, JsonResponse response) {
		this.owner = owner;
		this.response = response;
		this.identifier = identifier;
		this.source = source;
		if (source != null) {
			lastUpdated = System.nanoTime();
		}
		complete = source != null;
	}

	private boolean needUpdate() {
		return (System.nanoTime() - lastUpdated) > (60 * 1_000_000_000l);
	}

	@Override
	public String getIdentifier() {
		return identifier;
	}

	@Override
	public <T> T getValue(String name, Type type) {
		update(false);
		if (source != null) {
			JsonNode node = source.get(name);
			if (node != null) {
				return convertNode(type, node);
			}
			else if (!complete) {
				update(true);
				node = source.get(name);
				if (node != null) {
					return convertNode(type, node);
				}
			}
		}
		return null;
	}

	@Override
	public void setValue(String name, Object value) {
		source.set(name, value != null ? TextNode.valueOf(value.toString()) : NullNode.getInstance());
	}

	private <T> T convertNode(Type type, JsonNode node) {
		// TODO work on conversion
		Object value = node.textValue();
		return TypeUtils.isAssignableTo(value, type) ? (T) value : null;
	}

	public void update(boolean force) {
		if (needUpdate() || force) {
			synchronized (this) {
				if (needUpdate() || force) {

					AccessPoint accessPoint = owner.getAccessPoint();
					String url = accessPoint.getUrl() + getIdentifier();
					HttpGet httpGet = new HttpGet(url);
					accessPoint.contributeHeaders(httpGet);
					try (CloseableHttpResponse response = owner.getHttpclient().execute(httpGet);
							InputStream stream = response.getEntity().getContent()) {

						if (response.getStatusLine().getStatusCode() == 200) {
							ObjectMapper mapper = new ObjectMapper();
							JsonNode node = mapper.readTree(stream);
							if (jsonPointer != null) {
								node = node.at(jsonPointer);
							}

							if (node instanceof ObjectNode) {
								source = (ObjectNode) node;
							}
							else {
								logger.log(Level.SEVERE, "Read json from '" + url + "' isn't an object (" + node + ")");
							}
						}
						else {
							logger.log(Level.SEVERE, "Can't access '" + url + "': " + response.getStatusLine());
						}

					} catch (IOException e) {
						logger.log(Level.SEVERE, "Can't read '" + url + "'", e);
					} finally {
						complete = true;
						lastUpdated = System.nanoTime();
					}
				}
			}
		}
	}

}
