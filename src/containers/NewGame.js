import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bulma/css/bulma.css';
import { updateRounds, updateName, updatePlayedRounds, createNewGame, submitError } from '../actions/newGame';
import { isErrorName, isErrorRounds } from '../common/formValidation';
import { getDomain } from '../common/utils';
import NameInput from '../components/NameInput';
import RoundsSelect from '../components/RoundsSelect';
import RoundsRadio from '../components/RoundsRadio';
import FormError from '../components/FormError';

const renderSuccess = (newGameId) => (
  <div className="notification has-text-centered is-success">
    Game successfully created, send this link to your opponent:
    <p>{getDomain()}/game/{newGameId}</p>
  </div>
);

class NewGame extends Component {
  render() {
    const {
      setsOfRounds, numberOfRounds, playerName, playedRounds,
      errorRounds, errorName, saving, saveError, createdGameId
    } = this.props;

    const submitNewGame = (event) => {
      event.preventDefault();

      const nameHasError = isErrorName(playerName);
      const roundsHasError = isErrorRounds(playedRounds, numberOfRounds);
      if (nameHasError || roundsHasError) {
        this.props.submitError(nameHasError, roundsHasError);
      } else {
        this.props.createNewGame(this.props);
      }
    };

    return (
      <section className="section">
        <form className="form" onSubmit={submitNewGame}>
          <div className="field has-addons" style={{ justifyContent: 'center' }}>
            <div className="control">
              <NameInput name={playerName} error={errorName} updateName={this.props.updateName} />
              <RoundsSelect
                numberOfRounds={numberOfRounds}
                setsOfRounds={setsOfRounds}
                updateRounds={this.props.updateRounds}
              />
              <RoundsRadio
                numberOfRounds={numberOfRounds}
                playedRounds={playedRounds}
                updatePlayedRounds={this.props.updatePlayedRounds}
                errorRounds={errorRounds}
              />
              <div className="field is-grouped is-grouped-centered">
                <button className={saving ? 'is-loading button is-info' : 'button is-info'}>
                  {saving ? 'Creating new game...' : 'Create new game'}
                </button>
              </div>
              {saveError ? <FormError errorMessage="Failed to create game! Please try again." /> : ''}
              {createdGameId ? renderSuccess(createdGameId) : ''}
            </div>
          </div>
        </form>
      </section>
    );
  }
}

NewGame.propTypes = {
  setsOfRounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  numberOfRounds: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playedRounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateRounds: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  submitError: PropTypes.func.isRequired,
  createNewGame: PropTypes.func.isRequired,
  updatePlayedRounds: PropTypes.func.isRequired,
  errorName: PropTypes.bool.isRequired,
  errorRounds: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  createdGameId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  setsOfRounds: state.newGame.setsOfRounds,
  numberOfRounds: state.newGame.numberOfRounds,
  playerName: state.newGame.playerName,
  playedRounds: state.newGame.playedRounds,
  errorName: state.newGame.errorName,
  errorRounds: state.newGame.errorRounds,
  saving: state.newGame.saving,
  saveError: state.newGame.saveError,
  saveErrorMsg: state.newGame.saveErrorMsg,
  createdGameId: state.newGame.createdGameId
});

const mapDispatchToProps = {
  updateRounds,
  updateName,
  updatePlayedRounds,
  submitError,
  createNewGame
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);

