import React from 'react';
import './Homepage.css';
import GamesList from '../components/GamesList';
import Header from '../components/Header';
import NewGame from '../components/NewGame';

const Homepage = () => (
  <div className="App">
    <Header />
    <NewGame />
    <GamesList />
  </div>
);

export default Homepage;

