package org.openflexo.http.server.core;

import io.vertx.core.MultiMap;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpClient;
import io.vertx.core.http.HttpClientResponse;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.client.WebClient;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.*;

import java.io.File;

@DisplayName("Projects Integration tests")
public class TestFlexoProjects extends AbstractRestTest {
    static JsonObject resourceCenter, flexoProject;

    @Test
    @Order(1)
    @Timeout(1000)
    public void init(Vertx vertx, VertxTestContext context){
        WebClient client        = WebClient.create(vertx);
        MultiMap form           = MultiMap.caseInsensitiveMultiMap();
        File resourcesDirectory = new File("src/test/resources/resource_center/");

        form.set("rc_path", resourcesDirectory.getAbsolutePath());

        client.post(9090, "localhost", "/rc/add")
                .sendForm(form)
                .onSuccess(res -> {
                    resourceCenter = res.bodyAsJsonObject();

                    Assertions.assertEquals(res.statusCode(), 200);

                    context.completeNow();
                });
    }

    @Test
    @Order(2)
    @Timeout(1000)
    public void createProject(Vertx vertx, VertxTestContext context) {
        WebClient client    = WebClient.create(vertx);
        MultiMap form       = MultiMap.caseInsensitiveMultiMap();

        form.set("rc_id", resourceCenter.getString("id"));
        form.set("name", "TestProject");

        client.post(9090, "localhost", "/prj/add")
                .sendForm(form)
                .onSuccess(res -> {
                    flexoProject = res.bodyAsJsonObject();

                    Assertions.assertEquals(flexoProject.getString("name"), "TestProject");
                    Assertions.assertEquals(res.statusCode(), 200);

                    context.completeNow();
                });
    }

    @Test
    @Order(3)
    @Timeout(1000)
    public void getProject(Vertx vertx, VertxTestContext context) {
        HttpClient client   = vertx.createHttpClient();
        String id           = flexoProject.getString("id");

        client.request(HttpMethod.GET, 9090, "localhost", "/prj/" + id)
                .compose(req -> req.send()
                        .compose(HttpClientResponse::body))
                .onSuccess(res -> {

                    Assertions.assertEquals(res.toJsonObject().getString("id"), id);

                    context.completeNow();
                });
    }

    @Test
    @Order(4)
    @Timeout(1000)
    public void listProjects(Vertx vertx, VertxTestContext context) {
        HttpClient client = vertx.createHttpClient();

        client.request(HttpMethod.GET, 9090, "localhost", "/prj/")
                .compose(req -> req.send()
                .compose(HttpClientResponse::body))
                .onSuccess(res -> {
                    Assertions.assertEquals(res.toJsonArray().size(), 1);

                    context.completeNow();
                });
        Assertions.assertEquals(3, 3);
    }

    @Test
    @Order(5)
    @Timeout(1000)
    public void createFolder(Vertx vertx, VertxTestContext context) {
        WebClient client    = WebClient.create(vertx);
        MultiMap form       = MultiMap.caseInsensitiveMultiMap();
        String id           = flexoProject.getString("id");
        form.set("name", "TestFolder");

        client.post(9090, "localhost", "/prj/" + id + "/fdr/add")
                .sendForm(form)
                .onSuccess(res -> {

                    Assertions.assertEquals(res.bodyAsJsonObject().getString("name"), "TestFolder");
                    Assertions.assertEquals(res.statusCode(), 200);

                    context.completeNow();
                });
    }

    @Test
    @Order(6)
    @Timeout(1000)
    public void listFolders(Vertx vertx, VertxTestContext context) {
        HttpClient client   = vertx.createHttpClient();
        String id           = flexoProject.getString("id");

        client.request(HttpMethod.GET, 9090, "localhost", "/prj/" + id + "/fdr/")
                .compose(req -> req.send()
                .compose(HttpClientResponse::body))
                .onSuccess(res -> {
                    Assertions.assertEquals(res.toJsonArray().size(), 1);

                    context.completeNow();
                });
        Assertions.assertEquals(3, 3);
    }
}
