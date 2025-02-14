import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './games.css';
import Accordion from 'react-bootstrap/Accordion';

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
                                <a href="./inventory.html"><img src="./char-placeholder.png" width="100" className="char-image"></img></a>
                                <a href="./inventory.html">Kabalaka la Kabalabalakalabakan</a>
                            </div>
                            <div className="character">
                                <a href="./inventory.html"><img src="./char-placeholder.png" width="100" className="char-image"></img></a>
                                <a href="./inventory.html">Crow</a>
                            </div>
                            <div className="character">
                                <a href="./inventory.html"><img src="./char-placeholder.png" width="100" className="char-image"></img></a>
                                <a href="./inventory.html">Gin</a>
                            </div>
                            <div className="character">
                                <a href="./inventory.html"><img src="./char-placeholder.png" width="100" className="char-image"></img></a>
                                <a href="./inventory.html">Gonokosukirishurigeiton</a>
                            </div>
                            <div className="character">
                                <a href="./inventory.html"><img src="./char-placeholder.png" width="100" className="char-image"></img></a>
                                <a href="./inventory.html">Lonri</a>
                            </div>
                            <div className="character">
                                <a><img src="./add.png" width="100" className="char-image"></img></a>
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
                                <a href="./inventory.html"><img src="./harrison_gunn_ralraymee.png" width="100" className="char-image"></img></a>
                                <a href="./inventory.html">Harrison Gunn</a>
                            </div>
                            <div className="character">
                                <a><img src="./add.png" width="100" className="char-image"></img></a>
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
                                <a href="./inventory.html"><img src="./char-placeholder.png" width="100" className="char-image"></img></a>
                                <a href="./inventory.html">Tyrenol Painkiller</a>
                            </div>
                            <div className="character">
                                <a><img src="./add.png" width="100" className="char-image"></img></a>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <button className="btn btn-primary add-game-button">Add Game</button>
            <form className="add-game-form" autocomplete="off">
                <h3 className="add-game-title">Add a Game</h3>
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