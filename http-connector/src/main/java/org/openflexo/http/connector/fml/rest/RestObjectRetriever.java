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

import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.fml.AbstractActionScheme;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.TechnologySpecificFlexoBehaviour;
import org.openflexo.foundation.fml.annotations.FML;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.http.connector.model.rest.RestFlexoConceptInstance;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * This behaviour is the specification of a REST request whose purpose it to obtain all informations stored by a
 * {@link RestFlexoConceptInstance} (a "distant" object reflected by an instance of {@link FlexoConcept})
 * 
 * @author sylvain
 *
 */
@ModelEntity
@ImplementationClass(RestObjectRetriever.RestObjectRetrieverImpl.class)
@XMLElement
@FML("RestObjectRetriever")
public interface RestObjectRetriever extends AbstractActionScheme, TechnologySpecificFlexoBehaviour {

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

	public static abstract class RestObjectRetrieverImpl extends AbstractActionSchemeImpl implements RestObjectRetriever {

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
		public HttpTechnologyAdapter getSpecificTechnologyAdapter() {
			if (getServiceManager() != null) {
				return getServiceManager().getTechnologyAdapterService().getTechnologyAdapter(HttpTechnologyAdapter.class);
			}
			return null;
		}

		/**
		 * Return a flag indicating if this behaviour support custom definition of parameters<br>
		 * We return false here
		 * 
		 * @return
		 */
		@Override
		public boolean supportParameters() {
			return false;
		}

	}
}
