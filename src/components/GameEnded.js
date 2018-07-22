import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { generateKey } from '../common/utils';

const displayCards = (roundsPlayed) => {
  const cards = [];
  roundsPlayed.forEach(
    (playedOption, key) => {
      cards.push(
        <Card
          key={generateKey(`${playedOption}-${key}`)}
          cardNumber={playedOption}
        />
      );
    }
  );
  return cards;
};

const GameEnded = ({
  id, p1Name, p2Name, p1Rounds, p2Rounds
}) => (
  <div>
    <div>Game id: {id}</div>
    <div>{p1Name} vs {p2Name}</div>
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-parent">{displayCards(p1Rounds)}</div>
      <div className="tile is-vertical is-parent">{displayCards(p2Rounds)}</div>
    </div>
    <div>Player 1: {p1Rounds}</div>
    <div>Player 2: {p2Rounds}</div>
    <button>Replay</button>
  </div>
);

GameEnded.propTypes = {
  p1Name: PropTypes.string.isRequired,
  p2Name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  p1Rounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  p2Rounds: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default GameEnded;
