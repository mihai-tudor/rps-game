import { FETCH_GAMES, LOADED_GAMES, GAMES_FAILURE } from '../actions/games';
import { getPlayerNumberOfVictories } from '../common/utils';

export const GAMES_DEFAULT_STATE = {
  games: [],
  loading: true,
  error: ''
};

export default function games(state = GAMES_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_GAMES: {
      const gamesWithScores = action.games;
      gamesWithScores.forEach((game, index) => {
        gamesWithScores[index].playerScores = {
          p1: getPlayerNumberOfVictories(game.p1_rounds_won),
          p2: getPlayerNumberOfVictories(game.p2_rounds_won)
        };
      });
      return { ...state, games: gamesWithScores, loading: false };
    }

    case FETCH_GAMES: {
      return { ...state, loading: true };
    }

    case GAMES_FAILURE: {
      return {
        ...state, loading: false, error: action.error
      };
    }

    default:
      return state;
  }
}
