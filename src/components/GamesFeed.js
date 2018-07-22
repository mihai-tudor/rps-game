import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormError from './FormError';
import { addS, printWinner } from '../common/utils';

const Game = ({
  id, p1Name, p2Name, rounds, winner
}) => (
  <div>
    <div><Link to={{ pathname: `/game/${id}` }}>{p1Name} vs {p2Name}</Link></div>
    <div>{printWinner(p1Name, p2Name, winner)} in {rounds} round{addS(rounds)}</div>
  </div>
);

Game.propTypes = {
  p1Name: PropTypes.string.isRequired,
  p2Name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  rounds: PropTypes.number.isRequired,
  winner: PropTypes.number.isRequired
};

const GamesFeed = ({ isLoading, games, error }) => {
  if (error) {
    return <FormError errorMessage={error} />
  }
  if (isLoading) {
    return <div className="control is-loading has-text-centered">Loading games...</div>
  }
  return (
    games.map((game) => (<Game
      key={game._id}
      id={game._id}
      p1Name={game.p1_name}
      p2Name={game.p2_name}
      rounds={game.rounds}
      winner={game.winner}
    />))
  );
};

GamesFeed.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default GamesFeed;
