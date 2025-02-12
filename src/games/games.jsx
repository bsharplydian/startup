import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './games.css';

export function Games() {
    return (
        <main className="games-main">
            <h1>Games</h1>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            The Tides of Chaos (DM)
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
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
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Grim Hollow (Player)
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="characters">
                                <div className="character">
                                    <a href="./inventory.html"><img src="./harrison_gunn_ralraymee.png" width="100" className="char-image"></img></a>
                                    <a href="./inventory.html">Harrison Gunn</a>
                                </div>
                                <div className="character">
                                    <a><img src="./add.png" width="100" className="char-image"></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Dragons of Stormwreck Isle (Player)
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="characters">
                                <div className="character">
                                    <a href="./inventory.html"><img src="./char-placeholder.png" width="100" className="char-image"></img></a>
                                    <a href="./inventory.html">Tyrenol Painkiller</a>
                                </div>
                                <div className="character">
                                    <a><img src="./add.png" width="100" className="char-image"></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary add-game-button">Add Game</button>
            <form className="add-game-form">
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