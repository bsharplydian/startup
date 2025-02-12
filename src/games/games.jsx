import React from 'react';
import './games.css';
import '../app.css';

export function Games() {
    return (
        <main>
            <h1>Games</h1>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            The Tides of Chaos (DM)
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="characters">
                                <div class="character">
                                    <a href="./inventory.html"><img src="./char-placeholder.png" width="100" class="char-image"></img></a>
                                    <a href="./inventory.html">Kabalaka la Kabalabalakalabakan</a>
                                </div>
                                <div class="character">
                                    <a href="./inventory.html"><img src="./char-placeholder.png" width="100" class="char-image"></img></a>
                                    <a href="./inventory.html">Crow</a>
                                </div>
                                <div class="character">
                                    <a href="./inventory.html"><img src="./char-placeholder.png" width="100" class="char-image"></img></a>
                                    <a href="./inventory.html">Gin</a>
                                </div>
                                <div class="character">
                                    <a href="./inventory.html"><img src="./char-placeholder.png" width="100" class="char-image"></img></a>
                                    <a href="./inventory.html">Gonokosukirishurigeiton</a>
                                </div>
                                <div class="character">
                                    <a href="./inventory.html"><img src="./char-placeholder.png" width="100" class="char-image"></img></a>
                                    <a href="./inventory.html">Lonri</a>
                                </div>
                                <div class="character">
                                    <a><img src="./add.png" width="100" class="char-image"></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Grim Hollow (Player)
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="characters">
                                <div class="character">
                                    <a href="./inventory.html"><img src="./harrison_gunn_ralraymee.png" width="100" class="char-image"></img></a>
                                    <a href="./inventory.html">Harrison Gunn</a>
                                </div>
                                <div class="character">
                                    <a><img src="./add.png" width="100" class="char-image"></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Dragons of Stormwreck Isle (Player)
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="characters">
                                <div class="character">
                                    <a href="./inventory.html"><img src="./char-placeholder.png" width="100" class="char-image"></img></a>
                                    <a href="./inventory.html">Tyrenol Painkiller</a>
                                </div>
                                <div class="character">
                                    <a><img src="./add.png" width="100" class="char-image"></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary add-game-button">Add Game</button>
            <form class="add-game-form">
                <h3 class="add-game-title">Add a Game</h3>
                <div class="mb-3 game-text">
                    <input type="text" class="form-control game-input" id="gameName" placeholder="Name"></input>
                </div>
                <div class="form-check form-check-inline game-radio">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                    <label class="form-check-label" for="inlineRadio1">DM</label>
                </div>
                <div class="form-check form-check-inline game-radio">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                    <label class="form-check-label" for="inlineRadio2">Player</label>
                </div>
                <button class="btn btn-primary submit-game-button">Add</button>
            </form>
        </main>
    );
}