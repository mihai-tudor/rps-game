import { FETCH_GAME, LOADED_GAME } from '../actions/game';

export const GAME_DEFAULT_STATE = {
  game: {},
  loading: true,
  error: ''
};

export default function games(state = GAME_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_GAME:
      return { ...state, game: action.game, loading: false };

    case FETCH_GAME: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
}
