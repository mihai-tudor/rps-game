import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bulma/css/bulma.css';
import { updateRounds, updateName, updatePlayedRounds, submitNewGame } from '../actions/newGame';

const generateKey = (pre) => `${pre}_${new Date().getTime()}`;

const renderRounds = (numberOfRounds, playedRounds, updatePlayedRound) => {
  const radioRounds = [];
  console.log('playedRounds: ', playedRounds);
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

const renderErrorRounds = () => (
  <div className="help is-danger">
      You have to choose rock, paper or scissors for all rounds!
  </div>
);

const renderErrorName = () => (
  <div className="help is-danger">
    Your name is required!
  </div>
);

class NewGame extends Component {
  render() {
    const {
      setsOfRounds, numberOfRounds, playerName, playedRounds, errorRounds, errorName
    } = this.props;

    const createNewGame = (event) => {
      event.preventDefault();
      this.props.submitNewGame(playerName, playedRounds, numberOfRounds);
    };

    return (
      <section className="section full-column">
        <h1 className="title white">Create new game</h1>
        <form className="form" onSubmit={createNewGame}>
          <div className="field has-addons" style={{ justifyContent: 'center' }}>
            <div className="control">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className={errorName ? 'input is-danger' : 'input'}
                      value={playerName}
                      placeholder="Enter your name..."
                      name="playerName"
                      onChange={(e) => this.props.updateName(e.target.value)}
                    />
                  </div>
                  {errorName ? renderErrorName() : ''}
                </div>
              </div>
              <div className="select">
                <select
                  defaultValue={numberOfRounds}
                  onChange={(e) => this.props.updateRounds(parseInt(e.target.value, 10))}
                >
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
              <div>
                {renderRounds(numberOfRounds, playedRounds, this.props.updatePlayedRounds)}
                {errorRounds ? renderErrorRounds() : ''}
              </div>
              <div className="field is-grouped is-grouped-centered">
                <button className="button is-primary">
                  Create new game
                </button>
              </div>
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
  submitNewGame: PropTypes.func.isRequired,
  updatePlayedRounds: PropTypes.func.isRequired,
  errorName: PropTypes.bool.isRequired,
  errorRounds: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  setsOfRounds: state.newGame.setsOfRounds,
  numberOfRounds: state.newGame.numberOfRounds,
  playerName: state.newGame.playerName,
  playedRounds: state.newGame.playedRounds,
  errorName: state.newGame.errorName,
  errorRounds: state.newGame.errorRounds
});

const mapDispatchToProps = {
  updateRounds,
  updateName,
  updatePlayedRounds,
  submitNewGame
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);

