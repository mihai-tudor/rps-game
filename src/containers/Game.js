import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGame } from '../actions/game';
import { addS } from '../common/utils';

const GameEnded = ({
  id, p1Name, p2Name, p1Rounds, p2Rounds
}) => (
  <div>
    <div>Game id: {id}</div>
    <div>{p1Name} vs {p2Name}</div>
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

const GameInPlay = ({
  id, p1Name, numberOfRounds
}) => (
  <div>
    <div>Game id: {id}</div>
    <div>{`${p1Name} created this ${numberOfRounds} round${addS(numberOfRounds)} game of rock-paper-scissors.`}</div>
    <div>{`Make your choice${addS(numberOfRounds)} and see who wins!`}</div>
  </div>
);

GameInPlay.propTypes = {
  p1Name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  numberOfRounds: PropTypes.number.isRequired
};

const displayGame = (isLoading, game, error) => {
  if (error) {
    return <div>{error}</div>
  }
  if (isLoading) {
    return <div>Loading games...</div>
  }
  if (game.ended) {
    return (
      <GameEnded
        id={game._id}
        p1Name={game.p1_name}
        p2Name={game.p2_name}
        p1Rounds={game.p1_rounds}
        p2Rounds={game.p2_rounds}
      />
    );
  }
  return (
    <GameInPlay
      id={game._id}
      p1Name={game.p1_name}
      numberOfRounds={game.rounds}
    />
  );
};

class Game extends Component {
  componentDidMount() {
    this.props.fetchGame(this.props.match.params.id);
  }

  render() {
    const { game, isLoading, error } = this.props;

    return (
      <div>
        <h2 className="subtitle white">Game</h2>
        <div>{ displayGame(isLoading, game, error) }</div>
      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchGame: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => ({
  game: state.game.game,
  isLoading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = {
  fetchGame
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
