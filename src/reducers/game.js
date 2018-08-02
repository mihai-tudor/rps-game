import {
  FETCH_GAME,
  LOADED_GAME,
  SENT_RESPONSE,
  SENT_SUCCESS,
  SENT_FAILURE,
  RESPONSE_UPDATE_GAME_NAME,
  RESPONSE_UPDATE_PLAYED_ROUNDS,
  SENT_SUBMIT_ERROR,
  REPLAY_GAME,
  REPLAY_GAME_STOP,
  REPLAY_GAME_PLAYING,
  REPLAY_GAME_PLAYING_PAUSE
} from '../actions/game';

import { isErrorName } from '../common/formValidation';
import { getPlayerNumberOfVictories } from '../common/utils';

export const GAME_DEFAULT_STATE = {
  game: {},
  loading: true,
  error: '',
  playerName: '',
  playedRounds: [],
  errorName: false,
  errorRounds: false,
  saving: false,
  saveError: false,
  playing: false,
  cardsTurned: [],
  cardsToBeTurned: [],
  playerScores: {
    p1: 0,
    p2: 0
  }
};

export default function games(state = GAME_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_GAME: {
      const cardsTurned = new Array(action.game.rounds).fill(false);
      const cardsToBeTurned = new Array(action.game.rounds).fill(false);
      return {
        ...state, game: action.game, loading: false, cardsTurned, cardsToBeTurned
      };
    }

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

    case REPLAY_GAME: {
      const playerScores = {
        p1: getPlayerNumberOfVictories(state.game.p1_rounds_won),
        p2: getPlayerNumberOfVictories(state.game.p2_rounds_won)
      };
      return {
        ...state, playerScores, playing: true
      };
    }

    case REPLAY_GAME_PLAYING: {
      const { cardsToBeTurned } = state;
      cardsToBeTurned[action.roundIndex] = true;
      return {
        ...state, cardsToBeTurned
      };
    }

    case REPLAY_GAME_PLAYING_PAUSE: {
      const cardsToBeTurned = new Array(state.game.rounds).fill(false);
      return {
        ...state, cardsTurned: action.cardsTurned, playing: false, cardsToBeTurned
      };
    }

    case REPLAY_GAME_STOP: {
      return {
        ...state, playing: false
      };
    }

    default:
      return state;
  }
}
