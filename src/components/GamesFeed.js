import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormError from './FormError';
import { addS, printWinner, winLoseClass } from '../common/utils';
import replayButton from '../images/replay-game.svg';

const Game = ({
  id, p1Name, p2Name, p1Score, p2Score, rounds, winner
}) => (
  <React.Fragment>
    <div className="columns is-gapless is-centered">
      <div className="column is-8-desktop is-10-tablet box">
        <div className="columns is-mobile is-marginless">
          <div className="column is-5 has-text-right">
            <p className="is-size-5">{p1Name}</p>
            <p className={`is-size-4 ${winLoseClass(1, winner)}`}>{p1Score}</p>
          </div>
          <div className="column is-2 has-text-centered is-paddingless">
            <p className="is-size-3 has-text-info">VS</p>
            <Link to={{ pathname: `/game/${id}` }}><img src={replayButton} width="35" height="35" alt="replay game" /></Link>
          </div>
          <div className="column is-5">
            <p className="is-size-5">{p2Name}</p>
            <p className={`is-size-4 ${winLoseClass(2, winner)}`}>{p2Score}</p>
          </div>
        </div>
        <div className="column has-text-centered has-text-grey-light">
          {printWinner(p1Name, p2Name, winner)} in {rounds} round{addS(rounds)}
        </div>
      </div>
    </div>
  </React.Fragment>
);

Game.propTypes = {
  p1Name: PropTypes.string.isRequired,
  p2Name: PropTypes.string.isRequired,
  p1Score: PropTypes.number.isRequired,
  p2Score: PropTypes.number.isRequired,
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
      p1Score={game.playerScores.p1}
      p2Score={game.playerScores.p2}
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
