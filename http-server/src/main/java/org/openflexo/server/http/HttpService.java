package org.openflexo.server.http;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.http.HttpServerResponse;
import org.openflexo.foundation.FlexoService;
import org.openflexo.foundation.FlexoServiceImpl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

/**
 * Created by charlie on 17/01/2017.
 */
public class HttpService extends FlexoServiceImpl implements FlexoService {

	private static Logger logger = Logger.getLogger(HttpService.class.getPackage().getName());

	public static class Options {
		public int port = 8080;

		public String host = "localhost";

		public String webDirectory = "./web";

	}

	private final int port;
	private final String host;

	private final Path webPath;

	private final Vertx vertx = Vertx.vertx();
	private final HttpServerOptions serverOptions;

	private HttpServer server = null;

	public HttpService(Options options) {
		this.port = options.port;
		this.host = options.host;
		serverOptions = new HttpServerOptions();

		this.webPath = Paths.get(options.webDirectory);
	}

	@Override
	public void initialize() {
		server = vertx.createHttpServer(serverOptions);
		server.requestHandler(this::authentication);
		logger.info("Starting HTTP Server on " + host + ":" + port);
		server.listen(port, host);
	}

	private Path resolveWebPath(String relativePath) {
		// trim "/" a the beginning
		Path result = webPath.resolve(relativePath.substring(1));
		// ensure that result is child of web path and that the file exists
		if (!result.startsWith(webPath) || !Files.exists(result)) return null;
		return result;
	}


	private void authentication(HttpServerRequest request) {
		logger.info("Accessing " +  request.path());
		// TODO authentication
		dispatch(request);
	}

	private void dispatch(HttpServerRequest request) {
		String path = request.path();
		HttpServerResponse response = request.response();
		if (path.startsWith("/resource")) {

		} else if (path.startsWith("/api")) {

		} else {
			Path filename = resolveWebPath(path);
			if (filename != null) {
				response.sendFile(filename.toAbsolutePath().toString());
			} else {
				response.setStatusCode(404);
				response.end();
			}
		}
	}

	@Override
	public void stop() {
		server.close();
	}


}
