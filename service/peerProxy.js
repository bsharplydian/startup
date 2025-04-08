const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });
    // on connection
    // on message
    // *different from Simon* I need to somehow group the clients into different games, sending the messages only to clients in the same game
    // if receive pong message, mark the client as alive

    //periodic ping to make sure clients are alive
}

module.exports = { peerProxy }