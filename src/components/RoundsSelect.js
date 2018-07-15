import React from 'react';
import PropTypes from 'prop-types';
import { addS } from '../common/utils';

const RoundsSelect = ({ numberOfRounds, setsOfRounds, updateRounds }) => (
  <div className="select">
    <select
      defaultValue={numberOfRounds}
      onChange={(e) => updateRounds(parseInt(e.target.value, 10))}
    >
      {setsOfRounds.map((roundNumber) => (
        <option
          key={roundNumber}
          value={roundNumber}
        >
          {roundNumber} round{addS(roundNumber)}
        </option>)
      )}
    </select>
  </div>
);

RoundsSelect.propTypes = {
  numberOfRounds: PropTypes.number.isRequired,
  setsOfRounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateRounds: PropTypes.func.isRequired
};

export default RoundsSelect;
