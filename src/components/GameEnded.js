import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from './Card';
import { generateKey, winLoseClass } from '../common/utils';
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

class GameEnded extends Component {
  componentDidMount() {
    this.props.replayGame();
  }

  render() {
    const {
      game, cardsTurned, playerScores, playing
    } = this.props;

    return (
      <React.Fragment>
        <h1 className="is-size-3">Game results</h1>
        <div className="columns is-gapless is-centered is-vcentered is-mobile">
          <div className="column is-4-mobile is-3-tablet is-2-desktop is-2-fullhd has-text-right">
            <p className="is-size-4">{game.p1_name}</p>
          </div>
          <div className="column is-4-mobile is-3-tablet is-2-desktop is-1-fullhd has-text-centered">
            <p className="is-size-2 has-text-info">VS</p>
          </div>
          <div className="column is-4-mobile is-3-tablet is-2-desktop is-2-fullhd">
            <p className="is-size-4">{game.p2_name}</p>
          </div>
        </div>
        <div className="columns is-gapless is-centered is-vcentered is-mobile">
          <div className="column is-4-mobile is-3-tablet is-2-desktop is-2-fullhd has-text-right">
            <div className="tile is-vertical">
              {displayCards(game.p1_rounds, game.p1_rounds_won, cardsTurned.p1, playing)}
            </div>
          </div>
          <div className="column is-4-mobile is-3-tablet is-2-desktop is-1-fullhd has-text-centered">
            {playing ?
              <p className="is-size-2 has-text-grey">0 - 0</p>
            :
              <p className="is-size-2">
                <span className={`${winLoseClass(1, game.winner)}`}>{playerScores.p1}</span> - <span className={`${winLoseClass(2, game.winner)}`}>{playerScores.p2}</span>
              </p>
            }
          </div>
          <div className="column is-4-mobile is-3-tablet is-2-desktop is-2-fullhd">
            <div className="tile is-vertical">
              {displayCards(game.p2_rounds, game.p2_rounds_won, cardsTurned.p2, playing)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

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
