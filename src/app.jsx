import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div className="body bg-dark text-light">
            <header className="container-fluid">
                <a className="title" href="#">The Bag of Holding</a>
                <nav className="navbar navbar-dark">
                    <div className="user-info">
                        <a className="user" href="games.html">Current User</a>
                        <img src="char-placeholder.png" height="20px"></img>
                    </div>
                    {/* <img src="./BoH-logo.png" width="75"> --> */}
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="./index.html">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./games.html">Games</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./inventory.html">Inventory</a>
                        </li>
                    </menu>

                </nav>
            </header>

            <main>app components here</main>

            <footer>
                <div className="container-fluid">
                    <span className="text-reset">Jacob Memmott</span>
                    <a className="text-reset" href="https://github.com/bsharplydian/startup">GitHub</a>
                </div>
            </footer>

        </div>

    );
}