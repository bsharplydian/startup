import React from 'react';
import '../app.css'
import './login.css';

export function Login() {
    return (
        <main>
            <div>
                <h1>Welcome</h1>
                <form method="get" action="games.html">
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
                </form>
            </div>
        </main>
    );
}