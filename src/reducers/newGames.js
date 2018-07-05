import { UPDATE_GAME_ROUNDS, UPDATE_GAME_NAME, UPDATE_PLAYED_ROUNDS } from '../actions/newGame';

export const NEW_GAME_DEFAULT_STATE = {
  setsOfRounds: [1, 3, 5, 8, 10],
  numberOfRounds: 3,
  newGameName: '',
  playedRounds: [0, 1, 2]
};

export default function newGame(state = NEW_GAME_DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME_ROUNDS: {
      return { ...state, numberOfRounds: action.newRounds };
    }

    case UPDATE_GAME_NAME: {
      return { ...state, newGameName: action.newName };
    }

    case UPDATE_PLAYED_ROUNDS: {
      const { name, value } = action.newPlayedRound;
      const { playedRounds } = state;
      playedRounds[name] = parseInt(value, 10);
      return { ...state, playedRounds };
    }

    default:
      return state;
  }
}
