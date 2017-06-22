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

package org.openflexo.http.server.connie;

import io.vertx.core.Handler;
import io.vertx.core.http.ServerWebSocket;
import io.vertx.core.json.DecodeException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.WeakHashMap;
import org.openflexo.connie.Bindable;
import org.openflexo.connie.BindingEvaluationContext;
import org.openflexo.connie.DataBinding;
import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.http.server.util.IdUtils;

/**
 * WebSocket service to evaluate Connie expressions
 */
public class ConnieHandler implements Handler<ServerWebSocket> {

	private final FlexoServiceManager serviceManager;

	private final Map<BindingId, DataBinding> compiledBindings = new WeakHashMap<>();

	public ConnieHandler(FlexoServiceManager serviceManager) {
		this.serviceManager = serviceManager;
	}

	private DataBinding getBinding(String expression, String modelUrl) {
		System.out.println("[ --- ConnieHandler --- ] Compiled bindings " + compiledBindings.size());
		BindingId id = new BindingId(expression, modelUrl);
		return compiledBindings.computeIfAbsent(id, (bId) -> {
			Bindable model = findObject(modelUrl, Bindable.class);
			DataBinding binding = new DataBinding(expression, model, Object.class, DataBinding.BindingDefinitionType.GET);
			binding.decode();
			return binding;
		});
	}

	/**
	 * Finds an object with the given url.
	 *
	 * <b>Work in progress</b> What to do this the prefix ?
	 *
	 * @param url object url
	 * @param type expected type
	 * @param <T> expected type
	 * @return the corresponding object of given type, null other wise.
	 */
	private <T> T findObject(String url, Class<T> type) {
		if (url == null) return null;
		String objectInfix = "/object/";
		int indexOfInfix = url.indexOf(objectInfix);
		if (indexOfInfix >= 0) {
			String resourceId = url.substring(0, indexOfInfix);
			int indexOfFirstSlash = resourceId.lastIndexOf('/');
			resourceId = resourceId.substring(indexOfFirstSlash+1);
			String objectUrl = url.substring(indexOfInfix+objectInfix.length());

			String resourceUri = IdUtils.decodeId(resourceId);
			FlexoResource<?> resource = serviceManager.getResourceManager().getResource(resourceUri);
			if (resource != null) {
				FlexoObject object = resource.findObject(objectUrl, "FLX", null);
				if (type.isInstance(object)) {
					return type.cast(object);
				}
			}

		}

		return null;
	}


	@Override
	public void handle(ServerWebSocket ws){
		ws.frameHandler(frame -> {
			try {
				EvaluationRequest request = EvaluationRequest.read(frame.textData());
				EvaluationResponse response = new EvaluationResponse(request.id);
				DataBinding binding = getBinding(request.binding, request.model);
				if (binding.isValid()) {
					BindingEvaluationContext context = findObject(request.runtime, BindingEvaluationContext.class);
					if (context != null) {
						try {
							Object value = binding.getBindingValue(context);
							// TODO serialize to JSON with JsonSerializer
							response.result = value != null ? value.toString() : "null";
						} catch (TypeMismatchException | InvocationTargetException | NullReferenceException e) {
							String message = "Can't evaluate binding" + request.binding + ": " + e;
							System.out.println(message);
							ws.write(EvaluationResponse.error(request.id, message).toBuffer());
						}
					} else {
						String message = "Runtime url '"+ request.runtime +"' is invalid";
						System.out.println(message);
						ws.write(EvaluationResponse.error(request.id, message).toBuffer());
					}

				} else {
					response.error = "Invalid binding '" + binding.invalidBindingReason() + "'";
				}
				ws.write(response.toBuffer());

			} catch (DecodeException e) {
				String message = "Can't decode request " + frame.textData() + ": " + e;
				System.out.println(message);
				ws.write(EvaluationResponse.error(message).toBuffer());
			}
		});
		ws.exceptionHandler(exception -> System.out.println("Exception: " + exception));
	}

}
