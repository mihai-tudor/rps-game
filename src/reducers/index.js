import { combineReducers } from 'redux';
import games, { GAMES_DEFAULT_STATE } from './games';
import newGame, { NEW_GAME_DEFAULT_STATE } from './newGames';

const gamesApp = combineReducers({
  games, newGame
});

export const DEFAULT_STATE = {
  games: GAMES_DEFAULT_STATE,
  newGame: NEW_GAME_DEFAULT_STATE
};

export default gamesApp;
