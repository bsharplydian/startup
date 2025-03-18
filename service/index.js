const express = require('express');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const app = express();

let users = [] // user: {username, password, authToken}
let games = {} // game: {gameID, gameName, dm, players[]} // player: {id, characterName, username}
// {1358: {gameName: "game1", dm: "jim", "players:" []}, }
// 187: {characterName: "Kaba", username: "Ben"}
let inventories = {} // inventory: {equipment[]}

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser())

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.get('*', (_req, res) => {
    res.send({ msg: 'Congratulations! You have reached the generic Bag of Holding GET endpoint' });
});

// LOGIN
apiRouter.post("/auth/login", async (req, res) => {
    const user = await getUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            res.cookie("authToken", user.token, { secure: true, httpOnly: true, sameSite: 'strict' });
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
        user.token = uuid.v4();
        res.cookie("authToken", user.token, { secure: true, httpOnly: true, sameSite: 'strict' });
        res.send({ username: user.username });
    }
});
apiRouter.delete("/auth/logout", async (req, res) => {
    const user = await getUser('authToken', req.cookies["authToken"]);
    if (user) {
        delete user.token;
    }
    res.clearCookie("authToken");
    res.status(204).end();
});

// GAMES
apiRouter.get("/games/:user", async (req, res) => {
    // next step: use the req header/body to get the user's username and only display games they're a part of
    let username = req.params.user
    let userGames = {};
    console.log("keys: ", Object.keys(games))
    for (var key of Object.keys(games)) {
        if (games[key]["dm"] === username || playerInGame(games[key].players, username)) {
            userGames[key] = games[key]
        }
    }
    // console.log(username)
    // console.log(userGames)
    // console.log("GETTING GAMES")
    res.send(userGames);
});
apiRouter.post("/games/:user", async (req, res) => {
    // next step: use the req header/body to get the user's username and only display games they're a part of
    games = addGame(req.body);
    // console.log(games)
    res.send(games);
});
apiRouter.delete("/games/:gameID", async (req, res) => {
    console.log(`deleting ${req.params.gameID}`)
    games = removeGame(req.params.gameID);
    res.send(games);
});

// PLAYERS
apiRouter.get("/games/:gameID/players", async (req, res) => {
    res.send(games[req.params.gameID]["players"]);
});
apiRouter.post("/games/:gameID/players", async (req, res) => {
    games[req.params.gameID]["players"] = addPlayer(req.params.gameID, req.body);
    res.send(games);
});
apiRouter.delete("/games/:gameID/players/:playerID", async (req, res) => {
    games[req.params.gameID]["players"] = removePlayer(req.params.gameID, req.params.playerID);
    res.send(games);
});

// INVENTORIES
apiRouter.get("/games/:gameID/players/:playerID/equipment-items", async (req, res) => {
    console.log("inventories: ", inventories)
    console.log("games: ", inventories[req.params.gameID])
    res.send(inventories[req.params.gameID][req.params.playerID])
});
apiRouter.post("/games/:gameID/players/:playerID/equipment-items", async (req, res) => {
    inventories[req.params.gameID][req.params.playerID] = addItem(req.params.gameID, req.params.playerID, req.body)
    res.send(inventories[req.params.gameID][req.params.playerID])
});
apiRouter.delete("/games/:gameID/players/:playerID/equipment-items/:index", async (req, res) => {
    inventories[req.params.gameID][req.params.playerID] = removeItem(req.params.gameID, req.params.playerID, req.params.index)
    res.send(inventories[req.params.gameID][req.params.playerID])
});

function playerInGame(players, playerName) {
    if (players.length == 0) {
        return false
    }
    console.log("values: ", Object.values(players))
    for (const player of Object.values(players)) {
        if (player.username === playerName) {
            return True
        }
    }
    return false
}
function addGame(requestBody) {
    newGameID = generateID(games)
    games[newGameID] = { gameName: requestBody.gameName, dm: requestBody.dm, players: requestBody.players }
    inventories[newGameID] = {}
    return games
}
function removeGame(gameID) {
    delete games[gameID]
    delete inventories[gameID]
    return games
}

function addPlayer(gameID, requestBody) {
    newPlayerID = generateID(games[gameID]["players"])
    games[gameID]["players"][newPlayerID] = { characterName: requestBody.characterName, playerName: requestBody.playerName }
    inventories[gameID][newPlayerID] = { equipment: [], magicItems: [] }
    return games[gameID]["players"];
}
function removePlayer(gameID, playerID) {
    delete games[gameID]["players"][playerID]
    delete inventories[gameID][playerID]
    return games[gameID]["players"]
}

function addItem(gameID, playerID, requestBody) {
    inventories[gameID][playerID]["equipment"].push({
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
    // console.log("added an item: ", inventories[gameID][playerID])
    return inventories[gameID][playerID]
}
function removeItem(gameID, playerID, index) {
    inventories[gameID][playerID]["equipment"].splice(index, 1)
    return inventories[gameID][playerID]
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
    return users.find((user) => user[field] === value)
}
async function createUser(username, password) {
    const passHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passHash,
        authToken: uuid.v4()
    };
    users.push(user)
    return user
}
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});