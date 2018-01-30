/**
 * 
 * Copyright (c) 2014-2015, Openflexo
 * 
 * This file is part of Flexodiagram, a component of the software infrastructure 
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

package org.openflexo.http.connector.fml.rest;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.openflexo.connie.DataBinding;
import org.openflexo.connie.exception.NullReferenceException;
import org.openflexo.connie.exception.TypeMismatchException;
import org.openflexo.foundation.fml.FlexoConceptInstanceRole;
import org.openflexo.foundation.fml.FlexoRole;
import org.openflexo.foundation.fml.rt.ActorReference;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.rest.RestFlexoConceptInstance;
import org.openflexo.http.connector.model.rest.RestVirtualModelInstance;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * A role specific to Rest technology allowing to access a rest object (or a collection of rest objects) through a rest http request
 * 
 * @author sylvain
 *
 */
@ModelEntity
@ImplementationClass(RestObjectRole.RestObjectRoleImpl.class)
@XMLElement
public interface RestObjectRole extends FlexoConceptInstanceRole {

	@PropertyIdentifier(type = DataBinding.class)
	public static final String URL_KEY = "url";
	@PropertyIdentifier(type = String.class)
	String POINTER_KEY = "pointer";

	@Getter(value = URL_KEY)
	@XMLAttribute
	public DataBinding<String> getUrl();

	@Setter(URL_KEY)
	public void setUrl(DataBinding<String> url);

	@Getter(POINTER_KEY)
	@XMLAttribute
	String getPointer();

	@Setter(POINTER_KEY)
	void setPointer(String pointer);

	public static abstract class RestObjectRoleImpl extends FlexoConceptInstanceRoleImpl implements RestObjectRole {

		private static final Logger logger = Logger.getLogger(RestObjectRoleImpl.class.getPackage().getName());

		private DataBinding<String> url;

		@Override
		public DataBinding<String> getUrl() {
			if (url == null) {
				url = new DataBinding<>(this, String.class, DataBinding.BindingDefinitionType.GET);
				url.setBindingName("url");
				url.setMandatory(true);

			}
			return url;
		}

		@Override
		public void setUrl(DataBinding<String> url) {
			if (url != null) {
				this.url = new DataBinding<>(url.toString(), this, String.class, DataBinding.BindingDefinitionType.GET);
				url.setBindingName("url");
				url.setMandatory(true);
			}
			notifiedBindingChanged(this.url);
		}

		@Override
		public Class<? extends TechnologyAdapter> getRoleTechnologyAdapterClass() {
			return HttpTechnologyAdapter.class;
		}

		/**
		 * Return a boolean indicating if this {@link FlexoRole} handles itself instantiation and management of related ActorReference
		 * 
		 * @return
		 */
		@Override
		public boolean supportSelfInstantiation() {
			return true;
		}

		/**
		 * Performs self instantiation
		 * 
		 * @param fci
		 * @return
		 */
		@Override
		public List<? extends ActorReference<? extends FlexoConceptInstance>> selfInstantiate(FlexoConceptInstance fci) {
			try {
				String url = getUrl().getBindingValue(fci);
				logger.info("Executing REST request " + url);

				if (fci.getVirtualModelInstance() instanceof RestVirtualModelInstance) {
					RestVirtualModelInstance vmi = (RestVirtualModelInstance) fci.getVirtualModelInstance();
					FlexoConceptInstance container = vmi;
					if (getContainer().isSet() && getContainer().isValid()) {
						Object object = getContainer().getBindingValue(fci);
						if (object instanceof FlexoConceptInstance) {
							container = (FlexoConceptInstance) object;
						}
					}
					List<RestFlexoConceptInstance> flexoConceptInstances = vmi.getFlexoConceptInstances(url, getPointer(), container,
							getFlexoConceptType());
					List returned = new ArrayList<>();
					for (RestFlexoConceptInstance target : flexoConceptInstances) {
						returned.add(makeActorReference(target, fci));
					}
					return returned;
				}

			} catch (TypeMismatchException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NullReferenceException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return super.selfInstantiate(fci);
		}

	}
}
