import React from 'react';
import PropTypes from 'prop-types';
import FormError from './FormError';

const NameInput = ({ name, error, updateName }) => (
  <div className="field-body">
    <div className="field">
      <div className="control">
        <input
          className={error ? 'input is-danger' : 'input'}
          value={name}
          placeholder="Enter your name..."
          name="playerName"
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
      {error ? <FormError errorMessage="Your name is required and it cannot exceed 15 characters!" /> : ''}
    </div>
  </div>
);

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  updateName: PropTypes.func.isRequired
};

export default NameInput;
