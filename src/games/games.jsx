import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './games.css';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

export function Games(props) {
    const username = props.username;
    const [addGameVisible, setAddGameVisible] = React.useState(false);
    const [gameIDs, setGameIDs] = React.useState(JSON.parse(localStorage.getItem("gameIDs")) || []);
    const [games, setGames] = React.useState(getStoredGames() || {})
    const [newGameName, setNewGameName] = React.useState("");
    const [playerType, setPlayerType] = React.useState("");
    const [charInputs, setCharInputs] = React.useState({});
    const [openItem, setOpenItem] = React.useState(-1);
    const navigate = useNavigate()

    function getStoredGames() {
        var games = {}
        Object.keys(localStorage)
            .filter(x =>
                x.startsWith('games/'))
            .forEach(x => {
                let game = (JSON.parse(localStorage.getItem(x)))
                games[game.gameID] = game
            })
        return games
    }
    async function addGame(newGameName, playerType) {
        // generates a random game id and adds a game with the given info to localstorage
        do {
            var id = Math.floor(Math.random() * 1000);
        }
        while (gameIDs.indexOf(id) !== -1);
        var newGameIDs = [...gameIDs, id];


        let newDm = null;
        let newPlayers = [];
        if (playerType === "dm") {
            newDm = username;
        }
        var game = { gameID: id, gameName: newGameName, dm: newDm, players: newPlayers };
        localStorage.setItem("games/" + id, JSON.stringify(game));
        localStorage.setItem("gameIDs", JSON.stringify(newGameIDs));
        setAddGameVisible(false);
        setGames({ ...games, [id]: game });
        setGameIDs(newGameIDs);
    }
    function addCharInput(value, index) {
        let newCharInputs = charInputs;
        newCharInputs[index] = value;
        setCharInputs(newCharInputs)
    }
    function addPlayerToGame(newCharName, gameID) {
        let newGame = games[gameID]
        let newGames = games;
        do {
            var id = Math.floor(Math.random() * 1000);
        }
        while (gameIDs.indexOf(id) !== -1);
        newGame["players"].push({ charID: id, playerName: username, charName: newCharName })
        newGames[gameID] = newGame
        localStorage.setItem("games/" + gameID, JSON.stringify(newGame))
        localStorage.setItem("invs/" + gameID + "/" + id, JSON.stringify({ "equipment": [], "magic_items": [] }))
        setGames(newGames)
        setCharInputs({})
    }
    function findActiveKey() {
        return openItem.toString()
    }
    function switchToInventory(gameID, charID) {
        props.onInvIDChange(gameID, charID)
        navigate("/inventory")
    }
    function GameAccordion() {
        return (
            <Accordion activeKey={findActiveKey()} onSelect={(e) => { if (e !== null) { setOpenItem(e) } else { setOpenItem(-1) } }}>
                {gameIDs.map((gameID) => {
                    var currentGame = games[gameID] ? games[gameID] : { gameID: "-1", gameName: "loading...", dm: "none", players: { "loading...": "loading..." } }
                    return (

                        <Accordion.Item eventKey={gameID.toString()} key={gameID.toString()}>
                            <Accordion.Header>
                                {currentGame.gameName}
                                {/* get and add player role too */}
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="characters">
                                    {currentGame.players.map((charInfo) => {
                                        return (
                                            <div className="character" key={charInfo.charID}>
                                                <button onClick={() => switchToInventory(gameID, charInfo.charID)}><img src="./char-placeholder.png" width="100" className="char-image"></img></button>
                                                <p onClick={() => switchToInventory(gameID, charInfo.charID)}>{charInfo.charName}</p>
                                            </div>
                                        )
                                    })}
                                    <div className="character">
                                        <button onClick={() => addPlayerToGame(charInputs[gameID], gameID)}><img src="./add.png" width="100" className="char-image"></img></button>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="char-name-input"
                                            placeholder="Character Name"
                                            value={charInputs[gameID]}
                                            onChange={(e) => addCharInput(e.target.value, gameID)}></input>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })
                }
            </Accordion >
        )
    }

    return (
        <main className="games-main">
            <h1>Games</h1>

            <GameAccordion />

            <button className="btn btn-primary add-game-button" onClick={() => setAddGameVisible(true)}>Add Game</button>
            {addGameVisible === true &&
                <div className="add-game-form" autoComplete="off">
                    <h3 className="add-game-title">Add Game</h3>
                    <div className="mb-3 game-text">
                        <input type="text" autoComplete="off" className="form-control game-input" id="gameName" placeholder="Name" value={newGameName} onChange={(e) => setNewGameName(e.target.value)}></input>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" value="dm" onClick={() => setPlayerType("dm")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio1">DM</label>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" value="player" onClick={() => setPlayerType("player")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio2">Player</label>
                    </div>
                    <button className="btn btn-primary submit-game-button" disabled={!newGameName || !playerType} onClick={() => addGame(newGameName, playerType)}>Add</button>
                </div>
            }
        </main>
    );
}