const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('bag-of-holding');
const userCollection = db.collection('user');
const gameCollection = db.collection('games');

(async function testConnection() {
    try {
        await db.command({ ping: 1 });
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(username) {
    return userCollection.findOne({ username: username })
}

function getUserByToken(authToken) {
    return userCollection.findOne({ authToken: authToken })
}

async function addUser(user) {
    await userCollection.insertOne(user)
}

async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user })
}

function getGame(gameID) {
    return gameCollection.findOne({ gameID: parseInt(gameID) })
}

function getUserGames(username) {
    const cursor = gameCollection.find({
        $or: [
            {
                "players": {
                    $elemMatch: { "playerName": username }
                }
            },
            { dm: username }
        ]
    })
    console.log(cursor)
    return cursor.toArray()
}
async function addGame(game) {
    await gameCollection.insertOne(game)
}
async function removeGame(username, gameID) {
    await gameCollection.deleteOne({ gameID: parseInt(gameID) })
    return await getUserGames(username)
}

function getPlayers(gameID) {
    return gameCollection.findOne({ gameID: parseInt(gameID) }).players
}
async function addPlayer(gameID, newPlayer) {
    await gameCollection.updateOne({ gameID: parseInt(gameID) }, { $push: { players: newPlayer } })
    let newGame = await gameCollection.findOne({ gameID: parseInt(gameID) })
    return newGame.players
}
async function removePlayer(gameID, playerID) {
    await gameCollection.updateOne({ gameID: parseInt(gameID) }, { $pull: { players: { playerID: parseInt(playerID) } } })
    let newGame = await gameCollection.findOne({ gameID: parseInt(gameID) })
    return newGame.players
}
module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getGame,
    addGame,
    removeGame,
    getUserGames,
    getPlayers,
    addPlayer,
    removePlayer
}