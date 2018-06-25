import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default function Header() {
  return (
    <header className="App-header">
      <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
      <h1 className="App-title">Welcome to rock-paper-scissors game!</h1>
    </header>
  );
}
