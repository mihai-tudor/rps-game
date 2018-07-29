import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addS } from '../common/utils';
import NameInput from '../components/NameInput';
import RoundsRadio from '../components/RoundsRadio';
import FormError from '../components/FormError';
import { isErrorName, isErrorRounds } from '../common/formValidation';
import * as actionsGame from '../actions/game';

const GameOngoing = ({
  game, playerName, errorName, sentResponse, submitError,
  playedRounds, errorRounds, saving, saveError, updateName, updatePlayedRounds
}) => {
  const submitResponse = (event) => {
    event.preventDefault();

    const nameHasError = isErrorName(playerName);
    const roundsHasError = isErrorRounds(playedRounds, game.rounds);
    if (nameHasError || roundsHasError) {
      submitError(nameHasError, roundsHasError);
    } else {
      sentResponse(game._id, { playerName, playedRounds });
    }
  };

  return (
    <section className="section full-column">
      <h1 className="subtitle white">{`${game.p1_name} created this ${game.rounds} round${addS(game.rounds)} game of rock-paper-scissors.`}</h1>
      <div>{`Make your choice${addS(game.rounds)} and see who wins!`}</div>
      <form className="form" onSubmit={submitResponse}>
        <div className="field has-addons" style={{ justifyContent: 'center' }}>
          <div className="control">
            <NameInput name={playerName} error={errorName} updateName={updateName} />
            <RoundsRadio
              numberOfRounds={game.rounds}
              playedRounds={playedRounds}
              updatePlayedRounds={updatePlayedRounds}
              errorRounds={errorRounds}
            />
            <div className="field is-grouped is-grouped-centered">
              <button className={saving ? 'is-loading button is-primary' : 'button is-primary'}>
                {saving ? 'Sending response...' : 'Send response'}
              </button>
            </div>
            {saveError ? <FormError errorMessage="Failed to send response! Please try again." /> : ''}
          </div>
        </div>
      </form>
    </section>
  );
};

GameOngoing.propTypes = {
  game: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
  saveError: state.game.saveError,
  playerScores: state.game.playerScores,
  cardsTurned: state.game.cardsTurned,
  playing: state.game.playing
});

const mapDispatchToProps = {
  ...actionsGame
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameOngoing));
