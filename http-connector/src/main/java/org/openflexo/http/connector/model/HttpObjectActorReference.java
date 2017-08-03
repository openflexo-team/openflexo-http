/**
 * 
 * Copyright (c) 2014, Openflexo
 * 
 * This file is part of Flexo-foundation, a component of the software infrastructure 
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

package org.openflexo.http.connector.model;

import java.util.List;
import java.util.logging.Logger;

import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.ActorReference;
import org.openflexo.http.connector.fml.rest.RestObjectRetriever;
import org.openflexo.http.connector.fml.rest.RestObjectRetrieverAction;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstance;
import org.openflexo.http.connector.rm.HttpVirtualModelInstanceResource;
import org.openflexo.http.connector.rm.rest.RestVirtualModelInstanceResource;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * Implements {@link ActorReference} for {@link FlexoObject} as modelling elements.<br>
 * 
 * @author sylvain
 * 
 * @param <T>
 */
@ModelEntity
@ImplementationClass(HttpObjectActorReference.HttpObjectActorReferenceImpl.class)
@XMLElement
public interface HttpObjectActorReference extends ActorReference<HttpFlexoConceptInstance<?>> {

	@PropertyIdentifier(type = String.class)
	String RESOURCE_URI_KEY = "resourceURI";
	@PropertyIdentifier(type = String.class)
	String FLEXO_CONCEPT_URI_KEY = "flexoConceptURI";
	@PropertyIdentifier(type = String.class)
	String KEY_KEY = "key";

	@Getter(RESOURCE_URI_KEY)
	@XMLAttribute
	String getResourceURI();

	@Setter(RESOURCE_URI_KEY)
	void setResourceURI(String resourceURI);

	@Getter(FLEXO_CONCEPT_URI_KEY)
	@XMLAttribute
	String getFlexoConceptURI();

	@Setter(FLEXO_CONCEPT_URI_KEY)
	void setFlexoConceptURI(String conceptURI);

	@Getter(KEY_KEY)
	@XMLAttribute
	String getKey();

	@Setter(KEY_KEY)
	void setKey(String key);

	abstract class HttpObjectActorReferenceImpl extends ActorReferenceImpl<HttpFlexoConceptInstance<?>>
			implements HttpObjectActorReference {

		private static final Logger logger = FlexoLogger.getLogger(HttpObjectActorReference.class.getPackage().toString());

		// private boolean isLoading = false;

		private HttpFlexoConceptInstance<?> modellingElement;

		@Override
		public void setModellingElement(HttpFlexoConceptInstance<?> object) {
			this.modellingElement = object;
			if (object != null) {
				setResourceURI(object.getVirtualModelInstance().getURI());
				setFlexoConceptURI(object.getFlexoConcept().getURI());
				setKey(object.getIdentifier());
			}
			else {
				setResourceURI(null);
				setKey(null);
			}
		}

		@Override
		public HttpFlexoConceptInstance<?> getModellingElement() {
			if (modellingElement == null) {
				HttpVirtualModelInstanceResource<?> httpVMIResource = (HttpVirtualModelInstanceResource<?>) getServiceManager()
						.getResourceManager().getResource(getResourceURI());
				if (httpVMIResource instanceof RestVirtualModelInstanceResource) {
					RestVirtualModelInstance restVMI = ((RestVirtualModelInstanceResource) httpVMIResource).getVirtualModelInstance();
					VirtualModel vm = httpVMIResource.getVirtualModel();
					FlexoConcept concept = vm.getFlexoConcept(getFlexoConceptURI());
					List<RestObjectRetriever> retrievers = concept.getFlexoBehaviours(RestObjectRetriever.class);
					if (retrievers.size() > 1) {
						logger.warning("More than one RestObjectRetriever for " + concept + " Using first one.");
					}
					if (retrievers.size() > 0) {
						RestObjectRetrieverAction action = RestObjectRetrieverAction.actionType.makeNewAction(restVMI, null,
								httpVMIResource.getVirtualModelInstance().getEditor());
						action.setRetrieverBehaviour(retrievers.get(0));
						action.setKey(getKey());
						/*if (creationScheme != null) {
							int i = 0;
							for (CreateParameter parameter : parameters) {
								Object paramValue = null;
								try {
									paramValue = parameter.getValue().getBindingValue(evaluationContext);
								} catch (TypeMismatchException | NullReferenceException | InvocationTargetException e) {
									e.printStackTrace();
								}
								action.setParameterValue(creationScheme.getParameters().get(i), paramValue);
								i++;
							}
						
						}*/
						action.doAction();
						modellingElement = action.getFlexoConceptInstance();
					}
				}
			}
			return modellingElement;
		}

		/*@Override
		public void setModellingElement(T object) {
			if (object != null) {
				setObjectReference(new FlexoObjectReference<T>(object));
			}
			else {
				setObjectReference(null);
			}
		}
		
		@Override
		public synchronized T getModellingElement() {
			if (getResourceData() != null && getResourceData().getResource() instanceof PamelaResource
					&& ((PamelaResource) getResourceData().getResource()).isIndexing()) {
				return null;
			}
			if (isLoading) {
				return null;
			}
			else if (getObjectReference() != null) {
				isLoading = true;
				T returned = getObjectReference().getObject(true);
				if (returned == null) {
					logger.warning("Could not retrieve object " + getObjectReference());
				}
				isLoading = false;
				return returned;
			}
			isLoading = false;
			return null;
		}*/

		@Override
		public String toString() {
			return "HttpObjectActorReference [" + getRoleName() + "] " + Integer.toHexString(hashCode()) + " references "
					+ getModellingElement() + "[resource: " + getResourceURI() + " key:" + getKey() + "]";
		}
	}
}
