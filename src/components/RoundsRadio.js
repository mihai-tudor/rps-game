import React from 'react';
import PropTypes from 'prop-types';
import { generateKey } from '../common/utils';
import FormError from './FormError';
import rock from '../images/rock.svg';
import paper from '../images/paper.svg';
import scissors from '../images/scissors.svg';
import './RoundsRadio.css';

const renderRounds = (numberOfRounds, playedRounds, updatePlayedRound) => {
  const radioRounds = [];
  for (let i = 0; i < numberOfRounds; i += 1) {
    radioRounds.push(
      <div key={generateKey(i)} className="control has-text-centered" onChange={(e) => updatePlayedRound(e.target)}>
        <label className="radio" htmlFor={`round-${i}-rock`}>
          <input defaultChecked={playedRounds[i] === 0} id={`round-${i}-rock`} type="radio" name={i} value="0" />
          <img src={rock} width="75" height="75" alt="rock" />
        </label>
        <label className="radio" htmlFor={`round-${i}-paper`}>
          <input defaultChecked={playedRounds[i] === 1} id={`round-${i}-paper`} type="radio" name={i} value="1" />
          <img src={paper} width="75" height="75" alt="paper" />
        </label>
        <label className="radio" htmlFor={`round-${i}-scissors`}>
          <input defaultChecked={playedRounds[i] === 2} id={`round-${i}-scissors`} type="radio" name={i} value="2" />
          <img src={scissors} width="75" height="75" alt="scissors" />
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
