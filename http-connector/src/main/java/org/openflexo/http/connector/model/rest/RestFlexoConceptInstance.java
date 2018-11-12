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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.openflexo.connie.BindingVariable;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.FlexoConceptInstanceRole;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.VirtualModel;
import org.openflexo.foundation.fml.rt.AbstractVirtualModelInstanceModelFactory;
import org.openflexo.foundation.fml.rt.ActorReference;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.http.connector.fml.rest.RestObjectRetriever;
import org.openflexo.http.connector.fml.rest.RestObjectRetrieverTask;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance;
import org.openflexo.logging.FlexoLogger;
import org.openflexo.pamela.annotations.ImplementationClass;
import org.openflexo.pamela.annotations.Initializer;
import org.openflexo.pamela.annotations.ModelEntity;
import org.openflexo.pamela.annotations.Parameter;
import org.openflexo.pamela.annotations.XMLElement;

/**
 * Rest implementation for {@link HttpFlexoConceptInstance}<br>
 * 
 * Such {@link RestFlexoConceptInstance} retrieve its informations through a {@link JsonSupport} object.<br>
 * Note that this {@link RestFlexoConceptInstance} may reflect only partial informations, and is subject to be fully loaded through
 * {@link RestObjectRetriever}
 * 
 */
@ModelEntity
@ImplementationClass(RestFlexoConceptInstance.RestFlexoConceptInstanceImpl.class)
@XMLElement
public interface RestFlexoConceptInstance extends HttpFlexoConceptInstance<JsonSupport> {

	@Initializer
	void initialize(@Parameter(OWNING_VIRTUAL_MODEL_INSTANCE_KEY) RestVirtualModelInstance owner, JsonSupport support,
			@Parameter(FLEXO_CONCEPT_URI_KEY) FlexoConcept concept);

	@Override
	public RestVirtualModelInstance getVirtualModelInstance();

	public void initializeIdentifiers(String key);

	abstract class RestFlexoConceptInstanceImpl extends HttpFlexoConceptInstanceImpl<JsonSupport> implements RestFlexoConceptInstance {

		private static final Logger logger = FlexoLogger.getLogger(RestFlexoConceptInstanceImpl.class.getPackage().toString());

		// Stores temporary identifiers found in RestObjectActorReference
		private Map<String, String> identifiers = new HashMap<>();

		private boolean fullInformationsHaveBeenRetrieved = false;

		@Override
		public void initialize(RestVirtualModelInstance owner, JsonSupport support, FlexoConcept concept) {

			// System.out.println("Initialize FCI for " + concept + " support=" + (support != null ? support.getSource() : null));

			setOwningVirtualModelInstance(owner);
			setFlexoConcept(concept);
			setSupport(support);

		}

		@Override
		public void initializeIdentifiers(String key) {
			if (getFlexoConcept().getKeyProperties().size() == 1) {
				// Simple key
				FlexoProperty<?> keyProperty = getFlexoConcept().getKeyProperties().get(0);
				identifiers.put(keyProperty.getName(), key);
				// System.out.println("Identify " + keyProperty.getName() + "=" + key);
			}
			else if (getFlexoConcept().getKeyProperties().size() > 1) {
				// TODO implement composite keys
				logger.warning("Composite keys not implemented, please do it.");
			}
		}

		@Override
		public RestVirtualModelInstance getVirtualModelInstance() {
			return (RestVirtualModelInstance) super.getVirtualModelInstance();
		}

		@Override
		public Object getValue(BindingVariable variable) {
			if (identifiers.get(variable.getVariableName()) != null) {
				return identifiers.get(variable.getVariableName());
			}
			return super.getValue(variable);
		}

		@Override
		public <T> T getFlexoPropertyValue(FlexoProperty<T> flexoProperty) {
			if (identifiers.get(flexoProperty.getName()) != null) {
				return (T) identifiers.get(flexoProperty.getName());
			}
			/*System.out.println("Tiens, je cherche la valeur de " + flexoProperty);
			System.out.println("J'ai: " + identifiers);
			System.out.println("support: " + getSupport());
			if (getSupport() != null) {
				System.out.println("a priori: " + getSupport().getValue(flexoProperty.getName(), flexoProperty.getType()));
			}*/
			if (!fullInformationsHaveBeenRetrieved && getFlexoConcept().getDeclaredProperties().contains(flexoProperty)
					&& (getSupport() == null || !getSupport().hasValue(flexoProperty.getName()))) {
				retrieveFullInformations();
			}
			return super.getFlexoPropertyValue(flexoProperty);
		}

		@Override
		public ActorReference<? extends FlexoConceptInstance> makeActorReference(FlexoConceptInstanceRole role, FlexoConceptInstance fci) {
			AbstractVirtualModelInstanceModelFactory<?> factory = getFactory();
			RestObjectActorReference returned = factory.newInstance(RestObjectActorReference.class);
			returned.setFlexoRole((FlexoRole) role);
			returned.setFlexoConceptInstance(fci);
			returned.setModellingElement(this);
			return returned;
		}

		protected void retrieveFullInformations() {

			// We call it very early to be sure not to enter in a loop
			fullInformationsHaveBeenRetrieved = true;

			// System.out.println("retrieveFullInformations() for " + this);

			RestVirtualModelInstance restVMI = getVirtualModelInstance();

			VirtualModel vm = restVMI.getVirtualModel();
			FlexoConcept concept = vm.getFlexoConcept(getFlexoConceptURI());
			List<RestObjectRetriever> retrievers = concept.getFlexoBehaviours(RestObjectRetriever.class);
			if (retrievers.size() > 1) {
				logger.warning("More than one RestObjectRetriever for " + concept + " Using first one.");
			}
			if (retrievers.size() > 0) {
				getServiceManager().getTaskManager().scheduleExecution(new RestObjectRetrieverTask(this, restVMI.getEditor()));
			}
		}

		// private boolean toStringIsBuilding = false;

		@Override
		public String toString() {
			/*if (toStringIsBuilding) {
				return "RestFlexoConceptInstance";
			}
			try {
				toStringIsBuilding = true;
				return "RestFlexoConceptInstance " + getIdentifier();
			} finally {
				toStringIsBuilding = false;
			}*/
			return "RestFlexoConceptInstance " + hashCode();
		}
	}
}
