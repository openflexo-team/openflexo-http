package org.openflexo.http.connector;

import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.foundation.technologyadapter.TechnologyObject;
import org.openflexo.http.connector.UrlModel.UrlModelImpl;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ImplementationClass;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 */
@ModelEntity
@XMLElement
@ImplementationClass(UrlModelImpl.class)
public interface UrlModel extends TechnologyObject<HttpTechnologyAdapter>, ResourceData<UrlModel> {

	String HOST = "host";
	String PORT = "port";
	String PATH = "path";

	@Getter(HOST) @XMLAttribute
	String getHost();

	@Setter(HOST)
	void setHost(String host);

	@Getter(PORT) @XMLAttribute
	int getPort();

	@Setter(PORT)
	void setPort(int port);

	@Getter(PATH) @XMLAttribute
	String getPath();

	@Setter(PATH)
	void setPath(String path);

	String getUrl();

	abstract class UrlModelImpl extends FlexoObjectImpl implements UrlModel {

		@Override
		public String getUrl() {
			String host = getHost() == null ? "localhost" : getHost();
			int port = getPort() <= 0 ? 80 : getPort();
			return "http://" + host + ":" + port + getPath();
		}
	}

}
