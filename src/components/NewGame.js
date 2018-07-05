import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bulma/css/bulma.css';
import { updateRounds, updateName, updatePlayedRounds } from '../actions/newGame';

const renderRounds = (numberOfRounds, playedRounds) => {
  const rounds = [];
  for (let i = 0; i < numberOfRounds; i += 1) {
    rounds.push(
      <div key={i} className="control">
        <label className="radio" htmlFor={`round-${i}-rock`}>
          Rock
          <input id={`round-${i}-rock`} defaultChecked={playedRounds[i] === 0} type="radio" name={i} value="0" />
        </label>
        <label className="radio" htmlFor={`round-${i}-paper`}>
          Paper
          <input id={`round-${i}-paper`} defaultChecked={playedRounds[i] === 1} type="radio" name={i} value="1" />
        </label>
        <label className="radio" htmlFor={`round-${i}-scissors`}>
          Scissors
          <input id={`round-${i}-scissors`} defaultChecked={playedRounds[i] === 2} type="radio" name={i} value="2" />
        </label>
      </div>
    );
  }
  return rounds;
};

class NewGame extends Component {
  render() {
    const { setsOfRounds, numberOfRounds, newGameName, playedRounds } = this.props;

    const createNewGame = (event) => {
      event.preventDefault();
      console.log('event.target.new_game_name.value: ', event.target.new_game_name.value);
    };

    const handlePlayedRounds = (event) => {
      console.log('event.target.name: ', event.target.name);
      console.log('event.target.value: ', event.target.value);
      this.props.updatePlayedRounds(event.target);
    };

    return (
      <section className="section full-column">
        <h1 className="title white">Create new game</h1>
        <form className="form" onSubmit={createNewGame}>
          <div className="field has-addons" style={{ justifyContent: 'center' }}>
            <div className="control">
              <input
                className="input"
                value={newGameName}
                placeholder="Enter your name..."
                name="new_game_name"
                onChange={(e) => this.props.updateName(e.target.value)}
              />
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
              <div onChange={(e) => handlePlayedRounds(e)}>
                {renderRounds(numberOfRounds, playedRounds)}
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
  newGameName: PropTypes.string.isRequired,
  playedRounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateRounds: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updatePlayedRounds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  setsOfRounds: state.newGame.setsOfRounds,
  numberOfRounds: state.newGame.numberOfRounds,
  newGameName: state.newGame.newGameName,
  playedRounds: state.newGame.playedRounds
});

const mapDispatchToProps = {
  updateRounds,
  updateName,
  updatePlayedRounds
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);

