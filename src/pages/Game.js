import React from 'react';
import './Homepage.css';
import Header from '../components/Header';
import GameComponent from '../containers/Game';

const Game = () => (
  <div className="App">
    <Header />
    <GameComponent />
  </div>
);

export default Game;
