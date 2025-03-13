const express = require('express');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const app = express();

let users = [] // user: {username, password, authToken}
let games = [] // game: {gameID, gameName, dm, players[]} // player: {id, characterName, username}
let inventories = [] // inventory: {equipment[]}

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.get('*', (_req, res) => {
    res.send({ msg: 'Congratulations! You have reached the generic Bag of Holding GET endpoint' });
});
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
apiRouter.get("/games", async (req, res) => {
    res.send(games);
});
apiRouter.post("/games", async (req, res) => {
    games = addGame(req.body);
    res.send(games);
});
apiRouter.delete("/games/:id", async (req, res) => {
    games = removeGame(req.body);
    res.send(games);
});
apiRouter.get("/games/:id/players", async (req, res) => {
    res.send(games[req.params.id]["players"]);
});
apiRouter.post("/games/:id/players", async (req, res) => {
    games[req.params.id]["players"] = addPlayer(req.body);
    res.send(games[req.params.id]["players"]);
});
apiRouter.delete("/games/:id/players/:id", async (req, res) => {
    games[req.params.id]["players"] = removePlayer(req.body);
    res.send(games[req.params.id]["players"]);
});
apiRouter.get("/games/:gameID/players/:playerID/equipment-items", async (req, res) => {
    res.send(inventories[req.params.gameID][req.params.playerID])
});
apiRouter.post("/games/:gameID/players/:playerID/equipment-items", async (req, res) => {
    inventories[req.params.gameID][req.params.playerID] = addItem(req.body)
    res.send(inventories[req.params.gameID][req.params.playerID])
});
apiRouter.delete("/games/:gameID/players/:playerID/equipment-items/:id", async (req, res) => {
    inventories[req.params.gameID][req.params.playerID] = removeItem(req.body)
    res.send(inventories[req.params.gameID][req.params.playerID])
});

function addGame() {

}
function removeGame() {

}

function addPlayer() {

}
function removePlayer() {

}

function addItem() {

}
function removeItem() {

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