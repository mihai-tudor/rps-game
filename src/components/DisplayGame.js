import React from 'react';
import PropTypes from 'prop-types';
import GameEnded from '../components/GameEnded';
import GameOngoing from '../components/GameOngoing';

const DisplayGame = ({
  isLoading, game, error, playerName, errorName, playedRounds, updateName,
  updatePlayedRounds, errorRounds, saving, saveError, sentResponse, submitError,
  cardsTurned, playerScores, playing, replayGame
}) => {
  if (error) {
    return <div>{error}</div>
  }
  if (isLoading) {
    return <div>Loading games...</div>
  }
  if (game.ended) {
    return (
      <GameEnded
        id={game._id}
        p1Name={game.p1_name}
        p2Name={game.p2_name}
        p1Rounds={game.p1_rounds}
        p2Rounds={game.p2_rounds}
        p1RoundsWon={game.p1_rounds_won}
        p2RoundsWon={game.p2_rounds_won}
        cardsTurned={cardsTurned}
        playerScores={playerScores}
        playing={playing}
        replayGame={replayGame}
      />
    );
  }
  return (
    <GameOngoing
      id={game._id}
      p1Name={game.p1_name}
      numberOfRounds={game.rounds}
      playerName={playerName}
      errorName={errorName}
      playedRounds={playedRounds}
      updateName={updateName}
      updatePlayedRounds={updatePlayedRounds}
      errorRounds={errorRounds}
      saving={saving}
      saveError={saveError}
      sentResponse={sentResponse}
      submitError={submitError}
    />
  );
};

DisplayGame.propTypes = {
  game: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  errorName: PropTypes.bool.isRequired,
  playedRounds: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateName: PropTypes.func.isRequired,
  updatePlayedRounds: PropTypes.func.isRequired,
  errorRounds: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  sentResponse: PropTypes.func.isRequired,
  submitError: PropTypes.func.isRequired,
  cardsTurned: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  playerScores: PropTypes.objectOf(PropTypes.number).isRequired,
  playing: PropTypes.bool.isRequired,
  replayGame: PropTypes.func.isRequired
};

export default DisplayGame;
