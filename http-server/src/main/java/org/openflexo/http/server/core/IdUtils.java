package org.openflexo.http.server.core;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;

/**
 * Created by charlie on 07/02/2017.
 */
public class IdUtils {

	private final static Encoder encoder = Base64.getUrlEncoder().withoutPadding();
	private final static Decoder urlDecoder = Base64.getUrlDecoder();

	public static String encoreUri(String uri) {
		return encoder.encodeToString(uri.getBytes(StandardCharsets.ISO_8859_1));
	}

	public static String decodeId(String encoded) {
		return new String(urlDecoder.decode(encoded), StandardCharsets.ISO_8859_1);
	}

	public static String decodeUrlSpecialCharacters(String url) {
		try {
			return URLDecoder.decode(url, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			/* can't happen */
			return url;
		}
	}


	private static Set<Character> validCharacters = Stream.of(
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '-', '_', '.', '+', '!', '*', '\'', '(', ')'
		).collect(Collectors.toSet());

	/**
	 * Cleans given raw id to construct a sanitized id for REST apis.
	 * Only Alphanumerics [0-9a-zA-Z] and special characters $-_.+!*'(), are allowed.
	 *
	 * A raw id will always give the same sanitized id but it's not possible to reconstruct
	 * the raw id from the sanitized one.
	 *
	 * @param rawId id to clean, cant be null
	 * @return a sanitized id, never null,never empty
	 * @throws NullPointerException if raw id is null
	 * @throws IllegalArgumentException if clean id is empty.
	 */
	public static String sanitiseId(String rawId) {
		if (rawId == null) throw new NullPointerException();

		StringBuilder id = new StringBuilder();
		for (int i = 0; i < rawId.length(); i++) {
			char current = rawId.charAt(i);
			if (validCharacters.contains(current)) {
				id.append(Character.toLowerCase(current));
			}
		}
		if (id.length() == 0) throw new IllegalArgumentException("Sanitized id is empty from '" + rawId +"'");
		return id.toString();
	}

	public static String getTechnologyAdapterId(TechnologyAdapter adapter) {
		return sanitiseId(adapter.getIdentifier());
	}

}
