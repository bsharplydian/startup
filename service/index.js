const express = require('express');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const app = express();
const DB = require("./database.js")


const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'));
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.get('*', (_req, res) => {
    res.send({ msg: 'Congratulations! You have reached the generic Bag of Holding GET endpoint' });
});

// LOGIN
apiRouter.post("/auth/login", async (req, res) => {
    const user = await getUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.authToken = uuid.v4();
            await DB.updateUser(user)
            res.cookie("authToken", user.authToken, { secure: true, httpOnly: true, sameSite: 'strict' });
            res.send({ username: user.username })
            return
        }
    }
    res.status(401).send({ msg: 'Username or password is incorrect' });
});
apiRouter.post("/auth/create", async (req, res) => {
    if (await getUser('username', req.body.username)) {
        res.status(409).send({ msg: "User already exists" });
    } else {
        const user = await createUser(req.body.username, req.body.password);
        console.log(user.authToken)
        res.cookie("authToken", user.authToken, { secure: true, httpOnly: true, sameSite: 'strict' });
        res.send({ username: user.username });
    }
});
apiRouter.delete("/auth/logout", async (req, res) => {
    const user = await getUser('token', req.cookies["authToken"]);
    if (user) {
        delete user.authToken;
        await DB.updateUser(user)
    }
    res.clearCookie("authToken");
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await getUser('token', req.cookies["authToken"]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};
const verifyGameExists = async (req, res, next) => {
    if (!(await DB.getGame(req.params.gameID))) {
        res.status(404).send({ msg: 'Game doesn\'t exist' });
    } else {
        next()
    }
}
const verifyInvExists = async (req, res, next) => {
    if (!(await DB.getItems(req.params.gameID, req.params.playerID))) {
        res.status(404).send({ msg: "Inventory doesn\'t exist" });
    } else {
        next();
    }
}

// GAMES
apiRouter.get("/games/id/:gameID", verifyAuth, async (req, res) => {
    let game = await DB.getGame(req.params.gameID)
    res.send(game)
})
apiRouter.get("/games/:user", verifyAuth, async (req, res) => {
    let username = req.params.user
    let userGames = await DB.getUserGames(username);
    res.send(userGames);
});
apiRouter.post("/games/:user", verifyAuth, async (req, res) => {
    newGame = await addGame(req.body);
    res.send(newGame);
});
apiRouter.delete("/games/:gameID", verifyAuth, verifyGameExists, async (req, res) => {
    let games = await removeGame(req.body.username, req.params.gameID);
    res.send(games);
});

// PLAYERS
apiRouter.get("/games/:gameID/players", verifyAuth, verifyGameExists, async (req, res) => {
    let players = await DB.getPlayers(req.params.gameID);
    res.send(players);
});
apiRouter.post("/games/:gameID/players", verifyAuth, verifyGameExists, async (req, res) => {
    let newPlayers = await addPlayer(req.params.gameID, req.body);
    res.send(newPlayers);
});
apiRouter.delete("/games/:gameID/players/:playerID", verifyAuth, verifyGameExists, async (req, res) => {
    // games[req.params.gameID]["players"] = removePlayer(req.params.gameID, req.params.playerID);
    let players = await removePlayer(req.params.gameID, req.params.playerID)
    res.send(players);
});

// INVENTORIES
apiRouter.get("/games/:gameID/players/:playerID/equipment-items", verifyAuth, verifyInvExists, async (req, res) => {
    let inventory = await DB.getItems(req.params.gameID, req.params.playerID)
    res.send(inventory)
});
apiRouter.post("/games/:gameID/players/:playerID/equipment-items", verifyAuth, verifyInvExists, async (req, res) => {
    let inventory = await addItem(req.params.gameID, req.params.playerID, req.body)
    res.send(inventory)
});
apiRouter.delete("/games/:gameID/players/:playerID/equipment-items/:index", verifyAuth, verifyInvExists, async (req, res) => {
    let inventory = await removeItem(req.params.gameID, req.params.playerID, req.params.index)
    res.send(inventory)
});


async function addGame(requestBody) {
    newGameID = await DB.generateGameID()
    newGame = { gameID: newGameID, gameName: requestBody.gameName, dm: requestBody.dm, players: requestBody.players }
    DB.addGame(newGame)
    return newGame
}
async function removeGame(username, gameID) {
    let games = await DB.removeGame(username, gameID)
    DB.removeInventories(gameID)
    return games
}

async function addPlayer(gameID, requestBody) {
    let oldPlayerList = await DB.getPlayers(gameID)
    if (!oldPlayerList) {
        oldPlayerList = []
    }
    let newPlayerID = generateID(oldPlayerList)
    let newPlayer = { playerID: newPlayerID, characterName: requestBody.characterName, playerName: requestBody.playerName }
    let newPlayerList = await DB.addPlayer(gameID, newPlayer);
    return newPlayerList
}
async function removePlayer(gameID, playerID) {
    let newPlayerList = await DB.removePlayer(gameID, playerID)
    await DB.removeInventory(gameID, playerID)
    return newPlayerList
}

async function addItem(gameID, playerID, requestBody) {
    let inventory = await DB.addItem(gameID, playerID, {
        name: requestBody.name,
        category: requestBody.category,
        numDice: requestBody.numDice,
        damageDie: requestBody.damageDie,
        damageType: requestBody.damageType,
        properties: requestBody.properties,
        weight: requestBody.weight,
        cost: requestBody.cost,
        currency: requestBody.currency,
        description: requestBody.description
    })
    return inventory
}
async function removeItem(gameID, playerID, index) {
    let inventory = await DB.removeItem(gameID, playerID, index)
    return inventory
}

function generateID(container) {
    do {
        var id = Math.floor(Math.random() * 10000);
    }
    while (container[id]);
    return id
}
async function getUser(field, value) {
    if (!value) {
        return null
    }
    if (field === "token") {
        return DB.getUserByToken(value)
    }
    return DB.getUser(value)
}
async function createUser(username, password) {
    const passHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passHash,
        authToken: uuid.v4()
    };
    await DB.addUser(user)
    return user
}
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});