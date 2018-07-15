import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ errorMessage }) => (
  <div className="help is-danger">
    { errorMessage }
  </div>
);

FormError.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default FormError;
