package org.openflexo.http.connector.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.foundation.technologyadapter.TechnologyObject;
import org.openflexo.http.connector.HttpTechnologyAdapter;
import org.openflexo.model.annotations.Getter;
import org.openflexo.model.annotations.ModelEntity;
import org.openflexo.model.annotations.Setter;
import org.openflexo.model.annotations.XMLAttribute;
import org.openflexo.model.annotations.XMLElement;

/**
 * AccessPoint to an HTTP service
 */
@ModelEntity
@XMLElement
public interface AccessPoint extends TechnologyObject<HttpTechnologyAdapter>, ResourceData<AccessPoint> {

	String HOST = "host";
	String PORT = "port";
	String PATH = "path";

	@Getter(value = HOST, defaultValue = "localhost") @XMLAttribute
	String getHost();

	@Setter(HOST)
	void setHost(String host);

	@Getter(value = PORT, defaultValue = "-1") @XMLAttribute
	int getPort();

	@Setter(PORT)
	void setPort(int port);

	@Getter(PATH) @XMLAttribute
	String getPath();

	@Setter(PATH)
	void setPath(String path);

	default String getUrl() {
		String port = getPort() >= 0 ? ":" + getPort() : "";
		return getHost() + port + getPath();
	}

	default List<FlexoConceptInstance> retrieveConcepts(FlexoConcept concept) throws IOException {
		List<FlexoConceptInstance> instances = new ArrayList<>();
		try (CloseableHttpClient httpClient = HttpClients.createDefault()) {

			HttpGet get = new HttpGet(getUrl());
			CloseableHttpResponse response = httpClient.execute(get);
			HttpEntity entity = response.getEntity();

			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(entity.getContent());
			System.out.println(node);

		}

		return instances;
	}

}
