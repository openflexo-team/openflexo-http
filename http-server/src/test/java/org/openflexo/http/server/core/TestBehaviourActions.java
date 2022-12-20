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

@DisplayName("Behaviour Actions Integration tests")
public class TestBehaviourActions extends AbstractRestTest {
    static JsonObject resourceCenter, flexoProject, vm, behaviour, action;

    @Test
    @Order(1)
    @Timeout(1000)
    public void initRc(Vertx vertx, VertxTestContext context){
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
    public void initPrj(Vertx vertx, VertxTestContext context){
        WebClient client        = WebClient.create(vertx);
        MultiMap form           = MultiMap.caseInsensitiveMultiMap();

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
    public void initVm(Vertx vertx, VertxTestContext context) {
        WebClient client    = WebClient.create(vertx);
        MultiMap form       = MultiMap.caseInsensitiveMultiMap();

        form.set("project_id", flexoProject.getString("id"));
        form.set("name", "VirtualModel");
        form.set("is_abstract", "false");
        form.set("visibility", "public");

        client.post(9090, "localhost", "/vm/add")
                .sendForm(form)
                .onSuccess(res -> {
                    vm = res.bodyAsJsonObject();

                    Assertions.assertEquals(vm.getString("name"), "VirtualModel");
                    Assertions.assertEquals(flexoProject.getString("project_id"), vm.getString("project_id"));
                    Assertions.assertEquals(res.statusCode(), 200);

                    context.completeNow();
                });
    }

    @Test
    @Order(4)
    @Timeout(1000)
    public void initBhv(Vertx vertx, VertxTestContext context) {
        WebClient client    = WebClient.create(vertx);
        MultiMap form       = MultiMap.caseInsensitiveMultiMap();
        String vmId         = vm.getString("id");
        String name         = "behaviour1";

        form.set("name", name);
        form.set("is_abstract", "false");
        form.set("visibility", "public");
        form.set("type", "action");

        client.post(9090, "localhost", "/vm/" + vmId + "/cp/" + vmId + "/bhv/add")
                .sendForm(form)
                .onSuccess(res -> {
                    behaviour = res.bodyAsJsonObject();

                    Assertions.assertEquals(behaviour.getString("visibility"), "Public");
                    Assertions.assertEquals(behaviour.getString("is_abstract"), "false");
                    Assertions.assertEquals(behaviour.getString("name"), name);
                    Assertions.assertEquals(behaviour.getString("virtual_model_id"), vmId);
                    Assertions.assertEquals(res.statusCode(), 200);

                    context.completeNow();
                });
    }

    @RepeatedTest(5)
    @Order(5)
    @Timeout(1000)
    public void createLogAction(Vertx vertx, VertxTestContext context) {
        WebClient client    = WebClient.create(vertx);
        MultiMap form       = MultiMap.caseInsensitiveMultiMap();
        String vmId         = vm.getString("id");

        form.set("value", "\"Test\"");
        form.set("level", "info");

        client.post(9090, "localhost", "/vm/" + vmId + "/cp/" + vmId + "/bhv/" + behaviour.getString("signature") + "/act/add-log")
                .sendForm(form)
                .onSuccess(res -> {

                    action = res.bodyAsJsonObject();

                    Assertions.assertEquals(action.getString("resource_type"), "BehaviourAction");
//                    Assertions.assertEquals(action.getString("behaviour_id"), behaviour.getString("id"));
//                    Assertions.assertEquals(res.statusCode(), 200);

                    context.completeNow();
                });
    }

}
