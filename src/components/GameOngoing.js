import React from 'react';
import PropTypes from 'prop-types';
import { addS } from '../common/utils';
import NameInput from '../components/NameInput';
import RoundsRadio from '../components/RoundsRadio';
import FormError from '../components/FormError';
import { isErrorName, isErrorRounds } from '../common/formValidation';

const GameOngoing = ({
  id, p1Name, numberOfRounds, playerName, errorName, sentResponse, submitError,
  playedRounds, errorRounds, saving, saveError, updateName, updatePlayedRounds
}) => {
  const submitResponse = (event) => {
    event.preventDefault();

    const nameHasError = isErrorName(playerName);
    const roundsHasError = isErrorRounds(playedRounds, numberOfRounds);
    if (nameHasError || roundsHasError) {
      submitError(nameHasError, roundsHasError);
    } else {
      sentResponse(id, { playerName, playedRounds });
    }
  };

  return (
    <section className="section full-column">
      <h1 className="subtitle white">{`${p1Name} created this ${numberOfRounds} round${addS(numberOfRounds)} game of rock-paper-scissors.`}</h1>
      <div>{`Make your choice${addS(numberOfRounds)} and see who wins!`}</div>
      <form className="form" onSubmit={submitResponse}>
        <div className="field has-addons" style={{ justifyContent: 'center' }}>
          <div className="control">
            <NameInput name={playerName} error={errorName} updateName={updateName} />
            <RoundsRadio
              numberOfRounds={numberOfRounds}
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
  p1Name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  numberOfRounds: PropTypes.number.isRequired,
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

export default GameOngoing;
