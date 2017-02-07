package org.openflexo.http.connector.model;

import org.junit.Test;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.model.exceptions.ModelDefinitionException;

import java.io.IOException;
import java.util.List;

/**
 * Tests for UrlModel
 */
public class UrlModelTest {

	@Test
	public void testGetFlexoConcepts() throws ModelDefinitionException, IOException {
		HttpFactory factory = new HttpFactory();
		// https://api.github.com/resource
		UrlModel urlModel = factory.makeNewModel("http://api.github.com", "/users/openflexo-team/repos");
		List<FlexoConceptInstance> result = urlModel.retrieveConcepts(null);
		System.out.println(result);
	}

}
