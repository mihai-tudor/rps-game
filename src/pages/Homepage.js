import React from 'react';
import './Homepage.css';
import GamesList from '../containers/GamesList';
import Header from '../components/Header';
import NewGame from '../containers/NewGame';

const Homepage = () => (
  <div className="App">
    <Header />
    <NewGame />
    <GamesList />
  </div>
);

export default Homepage;

