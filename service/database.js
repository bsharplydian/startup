const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('bag-of-holding');
const userCollection = db.collection('user');
const gameCollection = db.collection('games');
const invCollection = db.collection('inventories');

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

async function getGame(gameID) {
    return await gameCollection.findOne({ gameID: parseInt(gameID) })
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
async function generateGameID() {
    do {
        var id = Math.floor(Math.random() * 10000);
    }
    while (await gameCollection.findOne({ gameID: id }));
    return id
}

async function getPlayers(gameID) {
    let game = await gameCollection.findOne({ gameID: parseInt(gameID) })
    return game.players
}
async function addPlayer(gameID, newPlayer) {
    await gameCollection.updateOne({ gameID: parseInt(gameID) }, { $push: { players: newPlayer } })
    await invCollection.insertOne({ gameID: parseInt(gameID), playerID: parseInt(newPlayer.playerID), equipment: [], magic_items: [] })
    let newGame = await gameCollection.findOne({ gameID: parseInt(gameID) })
    return newGame.players
}
async function removePlayer(gameID, playerID) {
    await gameCollection.updateOne({ gameID: parseInt(gameID) }, { $pull: { players: { playerID: parseInt(playerID) } } })
    let newGame = await gameCollection.findOne({ gameID: parseInt(gameID) })
    return newGame.players
}

async function getItems(gameID, playerID) {
    let itemLists = await invCollection.findOne({ gameID: parseInt(gameID), playerID: parseInt(playerID) })
    if (itemLists === null) {
        itemLists = { gameID: parseInt(gameID), playerID: parseInt(playerID), equipment: [], magic_items: [] }
    }
    return itemLists
}
async function addItem(gameID, playerID, item) {
    await invCollection.updateOne({ gameID: parseInt(gameID), playerID: parseInt(playerID) }, { $push: { equipment: item } })
    return await getItems(gameID, playerID)
}
async function removeItem(gameID, playerID, index) {
    let query = {}
    query[`equipment.${index}`] = 1
    await invCollection.updateOne({ gameID: parseInt(gameID), playerID: parseInt(playerID) }, { $unset: query })
    await invCollection.updateOne({ gameID: parseInt(gameID), playerID: parseInt(playerID) }, { $pull: { equipment: null } })
    return await getItems(gameID, playerID)
}
async function removeInventory(gameID, playerID) {
    await invCollection.deleteOne({ gameID: parseInt(gameID), playerID: parseInt(playerID) })
}
async function removeInventories(gameID) {
    await invCollection.deleteMany({ gameID: parseInt(gameID) })
}
module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getGame,
    addGame,
    generateGameID,
    removeGame,
    getUserGames,
    getPlayers,
    addPlayer,
    removePlayer,
    getItems,
    addItem,
    removeItem,
    removeInventory,
    removeInventories
}