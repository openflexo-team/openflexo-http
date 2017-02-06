package org.openflexo.http.connector.fml.editionaction;

import org.openflexo.connie.DataBinding;
import org.openflexo.foundation.fml.annotations.FML;
import org.openflexo.foundation.fml.editionaction.FetchRequest;
import org.openflexo.foundation.fml.rt.RunTimeEvaluationContext;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.http.connector.RestModelSlot;
import org.openflexo.http.connector.fml.editionaction.HttpRequestAction.HttpRequestActionImpl;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.PropertyIdentifier;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by charlie on 03/02/2017.
 */

@ModelEntity
@ImplementationClass(HttpRequestActionImpl.class)
@XMLElement
@FML("HttpRequest")
public interface HttpRequestAction extends FetchRequest<RestModelSlot, VirtualModelInstance> {

	@PropertyIdentifier(type = DataBinding.class)
	String PATH = "path";

	@Getter(PATH)
	@XMLAttribute
	DataBinding<String> getPath();

	@Setter(PATH)
	void setPath(DataBinding<String> path);

	abstract class HttpRequestActionImpl
		extends FetchRequestImpl<RestModelSlot, VirtualModelInstance>
		implements HttpRequestAction
	{

		private static final Logger logger = Logger.getLogger(HttpRequestAction.class.getPackage().getName());

		private DataBinding<String> path;

		@Override
		public Type getFetchedType() {
			return VirtualModelInstance.class;
		}

		@Override
		public List<VirtualModelInstance> execute(RunTimeEvaluationContext evaluationContext) {

			if (getModelSlotInstance(evaluationContext) == null) {
				logger.warning("Could not access model slot instance. Abort.");
				return null;
			}
			if (getModelSlotInstance(evaluationContext).getResourceData() == null) {
				logger.warning("Could not access model adressed by model slot instance. Abort.");
				return null;
			}

			List<VirtualModelInstance> instances = new ArrayList<>();

			return filterWithConditions(instances, evaluationContext);

		}

		@Override
		public DataBinding<String> getPath() {
			if (path == null) {
				path = new DataBinding<>(this, String.class, DataBinding.BindingDefinitionType.GET);
				path.setBindingName("path");
			}
			return path;
		}

		@Override
		public void setPath(DataBinding<String> path) {
			if (path != null) {
				path.setOwner(this);
				path.setDeclaredType(String.class);
				path.setBindingDefinitionType(DataBinding.BindingDefinitionType.GET);
				path.setBindingName("path");
			}
			this.path = path;
		}
	}
}
