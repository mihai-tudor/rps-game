import React from 'react';
import './Homepage.css';
import Header from '../components/Header';
import GameComponent from '../components/Game';

const Game = () => (
  <div className="App">
    <Header />
    <GameComponent />
  </div>
);

export default Game;
