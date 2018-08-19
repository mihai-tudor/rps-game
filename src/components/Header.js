import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar is-white has-shadow is-spaced">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">Create new game</Link>
        <Link to="/history" className="navbar-item">History</Link>
      </div>
    </nav>
  );
}
