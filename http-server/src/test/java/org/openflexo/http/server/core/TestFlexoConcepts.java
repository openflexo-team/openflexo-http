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
import java.util.UUID;

@DisplayName("Flexo Concepts Integration tests")
public class TestFlexoConcepts extends AbstractRestTest {
    static JsonObject resourceCenter, flexoProject, vm, concept;

    @Test
    @Order(1)
    @Timeout(1000)
    public void initRc(Vertx vertx, VertxTestContext context){
        WebClient client        = WebClient.create(vertx);
        MultiMap form           = MultiMap.caseInsensitiveMultiMap();
        File resourcesDirectory = new File("src/test/resources/resource_center/");

        form.set("rc_path", resourcesDirectory.getAbsolutePath());

        client.post(9090, "localhost", "/rc/")
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
    public void initPrj(Vertx vertx, VertxTestContext context){
        WebClient client        = WebClient.create(vertx);
        MultiMap form           = MultiMap.caseInsensitiveMultiMap();

        form.set("resource_center_id", resourceCenter.getString("id"));
        form.set("name", "TestProject");

        client.post(9090, "localhost", "/prj/")
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
    public void initVm(Vertx vertx, VertxTestContext context) {
        WebClient client    = WebClient.create(vertx);
        MultiMap form       = MultiMap.caseInsensitiveMultiMap();

        form.set("project_id", flexoProject.getString("id"));
        form.set("name", "VirtualModel");
        form.set("is_abstract", "false");
        form.set("visibility", "public");

        client.post(9090, "localhost", "/vm/")
            .sendForm(form)
            .onSuccess(res -> {
                vm = res.bodyAsJsonObject();

                Assertions.assertEquals(vm.getString("name"), "VirtualModel");
                Assertions.assertEquals(flexoProject.getString("project_id"), vm.getString("project_id"));
                Assertions.assertEquals(res.statusCode(), 200);

                context.completeNow();
            });
    }

    @RepeatedTest(5)
    @Order(4)
    @Timeout(1000)
    public void create(Vertx vertx, VertxTestContext context) {
        WebClient client    = WebClient.create(vertx);
        MultiMap form       = MultiMap.caseInsensitiveMultiMap();
        String vmId         = vm.getString("id");
        String name         = "Concept" + UUID.randomUUID().hashCode();

        form.set("name", name);
        form.set("is_abstract", "false");
        form.set("visibility", "public");

        client.post(9090, "localhost", "/vm/" + vmId + "/cp/")
            .sendForm(form)
            .onSuccess(res -> {
                concept = res.bodyAsJsonObject();

                Assertions.assertEquals(concept.getString("visibility"), "Public");
                Assertions.assertEquals(concept.getString("is_abstract"), "false");
                Assertions.assertEquals(concept.getString("name"), name);
                Assertions.assertEquals(concept.getString("virtual_model_id"), vmId);
                Assertions.assertEquals(res.statusCode(), 200);

                context.completeNow();
            });

        System.out.println(vm);
    }

    @Test
    @Order(5)
    @Timeout(1000)
    public void get(Vertx vertx, VertxTestContext context) {
        HttpClient client   = vertx.createHttpClient();
        String id           = concept.getString("id");
        String vmId         = vm.getString("id");


        client.request(HttpMethod.GET, 9090, "localhost", "/vm/" + vmId + "/cp/" + id)
            .compose(req -> req.send()
            .compose(HttpClientResponse::body))
            .onSuccess(res -> {
                Assertions.assertEquals(concept.getString("visibility"), "Public");
                Assertions.assertEquals(concept.getString("is_abstract"), "false");
                Assertions.assertEquals(concept.getString("virtual_model_id"), vmId);
                Assertions.assertEquals(res.toJsonObject().getString("id"), id);

                context.completeNow();
            });
    }

    @Test
    @Order(6)
    @Timeout(1000)
    public void list(Vertx vertx, VertxTestContext context) {
        HttpClient client   = vertx.createHttpClient();
        String vmId         = vm.getString("id");

        client.request(HttpMethod.GET, 9090, "localhost", "/vm/" + vmId + "/cp/")
            .compose(req -> req.send()
            .compose(HttpClientResponse::body))
            .onSuccess(res -> {
                Assertions.assertEquals(res.toJsonArray().size(), 5);

                context.completeNow();
            });
    }
}
