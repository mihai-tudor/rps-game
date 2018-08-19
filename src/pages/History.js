import React from 'react';
import GamesList from '../containers/GamesList';
import Hero from '../components/Hero';

const History = () => (
  <React.Fragment>
    <Hero h1="History" h2="Archive of played rock-paper-scissors games" />
    <GamesList />
  </React.Fragment>
);

export default History;
