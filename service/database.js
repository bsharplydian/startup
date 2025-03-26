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
    return gameCollection.findOne({ gameID: gameID })
}
function getUserGames(username) {
    return gameCollection.find({ "players.username": `${username}` })
}
async function addGame(game) {
    await gameCollection.insertOne(game)
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getGame,
    addGame,
    getUserGames
}