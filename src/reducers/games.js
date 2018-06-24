import { FETCH_GAMES, LOADED_GAMES, GAMES_FAILURE } from '../actions/games';

export const GAMES_DEFAULT_STATE = {
  games: [],
  loading: true,
  error: '',
};

export default function games(state = GAMES_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_GAMES:
      return { ...state, games: action.games, loading: false };

    case FETCH_GAMES: {
      return { ...state, loading: true };
    }

    case GAMES_FAILURE: {
      return {
        ...state, loading: false, error: action.error,
      };
    }

    default:
      return state;
  }
}
