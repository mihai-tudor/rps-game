import {
  FETCH_GAME,
  LOADED_GAME,
  SENT_RESPONSE,
  SENT_SUCCESS,
  SENT_FAILURE,
  RESPONSE_UPDATE_GAME_NAME,
  RESPONSE_UPDATE_PLAYED_ROUNDS,
  SENT_SUBMIT_ERROR
} from '../actions/game';

import { isErrorName } from '../common/formValidation';

export const GAME_DEFAULT_STATE = {
  game: {},
  loading: true,
  error: '',
  playerName: '',
  playedRounds: [],
  errorName: false,
  errorRounds: false,
  saving: false,
  saveError: false
};

export default function games(state = GAME_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_GAME:
      return { ...state, game: action.game, loading: false };

    case FETCH_GAME: {
      return { ...state, loading: true };
    }

    case SENT_RESPONSE: {
      return {
        ...state, saving: true
      };
    }

    case SENT_SUCCESS: {
      const { endedGame } = action;
      return {
        ...state, game: endedGame, playerName: '', playedRounds: [], errorName: false, errorRounds: false, saving: false
      };
    }

    case SENT_FAILURE: {
      return {
        ...state, saving: false, saveError: true
      };
    }

    case SENT_SUBMIT_ERROR: {
      return { ...state, errorName: action.errorName, errorRounds: action.errorRounds };
    }

    case RESPONSE_UPDATE_GAME_NAME: {
      const { playerName } = action;
      const errorName = isErrorName(playerName);
      return { ...state, playerName, errorName };
    }

    case RESPONSE_UPDATE_PLAYED_ROUNDS: {
      const { name, value } = action.newPlayedRound;
      const { playedRounds } = state;
      playedRounds[name] = parseInt(value, 10);
      return { ...state, playedRounds };
    }

    default:
      return state;
  }
}
