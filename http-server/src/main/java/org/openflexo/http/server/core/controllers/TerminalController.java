package org.openflexo.http.server.core.controllers;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.openflexo.foundation.DefaultFlexoEditor;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.foundation.fml.VirtualModelLibrary;
import org.openflexo.foundation.fml.cli.CommandInterpreter;
import org.openflexo.foundation.fml.cli.ParseException;
import org.openflexo.foundation.fml.cli.command.AbstractCommand;
import org.openflexo.foundation.fml.cli.command.FMLCommandExecutionException;
import org.openflexo.http.server.core.RestTerminal;
import org.openflexo.http.server.core.helpers.Helpers;
import org.openflexo.http.server.core.repositories.TerminalRepository;
import org.openflexo.http.server.core.serializers.JsonSerializer;
import org.openflexo.http.server.core.validators.TerminalValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class TerminalController extends GenericController {
    private final VirtualModelLibrary virtualModelLibrary;
    private final DefaultFlexoEditor editor;

    private List<String> history = new ArrayList();

    public TerminalController(VirtualModelLibrary virtualModelLibrary) {
        this.virtualModelLibrary    = virtualModelLibrary;
        editor                      = Helpers.getDefaultFlexoEditor(virtualModelLibrary);
    }

    public void init(RoutingContext context) {
        FlexoServiceManager serviceManager  = virtualModelLibrary.getServiceManager();
        try {
            RestTerminal terminal = new RestTerminal(serviceManager, "/tmp/");
            TerminalRepository.registerTerminal(terminal);

            JsonObject result = new JsonObject();

            result.put("session_id", terminal.getSessionID());
            result.put("prompt", terminal.getCi().getPrompt());

            context.response().end(result.encodePrettily());

        } catch (IOException e) {
            badRequest(context);
        }
    }

    public void get(RoutingContext context) {
        String sessionId = context.request().getFormAttribute("session_id");

        if (sessionId != null){
            RestTerminal terminal = TerminalRepository.getTerminal(sessionId);

            if (terminal != null) {
                JsonObject result = new JsonObject();

                result.put("session_id", terminal.getSessionID());
                result.put("prompt", terminal.getCi().getPrompt());

                context.response().end(result.encodePrettily());
            } else {
                notFound(context);
            }
        } else {
            notFound(context);
        }
    }

    public void execute(RoutingContext context) {
        TerminalValidator validator = new TerminalValidator(context.request());
        JsonArray errors            = validator.validate();

        if(validator.isValid()){
            try {
                RestTerminal terminal = TerminalRepository.getTerminal(validator.getSessionId());

                if(terminal == null || terminal.getCi() == null){
//                    terminal = new RestTerminal(virtualModelLibrary.getServiceManager(), "/tmp/");
                    notFound(context);
                } else {
                    CommandInterpreter ci = terminal.getCi();

                    ci.executeCommand(validator.getCommand());

                    context.response().end(JsonSerializer.terminalOutputSerializer(ci.getOutput(), terminal).encodePrettily());
                }
            } catch (FMLCommandExecutionException | ParseException e) {
                JsonObject error = new JsonObject();

                error.put("command", e.getMessage());
                errors.add(error);

                badValidation(context, errors);
            }
        } else {
            badValidation(context, errors);
        }
    }

    public void history(RoutingContext context) {
        String  sessionId       = context.request().getFormAttribute("session_id");
        RestTerminal terminal   = TerminalRepository.getTerminal(sessionId);
        
        if(terminal == null){
            notFound(context);

        } else {
//            context.response().end(terminal.getCi().getHistory().stream().map(AbstractCommand::getOriginalCommandAsString).collect(Collectors.joining()));

            context.response().end(JsonSerializer.terminalHistorySerializer(terminal.getCi().getHistory()).encodePrettily());
//            emptyResponse(context);
//                    context.response().end(JsonSerializer.terminalOutputSerializer(ci.getOutput(), terminal).encodePrettily());
        }
    }
}
