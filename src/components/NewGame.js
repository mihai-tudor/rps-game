import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bulma/css/bulma.css';
import { updateRounds } from '../actions/newGame';

const renderRounds = (numberOfRounds) => {
  const rounds = [];
  for (let i = 1; i <= numberOfRounds; i += 1) {
    rounds.push(
      <div key={i} className="control">
        <label className="radio" htmlFor={`round-${i}-rock`}>
          Rock
          <input id={`round-${i}-rock`} type="radio" name={`round-${i}`} value="0" />
        </label>
        <label className="radio" htmlFor={`round-${i}-paper`}>
          Paper
          <input id={`round-${i}-paper`} type="radio" name={`round-${i}`} value="1" />
        </label>
        <label className="radio" htmlFor={`round-${i}-scissors`}>
          Scissors
          <input id={`round-${i}-scissors`} type="radio" name={`round-${i}`} value="2" />
        </label>
      </div>
    );
  }
  return rounds;
};

class NewGame extends Component {
  state = { newGameName: '' };

  render() {
    const { newGameName } = this.state;
    const { setsOfRounds, numberOfRounds } = this.props;

    const handleChange = (event) => {
      this.props.updateRounds(parseInt(event.target.value, 10));
    };

    return (
      <section className="section full-column">
        <h1 className="title white">Create new game</h1>
        <form className="form">
          <div className="field has-addons" style={{ justifyContent: 'center' }}>
            <div className="control">
              <input
                className="input"
                value={newGameName}
                placeholder="Enter your name..."
                onChange={(e) => this.setState({ newGameName: e.target.value })}
              />
              <div className="select">
                <select defaultValue={numberOfRounds} onChange={handleChange}>
                  {setsOfRounds.map((roundNumber) => (
                    <option
                      key={roundNumber}
                      value={roundNumber}
                    >
                      {roundNumber} round{roundNumber !== 1 ? 's' : '' }
                    </option>)
                    )
                  }
                </select>
              </div>
              {renderRounds(numberOfRounds)}
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
  updateRounds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  setsOfRounds: state.newGame.setsOfRounds,
  numberOfRounds: state.newGame.numberOfRounds
});

const mapDispatchToProps = {
  updateRounds
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);

