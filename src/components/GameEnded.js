import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from './Card';
import { generateKey } from '../common/utils';
import * as actionsGame from '../actions/game';

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
  game, cardsTurned, playerScores, playing, replayGame
}) => (
  <div>
    <div>{game.p1_name} vs {game.p2_name}</div>
    <div className="columns is-mobile is-centered">
      <div className="column is-4-mobile is-3-tablet is-2-desktop has-text-centered">
        {displayCards(game.p1_rounds, game.p1_rounds_won, cardsTurned.p1, playing)}
      </div>
      <div className="column is-4-mobile is-3-tablet is-2-desktop has-text-centered">
        {displayCards(game.p2_rounds, game.p2_rounds_won, cardsTurned.p2, playing)}
      </div>
    </div>
    <div>{playerScores.p1} - {playerScores.p2}</div>
    <button onClick={replayGame}>{playing ? 'playing...' : 'Replay'}</button>
  </div>
);

GameEnded.propTypes = {
  game: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  cardsTurned: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  playerScores: PropTypes.objectOf(PropTypes.number).isRequired,
  playing: PropTypes.bool.isRequired,
  replayGame: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  game: state.game.game,
  playerScores: state.game.playerScores,
  cardsTurned: state.game.cardsTurned,
  playing: state.game.playing
});

const mapDispatchToProps = {
  ...actionsGame
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameEnded));
