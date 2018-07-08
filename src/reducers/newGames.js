import { UPDATE_GAME_ROUNDS, UPDATE_GAME_NAME, UPDATE_PLAYED_ROUNDS, SUBMIT_GAME } from '../actions/newGame';

export const NEW_GAME_DEFAULT_STATE = {
  setsOfRounds: [1, 3, 5, 8, 10],
  numberOfRounds: 3,
  playerName: '',
  playedRounds: [],
  errorName: false,
  errorRounds: false
};

const isErrorName = (name) => name.length < 1;

const isErrorRounds = (roundsPlayed, numberOfRounds) => {
  const notNullRounds = roundsPlayed.filter((r) => r !== null);
  if (notNullRounds.length !== numberOfRounds) {
    return true;
  }
  return notNullRounds.some(Number.isNaN);
};

export default function newGame(state = NEW_GAME_DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME_ROUNDS: {
      const { playedRounds } = state;
      return {
        ...state,
        numberOfRounds: action.newRounds,
        playedRounds: playedRounds.slice(0, action.newRounds)
      };
    }

    case UPDATE_GAME_NAME: {
      const { playerName } = action;
      const errorName = isErrorName(playerName);
      return { ...state, playerName, errorName };
    }

    case UPDATE_PLAYED_ROUNDS: {
      const { name, value } = action.newPlayedRound;
      const { playedRounds } = state;
      playedRounds[name] = parseInt(value, 10);
      return { ...state, playedRounds };
    }

    case SUBMIT_GAME: {
      const { playerName, playedRounds, numberOfRounds } = action;
      const errorName = isErrorName(playerName);
      const errorRounds = isErrorRounds(playedRounds, numberOfRounds);
      if (errorName || errorRounds) {
        return { ...state, errorName, errorRounds };
      }
      // z
      // save to db
      // z
      return {
        ...state, playerName: '', playedRounds: [], errorName: false, errorRounds: false
      };
    }

    default:
      return state;
  }
}
