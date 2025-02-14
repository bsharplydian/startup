import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './games.css';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom"

export function Games() {
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
            <button className="btn btn-primary add-game-button">Add Game</button>
            <form className="add-game-form" autocomplete="off">
                <h3 className="add-game-title">Add Game</h3>
                <div className="mb-3 game-text">
                    <input type="text" className="form-control game-input" id="gameName" placeholder="Name"></input>
                </div>
                <div className="form-check form-check-inline game-radio">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                    <label className="form-check-label" for="inlineRadio1">DM</label>
                </div>
                <div className="form-check form-check-inline game-radio">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                    <label className="form-check-label" for="inlineRadio2">Player</label>
                </div>
                <button className="btn btn-primary submit-game-button">Add</button>
            </form>
        </main>
    );
}