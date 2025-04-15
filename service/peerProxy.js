const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });
    // on connection
    socketServer.on('connection', (socket) => {
        socket.isAlive = true;
        // on message
        // *different from Simon* I need to somehow group the clients into different games, sending the messages only to clients in the same game
        socket.on('message', function message(data) {
            socketServer.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data)
                }
            })
        })
        // if receive pong message, mark the client as alive
        socket.on('pong', () => {
            socket.isAlive = true;
        })

    })


    //periodic ping to make sure clients are alive
    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        })
    }, 10000)
}

module.exports = { peerProxy }