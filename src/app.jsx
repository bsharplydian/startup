import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { Login } from './login/login';
import { Inventory } from './inventory/inventory';
import { Games } from './games/games';
import { AuthState } from './login/authState';

export default function App() {
    const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [currInvGameID, setCurrInvGameID] = React.useState(JSON.parse(getInv())[0] || 0);
    const [currInvCharID, setCurrInvPlayerID] = React.useState(JSON.parse(getInv())[1] || 0);

    var invGameID = currInvGameID;
    var invPlayerID = currInvCharID;
    function getInv() {
        if (localStorage.getItem('currInv')) {
            return localStorage.getItem('currInv')
        } else {
            return "[-1, -1]"
        }
    }
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="container-fluid">
                    <div className="title">The Bag of Holding</div>
                    <nav className="navbar navbar-dark">
                        {authState == AuthState.Authenticated && (
                            <div className="user-info">
                                <NavLink className="user" to="games">{username}</NavLink>
                                <img src="char-placeholder.png" height="20px"></img>
                            </div>
                        )}
                        {authState === AuthState.Unauthenticated && (
                            <div className="user-info">
                                <NavLink className="user">Not logged in</NavLink>
                                <img src="char-placeholder.png" height="20px"></img>
                            </div>
                        )}
                        {/* <img src="./BoH-logo.png" width="75"> --> */}
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                {authState !== AuthState.Authenticated && <NavLink className="nav-link" to="">Login</NavLink>}
                                {authState === AuthState.Authenticated && <NavLink className="nav-link" to="">Logout</NavLink>}
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="games">Games</NavLink>
                                </li>
                            )}
                        </menu>

                    </nav>
                </header>

                <Routes>
                    {authState === AuthState.Unauthenticated ?
                        (<Route path="*" element={<Login
                            username={username}
                            authState={authState}
                            onAuthChange={(username, authState) => {
                                setAuthState(authState);
                                setUsername(username);
                            }}
                        />
                        }
                        />) : (
                            <>
                                <Route path='/' element={<Login
                                    username={username}
                                    authState={authState}
                                    onAuthChange={(username, authState) => {
                                        setAuthState(authState);
                                        setUsername(username);
                                    }}
                                />
                                }
                                    exact
                                />
                                <Route path='/games' element={<Games
                                    username={username}
                                    onInvIDChange={(gameID, playerID) => {
                                        localStorage.setItem("currInv", JSON.stringify([gameID, playerID]))
                                        // console.log(gameID, playerID)
                                        invGameID = gameID
                                        invPlayerID = playerID
                                        setCurrInvGameID(gameID)
                                        setCurrInvPlayerID(playerID)
                                    }}
                                />
                                }
                                />
                                <Route path='/inventory' element={<Inventory
                                    gameID={invGameID}
                                    playerID={invPlayerID}
                                />
                                }
                                />
                                <Route path='*' element={<NotFound />} />
                            </>
                        )
                    }


                </Routes>

                <footer>
                    <div className="container-fluid">
                        <span className="text-reset">Jacob Memmott</span>
                        <a className="text-reset" href="https://github.com/bsharplydian/startup">GitHub</a>
                    </div>
                </footer>

            </div>
        </BrowserRouter>

    );
}

function NotFound() {
    return (
        <main className="container-fluid bg-tertiary text-center">
            <h1>404</h1>
            You reach into your Bag of Holding and find it empty.
        </main>
    );
}