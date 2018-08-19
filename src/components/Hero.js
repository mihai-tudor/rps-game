import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ h1, h2 }) => (
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          {h1}
        </h1>
        <h2 className="subtitle">
          {h2}
        </h2>
      </div>
    </div>
  </section>
);

Hero.propTypes = {
  h1: PropTypes.string.isRequired,
  h2: PropTypes.string.isRequired
};

export default Hero;
