package org.openflexo.http.server;

import org.junit.Assert;
import org.junit.Test;
import org.openflexo.http.server.core.IdUtils;

/**
 * Tests for IdUtils
 */
public class IdUtilsTest {

	@Test
	public void testId1() {
		checkUriEncoding("http://openflexo.org//VirtualModel/ViewPoint1.viewpoint/ViewPoint1.xml");
		checkUriEncoding("http://openflexo.org//VirtualModel/lmlkmlkmlkmlk");
		checkUriEncoding("http://openflexo.org//VirtualModel/&é'(§");
		checkUriEncoding("http://openflexo.org//VirtualModel/%%ùù$$");
	}

	private void checkUriEncoding(String uri) {
		String encoded = IdUtils.encoreUri(uri);
		Assert.assertNotNull(encoded);
		Assert.assertEquals(uri, IdUtils.decodeId(encoded));
	}
}
