import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { generateKey } from '../common/utils';

const displayCards = (roundsPlayed, playerWins, cardsTurned, playing) => {
  const cards = [];
  roundsPlayed.forEach(
    (played, key) => {
      cards.push(
        <Card
          key={generateKey(`${played}-${key}`)}
          cardNumber={played}
          won={playerWins[key]}
          turnCard={cardsTurned[key]}
          playing={playing}
        />
      );
    }
  );
  return cards;
};

const GameEnded = ({
  p1Name, p2Name, p1Rounds, p2Rounds, p1RoundsWon, p2RoundsWon,
  cardsTurned, playerScores, playing, replayGame
}) => (
  <div>
    <div>{p1Name} vs {p2Name}</div>
    <div className="columns is-mobile is-centered">
      <div className="column is-4-mobile is-3-tablet is-2-desktop has-text-centered">
        {displayCards(p1Rounds, p1RoundsWon, cardsTurned.p1, playing)}
      </div>
      <div className="column is-4-mobile is-3-tablet is-2-desktop has-text-centered">
        {displayCards(p2Rounds, p2RoundsWon, cardsTurned.p2, playing)}
      </div>
    </div>
    <div>{playerScores.p1} - {playerScores.p2}</div>
    <button onClick={replayGame}>{playing ? 'playing...' : 'Replay'}</button>
  </div>
);

GameEnded.propTypes = {
  p1Name: PropTypes.string.isRequired,
  p2Name: PropTypes.string.isRequired,
  p1Rounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  p2Rounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  p1RoundsWon: PropTypes.arrayOf(PropTypes.bool).isRequired,
  p2RoundsWon: PropTypes.arrayOf(PropTypes.bool).isRequired,
  cardsTurned: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  playerScores: PropTypes.objectOf(PropTypes.number).isRequired,
  playing: PropTypes.bool.isRequired,
  replayGame: PropTypes.func.isRequired
};

export default GameEnded;
