package org.openflexo.http.server.websocket;

import io.vertx.core.Handler;
import io.vertx.core.http.ServerWebSocket;
import io.vertx.core.http.WebSocketFrame;
import io.vertx.core.json.DecodeException;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoServiceManager;
import org.openflexo.http.server.connie.*;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * WebSocket service to evaluate Connie expressions
 */
public class FmlEditorHandler  implements Handler<ServerWebSocket> {

    private final FlexoServiceManager serviceManager;
    private final TechnologyAdapterRouteService taRouteService;
    private final Set<EditorClient> clients = new HashSet<>();
    private String sourceCode;

    public FmlEditorHandler(FlexoServiceManager serviceManager, TechnologyAdapterRouteService taRouteService) {
        this.serviceManager = serviceManager;
        this.taRouteService = taRouteService;
    }

    private void register(EditorClient client) {
        clients.add(client);
    }

    private void unregister(EditorClient client) {
        clients.remove(client);
    }

    @Override
    public void handle(ServerWebSocket socket) {
        register(new EditorClient(socket));
    }

    private class EditorClient {
        private final ServerWebSocket socket;
        private FmlEditorCursorChangeRequest cursor;

        public FmlEditorCursorChangeRequest getCursor() {
            return cursor;
        }

        public EditorClient(ServerWebSocket socket) {
            this.socket = socket;

            socket.frameHandler(this::handleFrame);
            socket.exceptionHandler(this::exceptionHandler);
            socket.endHandler(this::endHandler);
        }

        private void handleFrame(WebSocketFrame frame) {
            try {
                ConnieMessage message = ConnieMessage.read(frame.textData());

                if (message instanceof FmlEditorRequest) {
                    for (EditorClient client: clients){
                        if (!client.equals(this)){
                            client.respondToFmlEditionRequest((FmlEditorRequest) message);
                        }
                    }
                }  else if (message instanceof FmlEditorCursorChangeRequest){
                    cursor = (FmlEditorCursorChangeRequest) message;

                    if(cursor.init && !sourceCode.isEmpty()) {
                        JsonObject response = new JsonObject();

                        response.put("type", "code");
                        response.put("content", sourceCode);

                        socket.writeTextMessage(response.encodePrettily());
                    }
                }

                List<FmlEditorCursorChangeRequest> cursors = clients.stream().map(EditorClient::getCursor).collect(Collectors.toList());

                for (EditorClient client: clients){
                    client.respondToCursorChangeRequest(cursors);
                }

            } catch (DecodeException e) {
                String message = "Can't decode request: " + e.getMessage();
                System.out.println(message);
                socket.write(Response.error(message).toBuffer());
            }
        }
        
        private void respondToFmlEditionRequest(FmlEditorRequest request) {
            sourceCode = request.code;
//            Response response 	= new Response(request.id, message, null);

            JsonObject response = new JsonObject();
            response.put("type", "code");
            response.put("content", sourceCode);

            // TODO : handle fml code here

            socket.writeTextMessage(response.encodePrettily());
        }
        
        private void respondToCursorChangeRequest(List<FmlEditorCursorChangeRequest> request) {
            JsonArray message = new JsonArray();

            for (FmlEditorCursorChangeRequest cursor: request) {
                message.add(cursor);
            }

            JsonObject response = new JsonObject();
            response.put("type", "cursor");
            response.put("content", message);

            // TODO : handle fml code here

            socket.writeTextMessage(response.encodePrettily());
        }

        private void exceptionHandler(Throwable throwable) {
            System.err.println("Exception in websocket " + throwable.getClass().getSimpleName() + ": " + throwable.getMessage());
        }

        private void endHandler(Void nothing) {
            unregister(this);
        }
    }
}
