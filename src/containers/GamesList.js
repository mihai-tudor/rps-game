import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../actions/games';
import GamesFeed from '../components/GamesFeed';

class GamesList extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    const { games, isLoading, error } = this.props;

    return (
      <section className="section">
        <GamesFeed isLoading={isLoading} error={error} games={games} />
      </section>
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
