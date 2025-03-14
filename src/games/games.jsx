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
    const [games, setGames] = React.useState({})
    const [newGameName, setNewGameName] = React.useState("");
    const [gameID, setJoinGameID] = React.useState("");
    const [joinGamePlayer, setJoinGamePlayer] = React.useState("");
    const [playerType, setPlayerType] = React.useState("");
    const [charNameInputs, setCharInputs] = React.useState({});
    const [openItem, setOpenItem] = React.useState(-1);
    const navigate = useNavigate()

    React.useEffect(() => {
        fetch(`/api/games/${username}`).then((response) => response.json()).then((games) => { setGames(games); }, [])
    }, [])


    async function addGame(newGameName, playerType) {
        // generates a random game id and adds a game with the given info to localstorage

        let newDm = null;
        let newPlayers = {};
        if (playerType === "dm") {
            newDm = username;
        }
        var game = { gameName: newGameName, dm: newDm, players: newPlayers };
        setAddGameVisible(false);
        console.log("getting new games")
        let newGames = await fetch(`/api/games/${username}`, {
            method: 'post',
            body: JSON.stringify(game),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.json())
        setGames(newGames);

    }
    async function joinGame(gameID, newCharName, playerType) {
        var game = games[gameID]
        if (game === null) {
            console.error("no game here")
            return
        }
        let newGames = games;
        if (playerType === "player") {
            newGames = await fetch(`/api/games/${gameID}/players`, {
                method: 'post',
                body: JSON.stringify({ characterName: newCharName, playerName: username }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => response.json());
            setGames(newGames)

        } else if (playerType === "dm") {
            if (game.dm !== null) {
                console.error("This game already has a dungeon master. Also this error shouldn't be possible")
                return
            } else {
                game.dm = username;
            }
        }

        setJoinGameVisible(false);
        setGames(newGames)
    }
    function addCharInput(value, index) {
        let newCharInputs = charNameInputs;
        newCharInputs[index] = value;
        setCharInputs(newCharInputs)
    }
    function addPlayerToGame(newCharName, gameID) {
        let newGame = games[gameID]
        let newGames = games;
        do {
            var id = Math.floor(Math.random() * 1000);
        }
        while (newGame["players"].indexOf(id) !== -1);
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
    async function deleteGame(gameID) {
        //clean up inventories
        Object.keys(localStorage)
            .filter(x =>
                x.startsWith('invs/' + gameID))
            .forEach(x => {
                localStorage.removeItem(x)
            })
        localStorage.removeItem("games/" + gameID)

        let newGames = await fetch(`/api/games/${gameID}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response) => response.json());


        setGames({ ...newGames })
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
                {Object.keys(games).map((gameID, index) => {
                    var currentGame = games[gameID] ? games[gameID] : { gameID: "-1", gameName: "loading...", dm: "none", players: ["loading...", "loading..."] }
                    return (

                        <Accordion.Item eventKey={gameID.toString()} key={gameID.toString()}>
                            <Accordion.Header>
                                <div className="game-info">
                                    {currentGame.gameName}
                                    <div className="gameID">ID: {gameID}</div>
                                    {/* get and add player role too */}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="characters">
                                    {Object.keys(currentGame.players).map((key, index) => {
                                        let charInfo = currentGame.players[key]
                                        return (
                                            <div className="character" key={key}>
                                                <button onClick={() => switchToInventory(gameID, key)}><img src="./char-placeholder.png" width="100" className="char-image"></img></button>
                                                <div className="character-name">
                                                    <div className="whitespace"></div>
                                                    <p className="character-name-text" onClick={() => switchToInventory(gameID, key)}>{charInfo.characterName}</p>
                                                    <Dropdown className="remove-char-button">
                                                        <Dropdown.Toggle className="remove-element-button remove-char-button">⋯</Dropdown.Toggle>
                                                        <Dropdown.Menu data-bs-theme="dark">
                                                            <Dropdown.Item onClick={() => deleteChar(gameID, key)}>Delete Character</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="character">
                                        <button onClick={() => addPlayerToGame(charNameInputs[gameID], gameID)}><img src="./add.png" width="100" className="char-image"></img></button>
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
                }}>Create Game</button>
            <button className="btn btn-primary add-game-button"
                onClick={() => {
                    setAddGameVisible(false)
                    setJoinGameVisible(true)
                    setPlayerType("")
                }}>Join Game</button>

            {addGameVisible === true &&
                <div className="add-game-form" autoComplete="off">
                    <h3 className="add-game-title">Create Game</h3>
                    <p>Create a new game as the Dungeon Master</p>
                    <div className="mb-3 game-text">
                        <input type="text" autoComplete="off" className="form-control game-input" id="gameName" placeholder="Game Name" value={newGameName} onChange={(e) => setNewGameName(e.target.value)}></input>
                    </div>
                    {/* <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio1" value="dm" onClick={() => setPlayerType("dm")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio1">DM</label>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio2" value="player" onClick={() => setPlayerType("player")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio2">Player</label>
                    </div> */}
                    <button className="btn btn-primary submit-game-button" disabled={!newGameName}
                        onClick={() => {
                            setPlayerType("dm");
                            addGame(newGameName, "dm");
                        }}>Create</button>
                </div>
            }
            {joinGameVisible === true &&
                <div className="add-game-form" autoComplete="off">
                    <h3 className="add-game-title">Join Game</h3>
                    <p>Join a game as a player</p>
                    <div className="mb-3 game-text">
                        <input type="number" autoComplete="off" className="form-control game-input" id="gameID" placeholder="Game ID" value={gameID} onChange={(e) => setJoinGameID(e.target.value)}></input>
                    </div>
                    <div className="mb-3 game-text">
                        <input type="text" autoComplete="off" className="form-control game-input" id="charName" placeholder="Character Name" value={joinGamePlayer} onChange={(e) => setJoinGamePlayer(e.target.value)}></input>
                    </div>
                    {/* <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio1" value="dm" onClick={() => setPlayerType("dm")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio1">DM</label>
                    </div>
                    <div className="form-check form-check-inline game-radio">
                        <input className="form-check-input" type="radio" name="playerType" id="inlineRadio2" value="player" onClick={() => setPlayerType("player")}></input>
                        <label className="form-check-label" htmlFor="inlineRadio2">Player</label>
                    </div> */}
                    <button className="btn btn-primary submit-game-button" disabled={!gameID || !joinGamePlayer}
                        onClick={() => {
                            setPlayerType("player");
                            joinGame(gameID, joinGamePlayer, "player")
                        }}>Join</button>
                </div>
            }
        </main>
    );
}