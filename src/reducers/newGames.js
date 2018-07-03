import { UPDATE_GAME_ROUNDS } from '../actions/newGame';

export const NEW_GAME_DEFAULT_STATE = {
  setsOfRounds: [1, 3, 5, 8, 10],
  numberOfRounds: 3
};

export default function newGame(state = NEW_GAME_DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_GAME_ROUNDS: {
      return { ...state, numberOfRounds: action.newRounds };
    }

    default:
      return state;
  }
}
