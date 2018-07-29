import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGame } from '../actions/game';
import GameEnded from '../components/GameEnded';
import GameOngoing from '../components/GameOngoing';

const displayGame = (game, isLoading, error) => {
  if (error) {
    return <div>{error}</div>
  }
  if (isLoading) {
    return <div>Loading games...</div>
  }
  if (game.ended) {
    return (
      <GameEnded />
    );
  }
  return (
    <GameOngoing />
  );
};

class Game extends Component {
  componentDidMount() {
    this.props.fetchGame(this.props.match.params.id);
  }

  render() {
    const {
      game, isLoading, error
    } = this.props;

    return (
      <div>
        <h2 className="subtitle white">Game</h2>
        {displayGame(game, isLoading, error)}
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
