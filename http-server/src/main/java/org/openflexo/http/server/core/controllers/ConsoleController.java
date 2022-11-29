package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.fml.FlexoConcept;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.rt.logging.FMLConsole;
import org.openflexo.foundation.fml.rt.logging.FMLLogRecord;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.serializers.JsonSerializer;

/**
 *  Console rest apis controller.
 * @author Ihab Benamer
 */
public class ConsoleController extends GenericController{

    private final VirtualModelLibrary virtualModelLibrary;

    /**
     * Instantiates a new Console controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public ConsoleController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary = virtualModelLibrary;
    }


    public void show(RoutingContext context){
        FMLConsole console  = Helpers.getDefaultFlexoEditor(virtualModelLibrary).getFMLConsole();
        JsonArray result    = new JsonArray();

        for (FMLLogRecord record : console.getRecords()) {
            result.add(JsonSerializer.logRecordSerializer(record));
        }

        context.response().end(result.encodePrettily());
    }
}
