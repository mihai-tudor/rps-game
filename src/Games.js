import React from 'react';
import PropTypes from 'prop-types';

const Game = ({
  id, name, player1, player2,
}) => (
  <div>
    <div>Game id: {id}</div>
    <div>Game name: {name}</div>
    <div>Player 1: {player1}</div>
    <div>Player 2: {player2}</div>
  </div>
);

Game.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  player1: PropTypes.arrayOf(PropTypes.number).isRequired,
  player2: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const Games = ({ games }) => (
  <div>
    <div>Games</div>
    {games.map((game) => (<Game
      key={game._id}
      id={game._id}
      name={game.name}
      player1={game.p1}
      player2={game.p2}
    />))}
  </div>
);

Games.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Games;
