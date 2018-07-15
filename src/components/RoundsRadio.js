import React from 'react';
import PropTypes from 'prop-types';
import { generateKey } from '../common/utils';
import FormError from './FormError';

const renderRounds = (numberOfRounds, playedRounds, updatePlayedRound) => {
  const radioRounds = [];
  for (let i = 0; i < numberOfRounds; i += 1) {
    radioRounds.push(
      <div key={generateKey(i)} className="control" onChange={(e) => updatePlayedRound(e.target)}>
        <label className="radio" htmlFor={`round-${i}-rock`}>
          Rock
          <input defaultChecked={playedRounds[i] === 0} id={`round-${i}-rock`} type="radio" name={i} value="0" />
        </label>
        <label className="radio" htmlFor={`round-${i}-paper`}>
          Paper
          <input defaultChecked={playedRounds[i] === 1} id={`round-${i}-paper`} type="radio" name={i} value="1" />
        </label>
        <label className="radio" htmlFor={`round-${i}-scissors`}>
          Scissors
          <input defaultChecked={playedRounds[i] === 2} id={`round-${i}-scissors`} type="radio" name={i} value="2" />
        </label>
      </div>
    );
  }
  return radioRounds;
};

const RoundsRadio = ({
  numberOfRounds, playedRounds, updatePlayedRounds, errorRounds
}) => (
  <div>
    {renderRounds(numberOfRounds, playedRounds, updatePlayedRounds)}
    {errorRounds ? <FormError errorMessage="You have to choose rock, paper or scissors for all rounds!" /> : ''}
  </div>
);

RoundsRadio.propTypes = {
  numberOfRounds: PropTypes.number.isRequired,
  playedRounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  updatePlayedRounds: PropTypes.func.isRequired,
  errorRounds: PropTypes.bool.isRequired
};

export default RoundsRadio;
