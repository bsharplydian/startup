import React from 'react';
import './login.css';
import { Link } from "react-router-dom"
import { AuthState } from './authState.js'
export function Login({ userName, authState }) {

    return (
        <main className="login-main">
            <div>
                {authState !== AuthState.Unknown && <h1 className="welcome">Welcome</h1>}

                {authState === AuthState.Unauthenticated && <form className="login-form" method="get" action="games">
                    <div className="username login-item">
                        <span className="login-label">Username</span>
                        <input type="text"></input>
                        <div className="whitespace"></div>
                    </div>
                    <div className="password login-item">
                        <span className="login-label">Password</span>
                        <input type="password"></input>
                        <div className="whitespace"></div>
                    </div>
                    <div className="login-item login-buttons">
                        <button className="login-button" type="submit" ><span className="login-button-text">Login</span></button>
                        <button className="login-button create-account-btn" type="submit"><span className="login-button-text">Create Account</span></button>
                    </div>
                </form>}
                {authState === AuthState.Authenticated &&
                    <form className="login-form">
                        <div className="login-item">
                            <span className="login-item">{userName}</span>
                        </div>
                        <div className="login-item login-buttons">
                            <button className="login-button" type="submit" ><span className="login-button-text">Play</span></button>
                            <button className="login-button create-account-btn" type="submit"><span className="login-button-text">Logout</span></button>
                        </div>
                    </form>
                }
            </div>
        </main>
    );
}