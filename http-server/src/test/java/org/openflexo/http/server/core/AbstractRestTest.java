package org.openflexo.http.server.core;


import io.vertx.core.Vertx;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openflexo.http.server.OpenFlexoServer;

@ExtendWith(VertxExtension.class)
public abstract class AbstractRestTest {
    @BeforeAll
    public static void setUp(Vertx vertx, VertxTestContext testContext) {
        vertx.deployVerticle(new OpenFlexoServer(), testContext.succeedingThenComplete());
    }

    @AfterAll
    public static void cleanUp(Vertx vertx) {
        vertx.close();
    }
}
