import React from 'react';
import './login.css';
import { Link } from "react-router-dom"
import { AuthState } from './authState.js'
import { useNavigate } from 'react-router-dom'
import { ErrorToast } from "../errorToast.jsx"

import Button from 'react-bootstrap/Button'
export function Login({ username, authState, onAuthChange }) {
    const [errorText, setErrorText] = React.useState(null)

    const [newUsername, setNewUsername] = React.useState(username)
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate();

    async function login() {
        loginOrCreate(`/api/auth/login`)
    }
    async function createUser() {
        loginOrCreate(`/api/auth/create`)
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: newUsername, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (response?.status === 200) {
            localStorage.setItem('username', newUsername)
            onAuthChange(newUsername, AuthState.Authenticated);
        } else {
            const body = await response.json();
            setErrorText(`${body.msg}`)
        }
    }

    async function logout() {
        const response = await fetch('/api/auth/logout', {
            method: 'delete',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        localStorage.removeItem('username')
        localStorage.removeItem("currInv")
        onAuthChange(username, AuthState.Unauthenticated)
    }
    return (
        <main className="login-main">
            <div>
                {authState === AuthState.Unauthenticated && <h1 className="welcome">Welcome</h1>}
                {authState === AuthState.Authenticated && <h3 className="welcome">Roll for initiative.</h3>}
                {authState === AuthState.Unauthenticated && <div className="login-form">
                    <div className="username login-item">
                        <span className="login-label">Username</span>
                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        <div className="whitespace"></div>
                    </div>
                    <div className="password login-item">
                        <span className="login-label">Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="whitespace"></div>
                    </div>
                    <div className="login-item login-buttons">
                        <button className="login-button" onClick={() => login()} disabled={!newUsername || !password}><span className="login-button-text">Login</span></button>
                        <button className="login-button secondary-btn" onClick={() => createUser()} disabled={!newUsername || !password}><span className="login-button-text">Create Account</span></button>
                    </div>
                </div>}
                {authState === AuthState.Authenticated &&
                    <div className="login-form">
                        <div className="login-item">
                            <span className="login-item">{username}</span>
                        </div>
                        <div className="login-item login-buttons">
                            <button className="login-button" onClick={() => navigate('/games')}><span className="login-button-text">Start</span></button>
                            <button className="login-button secondary-btn" onClick={() => logout()}><span className="login-button-text">Logout</span></button>
                        </div>
                    </div>
                }
                <ErrorToast message={errorText} onHide={() => setErrorText(null)}></ErrorToast>
            </div>
        </main>
    );
}