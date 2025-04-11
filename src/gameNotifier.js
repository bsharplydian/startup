const GameEvent = {
    System: 'system',
    Join: 'gameJoin',
    Leave: 'gameLeave'
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class GameEventNotifier {
    events = [];
    handlers = []

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        // when this client receives a message, call receiveEvent on the resulting data
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                console.log("this is what an event looks like", event)
                this.receiveEvent(event);
            } catch { }
        };
    }
    broadcastEvent(from, type, value) {
        const event = new EventMessage(from, type, value);
        console.log("sending", event)
        this.socket.send(JSON.stringify(event))
    }
    addHandler(handler) {
        this.handlers.push(handler);
    }
    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler)
    }
    receiveEvent(event) {
        this.events.push(event);

        //jsx files give gameNotifier.js a handler function to call when it receives an event.
        //
        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e)
            })
        })
    }
}