import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './games.css';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom"

export function Games(props) {
    const username = props.username;
    const [addGameVisible, setAddGameVisible] = React.useState(false);
    const [gameIDs, setGameIDs] = React.useState(localStorage.getItem("gameIDs") || []);
    const [newGameName, setNewGameName] = React.useState("");
    const [playerType, setPlayerType] = React.useState("");
    async function addGame(newGameName, playerType) {
        console.log(playerType)
        console.log(newGameName)
        // generates a random game id and adds a game with the given info to localstorage
        do {
            var id = Math.floor(Math.random() * 1000)
        }
        while (id in gameIDs);
        let newDm = null;
        let newPlayers = []
        if (playerType === "dm") {
            let newDm = username;
        }
        var game = { gameID: id, gameName: newGameName, dm: newDm, players: newPlayers }
        localStorage.setItem("games/" + id, JSON.stringify(game))
        setAddGameVisible(false)
    }

    return (
        <main className="games-main">
            <h1>Games</h1>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        The Tides of Chaos (DM)
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="characters">
                            <div className="character">
                                <Link to="/inventory"><img src="./char-placeholder.png" width="100" className="char-image"></img></Link>
                                <Link to="/inventory">Kaba</Link>
                            </div>
                            <div className="character">
                                <Link to="/inventory"><img src="./char-placeholder.png" width="100" className="char-image"></img></Link>
                                <Link to="/inventory">Crow</Link>
                            </div>
                            <div className="character">
                                <Link to="/inventory"><img src="./char-placeholder.png" width="100" className="char-image"></img></Link>
                                <Link to="/inventory">Gin</Link>
                            </div>
                            <div className="character">
                                <Link to="/inventory"><img src="./char-placeholder.png" width="100" className="char-image"></img></Link>
                                <Link to="/inventory">Gonokosukirishurigeiton</Link>
                            </div>
                            <div className="character">
                                <Link to="/inventory"><img src="./char-placeholder.png" width="100" className="char-image"></img></Link>
                                <Link to="/inventory">Lonri</Link>
                            </div>
                            <div className="character">
                                <Link><img src="./add.png" width="100" className="char-image"></img></Link>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Grim Hollow (Player)
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="characters">
                            <div className="character">
                                <Link to="/inventory"><img src="./harrison_gunn_ralraymee.png" width="100" className="char-image"></img></Link>
                                <Link to="/inventory">Harrison Gunn</Link>
                            </div>
                            <div className="character">
                                <Link><img src="./add.png" width="100" className="char-image"></img></Link>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        Dragons of Stormwreck Isle (Player)
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="characters">
                            <div className="character">
                                <Link to="/inventory"><img src="./char-placeholder.png" width="100" className="char-image"></img></Link>
                                <Link to="/inventory">Tyrenol Painkiller</Link>
                            </div>
                            <div className="character">
                                <Link><img src="./add.png" width="100" className="char-image"></img></Link>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
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