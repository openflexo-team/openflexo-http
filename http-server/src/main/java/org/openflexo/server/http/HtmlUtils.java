package org.openflexo.server.http;

import j2html.tags.ContainerTag;

import static j2html.TagCreator.*;

/**
 * Created by charlie on 18/01/2017.
 */
public class HtmlUtils {

	public static ContainerTag createHeader(String title) {
		ContainerTag result = header();
		result.with(title(title));
		result.with(meta().withCharset("UTF-8"));
		return result;
	}

}
