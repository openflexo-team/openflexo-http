package org.openflexo.http.connector.util;

import com.fasterxml.jackson.databind.JsonNode;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;

import java.util.ArrayList;
import java.util.List;

/**
 * Transforms Json representation to Flexo concept
 */
public class JsonToConcept {

	private final JsonNode source;
	private final FlexoConcept target;

	public JsonToConcept(JsonNode source, FlexoConcept target) {
		this.source = source;
		this.target = target;
	}

	public List<FlexoConceptInstance> transform() {
		List<FlexoConceptInstance> instances = new ArrayList<>();
		if (source.isArray()) {
			for (JsonNode node : source) {
				instances.add(transformObject(node));
			}
		} else {
			instances.add(transformObject(source));
		}
		return instances;
	}

	private FlexoConceptInstance transformObject(JsonNode node) {
		// TODO how to create a FlexoConceptInstance ?
		return null;
	}

}

