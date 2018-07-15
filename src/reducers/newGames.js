import {
  UPDATE_GAME_ROUNDS,
  UPDATE_GAME_NAME,
  UPDATE_PLAYED_ROUNDS,
  CREATE_NEW_GAME,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  SUBMIT_ERROR
} from '../actions/newGame';

import { isErrorName } from '../common/formValidation';

export const NEW_GAME_DEFAULT_STATE = {
  setsOfRounds: [1, 3, 5, 8, 10],
  numberOfRounds: 3,
  playerName: '',
  playedRounds: [],
  errorName: false,
  errorRounds: false,
  saving: false,
  saveError: false,
  createdGameId: ''
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

    case SUBMIT_ERROR: {
      return { ...state, errorName: action.errorName, errorRounds: action.errorRounds };
    }

    case CREATE_NEW_GAME: {
      return {
        ...state, saving: true
      };
    }

    case CREATE_SUCCESS: {
      return {
        ...state, playerName: '', playedRounds: [], errorName: false, errorRounds: false, saving: false, createdGameId: action.newGameId
      };
    }

    case CREATE_FAILURE: {
      return {
        ...state, saving: false, saveError: true
      };
    }

    default:
      return state;
  }
}
