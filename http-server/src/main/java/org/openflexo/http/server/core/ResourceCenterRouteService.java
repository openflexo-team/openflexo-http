package org.openflexo.http.server.core;

import java.io.*;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.FileUpload;
import io.vertx.ext.web.handler.BodyHandler;
import org.apache.commons.io.FileUtils;
import org.openflexo.foundation.DefaultFlexoServiceManager;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.FMLTechnologyAdapter;
import org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter;
import org.openflexo.foundation.resource.*;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterService;
import org.openflexo.http.server.HttpService;
import org.openflexo.http.server.RouteService;
import org.openflexo.http.server.json.JsonUtils;
import org.openflexo.http.server.util.IdUtils;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

import org.openflexo.http.server.OpenFlexoServer;
import org.python.jline.internal.Log;

import org.openflexo.toolbox.ZipUtils;
/**
 * Created by charlie on 11/02/2017.
 */
public class ResourceCenterRouteService implements RouteService<FlexoServiceManager> {

	private FlexoResourceCenterService resourceCenterService;

	private TechnologyAdapterRouteService technologyAdapterRestService;

	private final static String resourceCentersLocation = "/Users/mac/openflexo/2.0.1/openflexo-http/http-connector-rc/src/main/resources/API/";

	@Override
	public void initialize(HttpService service, FlexoServiceManager serviceManager) throws Exception {
		resourceCenterService = serviceManager.getResourceCenterService();
		technologyAdapterRestService = service.getTechnologyAdapterRestService();
	}

	public static FlexoServiceManager createServiceManager(OpenFlexoServer.Options options) {
		FlexoServiceManager manager = new DefaultFlexoServiceManager(null, options.devMode);
		TechnologyAdapterService technologyAdapterService = manager.getTechnologyAdapterService();
		technologyAdapterService.activateTechnologyAdapter(technologyAdapterService.getTechnologyAdapter(FMLTechnologyAdapter.class), true);
		technologyAdapterService.activateTechnologyAdapter(technologyAdapterService.getTechnologyAdapter(FMLRTTechnologyAdapter.class),
				true);
		return manager;
	}

	@Override
	public void addRoutes(Vertx vertx, Router router) {
		router.route().handler(BodyHandler.create());

		router.get("/rc").produces(JSON).handler(this::serveResourceCenterList);
		router.post("/rc/add").produces(JSON).handler(this::addResourceCenter);
		router.get("/rc/:rcid").produces(JSON).handler(this::serveResourceCenter);
		router.get("/rc/:rcid/resource").produces(JSON).handler(this::serveResourceCenterResourceList);
		router.get("/rc/:rcid/resource/*").produces(JSON).handler(this::serveResourceCenterResourceFolderList);

	}

	private void serveResourceCenterList(RoutingContext context) {
		JsonArray result = new JsonArray();
		for (FlexoResourceCenter<?> center : resourceCenterService.getResourceCenters()) {
			result.add(JsonUtils.getCenterDescription(center));
		}
		context.response().end(result.encodePrettily());
	}

	private void serveResourceCenter(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String uri = IdUtils.decodeId(centerId);

		FlexoResourceCenter<?> resourceCenter = resourceCenterService.getFlexoResourceCenter(uri);
		if (resourceCenter != null) {
			context.response().end(JsonUtils.getCenterDescription(resourceCenter).encodePrettily());
		}
		else {
			notFound(context);
		}
	}

	private void serveResourceCenterResourceList(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String centerUri = IdUtils.decodeId(centerId);

		FlexoResourceCenter<?> resourceCenter = resourceCenterService.getFlexoResourceCenter(centerUri);
		if (resourceCenter != null) {
			JsonArray result = new JsonArray();
			for (FlexoResource<?> resource : resourceCenter.getAllResources()) {
				result.add(JsonUtils.getResourceDescription(resource, technologyAdapterRestService));
			}
			context.response().end(result.encodePrettily());
		}
		else {
			notFound(context);
		}
	}

	private void serveResourceCenterResourceFolderList(RoutingContext context) {
		String centerId = context.request().getParam(("rcid"));
		String centerUri = IdUtils.decodeId(centerId);

		String path = context.request().path();
		String pathFragment = "resource";
		String folder = path.substring(path.lastIndexOf(pathFragment) + pathFragment.length());

		String[] fragments = IdUtils.decodeUrlSpecialCharacters(folder).split("/");

		FlexoResourceCenter<Object> resourceCenter = (FlexoResourceCenter<Object>) resourceCenterService.getFlexoResourceCenter(centerUri);
		if (resourceCenter != null) {
			Object current = resourceCenter.getBaseArtefact();
			if (fragments.length > 0) {
				for (String fragment : fragments) {
					if (fragment.length() == 0)
						continue;

					List<Object> children = resourceCenter.getContents(current);
					boolean found = false;
					for (Object child : children) {
						if (fragment.equals(resourceCenter.retrieveName(child))) {
							current = child;
							found = true;
							break;
						}
					}

					if (!found) {
						current = null;
						break;
					}
				}
			}

			if (current != null) {
				JsonArray result = new JsonArray();
				List<Object> children = resourceCenter.getContents(current);
				for (Object child : children) {
					String name = resourceCenter.retrieveName(child);
					if (resourceCenter.isDirectory(child)) {
						result.add(JsonUtils.getFolderDescription(name, folder, centerId));
					}
					else {
						FlexoResource resource = resourceCenter.getResource(child, FlexoResource.class);
						if (resource != null) {
							result.add(JsonUtils.getResourceDescription(resource, technologyAdapterRestService));
						}
					}
				}
				context.response().end(result.encodePrettily());
			}
			else {
				notFound(context);
			}

		}
		else {
			notFound(context);
		}
	}

	private void addResourceCenter(RoutingContext context){
		String rcPath = context.request().getFormAttribute("rcpath");
//		badRequest(context, "test test");

		if (rcPath != null){
			if(Files.exists(Paths.get(rcPath))){
				this.addResourceCenterViaPath(context, resourceCenterService);
			} else {
				badRequest(context);
			}

		} else {
			this.addResourceCenterViaFile(context, resourceCenterService);
		}
	}

	private void addResourceCenterViaPath(RoutingContext context, FlexoResourceCenterService centerService) {
		String rcPath = context.request().getFormAttribute("rcpath");

		if(Files.exists(Paths.get(rcPath))){
			DirectoryResourceCenter center = null;
			Log.info(rcPath);
			try {
				center = DirectoryResourceCenter.instanciateNewDirectoryResourceCenter(new File(rcPath), centerService);
				centerService.addToResourceCenters(center);
				context.response().end(JsonUtils.getCenterDescription(center).encodePrettily());
			} catch (IOException e) {
				error(context, e);
			}
		} else {
			notFound(context);
		}
	}

	private void addResourceCenterViaFile(RoutingContext context, FlexoResourceCenterService centerService) {
		Set<FileUpload> fileUploadSet 			= context.fileUploads();
		Iterator<FileUpload> fileUploadIterator = fileUploadSet.iterator();
		JsonObject response 					= new JsonObject();
		int counter								= 1;

		while (fileUploadIterator.hasNext()){
			FileUpload fileUpload 	= fileUploadIterator.next();
			Buffer uploadedFile 	= context.vertx().fileSystem().readFileBlocking(fileUpload.uploadedFileName());
			byte[] buffredBytes 	= uploadedFile.getBytes();

			try {
//				long now 			= System.currentTimeMillis();
//				String targetDir 	= resourceCentersLocation + "uploaded_rc/" + now + "/";
				String targetDir 	= resourceCentersLocation + "uploaded_rc/";
				File uploadedRc 	= new File(resourceCentersLocation + "uploaded_rc.zip");

				FileUtils.writeByteArrayToFile(uploadedRc, buffredBytes);
				ZipUtils.unzipFile(resourceCentersLocation + "uploaded_rc.zip",targetDir);

				//Delete unnecessary files
				uploadedRc.delete();

				try{
//					Files.walk(Paths.get(resourceCentersLocation + "uploaded_rc/" + now + "/__MACOSX/")).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
					Files.walk(Paths.get(resourceCentersLocation + "uploaded_rc/__MACOSX/")).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
				} catch(NoSuchFileException e){
					Log.warn("No __MACOSX folder to delete");
				}

				try{
//					Files.walk(Paths.get(resourceCentersLocation + "uploaded_rc/" + now + "/.DS_Store")).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
					Files.walk(Paths.get(resourceCentersLocation + "uploaded_rc/.DS_Store")).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
				} catch(NoSuchFileException e){
					Log.warn("No DS_Store file to delete");
				}

				File[] files = new File(targetDir).listFiles();

				if(files != null && files.length > 0 && files[0].getName().endsWith(".prj")){
					targetDir += files[0].getName();
				}

				try {
					DirectoryResourceCenter center = DirectoryResourceCenter.instanciateNewDirectoryResourceCenter(new File(targetDir), centerService);
					centerService.addToResourceCenters(center);
					response.put("rc" + counter, JsonUtils.getCenterDescription(center));
					Log.info(JsonUtils.getCenterDescription(center));
					counter++;
				} catch (IOException e) {
					error(context, e);
				}
			} catch (IOException e) {
				throw new RuntimeException(e);
			}

			// some useful information (for future validation rules)
			try {
				String fileName = URLDecoder.decode(fileUpload.fileName(), "UTF-8");
				Log.info(fileName);
				Log.info(fileUpload.size());
				Log.info(fileUpload.contentType());
				Log.info(fileUpload.contentTransferEncoding());
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

		}
		context.response().end(response.encodePrettily());
	}
}
