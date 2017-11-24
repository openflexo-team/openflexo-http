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

package org.openflexo.http.connector.model;

import org.openflexo.foundation.fml.AbstractProperty;
import org.openflexo.foundation.fml.FlexoConceptInstanceRole;
import org.openflexo.foundation.fml.FlexoProperty;
import org.openflexo.foundation.fml.rt.ActorReference;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.http.connector.HttpModelSlot;
import org.openflexo.http.connector.model.HttpFlexoConceptInstance.HttpFlexoConceptInstanceImpl;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;

/**
 * An HTTP-specific {@link FlexoConceptInstance} reflecting a distant object accessible in an {@link HttpVirtualModelInstance} through a
 * {@link HttpModelSlot}
 * 
 */
@ModelEntity(isAbstract = true)
@ImplementationClass(HttpFlexoConceptInstanceImpl.class)
public interface HttpFlexoConceptInstance<S extends ContentSupport<?>> extends FlexoConceptInstance {

	/*@Initializer
	void initialize(@Parameter(OWNING_VIRTUAL_MODEL_INSTANCE_KEY) HttpVirtualModelInstance owner, S support,
			@Parameter(FLEXO_CONCEPT_URI_KEY) FlexoConcept concept);*/

	public S getSupport();

	public void setSupport(S support);

	public String getIdentifier();

	abstract class HttpFlexoConceptInstanceImpl<S extends ContentSupport<?>> extends FlexoConceptInstanceImpl
			implements HttpFlexoConceptInstance<S> {

		private S support;

		@Override
		public S getSupport() {
			return support;
		}

		@Override
		public void setSupport(S support) {
			if ((support == null && this.support != null) || (support != null && !support.equals(this.support))) {
				S oldValue = this.support;
				this.support = support;
				getPropertyChangeSupport().firePropertyChange("support", oldValue, support);
			}
		}

		@Override
		public <T> T getFlexoPropertyValue(FlexoProperty<T> flexoProperty) {
			if (getFlexoConcept().getAccessibleProperties().contains(flexoProperty) && flexoProperty instanceof AbstractProperty
					&& getSupport() != null) {
				// System.out.println("support = " + support);
				return (T) getSupport().getValue(flexoProperty.getName(), flexoProperty.getType());
			}
			return super.getFlexoPropertyValue(flexoProperty);
		}

		@Override
		public <T> void setFlexoPropertyValue(FlexoProperty<T> flexoProperty, T value) {
			if (flexoProperty instanceof AbstractProperty && getSupport() != null) {
				T oldValue = getFlexoPropertyValue(flexoProperty);
				if ((value == null && oldValue != null) || (value != null && !value.equals(oldValue))) {
					getSupport().setValue(flexoProperty.getName(), value);
					setIsModified();
					getPropertyChangeSupport().firePropertyChange(flexoProperty.getPropertyName(), oldValue, value);
				}
			}
			else {
				super.setFlexoPropertyValue(flexoProperty, value);
			}
		}

		/*@Override
		public String getReferenceForSerialization(boolean serializeClassName) {
			AccessPoint accessPoint = getVirtualModelInstance().getAccessPoint();
			String resourceURI = accessPoint.getResource().getURI();
			String conceptName = getFlexoConcept().getName();
			return FlexoObjectReference.constructSerializationRepresentation(null, resourceURI, getUserIdentifier(),
					support.getIdentifier(), conceptName);
		}*/

		@Override
		public String getIdentifier() {
			// TODO: implement caching
			if (getFlexoConcept() == null) {
				return null;
			}
			if (identifier == null) {
				if (getFlexoConcept() != null) {
					if (getFlexoConcept().getKeyProperties().size() > 1) {
						StringBuffer sb = new StringBuffer();
						boolean isFirst = true;
						for (FlexoProperty<?> keyP : getFlexoConcept().getKeyProperties()) {
							sb.append((isFirst ? "" : ",") + keyP.getName() + "=" + getFlexoPropertyValue(keyP));
							isFirst = false;
						}
						identifier = sb.toString();
					}
					else if (getFlexoConcept().getKeyProperties().size() > 0) {
						Object keyValue = getFlexoPropertyValue(getFlexoConcept().getKeyProperties().get(0));
						if (keyValue != null) {
							identifier = keyValue.toString();
						}
					}
				}
			}
			return identifier;
		}

		private String identifier = null;

		@Override
		public abstract ActorReference<? extends FlexoConceptInstance> makeActorReference(FlexoConceptInstanceRole role,
				FlexoConceptInstance fci);

	}
}
