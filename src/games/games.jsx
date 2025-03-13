import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './games.css';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

export function Games(props) {
    const username = props.username;
    const [addGameVisible, setAddGameVisible] = React.useState(false);
    const [joinGameVisible, setJoinGameVisible] = React.useState(false);
    const [gameIDs, setGameIDs] = React.useState(JSON.parse(localStorage.getItem("gameIDs")) || []);
    const [games, setGames] = React.useState(getStoredGames() || {})
    const [newGameName, setNewGameName] = React.useState("");
    const [joinGameID, setJoinGameID] = React.useState("");
    const [playerType, setPlayerType] = React.useState("");
    const [charNameInputs, setCharInputs] = React.useState({});
    const [openItem, setOpenItem] = React.useState(-1);
    const navigate = useNavigate()

    React.useEffect(() => {
        fetch('/api/games').then((response) => response.json()).then((games) => { setGames(games) }, [])
    }, [])
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

        let newDm = null;
        let newPlayers = [];
        if (playerType === "dm") {
            newDm = username;
        }
        var game = { gameName: newGameName, dm: newDm, players: newPlayers };
        setAddGameVisible(false);
        console.log("getting new games")
        let newGames = await fetch("/api/games", {
            method: 'post',
            body: JSON.stringify(game),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.json())
        console.log(newGames)
        setGames(newGames);
        console.log(Object.keys(newGames))
        setGameIDs(Object.keys(newGames));

    }
    async function joinGame(joinGameID, playerType) {
        var game = JSON.parse(localStorage.getItem("games/" + joinGameID));
        if (game === null) {
            console.error("no game here")
            return
        }
        if (playerType === "player") {

        } else if (playerType === "dm") {
            if (game.dm !== null) {
                console.error("This game already has a dungeon master.")
                return
            } else {
                game.dm = username;
            }
        }

        localStorage.setItem("games/" + joinGameID, JSON.stringify(game));
        setJoinGameVisible(false);
    }
    function addCharInput(value, index) {
        let newCharInputs = charNameInputs;
        newCharInputs[index] = value;
        setCharInputs(newCharInputs)
    }
    function addUserToGame(newCharName, gameID) {
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
    function deleteChar(gameID, charID) {
        let newGame = games[gameID]
        let newGames = games;
        for (var i = 0; i < newGame["players"].length; i++) {
            if (newGame["players"][i].charID == charID) {
                newGame["players"].splice(i, 1)
            }
        }
        newGames[gameID] = newGame
        localStorage.setItem("games/" + gameID, JSON.stringify(newGame))
        localStorage.removeItem("invs/" + gameID)
        setGames({ ...newGames })
    }
    function deleteGame(gameID) {
        //clean up inventories
        Object.keys(localStorage)
            .filter(x =>
                x.startsWith('invs/' + gameID))
            .forEach(x => {
                localStorage.removeItem(x)
            })
        localStorage.removeItem("games/" + gameID)
        let newGames = games;
        let newGameIDs = gameIDs;
        console.log(newGames)
        delete newGames.gameID
        newGameIDs.splice(newGameIDs.indexOf(gameID), 1)
        console.log(newGameIDs)
        localStorage.setItem("gameIDs", JSON.stringify(newGameIDs))
        setGames({ ...newGames })
        setGameIDs([...newGameIDs])
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
                    var currentGame = games[gameID] ? games[gameID] : { gameID: "-1", gameName: "loading...", dm: "none", players: ["loading...", "loading..."] }
                    return (

                        <Accordion.Item eventKey={gameID.toString()} key={gameID.toString()}>
                            <Accordion.Header>
                                {currentGame.gameName}
                                {/* get and add player role too */}
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="characters">
                                    {/* {currentGame.players.map((charInfo) => {
                                        return (
                                            <div className="character" key={charInfo.charID}>
                                                <button onClick={() => switchToInventory(gameID, charInfo.charID)}><img src="./char-placeholder.png" width="100" className="char-image"></img></button>
                                                <div className="character-name">
                                                    <div className="whitespace"></div>
                                                    <p className="character-name-text" onClick={() => switchToInventory(gameID, charInfo.charID)}>{charInfo.charName}</p>
                                                    <Dropdown className="remove-char-button">
                                                        <Dropdown.Toggle className="remove-element-button remove-char-button">⋯</Dropdown.Toggle>
                                                        <Dropdown.Menu data-bs-theme="dark">
                                                            <Dropdown.Item onClick={() => deleteChar(gameID, charInfo.charID)}>Delete Character</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        )
                                    })} */}
                                    {
                                        currentGame.players
                                    }
                                    <div className="character">
                                        <button onClick={() => addUserToGame(charNameInputs[gameID], gameID)}><img src="./add.png" width="100" className="char-image"></img></button>
                                        <input
                                            key={gameID}
                                            id={gameID}
                                            type="text"
                                            autoComplete="off"
                                            className="char-name-input"
                                            placeholder="Character Name"
                                            value={charNameInputs[gameID]}
                                            onChange={(e) => addCharInput(e.target.value, gameID)}></input>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle className="remove-element-button">⋯</Dropdown.Toggle>
                                        <Dropdown.Menu data-bs-theme="dark">
                                            <Dropdown.Item onClick={() => deleteGame(gameID)}>Delete Game</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
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

            <button className="btn btn-primary add-game-button"
                onClick={() => {
                    setAddGameVisible(true)
                    setJoinGameVisible(false)
                    setPlayerType("")
                }}>Add Game</button>
            <button className="btn btn-primary add-game-button"
                onClick={() => {
                    setAddGameVisible(false)
                    setJoinGameVisible(true)
                    setPlayerType("")
                }}>Join Game</button>

            {addGameVisible === true &&
                <div className="add-game-form" autoComplete="off">
                    <h3 className="add-game-title">Add Game</h3>
                    <div className="mb-3 game-text">
                        <input type="text" autoComplete="off" className="form-control game-input" id="gameName" placeholder="Name" value={newGameName} onChange={(e) => setNewGameName(e.target.value)}></input>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio1" value="dm" onClick={() => setPlayerType("dm")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio1">DM</label>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio2" value="player" onClick={() => setPlayerType("player")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio2">Player</label>
                    </div>
                    <button className="btn btn-primary submit-game-button" disabled={!newGameName || !playerType} onClick={() => addGame(newGameName, playerType)}>Add</button>
                </div>
            }
            {joinGameVisible === true &&
                <div className="add-game-form" autoComplete="off">
                    <h3 className="add-game-title">Join Game</h3>
                    <div className="mb-3 game-text">
                        <input type="number" autoComplete="off" className="form-control game-input" id="gameID" placeholder="Game ID" value={joinGameID} onChange={(e) => setJoinGameID(e.target.value)}></input>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio1" value="dm" onClick={() => setPlayerType("dm")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio1">DM</label>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio2" value="player" onClick={() => setPlayerType("player")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio2">Player</label>
                    </div>
                    <button className="btn btn-primary submit-game-button" disabled={!joinGameID || !playerType} onClick={() => joinGame(joinGameID, playerType)}>Add</button>
                </div>
            }
        </main>
    );
}