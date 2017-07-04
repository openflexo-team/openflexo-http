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
import io.vertx.core.http.WebSocketFrame;
import io.vertx.core.json.DecodeException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.WeakHashMap;
import org.openflexo.connie.Bindable;
import org.openflexo.connie.BindingEvaluationContext;
import org.openflexo.connie.DataBinding;
import org.openflexo.connie.binding.BindingValueChangeListener;
import org.openflexo.connie.exception.NotSettableContextException;
import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.http.server.core.ta.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.IdUtils;

/**
 * WebSocket service to evaluate Connie expressions
 */
public class ConnieHandler implements Handler<ServerWebSocket> {

	private final FlexoServiceManager serviceManager;
	private final TechnologyAdapterRouteService taRouteService;

	private final Map<BindingId, DataBinding> compiledBindings = new WeakHashMap<>();

	private final Set<ClientConnection> clients = new HashSet<>();

	public ConnieHandler(FlexoServiceManager serviceManager, TechnologyAdapterRouteService taRouteService) {
		this.serviceManager = serviceManager;
		this.taRouteService = taRouteService;
	}

	private DataBinding getOrCreateBinding(final BindingId id) {
		return compiledBindings.computeIfAbsent(id, (bId) -> {
			Bindable model = findObject(id.contextUrl, Bindable.class);
			DataBinding binding = new DataBinding(id.expression, model, Object.class, id.type);
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
	public void handle(ServerWebSocket socket){
		register(new ClientConnection(socket));
	}

	private void register(ClientConnection client) {
		clients.add(client);
	}

	private void unregister(ClientConnection client) {
		clients.remove(client);
	}

	private class ClientConnection {

		private final ServerWebSocket socket;

		private final Map<RuntimeBindingId, BindingValueChangeListener> listenedBindings = new HashMap<>();

		public ClientConnection(ServerWebSocket socket) {
			this.socket = socket;

			socket.frameHandler(this::handleFrame);
			socket.exceptionHandler(this::exceptionHandler);
			socket.endHandler(this::endHandler);
		}

		private void handleFrame(WebSocketFrame frame) {
			try {
				ConnieMessage message = ConnieMessage.read(frame.textData());
				if (message instanceof EvaluationRequest) {
					EvaluationRequest request = (EvaluationRequest) message;
					respondToEvaluationRequest(request);
				}
				if (message instanceof AssignationRequest) {
					AssignationRequest request = (AssignationRequest) message;
					respondToAssignationRequest(request);
				}

			} catch (DecodeException e) {
				String message = "Can't decode request: " + e.getMessage();
				System.out.println(message);
				socket.write(EvaluationResponse.error(message).toBuffer());
			}
		}

		private void respondToEvaluationRequest(EvaluationRequest request) {
			EvaluationResponse response = new EvaluationResponse(request.id);
			RuntimeBindingId runtimeBinding = request.runtimeBinding;
			DataBinding binding = getOrCreateBinding(runtimeBinding.binding);
			if (binding.isValid()) {
				BindingEvaluationContext context = findObject(runtimeBinding.runtimeUrl, BindingEvaluationContext.class);
				if (context != null) {
					try {
						Object value = binding.getBindingValue(context);
						response.result = taRouteService.getSerializer().toJson(value, request.detailed);

						BindingValueChangeListener listener = listenedBindings.get(runtimeBinding);
						if (listener == null) {
							listener = new BindingValueChangeListener<Object>(binding, context) {
								@Override
								public void bindingValueChanged(Object source, Object newValue) {
									String value = newValue != null ? newValue.toString() : "null";;
									sendChangeEvent(runtimeBinding, value);
								}
							};
							listener.startObserving();
						}
						listenedBindings.put(runtimeBinding, listener);

					} catch (TypeMismatchException | InvocationTargetException | NullReferenceException e) {
						String error = "Can't evaluate binding" + request.runtimeBinding + ": " + e;
						System.out.println(error);
						socket.write(EvaluationResponse.error(request.id, error).toBuffer());
					}
				}
				else {
					String error = "Runtime url '" + request.runtimeBinding + "' is invalid";
					System.out.println(error);
					socket.write(EvaluationResponse.error(request.id, error).toBuffer());
				}

			}
			else {
				response.error = "Invalid binding '" + binding.invalidBindingReason() + "'";
			}
			socket.write(response.toBuffer());
		}

		private void respondToAssignationRequest(AssignationRequest request) {
			EvaluationResponse response = new EvaluationResponse(request.id);

			RuntimeBindingId left = request.left;
			DataBinding leftBinding = getOrCreateBinding(left.binding);

			RuntimeBindingId right = request.right;
			DataBinding valueBinding = getOrCreateBinding(right.binding);

			if (leftBinding.isValid() && valueBinding.isValid()) {
				BindingEvaluationContext leftContext = findObject(left.runtimeUrl, BindingEvaluationContext.class);
				BindingEvaluationContext rightContext = findObject(right.runtimeUrl, BindingEvaluationContext.class);
				if (leftContext != null && rightContext != null) {
					try {
						Object rightValue = valueBinding.getBindingValue(rightContext);
						leftBinding.setBindingValue(rightValue, leftContext);
						response.result = taRouteService.getSerializer().toJson(rightValue, request.detailed);

					} catch (TypeMismatchException | InvocationTargetException | NullReferenceException e) {
						String error = "Can't evaluate  " + request.left.binding.expression + " and/or " + request.right.binding.expression + ": " + e;
						socket.write(EvaluationResponse.error(request.id, error).toBuffer());
					} catch (NotSettableContextException e) {
						String error = "Can't set expression '" + request.left.binding + "'";
						socket.write(EvaluationResponse.error(request.id, error).toBuffer());
					}
				}
				else {
					StringBuilder message = new StringBuilder("Invalid runtime ");
					int length = message.length();
					if (leftContext == null) {
						message.append("'");
						message.append(request.left.runtimeUrl);
						message.append("': ");
						message.append(leftBinding.invalidBindingReason());
					}
					if (rightContext == null) {
						if (message.length() > length) message.append(" and ");
						message.append("'");
						message.append(request.right.runtimeUrl);
						message.append("': ");
						message.append(valueBinding.invalidBindingReason());
					}
					response.error = message.toString();
				}

			}
			else {
				StringBuilder message = new StringBuilder("Invalid binding ");
				int length = message.length();
				if (!leftBinding.isValid()) {
					message.append("'");
					message.append(request.left.binding.expression);
					message.append("': ");
					message.append(leftBinding.invalidBindingReason());
				}
				if (!valueBinding.isValid()) {
					if (message.length() > length) message.append(" and ");
					message.append("'");
					message.append(request.right.binding.expression);
					message.append("': ");
					message.append(valueBinding.invalidBindingReason());
				}
				response.error = message.toString();
			}
			socket.write(response.toBuffer());
		}

		private void exceptionHandler(Throwable throwable) {
			System.err.println("Exception in websocket " + throwable.getClass().getSimpleName() + ": " + throwable.getMessage());
		}

		private void endHandler(Void nothing) {
			System.out.println("Ending websocket " + socket);

			for (BindingValueChangeListener listener : listenedBindings.values()) {
				listener.stopObserving();
			}
			listenedBindings.clear();

			unregister(this);
		}

		private void sendChangeEvent(RuntimeBindingId runtimeBindingId, String newValue) {
			socket.write(ChangeEvent.create(runtimeBindingId, newValue).toBuffer());
		}
	}
}
