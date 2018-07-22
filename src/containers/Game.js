import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGame, updateName, updatePlayedRounds, sentResponse, submitError } from '../actions/game';
import DisplayGame from '../components/DisplayGame';

class Game extends Component {
  componentDidMount() {
    this.props.fetchGame(this.props.match.params.id);
  }

  render() {
    const {
      game, isLoading, error, playerName, errorName, playedRounds, errorRounds, saving, saveError
    } = this.props;

    return (
      <div>
        <h2 className="subtitle white">Game</h2>
        <DisplayGame
          game={game}
          isLoading={isLoading}
          error={error}
          playerName={playerName}
          errorName={errorName}
          playedRounds={playedRounds}
          updateName={this.props.updateName}
          updatePlayedRounds={this.props.updatePlayedRounds}
          errorRounds={errorRounds}
          saving={saving}
          saveError={saveError}
          sentResponse={this.props.sentResponse}
          submitError={this.props.submitError}
        />
      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchGame: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  playerName: PropTypes.string.isRequired,
  errorName: PropTypes.bool.isRequired,
  playedRounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateName: PropTypes.func.isRequired,
  updatePlayedRounds: PropTypes.func.isRequired,
  errorRounds: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  sentResponse: PropTypes.func.isRequired,
  submitError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  game: state.game.game,
  isLoading: state.game.loading,
  error: state.game.error,
  playerName: state.game.playerName,
  playedRounds: state.game.playedRounds,
  errorName: state.game.errorName,
  errorRounds: state.game.errorRounds,
  saving: state.game.saving,
  saveError: state.game.saveError
});

const mapDispatchToProps = {
  fetchGame,
  sentResponse,
  updateName,
  updatePlayedRounds,
  submitError
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
