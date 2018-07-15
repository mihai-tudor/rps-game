import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from '../actions/games';

const Game = ({
  id, p1Name, p2Name, p1Rounds, p2Rounds
}) => (
  <div>
    <div>Game id: {id}</div>
    <div>Game name: <Link to={{ pathname: `/game/${id}` }}>{`${p1Name} vs ${p2Name}`}</Link></div>
    <div>Player 1: {p1Rounds}</div>
    <div>Player 2: {p2Rounds}</div>
  </div>
);

const displayGames = (isLoading, games, error) => {
  if (error) {
    return <div>{error}</div>
  }
  if (isLoading) {
    return <div>Loading games...</div>
  }
  return (
    games.map((game) => (<Game
      key={game._id}
      id={game._id}
      p1Name={game.p1_name}
      p2Name={game.p2_name}
      p1Rounds={game.p1_rounds}
      p2Rounds={game.p2_rounds}
    />))
  );
};

Game.propTypes = {
  p1Name: PropTypes.string.isRequired,
  p2Name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  p1Rounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  p2Rounds: PropTypes.arrayOf(PropTypes.number).isRequired
};

class GamesList extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    const { games, isLoading, error } = this.props;

    return (
      <div>
        <h2 className="subtitle white">Games</h2>
        {displayGames(isLoading, games, error)}
      </div>
    )
  }
}

GamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGames: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  games: state.games.games,
  isLoading: state.games.loading,
  error: state.games.error
});

const mapDispatchToProps = {
  fetchGames
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
