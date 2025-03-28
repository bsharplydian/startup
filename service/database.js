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
    // return gameCollection.find({
    //     $or: [
    //         { "games.players.username": username },
    //         { dm: username }
    //     ]
    // })
    // const cursor = gameCollection.find({ dm: username })
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

function getPlayers(gameID) {
    return gameCollection.findOne({ gameID: gameID }).players
}
async function addPlayer(gameID, newPlayer) {
    await gameCollection.updateOne({ gameID: parseInt(gameID) }, { $push: { players: newPlayer } })
    let newPlayerList = await gameCollection.findOne({ gameID: parseInt(gameID) })
    return newPlayerList.players
}
module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getGame,
    addGame,
    getUserGames,
    getPlayers,
    addPlayer
}