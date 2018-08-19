import React from 'react';
import NewGame from '../containers/NewGame';
import Hero from '../components/Hero';

const Homepage = () => (
  <React.Fragment>
    <Hero h1="Create new game" h2="Create a rock-paper-scissors game and send it to a friend" />
    <NewGame />
  </React.Fragment>
);

export default Homepage;
