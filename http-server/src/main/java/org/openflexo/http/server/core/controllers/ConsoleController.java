package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.DefaultFlexoEditor;
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
    private final DefaultFlexoEditor editor;

    /**
     * Instantiates a new Console controller.
     *
     * @param virtualModelLibrary the virtual model library
     */
    public ConsoleController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary    = virtualModelLibrary;
        editor                      = Helpers.getDefaultFlexoEditor(virtualModelLibrary);
    }

    /**
     * It gets the FMLConsole from the editor, gets all the records from the console, serializes them to JSON and sends
     * them to the client
     *
     * @param context The routing context is the object that contains all the information about the request and the
     * response.
     */
    public void show(RoutingContext context){
        FMLConsole console  = editor.getFMLConsole();
        JsonArray result    = new JsonArray();

        for (FMLLogRecord record : console.getRecords()) {
            result.add(JsonSerializer.logRecordSerializer(record));
        }

        context.response().end(result.encodePrettily());
    }
}
